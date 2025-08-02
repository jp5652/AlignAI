'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  VolumeX,
  MessageCircle,
  User,
  Bot,
  Clock,
  X
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

interface Message {
  id: string
  type: 'user' | 'ai'
  content: string
  timestamp: Date
  voiceUrl?: string
}

interface InterviewProps {
  params: {
    id: string
  }
}

export default function InterviewPage({ params }: InterviewProps) {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isRecording, setIsRecording] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [interviewInfo, setInterviewInfo] = useState<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }
    loadInterviewInfo()
  }, [isAuthenticated])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadInterviewInfo = async () => {
    try {
      // In a real app, you'd fetch interview details from API
      setInterviewInfo({
        title: 'Software Engineering Interview',
        duration: 20,
        difficulty: 'Medium'
      })
    } catch (error) {
      console.error('Failed to load interview info:', error)
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    try {
      // Simulate AI response (in real app, this would be WebSocket)
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'ai',
          content: generateAIResponse(inputMessage),
          timestamp: new Date(),
          voiceUrl: voiceEnabled ? '/api/voice/mock-audio.mp3' : undefined
        }
        setMessages(prev => [...prev, aiMessage])
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      toast.error('Failed to send message')
      setIsLoading(false)
    }
  }

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
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
    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleVoiceToggle = () => {
    setVoiceEnabled(!voiceEnabled)
    toast.success(voiceEnabled ? 'Voice disabled' : 'Voice enabled')
  }

  const handleRecordingToggle = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      toast.success('Recording started')
    } else {
      toast.success('Recording stopped')
    }
  }

  const handlePlayAudio = (voiceUrl: string) => {
    if (audioRef.current) {
      audioRef.current.src = voiceUrl
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {interviewInfo?.title || 'Interview'}
                </h1>
                <p className="text-sm text-gray-500">
                  {interviewInfo?.duration}min • {interviewInfo?.difficulty}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={handleVoiceToggle}
                className={`p-2 rounded-lg transition-colors ${
                  voiceEnabled ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {voiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <div className="flex items-center space-x-1 text-gray-500">
                <Clock className="w-4 h-4" />
                <span className="text-sm">20:45</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Chat Interface */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[600px] flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <Bot className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Welcome to your AI interview!
                </h3>
                <p className="text-gray-500">
                  I'm your AI interviewer. I'll ask you questions and provide feedback on your responses.
                </p>
              </motion.div>
            )}

            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === 'ai' && (
                      <Bot className="w-4 h-4 mt-1 flex-shrink-0" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm">{message.content}</p>
                      {message.voiceUrl && voiceEnabled && (
                        <button
                          onClick={() => handlePlayAudio(message.voiceUrl!)}
                          className="mt-2 text-xs text-gray-500 hover:text-gray-700"
                        >
                          🔊 Play audio
                        </button>
                      )}
                    </div>
                    {message.type === 'user' && (
                      <User className="w-4 h-4 mt-1 flex-shrink-0" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-4 h-4" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <button
                onClick={handleRecordingToggle}
                className={`p-2 rounded-lg transition-colors ${
                  isRecording ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              
              <div className="flex-1">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  rows={1}
                  disabled={isLoading}
                />
              </div>
              
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden audio element for voice playback */}
      <audio
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
    </div>
  )
}