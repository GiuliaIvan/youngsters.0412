'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Share2,
  Check,
  Heart,
  Users,
  Sparkles,
  Bell,
  MessageCircle
} from 'lucide-react'

export interface Achievement {
  id: number
  type: 'goal_completed' | 'lesson_completed' | 'badge_earned' | 'streak_milestone'
  title: string
  description: string
  emoji: string
  xp?: number
  date: string
  details?: string
}

interface ShareAchievementModalProps {
  isOpen: boolean
  onClose: () => void
  achievement: Achievement | null
  onShare: (achievement: Achievement) => void
}

export default function ShareAchievementModal({
  isOpen,
  onClose,
  achievement,
  onShare
}: ShareAchievementModalProps) {
  const [isShared, setIsShared] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  if (!isOpen || !achievement) return null

  const handleShare = () => {
    setIsShared(true)
    onShare(achievement)
    
    // Auto close after animation
    setTimeout(() => {
      setIsShared(false)
      onClose()
    }, 2000)
  }

  const getShareMessage = () => {
    switch (achievement.type) {
      case 'goal_completed':
        return `Emma reached a saving goal: ${achievement.title}! 🎉`
      case 'lesson_completed':
        return `Emma completed a lesson: ${achievement.title}! 📚`
      case 'badge_earned':
        return `Emma earned a new badge: ${achievement.title}! 🏆`
      case 'streak_milestone':
        return `Emma reached ${achievement.title}! 🔥`
      default:
        return `Emma achieved something awesome!`
    }
  }

  const getAchievementColor = () => {
    switch (achievement.type) {
      case 'goal_completed':
        return 'from-tint-success to-emerald-500'
      case 'lesson_completed':
        return 'from-tint-secondary to-purple-600'
      case 'badge_earned':
        return 'from-amber-400 to-orange-500'
      case 'streak_milestone':
        return 'from-tint-primary to-red-500'
      default:
        return 'from-tint-primary to-tint-secondary'
    }
  }

  return (
    <AnimatePresence>
      {!isShared ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end justify-center"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-[402px] bg-background-primary rounded-t-[24px] shadow-floating"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-label-tertiary rounded-full" />
            </div>

            {/* Header */}
            <div className="px-5 pb-4 flex items-center justify-between">
              <h2 className="text-[20px] font-semibold text-label-primary flex items-center gap-2">
                <Share2 size={22} className="text-tint-primary" />
                Share with Family
              </h2>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-fill-primary flex items-center justify-center"
              >
                <X size={18} className="text-label-secondary" />
              </button>
            </div>

            {/* Achievement Preview Card */}
            <div className="px-5 pb-4">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`relative overflow-hidden rounded-[18px] bg-gradient-to-br ${getAchievementColor()} p-5 text-white`}
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                
                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-4xl">{achievement.emoji}</span>
                    <div>
                      <p className="text-white/80 text-[13px] font-medium">
                        {achievement.type === 'goal_completed' && 'Goal Completed!'}
                        {achievement.type === 'lesson_completed' && 'Lesson Complete!'}
                        {achievement.type === 'badge_earned' && 'Badge Earned!'}
                        {achievement.type === 'streak_milestone' && 'Streak Milestone!'}
                      </p>
                      <h3 className="font-bold text-[18px]">{achievement.title}</h3>
                    </div>
                  </div>
                  
                  {achievement.details && (
                    <p className="text-white/90 text-[14px] mb-3">{achievement.details}</p>
                  )}
                  
                  <div className="flex items-center gap-3 pt-3 border-t border-white/20">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-[14px] font-bold">
                      ES
                    </div>
                    <div>
                      <p className="font-medium text-[14px]">Emma</p>
                      <p className="text-white/70 text-[12px]">{achievement.date}</p>
                    </div>
                    {achievement.xp && (
                      <div className="ml-auto px-3 py-1 bg-white/20 rounded-full">
                        <span className="text-[13px] font-semibold">+{achievement.xp} XP</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* What will be shared */}
            <div className="px-5 pb-4">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="w-full surface-card p-3 rounded-[12px] flex items-center gap-3 text-left"
              >
                <div className="w-9 h-9 rounded-full bg-tint-secondary/10 flex items-center justify-center">
                  <Users size={18} className="text-tint-secondary" />
                </div>
                <div className="flex-1">
                  <p className="text-[14px] font-medium text-label-primary">What will be shared?</p>
                  <p className="text-[12px] text-label-secondary">Only the achievement, not spending details</p>
                </div>
                <motion.span
                  animate={{ rotate: showPreview ? 180 : 0 }}
                  className="text-label-tertiary"
                >
                  ▼
                </motion.span>
              </button>
              
              <AnimatePresence>
                {showPreview && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 space-y-2">
                      <div className="flex items-center gap-2 text-tint-success">
                        <Check size={14} />
                        <span className="text-[13px]">Achievement title and emoji</span>
                      </div>
                      <div className="flex items-center gap-2 text-tint-success">
                        <Check size={14} />
                        <span className="text-[13px]">XP earned (if applicable)</span>
                      </div>
                      <div className="flex items-center gap-2 text-tint-success">
                        <Check size={14} />
                        <span className="text-[13px]">Date completed</span>
                      </div>
                      <div className="flex items-center gap-2 text-label-disabled">
                        <X size={14} />
                        <span className="text-[13px]">Transaction details</span>
                      </div>
                      <div className="flex items-center gap-2 text-label-disabled">
                        <X size={14} />
                        <span className="text-[13px]">Specific amounts</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Share Button */}
            <div className="px-5 pb-6">
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleShare}
                className="w-full py-4 bg-gradient-to-r from-tint-primary to-tint-secondary text-fixed-white rounded-[14px] font-semibold text-[16px] flex items-center justify-center gap-2 shadow-lg"
              >
                <Heart size={20} />
                Share with Family
              </motion.button>
              <p className="text-center text-[12px] text-label-secondary mt-3">
                Your family will get a notification with this achievement
              </p>
            </div>
          </motion.div>
        </motion.div>
      ) : (
        // Success State
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="bg-background-primary rounded-[24px] p-8 text-center shadow-floating max-w-[320px] mx-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 mx-auto rounded-full bg-tint-success flex items-center justify-center mb-4"
            >
              <Check size={40} className="text-white" />
            </motion.div>
            <h2 className="text-[22px] font-bold text-label-primary mb-2">Shared! 🎉</h2>
            <p className="text-[15px] text-label-secondary">
              Your family will see this achievement in their feed!
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Preview component for showing what guardian receives
export function GuardianNotificationPreview({ achievement }: { achievement: Achievement }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="surface-card p-4 rounded-[14px] border-2 border-tint-secondary/20"
    >
      <div className="flex items-center gap-2 mb-3">
        <Bell size={16} className="text-tint-secondary" />
        <span className="text-[12px] font-medium text-tint-secondary">Family Notification Preview</span>
      </div>
      
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-tint-primary flex items-center justify-center shrink-0">
          <span className="text-lg">{achievement.emoji}</span>
        </div>
        <div className="flex-1">
          <p className="font-medium text-label-primary text-[14px]">
            Emma {achievement.type === 'goal_completed' ? 'reached a goal' : 
                  achievement.type === 'lesson_completed' ? 'completed a lesson' :
                  achievement.type === 'badge_earned' ? 'earned a badge' : 'hit a milestone'}!
          </p>
          <p className="text-[13px] text-label-secondary mt-0.5">{achievement.title}</p>
          <p className="text-[11px] text-label-tertiary mt-1">{achievement.date}</p>
        </div>
        <button className="p-2 rounded-full bg-tint-primary/10">
          <MessageCircle size={16} className="text-tint-primary" />
        </button>
      </div>
    </motion.div>
  )
}

