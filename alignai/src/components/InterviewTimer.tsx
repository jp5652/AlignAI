'use client'

import { useState, useEffect } from 'react'
import { Clock } from 'lucide-react'

interface InterviewTimerProps {
  duration: string // e.g., "20m", "45m"
  isPaused: boolean
}

export function InterviewTimer({ duration, isPaused }: InterviewTimerProps) {
  const [timeLeft, setTimeLeft] = useState(0)
  const [totalTime, setTotalTime] = useState(0)

  useEffect(() => {
    // Parse duration string (e.g., "20m" -> 1200 seconds)
    const durationInMinutes = parseInt(duration.replace('m', ''))
    const durationInSeconds = durationInMinutes * 60
    setTotalTime(durationInSeconds)
    setTimeLeft(durationInSeconds)
  }, [duration])

  useEffect(() => {
    if (isPaused || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          // Timer finished
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isPaused, timeLeft])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const getProgressPercentage = () => {
    if (totalTime === 0) return 0
    return ((totalTime - timeLeft) / totalTime) * 100
  }

  const getTimerColor = () => {
    const percentage = (timeLeft / totalTime) * 100
    if (percentage <= 10) return 'text-red-600'
    if (percentage <= 25) return 'text-yellow-600'
    return 'text-green-600'
  }

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2">
        <Clock className="w-4 h-4 text-gray-500" />
        <span className={`font-mono text-sm font-medium ${getTimerColor()}`}>
          {formatTime(timeLeft)}
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-green-500 to-red-500 transition-all duration-1000 ease-linear"
          style={{ width: `${getProgressPercentage()}%` }}
        />
      </div>
      
      {/* Time Status */}
      <span className="text-xs text-gray-500">
        {isPaused ? 'Paused' : 'Running'}
      </span>
    </div>
  )
}