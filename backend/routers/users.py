from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from typing import List, Dict, Any
import json
import os
from datetime import datetime

from database import get_db, User, Resume
from routers.auth import get_current_user
from schemas.auth import UserResponse

router = APIRouter()

@router.get("/profile", response_model=UserResponse)
async def get_user_profile(current_user: User = Depends(get_current_user)):
    """Get current user's profile"""
    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        username=current_user.username,
        full_name=current_user.full_name,
        is_active=current_user.is_active
    )

@router.put("/profile")
async def update_user_profile(
    full_name: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Update user profile"""
    current_user.full_name = full_name
    current_user.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(current_user)
    
    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        username=current_user.username,
        full_name=current_user.full_name,
        is_active=current_user.is_active
    )

@router.post("/upload-resume")
async def upload_resume(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Upload user resume"""
    # Validate file type
    allowed_types = ["application/pdf", "text/plain", "application/msword", 
                    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
    
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload PDF, DOC, DOCX, or TXT files.")
    
    # Create upload directory
    upload_dir = "uploads/resumes"
    os.makedirs(upload_dir, exist_ok=True)
    
    # Save file
    file_path = os.path.join(upload_dir, f"resume_{current_user.id}_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}.pdf")
    
    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)
    
    # Extract text content (simplified for demo)
    content_text = f"Resume uploaded by {current_user.full_name} on {datetime.utcnow().strftime('%Y-%m-%d')}"
    
    # Save to database
    resume = Resume(
        user_id=current_user.id,
        file_path=file_path,
        content=content_text,
        skills="[]",  # Would be extracted by AI in production
        experience="[]",  # Would be extracted by AI in production
        education="[]"  # Would be extracted by AI in production
    )
    db.add(resume)
    db.commit()
    db.refresh(resume)
    
    return {
        "message": "Resume uploaded successfully",
        "resume_id": resume.id,
        "file_path": file_path
    }

@router.get("/resumes")
async def get_user_resumes(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get user's uploaded resumes"""
    resumes = db.query(Resume).filter(Resume.user_id == current_user.id).all()
    
    return {
        "resumes": [
            {
                "id": resume.id,
                "file_path": resume.file_path,
                "created_at": resume.created_at,
                "skills": json.loads(resume.skills) if resume.skills else [],
                "experience": json.loads(resume.experience) if resume.experience else [],
                "education": json.loads(resume.education) if resume.education else []
            }
            for resume in resumes
        ]
    }