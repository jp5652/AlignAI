from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from typing import List, Dict, Any
import json
import asyncio
from datetime import datetime
import openai
from config import settings

from database import get_db, User, Interview, InterviewQuestion, InterviewTemplate
from routers.auth import get_current_user
from services.ai_service import AIService
from services.voice_service import VoiceService

router = APIRouter()
ai_service = AIService()
voice_service = VoiceService()

# WebSocket connection manager
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)

manager = ConnectionManager()

@router.get("/templates")
async def get_interview_templates(db: Session = Depends(get_db)):
    """Get all available interview templates"""
    templates = db.query(InterviewTemplate).filter(InterviewTemplate.is_active == True).all()
    
    # Group by category
    categories = {}
    for template in templates:
        if template.category not in categories:
            categories[template.category] = []
        categories[template.category].append({
            "id": template.id,
            "subcategory": template.subcategory,
            "title": template.title,
            "description": template.description,
            "duration": template.duration,
            "difficulty": template.difficulty
        })
    
    return {"categories": categories}

@router.post("/start")
async def start_interview(
    template_id: int,
    voice_gender: str = "female",
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Start a new AI interview"""
    template = db.query(InterviewTemplate).filter(InterviewTemplate.id == template_id).first()
    if not template:
        raise HTTPException(status_code=404, detail="Interview template not found")
    
    # Create new interview
    interview = Interview(
        user_id=current_user.id,
        category=template.category,
        subcategory=template.subcategory,
        title=template.title,
        duration=template.duration,
        difficulty=template.difficulty,
        status="in_progress",
        started_at=datetime.utcnow()
    )
    db.add(interview)
    db.commit()
    db.refresh(interview)
    
    return {
        "interview_id": interview.id,
        "title": interview.title,
        "duration": interview.duration,
        "difficulty": interview.difficulty,
        "voice_gender": voice_gender
    }

@router.websocket("/ws/{interview_id}")
async def websocket_endpoint(websocket: WebSocket, interview_id: int, token: str):
    """WebSocket endpoint for real-time interview"""
    await manager.connect(websocket)
    
    try:
        # Validate token and get user
        # In production, you'd want to properly validate the JWT token here
        db = next(get_db())
        
        interview = db.query(Interview).filter(Interview.id == interview_id).first()
        if not interview:
            await websocket.send_text(json.dumps({
                "type": "error",
                "message": "Interview not found"
            }))
            return
        
        # Initialize AI interview
        ai_context = {
            "interview_id": interview_id,
            "category": interview.category,
            "subcategory": interview.subcategory,
            "user_resume": None,  # Will be populated if available
            "conversation_history": []
        }
        
        # Send welcome message
        welcome_message = ai_service.generate_welcome_message(interview)
        await websocket.send_text(json.dumps({
            "type": "ai_message",
            "message": welcome_message,
            "voice_url": voice_service.text_to_speech(welcome_message, "female")
        }))
        
        # Start interview loop
        while True:
            data = await websocket.receive_text()
            message_data = json.loads(data)
            
            if message_data["type"] == "user_message":
                user_message = message_data["message"]
                
                # Add to conversation history
                ai_context["conversation_history"].append({
                    "role": "user",
                    "content": user_message,
                    "timestamp": datetime.utcnow().isoformat()
                })
                
                # Generate AI response
                ai_response = ai_service.generate_response(ai_context, user_message)
                
                # Add AI response to history
                ai_context["conversation_history"].append({
                    "role": "assistant",
                    "content": ai_response,
                    "timestamp": datetime.utcnow().isoformat()
                })
                
                # Send AI response
                await websocket.send_text(json.dumps({
                    "type": "ai_message",
                    "message": ai_response,
                    "voice_url": voice_service.text_to_speech(ai_response, "female")
                }))
                
            elif message_data["type"] == "end_interview":
                # Generate final feedback
                final_feedback = ai_service.generate_final_feedback(ai_context)
                
                # Update interview status
                interview.status = "completed"
                interview.completed_at = datetime.utcnow()
                interview.feedback = final_feedback
                db.commit()
                
                await websocket.send_text(json.dumps({
                    "type": "interview_complete",
                    "feedback": final_feedback
                }))
                break
                
    except WebSocketDisconnect:
        manager.disconnect(websocket)
    except Exception as e:
        await websocket.send_text(json.dumps({
            "type": "error",
            "message": str(e)
        }))
        manager.disconnect(websocket)

@router.get("/history")
async def get_interview_history(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's interview history"""
    interviews = db.query(Interview).filter(
        Interview.user_id == current_user.id
    ).order_by(Interview.created_at.desc()).all()
    
    return {
        "interviews": [
            {
                "id": interview.id,
                "title": interview.title,
                "category": interview.category,
                "subcategory": interview.subcategory,
                "status": interview.status,
                "score": interview.score,
                "duration": interview.duration,
                "difficulty": interview.difficulty,
                "started_at": interview.started_at,
                "completed_at": interview.completed_at,
                "created_at": interview.created_at
            }
            for interview in interviews
        ]
    }

@router.get("/{interview_id}")
async def get_interview_details(
    interview_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get detailed interview information"""
    interview = db.query(Interview).filter(
        Interview.id == interview_id,
        Interview.user_id == current_user.id
    ).first()
    
    if not interview:
        raise HTTPException(status_code=404, detail="Interview not found")
    
    questions = db.query(InterviewQuestion).filter(
        InterviewQuestion.interview_id == interview_id
    ).order_by(InterviewQuestion.order_index).all()
    
    return {
        "interview": {
            "id": interview.id,
            "title": interview.title,
            "category": interview.category,
            "subcategory": interview.subcategory,
            "status": interview.status,
            "score": interview.score,
            "feedback": interview.feedback,
            "duration": interview.duration,
            "difficulty": interview.difficulty,
            "started_at": interview.started_at,
            "completed_at": interview.completed_at,
            "created_at": interview.created_at
        },
        "questions": [
            {
                "id": question.id,
                "question_text": question.question_text,
                "question_type": question.question_type,
                "answer": question.answer,
                "ai_feedback": question.ai_feedback,
                "score": question.score,
                "order_index": question.order_index
            }
            for question in questions
        ]
    }