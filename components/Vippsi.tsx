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
      "Remember: Every penny counts!",
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
      "Collect more points to unlock new Vippsi styles! ✨",
    ],
    me: [
      "Here you can customize me! 🎨",
      "Your parents can also see your progress here.",
      "Ask me anything about money!",
    ],
  }

  const suggestions = [
    { icon: Lightbulb, text: "Give me a saving tip", color: "from-yellow-400 to-orange-400" },
    { icon: TrendingUp, text: "How am I doing?", color: "from-green-400 to-teal-400" },
    { icon: Calendar, text: "My Year in Vippsi", color: "from-purple-400 to-pink-400" },
    { icon: MessageCircle, text: "Explain something", color: "from-blue-400 to-cyan-400" },
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
        className="fixed bottom-24 right-4 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-vipps-orange to-vipps-coral shadow-lg vippsi-glow flex items-center justify-center"
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
        {/* Vippsi Face */}
        <div className="relative w-12 h-12">
          {/* Eyes */}
          <motion.div 
            className="absolute top-3 left-2 w-2.5 h-2.5 bg-white rounded-full"
            animate={isHappy ? { scaleY: 0.3 } : { scaleY: 1 }}
          />
          <motion.div 
            className="absolute top-3 right-2 w-2.5 h-2.5 bg-white rounded-full"
            animate={isHappy ? { scaleY: 0.3 } : { scaleY: 1 }}
          />
          {/* Pupils */}
          <div className="absolute top-3.5 left-2.5 w-1.5 h-1.5 bg-vipps-dark rounded-full" />
          <div className="absolute top-3.5 right-2.5 w-1.5 h-1.5 bg-vipps-dark rounded-full" />
          {/* Mouth */}
          <motion.div 
            className="absolute bottom-3 left-1/2 -translate-x-1/2 w-4 h-2 border-b-2 border-white rounded-b-full"
            animate={isHappy ? { scaleY: 1.5, scaleX: 1.2 } : { scaleY: 1, scaleX: 1 }}
          />
          {/* Sparkle */}
          <motion.div
            className="absolute -top-1 -right-1"
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Sparkles size={12} className="text-yellow-300" />
          </motion.div>
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
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Panel */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 max-w-[430px] mx-auto"
            >
              <div className="bg-white rounded-t-3xl shadow-2xl p-6 max-h-[80vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    {/* Mini Vippsi */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-vipps-orange to-vipps-coral flex items-center justify-center">
                      <div className="relative w-8 h-8">
                        <div className="absolute top-2 left-1 w-1.5 h-1.5 bg-white rounded-full" />
                        <div className="absolute top-2 right-1 w-1.5 h-1.5 bg-white rounded-full" />
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-3 h-1.5 border-b-2 border-white rounded-b-full" />
                      </div>
                    </div>
                    <div>
                      <h2 className="font-bold text-lg text-vipps-dark">Hey! I'm Vippsi 👋</h2>
                      <p className="text-sm text-gray-500">Your personal money helper</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <X size={18} className="text-gray-500" />
                  </button>
                </div>

                {/* Current Tip */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-vipps-cream to-white p-4 rounded-2xl border border-vipps-peach/30 mb-6"
                >
                  <p className="text-vipps-dark font-medium">
                    {tip || currentTips[Math.floor(Math.random() * currentTips.length)]}
                  </p>
                </motion.div>

                {/* Quick Actions */}
                <h3 className="font-semibold text-gray-700 mb-3">How can I help you?</h3>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {suggestions.map((suggestion, index) => {
                    const Icon = suggestion.icon
                    return (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-2xl bg-gradient-to-br text-white font-medium text-sm flex flex-col items-center gap-2 hover:scale-105 transition-transform"
                        style={{
                          backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${suggestion.color} flex items-center justify-center`}>
                          <Icon size={20} className="text-white" />
                        </div>
                        <span className="text-vipps-dark text-center">{suggestion.text}</span>
                      </motion.button>
                    )
                  })}
                </div>

                {/* Year in Vippsi Preview */}
                <div className="bg-gradient-to-r from-vipps-purple/10 to-vipps-pink/10 p-4 rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="text-vipps-purple" size={18} />
                    <span className="font-semibold text-vipps-dark">Your Year with Vippsi</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">See your personalized summary of the year!</p>
                  <button className="w-full py-3 bg-gradient-to-r from-vipps-purple to-vipps-pink text-white font-semibold rounded-xl hover:opacity-90 transition-opacity">
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
