from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List, Dict, Any
import json
from datetime import datetime

from database import get_db, User, Interview, InterviewTemplate
from routers.auth import get_current_user

router = APIRouter()

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

@router.get("/my-interviews")
async def get_my_interviews(
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
        }
    }