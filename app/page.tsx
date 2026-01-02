'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import BottomNav from '@/components/BottomNav'
import Vippsi from '@/components/Vippsi'
import HomeTab from '@/components/tabs/HomeTab'
import GoalsTab from '@/components/tabs/GoalsTab'
import InsightsTab from '@/components/tabs/InsightsTab'
import LearnTab from '@/components/tabs/LearnTab'
import RewardsTab from '@/components/tabs/RewardsTab'
import MeTab from '@/components/tabs/MeTab'

const tabs = {
  home: HomeTab,
  goals: GoalsTab,
  insights: InsightsTab,
  learn: LearnTab,
  rewards: RewardsTab,
  me: MeTab,
}

const contextualTips: Record<string, string> = {
  home: "Welcome back! Check out your chores to earn some money! 💪",
  goals: "Goals + Earn in one place! Complete chores to fund your dreams faster! 🚀",
  insights: "Let me show you how you spend your money - knowledge is power! 📊",
  learn: "Learning makes you smarter with money! Share your progress with family! 📚",
  rewards: "Wow, look at all your rewards! You're doing great! 🏆",
  me: "Check what you've shared with family and customize your profile! ✨",
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('home')
  
  const ActiveTabComponent = tabs[activeTab as keyof typeof tabs]

  return (
    <main className="relative min-h-screen bg-background-primary">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <ActiveTabComponent />
        </motion.div>
      </AnimatePresence>
      
      <Vippsi 
        context={activeTab} 
        tip={contextualTips[activeTab]}
      />
      
      <BottomNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
    </main>
  )
}
