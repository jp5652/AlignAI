'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { 
  Mic, MicOff, Volume2, VolumeX, Settings, 
  ArrowLeft, Send, Bot, Play
} from 'lucide-react'
import { interviewData, Interview } from '@/data/interviews'
import { VoiceSelector } from '@/components/VoiceSelector'
import { InterviewChat } from '@/components/InterviewChat'
import { InterviewTimer } from '@/components/InterviewTimer'

interface Message {
  id: number
  sender: 'user' | 'ai'
  content: string
  timestamp: Date
}

export default function InterviewPage() {
  const params = useParams()
  const router = useRouter()
  const [interview, setInterview] = useState<Interview | null>(null)
  
  // Interview state
  const [isStarted, setIsStarted] = useState(false)
  const [isPaused] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [, setCurrentQuestion] = useState('')
  const [messages, setMessages] = useState<Message[]>([])
  const [userResponse, setUserResponse] = useState('')
  
  // Voice & Audio state
  const [isRecording, setIsRecording] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [selectedVoice, setSelectedVoice] = useState<'male' | 'female'>('female')
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true)
  
  // Settings
  const [showSettings, setShowSettings] = useState(false)
  const [interviewQuestions, setInterviewQuestions] = useState<string[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  
  const speechSynthesis = useRef<SpeechSynthesis | null>(null)
  const recognition = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    const generateInterviewQuestions = (interviewData: Interview) => {
      // Generate AI questions based on interview type
      const questions = getQuestionsForCategory(interviewData.category, interviewData.title)
      setInterviewQuestions(questions)
    }

    // Find interview data
    const foundInterview = interviewData.find(i => i.id === params.id)
    if (foundInterview) {
      setInterview(foundInterview)
      generateInterviewQuestions(foundInterview)
    }

    // Initialize speech synthesis
    if (typeof window !== 'undefined') {
      speechSynthesis.current = window.speechSynthesis
      
      // Initialize speech recognition
      if ('webkitSpeechRecognition' in window) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const SpeechRecognition = (window as any).webkitSpeechRecognition
        recognition.current = new SpeechRecognition()
        
        if (recognition.current) {
          recognition.current.continuous = false
          recognition.current.interimResults = false
          recognition.current.lang = 'en-US'
          
          recognition.current.onresult = (event: SpeechRecognitionEvent) => {
            const transcript = event.results[0][0].transcript
            setUserResponse(transcript)
            setIsRecording(false)
          }
          
          recognition.current.onerror = () => {
            setIsRecording(false)
          }
        }
      }
    }
  }, [params.id])

  const getQuestionsForCategory = (category: string, title: string): string[] => {
    const questionBank: { [key: string]: string[] } = {
      'Software': [
        `Tell me about yourself and your experience with ${title.toLowerCase()}.`,
        'Describe a challenging technical problem you\'ve solved recently.',
        'How do you approach debugging a complex issue?',
        'What\'s your experience with version control systems like Git?',
        'Explain the difference between async and sync programming.',
        'How do you ensure code quality in your projects?',
        'What testing strategies do you use?',
        'Describe your experience with databases.'
      ],
      'Data Science': [
        'Walk me through your background in data science.',
        'How do you handle missing data in a dataset?',
        'Explain the bias-variance tradeoff.',
        'What\'s your approach to feature engineering?',
        'How do you validate a machine learning model?',
        'Describe a data science project you\'re proud of.',
        'What tools do you use for data visualization?',
        'How do you communicate technical findings to non-technical stakeholders?'
      ],
      'Finance': [
        'Tell me about your background in finance.',
        'How do you analyze financial statements?',
        'What\'s your approach to risk assessment?',
        'Explain the concept of time value of money.',
        'How do you stay updated with market trends?',
        'Describe a complex financial model you\'ve built.',
        'What\'s your experience with financial software?',
        'How do you handle uncertainty in financial forecasting?'
      ],
      'Marketing': [
        'Tell me about your marketing experience.',
        'How do you measure campaign effectiveness?',
        'What\'s your approach to target audience analysis?',
        'Describe a successful marketing campaign you\'ve run.',
        'How do you stay current with marketing trends?',
        'What tools do you use for marketing analytics?',
        'How do you optimize conversion rates?',
        'Describe your experience with digital marketing channels.'
      ],
      'Behavioral': [
        'Tell me about yourself.',
        'Describe a time when you faced a significant challenge at work.',
        'How do you handle stress and pressure?',
        'Tell me about a time when you had to work with a difficult team member.',
        'Describe a situation where you had to meet a tight deadline.',
        'How do you prioritize tasks when everything seems urgent?',
        'Tell me about a time you failed and what you learned from it.',
        'Where do you see yourself in 5 years?'
      ]
    }
    
    return questionBank[category] || questionBank['Behavioral']
  }

  const startInterview = () => {
    setIsStarted(true)
    const firstQuestion = interviewQuestions[0]
    setCurrentQuestion(firstQuestion)
    addMessage('ai', firstQuestion)
    
    if (isVoiceEnabled) {
      speakQuestion(firstQuestion)
    }
  }

  const speakQuestion = (text: string) => {
    if (!speechSynthesis.current || !isVoiceEnabled) return
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.9
    utterance.pitch = selectedVoice === 'female' ? 1.2 : 0.8
    utterance.volume = 1
    
    // Try to find a suitable voice
    const voices = speechSynthesis.current.getVoices()
    const femaleVoice = voices.find(voice => 
      voice.name.includes('Female') || voice.name.includes('Zira') || voice.name.includes('Samantha')
    )
    const maleVoice = voices.find(voice => 
      voice.name.includes('Male') || voice.name.includes('David') || voice.name.includes('Daniel')
    )
    
    if (selectedVoice === 'female' && femaleVoice) {
      utterance.voice = femaleVoice
    } else if (selectedVoice === 'male' && maleVoice) {
      utterance.voice = maleVoice
    }
    
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    
    speechSynthesis.current.speak(utterance)
  }

  const addMessage = (sender: 'user' | 'ai', content: string) => {
    const newMessage: Message = {
      id: Date.now(),
      sender,
      content,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, newMessage])
  }

  const handleSendResponse = () => {
    if (!userResponse.trim()) return
    
    addMessage('user', userResponse)
    
    // Generate AI follow-up or next question
    setTimeout(() => {
      generateFollowUp()
    }, 1500)
    
    setUserResponse('')
  }

  const generateFollowUp = () => {
    const followUps = [
      "That's interesting. Can you elaborate on that approach?",
      "What challenges did you face during that process?",
      "How would you improve that solution?",
      "What did you learn from that experience?",
      "Can you give me a specific example?",
      "How do you measure success in that context?",
      "What alternatives did you consider?",
      "How do you handle unexpected issues in such situations?"
    ]
    
    // Decide whether to ask follow-up or move to next question
    const shouldFollowUp = Math.random() > 0.4 && messages.filter(m => m.sender === 'ai').length < 3
    
    if (shouldFollowUp) {
      const followUp = followUps[Math.floor(Math.random() * followUps.length)]
      addMessage('ai', followUp)
      if (isVoiceEnabled) speakQuestion(followUp)
    } else {
      moveToNextQuestion()
    }
  }

  const moveToNextQuestion = () => {
    if (currentQuestionIndex < interviewQuestions.length - 1) {
      const nextIndex = currentQuestionIndex + 1
      const nextQuestion = interviewQuestions[nextIndex]
      setCurrentQuestionIndex(nextIndex)
      setCurrentQuestion(nextQuestion)
      addMessage('ai', nextQuestion)
      if (isVoiceEnabled) speakQuestion(nextQuestion)
    } else {
      completeInterview()
    }
  }

  const completeInterview = () => {
    setIsCompleted(true)
    const completionMessage = "Thank you for completing the interview! I'll now provide you with feedback and scoring."
    addMessage('ai', completionMessage)
    if (isVoiceEnabled) speakQuestion(completionMessage)
  }

  const toggleRecording = () => {
    if (!recognition.current) return
    
    if (isRecording) {
      recognition.current.stop()
      setIsRecording(false)
    } else {
      recognition.current.start()
      setIsRecording(true)
    }
  }

  const toggleSpeech = () => {
    if (isSpeaking && speechSynthesis.current) {
      speechSynthesis.current.cancel()
      setIsSpeaking(false)
    }
    setIsVoiceEnabled(!isVoiceEnabled)
  }

  if (!interview) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading interview...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.back()}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">{interview.title}</h1>
                <p className="text-sm text-gray-500">{interview.description}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {isStarted && <InterviewTimer duration={interview.duration} isPaused={isPaused} />}
              
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isStarted ? (
          /* Pre-Interview Setup */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
              <div className={`w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${interview.bgColor} flex items-center justify-center`}>
                <Bot className="w-12 h-12 text-gray-700" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Ready to start your {interview.title} interview?
              </h2>
              
              <p className="text-gray-600 mb-8">
                This AI-powered interview will assess your skills through dynamic questions 
                and real-time conversation. Make sure you&apos;re in a quiet environment.
              </p>

              <VoiceSelector 
                selectedVoice={selectedVoice}
                onVoiceChange={setSelectedVoice}
                isVoiceEnabled={isVoiceEnabled}
                onVoiceToggle={setIsVoiceEnabled}
              />

              <motion.button
                onClick={startInterview}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className="w-6 h-6" />
                <span>Start Interview</span>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          /* Interview Interface */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <InterviewChat 
                messages={messages}
                isCompleted={isCompleted}
              />
              
              {/* Response Input */}
              {!isCompleted && (
                <div className="mt-6">
                  <div className="bg-white rounded-xl shadow-lg p-4">
                    <div className="flex items-end space-x-4">
                      <div className="flex-1">
                        <textarea
                          value={userResponse}
                          onChange={(e) => setUserResponse(e.target.value)}
                          placeholder="Type your response here or use voice input..."
                          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                          rows={3}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault()
                              handleSendResponse()
                            }
                          }}
                        />
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        <motion.button
                          onClick={toggleRecording}
                          className={`p-3 rounded-lg transition-all duration-200 ${
                            isRecording 
                              ? 'bg-red-500 text-white' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                        </motion.button>
                        
                        <motion.button
                          onClick={handleSendResponse}
                          disabled={!userResponse.trim()}
                          className="p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Send className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Interview Controls & Info */}
            <div className="space-y-6">
              {/* Interview Progress */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Interview Progress</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Questions</span>
                      <span>{currentQuestionIndex + 1}/{interviewQuestions.length}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentQuestionIndex + 1) / interviewQuestions.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <p><strong>Category:</strong> {interview.category}</p>
                    <p><strong>Difficulty:</strong> {interview.difficulty}</p>
                    <p><strong>Duration:</strong> {interview.duration}</p>
                  </div>
                </div>
              </div>

              {/* Audio Controls */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Audio Controls</h3>
                <div className="space-y-3">
                  <button
                    onClick={toggleSpeech}
                    className={`w-full flex items-center justify-center space-x-2 p-3 rounded-lg transition-all duration-200 ${
                      isVoiceEnabled 
                        ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {isVoiceEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                    <span>{isVoiceEnabled ? 'Voice Enabled' : 'Voice Disabled'}</span>
                  </button>
                  
                  {isVoiceEnabled && (
                    <div className="text-sm text-gray-600 text-center">
                      Voice: {selectedVoice === 'female' ? '👩 Female' : '👨 Male'}
                    </div>
                  )}
                </div>
              </div>

              {/* Interview Tips */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">💡 Tips</h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>• Be specific in your answers</li>
                  <li>• Use the STAR method for behavioral questions</li>
                  <li>• Ask clarifying questions if needed</li>
                  <li>• Take your time to think before responding</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Settings Modal */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowSettings(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Interview Settings</h3>
              
              <VoiceSelector 
                selectedVoice={selectedVoice}
                onVoiceChange={setSelectedVoice}
                isVoiceEnabled={isVoiceEnabled}
                onVoiceToggle={setIsVoiceEnabled}
              />
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowSettings(false)}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}