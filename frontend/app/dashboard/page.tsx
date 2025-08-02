'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Clock, 
  TrendingUp, 
  User, 
  LogOut,
  Settings,
  History,
  Play,
  Share2,
  Star,
  Calendar
} from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'

interface InterviewTemplate {
  id: number
  subcategory: string
  title: string
  description: string
  duration: number
  difficulty: string
}

interface InterviewHistory {
  id: number
  title: string
  category: string
  subcategory: string
  status: string
  score: number | null
  duration: number
  difficulty: string
  started_at: string | null
  completed_at: string | null
  created_at: string
}

const categories = [
  { name: 'Software', icon: '💻', color: 'bg-blue-500', count: 25 },
  { name: 'Data Science', icon: '📊', color: 'bg-purple-500', count: 18 },
  { name: 'Finance', icon: '💰', color: 'bg-green-500', count: 15 },
  { name: 'Product', icon: '🎯', color: 'bg-orange-500', count: 12 },
  { name: 'Business', icon: '🏢', color: 'bg-indigo-500', count: 20 },
  { name: 'Consulting', icon: '🤝', color: 'bg-teal-500', count: 14 },
  { name: 'Writing', icon: '✍️', color: 'bg-pink-500', count: 8 },
  { name: 'Design', icon: '🎨', color: 'bg-red-500', count: 10 },
  { name: 'Legal', icon: '⚖️', color: 'bg-gray-500', count: 6 },
  { name: 'Media', icon: '📺', color: 'bg-yellow-500', count: 9 },
  { name: 'Engineering', icon: '⚙️', color: 'bg-cyan-500', count: 22 },
  { name: 'Statistics', icon: '📈', color: 'bg-emerald-500', count: 11 },
  { name: 'Marketing', icon: '📢', color: 'bg-rose-500', count: 13 },
  { name: 'Biology', icon: '🧬', color: 'bg-lime-500', count: 7 },
  { name: 'Security', icon: '🔒', color: 'bg-slate-500', count: 16 },
  { name: 'Blockchain', icon: '⛓️', color: 'bg-amber-500', count: 5 },
]

const popularInterviews = [
  {
    id: 1,
    title: 'Software Engineering',
    subtitle: 'New Grad E3: Technical interview #1',
    duration: 20,
    difficulty: 'Medium',
    category: 'Software'
  },
  {
    id: 2,
    title: 'Consulting Case Interview',
    subtitle: 'Help a client analyze the launch of a new sports beverage',
    duration: 20,
    difficulty: 'Medium',
    category: 'Consulting'
  },
  {
    id: 3,
    title: 'Stacks vs Queues',
    subtitle: 'Learn the FIFO and LIFO flows',
    duration: 5,
    difficulty: 'Medium',
    category: 'Software'
  },
  {
    id: 4,
    title: 'Working Capital Case',
    subtitle: 'Explain the dynamics of working capital',
    duration: 5,
    difficulty: 'Medium',
    category: 'Finance'
  }
]

export default function DashboardPage() {
  const { user, logout, isAuthenticated } = useAuth()
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [interviewHistory, setInterviewHistory] = useState<InterviewHistory[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }
    loadInterviewHistory()
  }, [isAuthenticated])

  const loadInterviewHistory = async () => {
    try {
      const response = await axios.get('/api/ai-interview/history')
      setInterviewHistory(response.data.interviews)
    } catch (error) {
      console.error('Failed to load interview history:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    logout()
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="flex items-center space-x-2">
                <Brain className="w-8 h-8 text-primary-600" />
                <span className="text-2xl font-bold text-gradient">AlignAI</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700 font-medium">{user?.full_name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.full_name}!
          </h1>
          <p className="text-gray-600">
            Ready to practice your interview skills? Choose from our comprehensive collection of AI-powered interviews.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Play className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Interviews</p>
                <p className="text-2xl font-bold text-gray-900">{interviewHistory.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Score</p>
                <p className="text-2xl font-bold text-gray-900">
                  {interviewHistory.length > 0 
                    ? Math.round(interviewHistory.reduce((acc, int) => acc + (int.score || 0), 0) / interviewHistory.length)
                    : 0
                  }
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="card"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Week</p>
                <p className="text-2xl font-bold text-gray-900">
                  {interviewHistory.filter(int => {
                    const weekAgo = new Date()
                    weekAgo.setDate(weekAgo.getDate() - 7)
                    return new Date(int.created_at) > weekAgo
                  }).length}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="card"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Interview Categories */}
        <div className="mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold text-gray-900 mb-6"
          >
            Interview Categories
          </motion.h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="card text-center cursor-pointer group hover:shadow-lg transition-all duration-200"
                onClick={() => setSelectedCategory(category.name)}
              >
                <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mx-auto mb-3 text-2xl`}>
                  {category.icon}
                </div>
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{category.count} interviews</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Popular Interviews */}
        <div className="mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl font-bold text-gray-900 mb-6"
          >
            Popular Interviews
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularInterviews.map((interview, index) => (
              <motion.div
                key={interview.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    interview.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    interview.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {interview.difficulty}
                  </span>
                  <div className="flex items-center space-x-2 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{interview.duration}m</span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-1">{interview.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{interview.subtitle}</p>
                
                <div className="flex items-center justify-between">
                  <button className="btn-primary text-sm py-2 px-4">
                    Start Interview
                  </button>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Interviews */}
        {interviewHistory.length > 0 && (
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold text-gray-900 mb-6"
            >
              Recent Interviews
            </motion.h2>
            
            <div className="card">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Interview</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Category</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Score</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {interviewHistory.slice(0, 5).map((interview) => (
                      <tr key={interview.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium text-gray-900">{interview.title}</p>
                            <p className="text-sm text-gray-500">{interview.subcategory}</p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {interview.category}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            interview.status === 'completed' ? 'bg-green-100 text-green-800' :
                            interview.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {interview.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {interview.score ? (
                            <span className="font-medium text-gray-900">{interview.score}/10</span>
                          ) : (
                            <span className="text-gray-400">-</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-500">
                          {new Date(interview.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}