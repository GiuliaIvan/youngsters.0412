'use client'

import { motion } from 'framer-motion'
import { Star, Gift, Lock, ChevronRight, Sparkles } from 'lucide-react'
import Header from '../Header'

const badges = [
  { id: 1, name: 'First Save', emoji: '💰', description: 'Made your first saving', earned: true, xp: 50 },
  { id: 2, name: 'Goal Crusher', emoji: '🎯', description: 'Completed a saving goal', earned: true, xp: 100 },
  { id: 3, name: 'Week Warrior', emoji: '🔥', description: '7 day learning streak', earned: true, xp: 75 },
  { id: 4, name: 'Quiz Whiz', emoji: '🧠', description: 'Perfect score on a quiz', earned: true, xp: 80 },
  { id: 5, name: 'Super Saver', emoji: '🦸', description: 'Save 1000 kr total', earned: false, xp: 150 },
  { id: 6, name: 'Money Master', emoji: '👑', description: 'Complete all lessons', earned: false, xp: 200 },
]

const rewards = [
  { id: 1, name: 'Custom Avatar Frame', cost: 200, emoji: '🖼️', available: true },
  { id: 2, name: 'Special Badge', cost: 350, emoji: '⭐', available: true },
  { id: 3, name: 'Dark Theme', cost: 500, emoji: '🌙', available: false },
  { id: 4, name: 'Animated Vippsi', cost: 750, emoji: '✨', available: false },
]

const vippsiStyles = [
  { id: 1, name: 'Classic', emoji: '🧡', unlocked: true },
  { id: 2, name: 'Cool', emoji: '😎', unlocked: true },
  { id: 3, name: 'Party', emoji: '🎉', unlocked: false },
  { id: 4, name: 'Ninja', emoji: '🥷', unlocked: false },
  { id: 5, name: 'Astronaut', emoji: '🚀', unlocked: false },
]

export default function RewardsTab() {
  const totalXP = 1250
  const earnedBadges = badges.filter(b => b.earned).length
  
  return (
    <div className="tab-content bg-background-primary">
      <Header title="Rewards 🏆" />
      
      <div className="p-4 space-y-5">
        {/* XP Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="surface-card p-5 bg-tint-secondary text-fixed-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-fixed-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="flex items-center gap-2 mb-2">
            <Star size={20} className="text-[#FFD93D]" />
            <p className="text-fixed-white/80 text-[14px] font-medium">Your XP Balance</p>
          </div>
          <motion.h2 
            className="text-[32px] font-semibold"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            {totalXP} XP
          </motion.h2>
          <p className="text-fixed-white/70 text-[14px] mt-1">Use XP to unlock rewards!</p>
        </motion.div>

        {/* Badges */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-label-primary text-[18px] tracking-[-0.45px]">Your Badges</h3>
            <span className="text-[14px] text-tint-secondary font-medium">{earnedBadges}/{badges.length}</span>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`surface-card p-4 flex flex-col items-center relative ${
                  !badge.earned ? 'opacity-50' : ''
                }`}
              >
                {badge.earned && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-5 h-5 bg-tint-success rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                  >
                    <span className="text-[10px]">✓</span>
                  </motion.div>
                )}
                <span className="text-3xl mb-2">{badge.emoji}</span>
                <p className="text-[12px] font-medium text-label-primary text-center">{badge.name}</p>
                <p className="text-[10px] text-label-secondary text-center mt-0.5">{badge.xp} XP</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Vippsi Styles */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-label-primary text-[18px] tracking-[-0.45px]">Vippsi Styles</h3>
            <button className="text-tint-primary text-[14px] font-medium flex items-center gap-1 hover:opacity-80">
              See all <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {vippsiStyles.map((style, index) => (
              <motion.div
                key={style.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className={`surface-card p-4 min-w-[100px] flex flex-col items-center ${
                  !style.unlocked ? 'opacity-50' : ''
                } ${style.unlocked && index === 0 ? 'border-2 border-tint-primary' : ''}`}
              >
                <span className="text-4xl mb-2">{style.emoji}</span>
                <p className="text-[12px] font-medium text-label-primary">{style.name}</p>
                {!style.unlocked && (
                  <Lock size={12} className="text-label-disabled mt-1" />
                )}
                {style.unlocked && index === 0 && (
                  <span className="text-[10px] text-tint-primary font-medium mt-1">Active</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-label-primary text-[18px] tracking-[-0.45px]">Reward Shop</h3>
            <Gift size={20} className="text-tint-secondary" />
          </div>
          
          <div className="space-y-3">
            {rewards.map((reward, index) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={`surface-card p-4 flex items-center gap-4 ${!reward.available ? 'opacity-60' : ''}`}
              >
                <span className="text-3xl">{reward.emoji}</span>
                <div className="flex-1">
                  <h4 className="font-medium text-label-primary text-[16px] tracking-[-0.32px]">{reward.name}</h4>
                  <p className="text-[14px] text-tint-secondary font-medium">{reward.cost} XP</p>
                </div>
                <button 
                  className={`px-4 py-2 rounded-full font-medium text-[14px] transition-opacity ${
                    reward.available && totalXP >= reward.cost
                      ? 'bg-tint-primary text-fixed-white hover:opacity-90'
                      : 'bg-fill-primary text-label-disabled'
                  }`}
                  disabled={!reward.available || totalXP < reward.cost}
                >
                  {reward.available ? 'Get' : 'Soon'}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Level Progress */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="surface-card p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-tint-secondary" />
              <h3 className="font-medium text-label-primary text-[16px] tracking-[-0.32px]">Level 5</h3>
            </div>
            <span className="text-[14px] text-label-secondary">1250 / 2000 XP</span>
          </div>
          <div className="h-3 bg-fill-primary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-tint-secondary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '62.5%' }}
              transition={{ duration: 1 }}
            />
          </div>
          <p className="text-[12px] text-label-secondary mt-2">750 XP to Level 6 🚀</p>
        </motion.div>
      </div>
    </div>
  )
}
