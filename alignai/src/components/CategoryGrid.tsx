'use client'

import { motion } from 'framer-motion'
import { 
  Code, Database, TrendingUp, Package, Briefcase, 
  Users, PenTool, Palette, Scale, Camera, 
  Cpu, BarChart3, Megaphone, Microscope, Shield,
  Link as ChainLink
} from 'lucide-react'

const categories = [
  { name: 'Software', icon: Code, color: 'from-blue-500 to-cyan-500' },
  { name: 'Data science', icon: Database, color: 'from-emerald-500 to-teal-500' },
  { name: 'Finance', icon: TrendingUp, color: 'from-green-500 to-emerald-500' },
  { name: 'Product', icon: Package, color: 'from-purple-500 to-indigo-500' },
  { name: 'Business', icon: Briefcase, color: 'from-orange-500 to-red-500' },
  { name: 'Consulting', icon: Users, color: 'from-pink-500 to-rose-500' },
  { name: 'Writing', icon: PenTool, color: 'from-yellow-500 to-orange-500' },
  { name: 'Design', icon: Palette, color: 'from-indigo-500 to-purple-500' },
  { name: 'Legal', icon: Scale, color: 'from-gray-500 to-slate-500' },
  { name: 'Media', icon: Camera, color: 'from-red-500 to-pink-500' },
  { name: 'Engineering', icon: Cpu, color: 'from-blue-500 to-indigo-500' },
  { name: 'Statistics', icon: BarChart3, color: 'from-cyan-500 to-blue-500' },
  { name: 'Marketing', icon: Megaphone, color: 'from-pink-500 to-purple-500' },
  { name: 'Biology', icon: Microscope, color: 'from-green-500 to-lime-500' },
  { name: 'Security', icon: Shield, color: 'from-slate-500 to-gray-500' },
  { name: 'Blockchain', icon: ChainLink, color: 'from-yellow-500 to-amber-500' },
]

export function CategoryGrid() {
  return (
    <div className="flex flex-wrap justify-center gap-6 py-8">
      {categories.map((category, index) => {
        const Icon = category.icon
        return (
          <motion.button
            key={category.name}
            className="group flex flex-col items-center space-y-3 p-4 rounded-xl transition-all duration-300 hover:bg-white/50 hover:shadow-lg"
            whileHover={{ 
              scale: 1.1,
              y: -5,
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: index * 0.05,
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
          >
            <motion.div 
              className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}
              whileHover={{ 
                rotateY: 180,
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
              }}
              transition={{ duration: 0.6 }}
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
              {category.name}
            </span>
          </motion.button>
        )
      })}
    </div>
  )
}