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
    current: 120, 
    target: 200, 
    color: 'from-vipps-orange to-vipps-coral',
    deadline: 'Jan 15',
    motivation: 'To listen to music while working out',
    completed: false
  },
  { 
    id: 2, 
    name: 'New Game', 
    emoji: '🎮', 
    current: 30, 
    target: 60, 
    color: 'from-vipps-purple to-vipps-pink',
    deadline: 'Dec 1',
    motivation: 'Zelda: Tears of the Kingdom!',
    completed: false
  },
  { 
    id: 3, 
    name: 'Movie Ticket', 
    emoji: '🎬', 
    current: 8, 
    target: 15, 
    color: 'from-blue-400 to-cyan-400',
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
    current: 35, 
    target: 35, 
    color: 'from-green-400 to-emerald-400',
    completed: true
  },
  { 
    id: 5, 
    name: 'Gift for Mom', 
    emoji: '🎁', 
    current: 20, 
    target: 20, 
    color: 'from-pink-400 to-rose-400',
    completed: true
  },
]

export default function GoalsTab() {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null)
  const [showNewGoal, setShowNewGoal] = useState(false)

  return (
    <div className="tab-content">
      <Header title="Saving Goals 🎯" showSettings={true} />
      
      <div className="p-4 space-y-5">
        {/* Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-3"
        >
          <div className="card p-4 bg-gradient-to-br from-vipps-cream to-white">
            <p className="text-xs text-gray-500 font-medium">Total Saved</p>
            <p className="text-2xl font-bold text-vipps-dark">$158</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp size={14} className="text-green-500" />
              <span className="text-xs text-green-500 font-semibold">+$20 this week</span>
            </div>
          </div>
          <div className="card p-4 bg-gradient-to-br from-vipps-purple/10 to-white">
            <p className="text-xs text-gray-500 font-medium">Active Goals</p>
            <p className="text-2xl font-bold text-vipps-dark">{activeGoals.length}</p>
            <div className="flex items-center gap-1 mt-1">
              <Sparkles size={14} className="text-vipps-purple" />
              <span className="text-xs text-vipps-purple font-semibold">{completedGoals.length} completed</span>
            </div>
          </div>
        </motion.div>

        {/* Vippsi Tip */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200/50"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-vipps-orange to-vipps-coral flex items-center justify-center shrink-0">
              <span className="text-lg">💡</span>
            </div>
            <div>
              <p className="font-semibold text-vipps-dark text-sm">Vippsi Tip!</p>
              <p className="text-sm text-gray-600 mt-0.5">
                Save $10 today to stay on track with your AirPods goal! You're 60% there 🚀
              </p>
            </div>
          </div>
        </motion.div>

        {/* Active Goals */}
        <div>
          <h3 className="font-bold text-vipps-dark mb-3">Active Goals</h3>
          <div className="space-y-3">
            {activeGoals.map((goal, index) => {
              const progress = (goal.current / goal.target) * 100
              return (
                <motion.div
                  key={goal.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="card p-4 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedGoal(goal)}
                >
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{goal.emoji}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-bold text-vipps-dark">{goal.name}</h4>
                        <ChevronRight size={20} className="text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-500 mt-0.5">
                        ${goal.current} / ${goal.target}
                      </p>
                      <div className="mt-3 h-3 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${goal.color}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                        />
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-semibold text-vipps-orange">
                          {Math.round(progress)}% complete
                        </span>
                        {goal.deadline && (
                          <span className="text-xs text-gray-400 flex items-center gap-1">
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
          className="w-full card p-4 flex items-center justify-center gap-3 border-2 border-dashed border-vipps-orange/30 bg-vipps-cream/30 hover:bg-vipps-cream transition-colors"
        >
          <div className="w-10 h-10 rounded-full bg-vipps-orange/10 flex items-center justify-center">
            <Plus size={24} className="text-vipps-orange" />
          </div>
          <span className="font-semibold text-vipps-orange">Add New Goal</span>
        </motion.button>

        {/* Completed Goals */}
        <div>
          <h3 className="font-bold text-vipps-dark mb-3 flex items-center gap-2">
            Completed Goals <Check size={18} className="text-green-500" />
          </h3>
          <div className="space-y-3">
            {completedGoals.map((goal, index) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="card p-4 bg-green-50/50 border border-green-200/50"
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{goal.emoji}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-vipps-dark">{goal.name}</h4>
                    <p className="text-sm text-gray-500">${goal.target} saved</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                    <Check size={18} className="text-white" />
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
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
              onClick={() => setSelectedGoal(null)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 max-w-[430px] mx-auto"
            >
              <div className="bg-white rounded-t-3xl shadow-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{selectedGoal.emoji}</span>
                    <h2 className="text-xl font-bold text-vipps-dark">{selectedGoal.name}</h2>
                  </div>
                  <button 
                    onClick={() => setSelectedGoal(null)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                  >
                    <X size={18} className="text-gray-500" />
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
                        stroke="#f3f4f6"
                        strokeWidth="12"
                      />
                      <motion.circle
                        cx="64"
                        cy="64"
                        r="56"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={352}
                        initial={{ strokeDashoffset: 352 }}
                        animate={{ 
                          strokeDashoffset: 352 - (352 * selectedGoal.current / selectedGoal.target)
                        }}
                        transition={{ duration: 1 }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#FF5B24" />
                          <stop offset="100%" stopColor="#FF7B54" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-vipps-dark">
                        {Math.round((selectedGoal.current / selectedGoal.target) * 100)}%
                      </span>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-vipps-dark mt-4">
                    ${selectedGoal.current} / ${selectedGoal.target}
                  </p>
                  <p className="text-sm text-gray-500">
                    ${selectedGoal.target - selectedGoal.current} to go
                  </p>
                </div>

                {selectedGoal.motivation && (
                  <div className="bg-vipps-cream/50 rounded-xl p-4 mb-4">
                    <p className="text-sm text-gray-500 font-medium">Motivation</p>
                    <p className="text-vipps-dark font-semibold">{selectedGoal.motivation}</p>
                  </div>
                )}

                <button className="w-full py-4 bg-gradient-to-r from-vipps-orange to-vipps-coral text-white font-bold rounded-2xl hover:opacity-90 transition-opacity">
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
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
              onClick={() => setShowNewGoal(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 max-w-[430px] mx-auto"
            >
              <div className="bg-white rounded-t-3xl shadow-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-vipps-dark">New Saving Goal ✨</h2>
                  <button 
                    onClick={() => setShowNewGoal(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                  >
                    <X size={18} className="text-gray-500" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      Choose an emoji for your goal
                    </label>
                    <div className="flex gap-3 flex-wrap">
                      {['🎧', '🎮', '👟', '📱', '🎸', '⚽', '🎁', '✈️', '🎬', '📚'].map((emoji) => (
                        <button
                          key={emoji}
                          className="w-12 h-12 rounded-xl bg-gray-50 hover:bg-vipps-cream transition-colors text-2xl"
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      What are you saving for?
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., AirPods, new game..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-vipps-orange focus:ring-2 focus:ring-vipps-orange/20 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">
                      How much do you need?
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                      <input
                        type="number"
                        placeholder="0"
                        className="w-full px-4 py-3 pl-8 rounded-xl border border-gray-200 focus:border-vipps-orange focus:ring-2 focus:ring-vipps-orange/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <button className="w-full py-4 bg-gradient-to-r from-vipps-orange to-vipps-coral text-white font-bold rounded-2xl hover:opacity-90 transition-opacity mt-4">
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
