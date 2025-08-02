'use client'

import { motion } from 'framer-motion'
import { Clock, Share2, Play } from 'lucide-react'
import { Interview } from '@/data/interviews'
import Link from 'next/link'

interface InterviewCardProps {
  interview: Interview
  index: number
}

export function InterviewCard({ interview, index }: InterviewCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'Difficult':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      whileHover={{ 
        scale: 1.02,
        y: -8,
        transition: { duration: 0.2 }
      }}
    >
      <div className={`relative bg-gradient-to-br ${interview.bgColor} rounded-2xl p-6 h-full border border-white/50 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4 w-32 h-32 rounded-full bg-white/20"></div>
          <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full bg-white/10"></div>
        </div>

        {/* AI Logo */}
        <motion.div 
          className="relative z-10 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg"
          whileHover={{ rotateY: 180 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-white font-bold text-lg">A</span>
        </motion.div>

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
              {interview.title}
            </h3>
            <p className="text-sm text-gray-600 mb-4 line-clamp-2 group-hover:text-gray-500 transition-colors">
              {interview.description}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{interview.duration}</span>
              </div>
              <span className={`px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(interview.difficulty)}`}>
                {interview.difficulty}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-4 space-x-2">
            <Link 
              href={`/interview/${interview.id}`}
              className="flex-1"
            >
              <motion.button
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className="w-4 h-4" />
                <span>Start interview</span>
              </motion.button>
            </Link>
            
            <motion.button
              className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-white/50 rounded-lg transition-all duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
          initial={false}
        />
      </div>
    </motion.div>
  )
}