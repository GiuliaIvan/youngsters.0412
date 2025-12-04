'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Trophy, 
  Star, 
  Lock,
  Zap,
  Flame,
  Target,
  BookOpen,
  Gift,
  Sparkles,
  ChevronRight,
  X
} from 'lucide-react'
import Header from '../Header'

interface Badge {
  id: number
  name: string
  description: string
  emoji: string
  color: string
  earned: boolean
  earnedDate?: string
  xpRequired?: number
  progress?: number
}

interface VippsiItem {
  id: number
  name: string
  emoji: string
  type: 'hat' | 'accessory' | 'background'
  unlocked: boolean
  xpRequired: number
}

const badges: Badge[] = [
  { id: 1, name: 'First Step', description: 'Completed your first lesson', emoji: '🎉', color: 'from-yellow-400 to-orange-400', earned: true, earnedDate: 'Nov 15' },
  { id: 2, name: 'Saving Starter', description: 'Created your first saving goal', emoji: '🎯', color: 'from-blue-400 to-cyan-400', earned: true, earnedDate: 'Nov 16' },
  { id: 3, name: 'Week Warrior', description: '7 day streak', emoji: '🔥', color: 'from-orange-400 to-red-400', earned: true, earnedDate: 'Nov 22' },
  { id: 4, name: 'Quiz Master', description: '100% on a quiz', emoji: '🧠', color: 'from-purple-400 to-pink-400', earned: true, earnedDate: 'Nov 20' },
  { id: 5, name: 'Goal Achieved!', description: 'Completed a saving goal', emoji: '🏆', color: 'from-green-400 to-emerald-400', earned: true, earnedDate: 'Dec 1' },
  { id: 6, name: 'XP Collector', description: 'Collected 1000 XP', emoji: '⚡', color: 'from-yellow-400 to-yellow-500', earned: true, earnedDate: 'Nov 25' },
  { id: 7, name: 'Super Saver', description: 'Saved $50 total', emoji: '💰', color: 'from-green-400 to-teal-400', earned: false, xpRequired: 1500, progress: 75 },
  { id: 8, name: 'Month Master', description: '30 day streak', emoji: '🌟', color: 'from-pink-400 to-rose-400', earned: false, xpRequired: 2000, progress: 23 },
  { id: 9, name: 'Learning Legend', description: 'Completed all lessons in a module', emoji: '📚', color: 'from-indigo-400 to-purple-400', earned: false, xpRequired: 2500, progress: 60 },
]

const vippsiItems: VippsiItem[] = [
  { id: 1, name: 'Party Hat', emoji: '🎉', type: 'hat', unlocked: true, xpRequired: 0 },
  { id: 2, name: 'Crown', emoji: '👑', type: 'hat', unlocked: true, xpRequired: 500 },
  { id: 3, name: 'Astronaut Helmet', emoji: '🚀', type: 'hat', unlocked: false, xpRequired: 2000 },
  { id: 4, name: 'Sunglasses', emoji: '😎', type: 'accessory', unlocked: true, xpRequired: 300 },
  { id: 5, name: 'Star Background', emoji: '✨', type: 'background', unlocked: true, xpRequired: 400 },
  { id: 6, name: 'Rainbow Background', emoji: '🌈', type: 'background', unlocked: false, xpRequired: 1500 },
]

const streakMilestones = [
  { days: 7, reward: '50 XP', emoji: '🔥', achieved: true },
  { days: 14, reward: '100 XP + Badge', emoji: '🔥🔥', achieved: false },
  { days: 30, reward: '250 XP + Special Item', emoji: '🔥🔥🔥', achieved: false },
  { days: 100, reward: 'Legendary Badge', emoji: '👑', achieved: false },
]

