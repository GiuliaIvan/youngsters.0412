'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, MessageCircle, Lightbulb, Calendar, TrendingUp } from 'lucide-react'

interface VippsiProps {
  context?: string
  tip?: string
}

export default function Vippsi({ context = 'home', tip }: VippsiProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isHappy, setIsHappy] = useState(false)

  const contextualTips: Record<string, string[]> = {
    home: [
      "Hey! 👋 I'm Vippsi, your money helper!",
      "Did you know? People who set goals save 3x more! 🎯",
      "Tip: Start with a small goal first, it makes it easier!",
    ],
    goals: [
      "Great job on your saving goals! 🌟",
      "Tip: Break big goals into smaller milestones - it feels easier!",
      "Remember: Every krone counts!",
    ],
    insights: [
      "Let's look at your money! 📊",
      "You spend most on snacks - maybe save a little there? 🍿",
      "Cool! You saved more this week than last! 🎉",
    ],
    learn: [
      "Learning time! 📚 The more you learn, the smarter you get with money!",
      "Keep your streak going! You're doing great! 🔥",
      "Did you know? Warren Buffett started saving when he was 11!",
    ],
    rewards: [
      "Wow, look at all your badges! 🏆",
      "You're almost at your next reward!",
      "Collect more XP to unlock new Vippsi styles! ✨",
    ],
    me: [
      "Here you can customize me! 🎨",
      "Your parents can also see your progress here.",
      "Ask me anything about money!",
    ],
  }

  const suggestions = [
    { icon: Lightbulb, text: "Give me a saving tip", color: "bg-[#FFD93D]" },
    { icon: TrendingUp, text: "How am I doing?", color: "bg-tint-success" },
    { icon: Calendar, text: "My Year in Vippsi", color: "bg-tint-secondary" },
    { icon: MessageCircle, text: "Explain something", color: "bg-[#4ECDC4]" },
  ]

  const currentTips = contextualTips[context] || contextualTips.home

  return (
    <>
      {/* Floating Vippsi Avatar */}
      <motion.button
        onClick={() => {
          setIsOpen(true)
          setIsHappy(true)
          setTimeout(() => setIsHappy(false), 1000)
        }}
        className="fixed bottom-24 right-4 z-50 w-16 h-16 rounded-full shadow-floating flex items-center justify-center overflow-hidden bg-white border-2 border-tint-primary/20"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{ 
          y: [0, -8, 0],
        }}
        transition={{
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/Vippsi.png"
          alt="Vippsi"
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to emoji if image not found
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling?.classList.remove('hidden');
          }}
        />
        <div className="hidden w-full h-full bg-tint-primary rounded-full flex items-center justify-center">
          <span className="text-2xl">🧡</span>
        </div>
      </motion.button>

      {/* AI Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-label-primary/30 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Panel */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 max-w-[402px] mx-auto"
            >
              <div className="bg-background-primary rounded-t-[24px] shadow-floating p-6 max-h-[80vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    {/* Mini Vippsi with image */}
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-white shadow-sm border border-tint-primary/20">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/Vippsi.png"
                        alt="Vippsi"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="font-semibold text-[18px] text-label-primary">Hey! I'm Vippsi 👋</h2>
                      <p className="text-[14px] text-label-secondary">Your personal money helper</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full bg-fill-primary flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <X size={18} className="text-label-secondary" />
                  </button>
                </div>

                {/* Current Tip */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="surface-card p-4 rounded-[12px] border-2 border-tint-primary/20 mb-6"
                >
                  <p className="text-label-primary font-medium text-[16px]">
                    {tip || currentTips[Math.floor(Math.random() * currentTips.length)]}
                  </p>
                </motion.div>

                {/* Quick Actions */}
                <h3 className="font-medium text-label-primary text-[16px] mb-3">How can I help you?</h3>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {suggestions.map((suggestion, index) => {
                    const Icon = suggestion.icon
                    return (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="surface-card p-4 rounded-[12px] flex flex-col items-center gap-2 hover:bg-gray-100 transition-colors"
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className={`w-10 h-10 rounded-full ${suggestion.color} flex items-center justify-center`}>
                          <Icon size={20} className="text-fixed-white" />
                        </div>
                        <span className="text-label-primary text-[14px] text-center font-medium">{suggestion.text}</span>
                      </motion.button>
                    )
                  })}
                </div>

                {/* Year in Vippsi Preview */}
                <div className="surface-card p-4 rounded-[12px] border-2 border-tint-secondary/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="text-tint-secondary" size={18} />
                    <span className="font-medium text-label-primary text-[16px]">Your Year with Vippsi</span>
                  </div>
                  <p className="text-[14px] text-label-secondary mb-3">See your personalized summary of the year!</p>
                  <button className="w-full py-3 bg-tint-secondary text-fixed-white font-medium rounded-[12px] hover:opacity-90 transition-opacity text-[16px]">
                    View Summary ✨
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
