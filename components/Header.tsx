'use client'

import { Bell, Settings } from 'lucide-react'
import { motion } from 'framer-motion'

interface HeaderProps {
  title: string
  showNotification?: boolean
  showSettings?: boolean
  greeting?: string
}

export default function Header({ title, showNotification = false, showSettings = false, greeting }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 glass px-4 py-4 border-b border-white/20">
      <div className="flex items-center justify-between">
        <div>
          {greeting && (
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-gray-500 font-medium"
            >
              {greeting}
            </motion.p>
          )}
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold text-vipps-dark"
          >
            {title}
          </motion.h1>
        </div>
        
        <div className="flex items-center gap-3">
          {showNotification && (
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="relative w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center"
            >
              <Bell size={20} className="text-gray-600" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-vipps-orange rounded-full border-2 border-white" />
            </motion.button>
          )}
          {showSettings && (
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center"
            >
              <Settings size={20} className="text-gray-600" />
            </motion.button>
          )}
        </div>
      </div>
    </header>
  )
}

