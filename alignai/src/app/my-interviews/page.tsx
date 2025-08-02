'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Header } from '@/components/Header'
import { 
  Calendar, Clock, Star, 
  Filter, Search, Award, BarChart3,
  ChevronRight, Trophy, Target
} from 'lucide-react'

interface InterviewResult {
  id: string
  title: string
  category: string
  date: string
  duration: string
  score: number
  status: 'completed' | 'in-progress' | 'scheduled'
  difficulty: 'Easy' | 'Medium' | 'Difficult'
  feedback: string
  strengths: string[]
  improvements: string[]
}

const mockInterviewHistory: InterviewResult[] = [
  {
    id: '1',
    title: 'Software Engineering',
    category: 'Software',
    date: '2024-01-15',
    duration: '20m',
    score: 85,
    status: 'completed',
    difficulty: 'Medium',
    feedback: 'Strong technical knowledge with good problem-solving approach. Could improve on explaining thought process.',
    strengths: ['Technical depth', 'Problem solving', 'Code quality'],
    improvements: ['Communication', 'System design']
  },
  {
    id: '2',
    title: 'Data Science Interview',
    category: 'Data Science',
    date: '2024-01-12',
    duration: '30m',
    score: 78,
    status: 'completed',
    difficulty: 'Difficult',
    feedback: 'Good understanding of ML concepts. Statistical knowledge is solid but could be more precise in explanations.',
    strengths: ['ML concepts', 'Statistical knowledge', 'Python skills'],
    improvements: ['Model validation', 'Feature engineering']
  },
  {
    id: '3',
    title: 'Behavioral Interview',
    category: 'Behavioral',
    date: '2024-01-10',
    duration: '15m',
    score: 92,
    status: 'completed',
    difficulty: 'Easy',
    feedback: 'Excellent communication skills and great examples using STAR method. Very well prepared.',
    strengths: ['Communication', 'STAR method', 'Leadership examples'],
    improvements: ['Technical depth in examples']
  },
  {
    id: '4',
    title: 'System Design Interview',
    category: 'Software',
    date: '2024-01-08',
    duration: '45m',
    score: 72,
    status: 'completed',
    difficulty: 'Difficult',
    feedback: 'Good high-level understanding but missed some scalability considerations. Need to focus on trade-offs.',
    strengths: ['Architecture thinking', 'Component design'],
    improvements: ['Scalability', 'Trade-off analysis', 'Database design']
  },
  {
    id: '5',
    title: 'Marketing Strategy',
    category: 'Marketing',
    date: '2024-01-05',
    duration: '25m',
    score: 88,
    status: 'completed',
    difficulty: 'Medium',
    feedback: 'Creative approach with solid analytical thinking. Great understanding of customer segmentation.',
    strengths: ['Creativity', 'Analytics', 'Customer insight'],
    improvements: ['Budget planning', 'ROI calculations']
  }
]

export default function MyInterviewsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedInterview, setSelectedInterview] = useState<InterviewResult | null>(null)

  const filteredInterviews = mockInterviewHistory.filter(interview => {
    const matchesFilter = selectedFilter === 'all' || interview.category.toLowerCase() === selectedFilter
    const matchesSearch = interview.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         interview.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100'
    if (score >= 75) return 'text-blue-600 bg-blue-100'
    if (score >= 60) return 'text-yellow-600 bg-yellow-100'
    return 'text-red-600 bg-red-100'
  }

  const getScoreGrade = (score: number) => {
    if (score >= 90) return 'A'
    if (score >= 80) return 'B'
    if (score >= 70) return 'C'
    if (score >= 60) return 'D'
    return 'F'
  }

  const averageScore = Math.round(
    mockInterviewHistory.reduce((sum, interview) => sum + interview.score, 0) / mockInterviewHistory.length
  )

  const totalInterviews = mockInterviewHistory.length
  const completedInterviews = mockInterviewHistory.filter(i => i.status === 'completed').length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Interviews</h1>
          <p className="text-gray-600">Track your progress and review your interview performance</p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Interviews</p>
                <p className="text-2xl font-bold text-gray-900">{totalInterviews}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{completedInterviews}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-gray-900">{averageScore}%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Best Score</p>
                <p className="text-2xl font-bold text-gray-900">
                  {Math.max(...mockInterviewHistory.map(i => i.score))}%
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Award className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search interviews..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="software">Software</option>
                <option value="data science">Data Science</option>
                <option value="behavioral">Behavioral</option>
                <option value="marketing">Marketing</option>
                <option value="finance">Finance</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Interview History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Interview History</h2>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredInterviews.map((interview, index) => (
              <motion.div
                key={interview.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => setSelectedInterview(interview)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    {/* Interview Info */}
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{interview.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(interview.date).toLocaleDateString()}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{interview.duration}</span>
                        </span>
                        <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                          interview.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                          interview.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {interview.difficulty}
                        </span>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-right">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(interview.score)}`}>
                        <span className="text-lg font-bold mr-1">{getScoreGrade(interview.score)}</span>
                        <span>{interview.score}%</span>
                      </div>
                      <div className="flex items-center justify-end mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(interview.score / 20) 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <ChevronRight className="w-5 h-5 text-gray-400 ml-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interview Details Modal */}
        {selectedInterview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedInterview(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedInterview.title}</h2>
                    <p className="text-gray-600">{selectedInterview.category} • {selectedInterview.date}</p>
                  </div>
                  <div className={`px-4 py-2 rounded-full text-lg font-bold ${getScoreColor(selectedInterview.score)}`}>
                    {selectedInterview.score}%
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Feedback */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Overall Feedback</h3>
                  <p className="text-gray-700 leading-relaxed">{selectedInterview.feedback}</p>
                </div>

                {/* Strengths */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Strengths</h3>
                  <div className="space-y-2">
                    {selectedInterview.strengths.map((strength, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Areas for Improvement */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Areas for Improvement</h3>
                  <div className="space-y-2">
                    {selectedInterview.improvements.map((improvement, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-gray-700">{improvement}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4">
                  <button className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors">
                    Retake Interview
                  </button>
                  <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                    Download Report
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </main>
    </div>
  )
}