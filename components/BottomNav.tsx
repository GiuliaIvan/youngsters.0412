'use client'

import { Home, Target, PieChart, BookOpen, Trophy, User } from 'lucide-react'
import { motion } from 'framer-motion'

interface BottomNavProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const tabs = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'goals', label: 'Goals', icon: Target },
  { id: 'insights', label: 'Insights', icon: PieChart },
  { id: 'learn', label: 'Learn', icon: BookOpen },
  { id: 'rewards', label: 'Rewards', icon: Trophy },
  { id: 'me', label: 'Me', icon: User },
]

export default function BottomNav({ activeTab, setActiveTab }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40">
      <div className="max-w-[402px] mx-auto">
        <div className="tab-bar-material border-t border-separator-primary px-2 py-2 pb-6">
          <div className="flex justify-around items-center">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex flex-col items-center gap-1 px-2 py-1 relative"
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon 
                    size={20} 
                    className={`transition-colors ${
                      isActive ? 'text-tint-primary' : 'text-label-disabled'
                    }`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span className={`text-[10px] font-medium transition-colors ${
                    isActive ? 'text-tint-primary' : 'text-label-disabled'
                  }`}>
                    {tab.label}
                  </span>
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
