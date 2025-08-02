'use client'

import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export function Header() {
  const [isLoggedIn] = useState(false)

  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">AlignAI</h1>
              <p className="text-xs text-gray-500">By mercor.com</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-gray-900 transition-colors">
              Interviews
            </Link>
            <Link href="/my-interviews" className="text-gray-700 hover:text-gray-900 transition-colors">
              My interviews
            </Link>
          </nav>

          {/* User Profile */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            {isLoggedIn ? (
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link 
                  href="/login"
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  href="/register"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </header>
  )
}