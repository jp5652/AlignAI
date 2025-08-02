'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Mic, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Play,
  Clock,
  Star
} from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

const categories = [
  { name: 'Software', icon: '💻', color: 'bg-blue-500' },
  { name: 'Data Science', icon: '📊', color: 'bg-purple-500' },
  { name: 'Finance', icon: '💰', color: 'bg-green-500' },
  { name: 'Product', icon: '🎯', color: 'bg-orange-500' },
  { name: 'Business', icon: '🏢', color: 'bg-indigo-500' },
  { name: 'Consulting', icon: '🤝', color: 'bg-teal-500' },
  { name: 'Writing', icon: '✍️', color: 'bg-pink-500' },
  { name: 'Design', icon: '🎨', color: 'bg-red-500' },
  { name: 'Legal', icon: '⚖️', color: 'bg-gray-500' },
  { name: 'Media', icon: '📺', color: 'bg-yellow-500' },
  { name: 'Engineering', icon: '⚙️', color: 'bg-cyan-500' },
  { name: 'Statistics', icon: '📈', color: 'bg-emerald-500' },
  { name: 'Marketing', icon: '📢', color: 'bg-rose-500' },
  { name: 'Biology', icon: '🧬', color: 'bg-lime-500' },
  { name: 'Security', icon: '🔒', color: 'bg-slate-500' },
  { name: 'Blockchain', icon: '⛓️', color: 'bg-amber-500' },
]

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Interviews',
    description: 'Practice with intelligent AI interviewers that adapt to your responses'
  },
  {
    icon: Mic,
    title: 'Voice & Text Support',
    description: 'Choose between voice or text-based interviews with male/female AI voices'
  },
  {
    icon: Users,
    title: 'Real-time Feedback',
    description: 'Get instant feedback on your performance and areas for improvement'
  },
  {
    icon: TrendingUp,
    title: 'Performance Analytics',
    description: 'Track your progress with detailed analytics and performance trends'
  }
]

export default function HomePage() {
  const { user, isAuthenticated } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Your perfect interview starts here
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Practice with 100+ expert-vetted interviews, get feedback on your performance, 
              and land your dream opportunity.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {isAuthenticated ? (
                <Link href="/dashboard" className="btn-primary text-lg px-8 py-3 flex items-center justify-center">
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              ) : (
                <>
                  <Link href="/auth/login" className="btn-primary text-lg px-8 py-3">
                    Get Started
                  </Link>
                  <Link href="/auth/register" className="btn-secondary text-lg px-8 py-3">
                    Sign Up Free
                  </Link>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose AlignAI?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of interview preparation with our cutting-edge AI technology
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="card text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Explore Interview Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose from a wide range of interview types tailored to your career goals
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                className="card text-center cursor-pointer group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                onClick={() => setSelectedCategory(category.name)}
              >
                <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mx-auto mb-3 text-2xl`}>
                  {category.icon}
                </div>
                <h3 className="text-sm font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                  {category.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to ace your next interview?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of professionals who have improved their interview skills with AlignAI
            </p>
            <Link href="/auth/register" className="bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg text-lg hover:bg-gray-100 transition-colors">
              Start Practicing Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}