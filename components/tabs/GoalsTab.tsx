'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Check, 
  ChevronRight, 
  Sparkles,
  Clock,
  TrendingUp,
  X
} from 'lucide-react'
import Header from '../Header'

interface Goal {
  id: number
  name: string
  emoji: string
  current: number
  target: number
  color: string
  deadline?: string
  motivation?: string
  completed: boolean
}

const activeGoals: Goal[] = [
  { 
    id: 1, 
    name: 'AirPods', 
    emoji: '🎧', 
    current: 1200, 
    target: 2000, 
    color: 'bg-tint-primary',
    deadline: 'Jan 15',
    motivation: 'To listen to music while working out',
    completed: false
  },
  { 
    id: 2, 
    name: 'New Game', 
    emoji: '🎮', 
    current: 300, 
    target: 600, 
    color: 'bg-tint-secondary',
    deadline: 'Dec 1',
    motivation: 'Zelda: Tears of the Kingdom!',
    completed: false
  },
  { 
    id: 3, 
    name: 'Movie Ticket', 
    emoji: '🎬', 
    current: 80, 
    target: 150, 
    color: 'bg-[#4ECDC4]',
    deadline: 'Soon!',
    motivation: 'Watch new Marvel movie with friends',
    completed: false
  },
]

const completedGoals: Goal[] = [
  { 
    id: 4, 
    name: 'Soccer Ball', 
    emoji: '⚽', 
    current: 350, 
    target: 350, 
    color: 'bg-tint-success',
    completed: true
  },
  { 
    id: 5, 
    name: 'Gift for Mom', 
    emoji: '🎁', 
    current: 200, 
    target: 200, 
    color: 'bg-[#FF6B9D]',
    completed: true
  },
]

