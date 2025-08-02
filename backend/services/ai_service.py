import openai
from typing import Dict, List, Any
import json
from config import settings

class AIService:
    def __init__(self):
        if settings.OPENAI_API_KEY:
            openai.api_key = settings.OPENAI_API_KEY
        else:
            # Fallback to mock responses for development
            self.mock_mode = True
        self.mock_mode = not settings.OPENAI_API_KEY

    def generate_welcome_message(self, interview) -> str:
        """Generate a welcome message for the interview"""
        if self.mock_mode:
            return f"Hello! Welcome to your {interview.title} interview. I'm your AI interviewer today. Let's start with some questions about your background and experience. Are you ready to begin?"
        
        prompt = f"""
        You are an AI interviewer conducting a {interview.category} interview titled "{interview.title}".
        The difficulty level is {interview.difficulty} and it should take about {interview.duration} minutes.
        
        Generate a welcoming, professional opening message that:
        1. Introduces yourself as the AI interviewer
        2. Explains the interview format
        3. Sets expectations for the duration
        4. Makes the candidate feel comfortable
        5. Asks if they're ready to begin
        
        Keep it concise (2-3 sentences) and friendly but professional.
        """
        
        try:
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[{"role": "system", "content": prompt}],
                max_tokens=150,
                temperature=0.7
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            return f"Hello! Welcome to your {interview.title} interview. I'm your AI interviewer today. Let's start with some questions about your background and experience. Are you ready to begin?"

    def generate_response(self, context: Dict[str, Any], user_message: str) -> str:
        """Generate AI response based on user message and context"""
        if self.mock_mode:
            return self._generate_mock_response(context, user_message)
        
        # Build conversation history for context
        conversation_history = []
        for msg in context["conversation_history"][-10:]:  # Last 10 messages
            conversation_history.append({
                "role": msg["role"],
                "content": msg["content"]
            })
        
        system_prompt = f"""
        You are an AI interviewer conducting a {context['category']} interview.
        Your role is to:
        1. Ask relevant, professional questions based on the candidate's responses
        2. Show interest in their answers and ask follow-up questions
        3. Assess their knowledge, experience, and communication skills
        4. Keep the conversation flowing naturally
        5. Be encouraging but professional
        
        Interview context:
        - Category: {context['category']}
        - Subcategory: {context['subcategory']}
        - Interview ID: {context['interview_id']}
        
        Guidelines:
        - Ask one question at a time
        - Listen to their answers and ask relevant follow-ups
        - If they mention specific technologies or experiences, ask for details
        - If they seem nervous, be encouraging
        - Keep responses concise but engaging
        - Don't repeat questions they've already answered
        """
        
        try:
            messages = [{"role": "system", "content": system_prompt}] + conversation_history
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=messages,
                max_tokens=200,
                temperature=0.7
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            return self._generate_mock_response(context, user_message)

    def generate_final_feedback(self, context: Dict[str, Any]) -> str:
        """Generate final feedback for the interview"""
        if self.mock_mode:
            return self._generate_mock_feedback(context)
        
        # Analyze conversation history
        conversation_summary = self._analyze_conversation(context["conversation_history"])
        
        prompt = f"""
        Based on the interview conversation, provide a comprehensive final feedback.
        
        Interview Details:
        - Category: {context['category']}
        - Subcategory: {context['subcategory']}
        
        Conversation Summary: {conversation_summary}
        
        Provide feedback that includes:
        1. Overall assessment (strengths and areas for improvement)
        2. Communication skills evaluation
        3. Technical knowledge assessment (if applicable)
        4. Specific recommendations for improvement
        5. Final recommendation (Strong Candidate / Good Candidate / Needs Improvement)
        
        Keep it professional, constructive, and specific.
        """
        
        try:
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[{"role": "system", "content": prompt}],
                max_tokens=300,
                temperature=0.5
            )
            return response.choices[0].message.content.strip()
        except Exception as e:
            return self._generate_mock_feedback(context)

    def _generate_mock_response(self, context: Dict[str, Any], user_message: str) -> str:
        """Generate mock responses for development"""
        mock_responses = [
            "That's interesting! Can you tell me more about that experience?",
            "Great answer! How did you handle challenges in that situation?",
            "I see. What would you do differently if you faced that again?",
            "Excellent point. Can you give me a specific example?",
            "That's helpful context. What are your thoughts on current trends in this field?",
            "Good insight. How do you stay updated with new technologies?",
            "Interesting approach. What was the outcome of that decision?",
            "That makes sense. How do you prioritize when you have multiple deadlines?",
            "Good answer! What's your approach to learning new skills?",
            "That's valuable experience. How do you handle feedback and criticism?"
        ]
        
        import random
        return random.choice(mock_responses)

    def _generate_mock_feedback(self, context: Dict[str, Any]) -> str:
        """Generate mock feedback for development"""
        return f"""
        Interview Feedback - {context['category']} Interview
        
        Overall Assessment:
        The candidate demonstrated good communication skills and showed enthusiasm for the role. 
        Their responses were generally well-structured and relevant to the questions asked.
        
        Strengths:
        - Clear communication style
        - Relevant experience examples
        - Professional demeanor
        
        Areas for Improvement:
        - Could provide more specific technical details
        - Consider adding more quantifiable achievements
        - Practice more concise responses
        
        Final Recommendation: Good Candidate
        
        The candidate shows potential and would benefit from additional preparation in technical areas.
        """

    def _analyze_conversation(self, conversation_history: List[Dict]) -> str:
        """Analyze conversation history for feedback generation"""
        user_messages = [msg["content"] for msg in conversation_history if msg["role"] == "user"]
        total_user_words = sum(len(msg.split()) for msg in user_messages)
        avg_response_length = total_user_words / len(user_messages) if user_messages else 0
        
        return f"Total responses: {len(user_messages)}, Average response length: {avg_response_length:.1f} words"