export default function RewardsTab() {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null)
  const [activeSection, setActiveSection] = useState<'badges' | 'items' | 'streaks'>('badges')
  
  const totalXP = 1250
  const nextRewardXP = 1500
  const earnedBadges = badges.filter(b => b.earned).length
  const currentStreak = 7

  return (
    <div className="tab-content">
      <Header title="Rewards 🏆" showSettings={true} />
      
      <div className="p-4 space-y-5">
        {/* XP Progress Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-5 bg-gradient-to-br from-vipps-orange to-vipps-coral text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="flex items-center gap-3 mb-3">
            <Zap size={24} className="text-yellow-300" />
            <span className="font-bold text-lg">Your Points</span>
          </div>
          
          <p className="text-4xl font-bold">{totalXP} XP</p>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-white/80">Next Reward</span>
              <span className="font-semibold">{nextRewardXP - totalXP} XP to go</span>
            </div>
            <div className="h-3 bg-white/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(totalXP / nextRewardXP) * 100}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3"
        >
          <div className="card p-3 text-center">
            <Trophy size={24} className="mx-auto text-yellow-500 mb-1" />
            <p className="text-xl font-bold text-vipps-dark">{earnedBadges}</p>
            <p className="text-xs text-gray-500">Badges</p>
          </div>
          <div className="card p-3 text-center">
            <Flame size={24} className="mx-auto text-orange-500 mb-1" />
            <p className="text-xl font-bold text-vipps-dark">{currentStreak}</p>
            <p className="text-xs text-gray-500">Streak</p>
          </div>
          <div className="card p-3 text-center">
            <Gift size={24} className="mx-auto text-pink-500 mb-1" />
            <p className="text-xl font-bold text-vipps-dark">4</p>
            <p className="text-xs text-gray-500">Items</p>
          </div>
        </motion.div>

        {/* Section Toggle */}
        <div className="flex bg-gray-100 rounded-xl p-1">
          {[
            { id: 'badges', label: 'Badges', icon: Trophy },
            { id: 'items', label: 'Vippsi Items', icon: Sparkles },
            { id: 'streaks', label: 'Streaks', icon: Flame },
          ].map((section) => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id as any)}
                className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-1.5 ${
                  activeSection === section.id 
                    ? 'bg-white text-vipps-dark shadow-sm' 
                    : 'text-gray-500'
                }`}
              >
                <Icon size={16} />
                {section.label}
              </button>
            )
          })}
        </div>

        {/* Badges Section */}
        <AnimatePresence mode="wait">
          {activeSection === 'badges' && (
            <motion.div
              key="badges"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <h3 className="font-bold text-vipps-dark">Earned Badges ({earnedBadges}/{badges.length})</h3>
              
              <div className="grid grid-cols-3 gap-3">
                {badges.map((badge, index) => (
                  <motion.button
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setSelectedBadge(badge)}
                    className={`card p-4 flex flex-col items-center relative overflow-hidden ${
                      badge.earned ? 'badge-shine' : 'bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-2 ${
                      badge.earned 
                        ? `bg-gradient-to-br ${badge.color}` 
                        : 'bg-gray-200'
                    }`}>
                      {badge.earned ? (
                        <span className="text-2xl">{badge.emoji}</span>
                      ) : (
                        <Lock size={20} className="text-gray-400" />
                      )}
                    </div>
                    <p className={`text-xs font-semibold text-center ${
                      badge.earned ? 'text-vipps-dark' : 'text-gray-400'
                    }`}>
                      {badge.name}
                    </p>
                    {!badge.earned && badge.progress && (
                      <div className="w-full h-1 bg-gray-200 rounded-full mt-2 overflow-hidden">
                        <div 
                          className="h-full bg-vipps-orange rounded-full"
                          style={{ width: `${badge.progress}%` }}
                        />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Vippsi Items Section */}
          {activeSection === 'items' && (
            <motion.div
              key="items"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              <h3 className="font-bold text-vipps-dark">Customize Vippsi ✨</h3>
              
              {/* Vippsi Preview */}
              <div className="card p-6 flex flex-col items-center bg-gradient-to-br from-vipps-cream to-white">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-vipps-orange to-vipps-coral flex items-center justify-center shadow-lg">
                    <div className="relative w-16 h-16">
                      <div className="absolute top-4 left-2 w-3 h-3 bg-white rounded-full" />
                      <div className="absolute top-4 right-2 w-3 h-3 bg-white rounded-full" />
                      <div className="absolute top-4.5 left-2.5 w-2 h-2 bg-vipps-dark rounded-full" />
                      <div className="absolute top-4.5 right-2.5 w-2 h-2 bg-vipps-dark rounded-full" />
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-5 h-2.5 border-b-3 border-white rounded-b-full" />
                    </div>
                  </div>
                  {/* Hat */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl">
                    👑
                  </div>
                </div>
                <p className="mt-4 font-semibold text-vipps-dark">Your Vippsi</p>
                <p className="text-sm text-gray-500">Equipped: Crown + Sunglasses</p>
              </div>

              {/* Items Grid */}
              <div className="grid grid-cols-4 gap-3">
                {vippsiItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className={`card p-3 flex flex-col items-center ${
                      item.unlocked ? '' : 'bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                      item.unlocked ? 'bg-vipps-cream' : 'bg-gray-200'
                    }`}>
                      {item.unlocked ? item.emoji : <Lock size={16} className="text-gray-400" />}
                    </div>
                    <p className="text-[10px] font-medium text-center mt-1 text-gray-600 truncate w-full">
                      {item.name}
                    </p>
                    {!item.unlocked && (
                      <p className="text-[9px] text-vipps-orange font-semibold">
                        {item.xpRequired} XP
                      </p>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Streaks Section */}
          {activeSection === 'streaks' && (
            <motion.div
              key="streaks"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              {/* Current Streak */}
              <div className="card p-5 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200/50">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center flame-animate">
                    <Flame size={32} className="text-white" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-vipps-dark">{currentStreak} days</p>
                    <p className="text-sm text-gray-600">Your current streak 🔥</p>
                  </div>
                </div>
              </div>

              <h3 className="font-bold text-vipps-dark">Streak Milestones</h3>
              
              <div className="space-y-3">
                {streakMilestones.map((milestone, index) => (
                  <motion.div
                    key={milestone.days}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`card p-4 flex items-center gap-4 ${
                      milestone.achieved 
                        ? 'bg-green-50 border-2 border-green-200' 
                        : currentStreak >= milestone.days * 0.5 
                          ? 'bg-orange-50 border-2 border-orange-200' 
                          : ''
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                      milestone.achieved 
                        ? 'bg-green-500' 
                        : 'bg-gray-200'
                    }`}>
                      {milestone.achieved ? '✓' : milestone.emoji}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-vipps-dark">{milestone.days} days</p>
                      <p className="text-sm text-gray-500">{milestone.reward}</p>
                    </div>
                    {milestone.achieved ? (
                      <span className="text-green-500 font-semibold text-sm">Achieved!</span>
                    ) : (
                      <span className="text-gray-400 text-sm">
                        {milestone.days - currentStreak} days to go
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Badge Detail Modal */}
      <AnimatePresence>
        {selectedBadge && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
              onClick={() => setSelectedBadge(null)}
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedBadge(null)}
            >
              <div 
                className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-[300px] text-center"
                onClick={e => e.stopPropagation()}
              >
                <button 
                  onClick={() => setSelectedBadge(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  <X size={18} className="text-gray-500" />
                </button>
                
                <div className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center mb-4 ${
                  selectedBadge.earned 
                    ? `bg-gradient-to-br ${selectedBadge.color}` 
                    : 'bg-gray-200'
                }`}>
                  {selectedBadge.earned ? (
                    <span className="text-5xl">{selectedBadge.emoji}</span>
                  ) : (
                    <Lock size={32} className="text-gray-400" />
                  )}
                </div>
                
                <h2 className="text-xl font-bold text-vipps-dark">{selectedBadge.name}</h2>
                <p className="text-gray-500 mt-1">{selectedBadge.description}</p>
                
                {selectedBadge.earned ? (
                  <p className="mt-4 text-sm text-green-600 font-semibold">
                    ✓ Earned {selectedBadge.earnedDate}
                  </p>
                ) : (
                  <div className="mt-4">
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-vipps-orange rounded-full"
                        style={{ width: `${selectedBadge.progress || 0}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-2">
                      {selectedBadge.progress || 0}% complete
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