export default function GoalsTab() {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [showNewGoal, setShowNewGoal] = useState(false)

  return (
    <div className="tab-content bg-background-primary">
      <Header title="Saving Goals 🎯" showSettings={true} />
      
      <div className="p-4 space-y-5">
        {/* Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-3"
        >
          <div className="surface-card p-4">
            <p className="text-[12px] text-label-secondary font-medium">Total Saved</p>
            <p className="text-[24px] font-semibold text-label-primary">1 580 kr</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp size={14} className="text-tint-success" />
              <span className="text-[12px] text-tint-success font-medium">+200 kr this week</span>
            </div>
          </div>
          <div className="surface-card p-4">
            <p className="text-[12px] text-label-secondary font-medium">Active Goals</p>
            <p className="text-[24px] font-semibold text-label-primary">{activeGoals.length}</p>
            <div className="flex items-center gap-1 mt-1">
              <Sparkles size={14} className="text-tint-secondary" />
              <span className="text-[12px] text-tint-secondary font-medium">{completedGoals.length} completed</span>
            </div>
          </div>
        </motion.div>

        {/* Vippsi Tip */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="surface-card p-4 border-2 border-[#FFD93D]/30"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-tint-primary flex items-center justify-center shrink-0">
              <span className="text-lg">💡</span>
            </div>
            <div>
              <p className="font-medium text-label-primary text-[14px] tracking-[-0.15px]">Vippsi Tip!</p>
              <p className="text-[14px] text-label-secondary tracking-[-0.15px] mt-0.5">
                Save 100 kr today to stay on track with your AirPods goal! You're 60% there 🚀
              </p>
            </div>
          </div>
        </motion.div>

        {/* Active Goals */}
        <div>
          <h3 className="font-medium text-label-primary text-[18px] tracking-[-0.45px] mb-3">Active Goals</h3>
          <div className="space-y-3">
            {activeGoals.map((goal, index) => {
              const progress = (goal.current / goal.target) * 100
              return (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="surface-card p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => setSelectedGoal(goal)}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{goal.emoji}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-label-primary text-[16px] tracking-[-0.32px]">{goal.name}</h4>
                        <ChevronRight size={20} className="text-label-tertiary" />
                      </div>
                      <p className="text-[14px] text-label-secondary tracking-[-0.15px] mt-0.5">
                        {goal.current} kr / {goal.target} kr
                      </p>
                      <div className="mt-3 h-3 bg-fill-primary rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${goal.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[14px] font-medium text-tint-primary">
                          {Math.round(progress)}% complete
                        </span>
                        {goal.deadline && (
                          <span className="text-[12px] text-label-secondary flex items-center gap-1">
                            <Clock size={12} />
                            {goal.deadline}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Add New Goal Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          onClick={() => setShowNewGoal(true)}
          className="w-full surface-card p-4 flex items-center justify-center gap-3 border-2 border-dashed border-tint-primary/30 hover:bg-tint-primary/5 transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-tint-primary/10 flex items-center justify-center">
            <Plus size={24} className="text-tint-primary" />
          </div>
          <span className="font-medium text-tint-primary text-[16px]">Add New Goal</span>
        </motion.button>

        {/* Completed Goals */}
        <div>
          <h3 className="font-medium text-label-primary text-[18px] tracking-[-0.45px] mb-3 flex items-center gap-2">
            Completed Goals <Check size={18} className="text-tint-success" />
          </h3>
          <div className="space-y-3">
            {completedGoals.map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="surface-card p-4 border-2 border-tint-success/20"
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{goal.emoji}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-label-primary text-[16px] tracking-[-0.32px]">{goal.name}</h4>
                    <p className="text-[14px] text-label-secondary">{goal.target} kr saved</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-tint-success flex items-center justify-center">
                    <Check size={18} className="text-fixed-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Goal Detail Modal */}
      <AnimatePresence>
        {selectedGoal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-label-primary/30 backdrop-blur-sm z-50"
              onClick={() => setSelectedGoal(null)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 max-w-[402px] mx-auto"
            >
              <div className="bg-background-primary rounded-t-[24px] shadow-floating p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{selectedGoal.emoji}</span>
                    <h2 className="text-[20px] font-semibold text-label-primary">{selectedGoal.name}</h2>
                  </div>
                  <button 
                    onClick={() => setSelectedGoal(null)}
                    className="w-8 h-8 rounded-full bg-fill-primary flex items-center justify-center"
                  >
                    <X size={18} className="text-label-secondary" />
                  </button>
                </div>

                {/* Progress Circle */}
                <div className="flex flex-col items-center py-6">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        fill="none"
                        stroke="#f7f7f7"
                        strokeWidth="12"
                      />
                      <motion.circle
                        cx="64"
                        cy="64"
                        r="56"
                        fill="none"
                        stroke="#ff5b24"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={352}
                        initial={{ strokeDashoffset: 352 }}
                        animate={{ 
                          strokeDashoffset: 352 - (352 * selectedGoal.current / selectedGoal.target)
                        }}
                        transition={{ duration: 1 }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-[28px] font-semibold text-label-primary">
                        {Math.round((selectedGoal.current / selectedGoal.target) * 100)}%
                      </span>
                    </div>
                  </div>
                  <p className="text-[18px] font-medium text-label-primary mt-4">
                    {selectedGoal.current} kr / {selectedGoal.target} kr
                  </p>
                  <p className="text-[14px] text-label-secondary">
                    {selectedGoal.target - selectedGoal.current} kr to go
                  </p>
                </div>

                {selectedGoal.motivation && (
                  <div className="surface-card rounded-[12px] p-4 mb-4">
                    <p className="text-[12px] text-label-secondary font-medium">Motivation</p>
                    <p className="text-label-primary font-medium text-[16px]">{selectedGoal.motivation}</p>
                  </div>
                )}

                <button className="w-full py-4 bg-tint-primary text-fixed-white font-semibold rounded-[12px] hover:opacity-90 transition-opacity text-[16px]">
                  Save to This Goal
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* New Goal Modal */}
      <AnimatePresence>
        {showNewGoal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-label-primary/30 backdrop-blur-sm z-50"
              onClick={() => setShowNewGoal(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 max-w-[402px] mx-auto"
            >
              <div className="bg-background-primary rounded-t-[24px] shadow-floating p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[20px] font-semibold text-label-primary">New Saving Goal ✨</h2>
                  <button 
                    onClick={() => setShowNewGoal(false)}
                    className="w-8 h-8 rounded-full bg-fill-primary flex items-center justify-center"
                  >
                    <X size={18} className="text-label-secondary" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[14px] font-medium text-label-primary block mb-2">
                      Choose an emoji for your goal
                    </label>
                    <div className="flex gap-3 flex-wrap">
                      {['🎧', '🎮', '👟', '📱', '🎸', '⚽', '🎁', '✈️', '🎬', '📚'].map((emoji) => (
                        <button
                          key={emoji}
                          className="w-12 h-12 rounded-[12px] bg-surface-primary hover:bg-fill-primary transition-colors text-2xl"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[14px] font-medium text-label-primary block mb-2">
                      What are you saving for?
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., AirPods, new game..."
                      className="w-full px-4 py-3 rounded-[12px] border border-separator-primary bg-background-primary focus:border-tint-primary focus:ring-2 focus:ring-tint-primary/20 outline-none transition-all text-[16px]"
                    />
                  </div>

                  <div>
                    <label className="text-[14px] font-medium text-label-primary block mb-2">
                      How much do you need?
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="0"
                        className="w-full px-4 py-3 pr-12 rounded-[12px] border border-separator-primary bg-background-primary focus:border-tint-primary focus:ring-2 focus:ring-tint-primary/20 outline-none transition-all text-[16px]"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-label-secondary font-medium">kr</span>
                    </div>
                  </div>

                  <button className="w-full py-4 bg-tint-primary text-fixed-white font-semibold rounded-[12px] hover:opacity-90 transition-opacity mt-4 text-[16px]">
                    Create Goal 🎯
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
