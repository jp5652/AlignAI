'use client'

import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'

interface VoiceSelectorProps {
  selectedVoice: 'male' | 'female'
  onVoiceChange: (voice: 'male' | 'female') => void
  isVoiceEnabled: boolean
  onVoiceToggle: (enabled: boolean) => void
}

export function VoiceSelector({ 
  selectedVoice, 
  onVoiceChange, 
  isVoiceEnabled, 
  onVoiceToggle 
}: VoiceSelectorProps) {
  return (
    <div className="space-y-6 mb-8">
      {/* Voice Enable/Disable */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-3">
          {isVoiceEnabled ? (
            <Volume2 className="w-5 h-5 text-green-600" />
          ) : (
            <VolumeX className="w-5 h-5 text-gray-400" />
          )}
          <div>
            <h3 className="font-medium text-gray-900">Voice Interview</h3>
            <p className="text-sm text-gray-600">
              {isVoiceEnabled ? 'AI will speak questions aloud' : 'Text-only interview'}
            </p>
          </div>
        </div>
        
        <motion.button
          onClick={() => onVoiceToggle(!isVoiceEnabled)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            isVoiceEnabled ? 'bg-indigo-600' : 'bg-gray-300'
          }`}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
            animate={{ x: isVoiceEnabled ? 26 : 2 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </motion.button>
      </div>

      {/* Voice Selection */}
      {isVoiceEnabled && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-3"
        >
          <h4 className="font-medium text-gray-900">Select Voice</h4>
          <div className="grid grid-cols-2 gap-3">
            {/* Female Voice */}
            <motion.button
              onClick={() => onVoiceChange('female')}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedVoice === 'female'
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">👩</div>
                <div className="font-medium">Female</div>
                <div className="text-sm opacity-75">Natural, professional</div>
              </div>
            </motion.button>

            {/* Male Voice */}
            <motion.button
              onClick={() => onVoiceChange('male')}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedVoice === 'male'
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <div className="text-2xl mb-2">👨</div>
                <div className="font-medium">Male</div>
                <div className="text-sm opacity-75">Clear, authoritative</div>
              </div>
            </motion.button>
          </div>

          {/* Test Voice Button */}
          <motion.button
            onClick={() => {
              if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(
                  'Hello! This is how I will sound during your interview. Good luck!'
                )
                utterance.pitch = selectedVoice === 'female' ? 1.2 : 0.8
                utterance.rate = 0.9
                
                const voices = speechSynthesis.getVoices()
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
                
                speechSynthesis.speak(utterance)
              }
            }}
            className="w-full py-2 px-4 text-sm text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            🔊 Test Voice
          </motion.button>
        </motion.div>
      )}
    </div>
  )
}