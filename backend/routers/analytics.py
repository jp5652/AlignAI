from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Dict, Any
import json
from datetime import datetime, timedelta

from database import get_db, User, Interview, InterviewQuestion
from routers.auth import get_current_user

router = APIRouter()

@router.get("/dashboard")
async def get_analytics_dashboard(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get analytics dashboard data"""
    # Get user's interview statistics
    total_interviews = db.query(Interview).filter(Interview.user_id == current_user.id).count()
    completed_interviews = db.query(Interview).filter(
        Interview.user_id == current_user.id,
        Interview.status == "completed"
    ).count()
    
    # Average score
    avg_score = db.query(func.avg(Interview.score)).filter(
        Interview.user_id == current_user.id,
        Interview.status == "completed",
        Interview.score.isnot(None)
    ).scalar() or 0
    
    # Recent interviews (last 30 days)
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    recent_interviews = db.query(Interview).filter(
        Interview.user_id == current_user.id,
        Interview.created_at >= thirty_days_ago
    ).count()
    
    # Category breakdown
    category_stats = db.query(
        Interview.category,
        func.count(Interview.id).label('count'),
        func.avg(Interview.score).label('avg_score')
    ).filter(
        Interview.user_id == current_user.id
    ).group_by(Interview.category).all()
    
    return {
        "total_interviews": total_interviews,
        "completed_interviews": completed_interviews,
        "completion_rate": (completed_interviews / total_interviews * 100) if total_interviews > 0 else 0,
        "average_score": round(avg_score, 2),
        "recent_interviews": recent_interviews,
        "category_breakdown": [
            {
                "category": stat.category,
                "count": stat.count,
                "avg_score": round(stat.avg_score, 2) if stat.avg_score else 0
            }
            for stat in category_stats
        ]
    }

@router.get("/performance-trends")
async def get_performance_trends(
    days: int = 30,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get performance trends over time"""
    start_date = datetime.utcnow() - timedelta(days=days)
    
    # Get interviews grouped by date
    daily_stats = db.query(
        func.date(Interview.created_at).label('date'),
        func.count(Interview.id).label('count'),
        func.avg(Interview.score).label('avg_score')
    ).filter(
        Interview.user_id == current_user.id,
        Interview.created_at >= start_date
    ).group_by(func.date(Interview.created_at)).order_by(func.date(Interview.created_at)).all()
    
    return {
        "trends": [
            {
                "date": stat.date.strftime('%Y-%m-%d'),
                "count": stat.count,
                "avg_score": round(stat.avg_score, 2) if stat.avg_score else 0
            }
            for stat in daily_stats
        ]
    }

@router.get("/category-performance")
async def get_category_performance(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get performance breakdown by category"""
    category_performance = db.query(
        Interview.category,
        func.count(Interview.id).label('total'),
        func.count(Interview.id).filter(Interview.status == "completed").label('completed'),
        func.avg(Interview.score).label('avg_score'),
        func.min(Interview.score).label('min_score'),
        func.max(Interview.score).label('max_score')
    ).filter(
        Interview.user_id == current_user.id
    ).group_by(Interview.category).all()
    
    return {
        "categories": [
            {
                "category": stat.category,
                "total": stat.total,
                "completed": stat.completed,
                "completion_rate": (stat.completed / stat.total * 100) if stat.total > 0 else 0,
                "avg_score": round(stat.avg_score, 2) if stat.avg_score else 0,
                "min_score": stat.min_score,
                "max_score": stat.max_score
            }
            for stat in category_performance
        ]
    }

@router.get("/improvement-areas")
async def get_improvement_areas(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get areas for improvement based on interview performance"""
    # Get questions with lowest scores
    low_score_questions = db.query(InterviewQuestion).join(Interview).filter(
        Interview.user_id == current_user.id,
        InterviewQuestion.score.isnot(None),
        InterviewQuestion.score < 7.0  # Threshold for improvement areas
    ).order_by(InterviewQuestion.score.asc()).limit(5).all()
    
    # Get most common question types
    question_type_stats = db.query(
        InterviewQuestion.question_type,
        func.count(InterviewQuestion.id).label('count'),
        func.avg(InterviewQuestion.score).label('avg_score')
    ).join(Interview).filter(
        Interview.user_id == current_user.id,
        InterviewQuestion.score.isnot(None)
    ).group_by(InterviewQuestion.question_type).all()
    
    return {
        "improvement_areas": [
            {
                "question_text": question.question_text,
                "question_type": question.question_type,
                "score": question.score,
                "feedback": question.ai_feedback
            }
            for question in low_score_questions
        ],
        "question_type_performance": [
            {
                "type": stat.question_type,
                "count": stat.count,
                "avg_score": round(stat.avg_score, 2) if stat.avg_score else 0
            }
            for stat in question_type_stats
        ]
    }