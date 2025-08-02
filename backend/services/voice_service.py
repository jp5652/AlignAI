import os
import tempfile
from typing import Optional
import requests
from config import settings

class VoiceService:
    def __init__(self):
        self.cache_dir = "voice_cache"
        os.makedirs(self.cache_dir, exist_ok=True)
        
        # Voice configurations
        self.voices = {
            "female": {
                "name": "alloy",
                "model": "tts-1"
            },
            "male": {
                "name": "echo",
                "model": "tts-1"
            }
        }

    def text_to_speech(self, text: str, gender: str = "female") -> Optional[str]:
        """Convert text to speech and return audio file URL"""
        try:
            # For development, return a mock audio URL
            # In production, you'd integrate with OpenAI TTS or other TTS service
            return self._generate_mock_audio_url(text, gender)
        except Exception as e:
            print(f"Error in text-to-speech: {e}")
            return None

    def _generate_mock_audio_url(self, text: str, gender: str) -> str:
        """Generate mock audio URL for development"""
        # In a real implementation, this would call OpenAI TTS API
        # For now, return a placeholder
        voice_config = self.voices.get(gender, self.voices["female"])
        
        # Create a unique filename based on text hash
        import hashlib
        text_hash = hashlib.md5(text.encode()).hexdigest()[:8]
        filename = f"audio_{gender}_{text_hash}.mp3"
        
        # Return a mock URL (in production, this would be a real audio file)
        return f"/api/voice/{filename}"

    def generate_speech_openai(self, text: str, gender: str = "female") -> Optional[str]:
        """Generate speech using OpenAI TTS API"""
        if not settings.OPENAI_API_KEY:
            return None
            
        try:
            import openai
            
            voice_config = self.voices.get(gender, self.voices["female"])
            
            response = openai.audio.speech.create(
                model=voice_config["model"],
                voice=voice_config["name"],
                input=text
            )
            
            # Save to temporary file
            temp_file = tempfile.NamedTemporaryFile(delete=False, suffix=".mp3")
            response.stream_to_file(temp_file.name)
            
            # Move to cache directory
            filename = f"speech_{gender}_{hash(text) % 10000}.mp3"
            cache_path = os.path.join(self.cache_dir, filename)
            os.rename(temp_file.name, cache_path)
            
            return f"/api/voice/{filename}"
            
        except Exception as e:
            print(f"OpenAI TTS error: {e}")
            return None

    def get_available_voices(self) -> dict:
        """Get available voice options"""
        return {
            "female": ["alloy", "nova", "shimmer"],
            "male": ["echo", "fable", "onyx"]
        }

    def cleanup_old_audio_files(self, max_age_hours: int = 24):
        """Clean up old audio files from cache"""
        import time
        current_time = time.time()
        max_age_seconds = max_age_hours * 3600
        
        for filename in os.listdir(self.cache_dir):
            file_path = os.path.join(self.cache_dir, filename)
            if os.path.isfile(file_path):
                file_age = current_time - os.path.getmtime(file_path)
                if file_age > max_age_seconds:
                    os.remove(file_path)