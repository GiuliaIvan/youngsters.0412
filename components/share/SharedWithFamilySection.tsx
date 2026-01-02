'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronRight, 
  Heart,
  Users,
  Clock,
  MessageCircle,
  Check
} from 'lucide-react'
import { Achievement } from './ShareAchievementModal'

// Placeholder data for shared achievements
const sharedAchievements: (Achievement & { sharedAt: string; reactions?: string[] })[] = [
  {
    id: 1,
    type: 'goal_completed',
    title: 'Soccer Ball',
    description: 'Reached saving goal',
    emoji: '⚽',
    xp: 100,
    date: 'Dec 28, 2025',
    sharedAt: '2 days ago',
    reactions: ['❤️', '👏']
  },
  {
    id: 2,
    type: 'lesson_completed',
    title: 'What is Money?',
    description: 'Completed lesson',
    emoji: '💵',
    xp: 50,
    date: 'Dec 25, 2025',
    sharedAt: '5 days ago',
    reactions: ['🎉']
  },
  {
    id: 3,
    type: 'streak_milestone',
    title: '7 Day Learning Streak',
    description: 'Streak milestone',
    emoji: '🔥',
    xp: 75,
    date: 'Dec 22, 2025',
    sharedAt: '1 week ago',
    reactions: ['💪', '🌟']
  },
  {
    id: 4,
    type: 'badge_earned',
    title: 'First Save',
    description: 'Badge earned',
    emoji: '💰',
    xp: 50,
    date: 'Dec 15, 2025',
    sharedAt: '2 weeks ago',
    reactions: ['❤️']
  },
]

interface SharedWithFamilySectionProps {
  compact?: boolean
  onViewAll?: () => void
}

export default function SharedWithFamilySection({ 
  compact = false,
  onViewAll 
}: SharedWithFamilySectionProps) {
  const [showAll, setShowAll] = useState(false)
  const [selectedItem, setSelectedItem] = useState<typeof sharedAchievements[0] | null>(null)

  const displayedItems = compact 
    ? sharedAchievements.slice(0, 2) 
    : showAll 
      ? sharedAchievements 
      : sharedAchievements.slice(0, 3)

  const getTypeLabel = (type: Achievement['type']) => {
    switch (type) {
      case 'goal_completed': return 'Goal'
      case 'lesson_completed': return 'Lesson'
      case 'badge_earned': return 'Badge'
      case 'streak_milestone': return 'Streak'
      default: return 'Achievement'
    }
  }

  const getTypeColor = (type: Achievement['type']) => {
    switch (type) {
      case 'goal_completed': return 'bg-tint-success/10 text-tint-success'
      case 'lesson_completed': return 'bg-tint-secondary/10 text-tint-secondary'
      case 'badge_earned': return 'bg-amber-100 text-amber-600'
      case 'streak_milestone': return 'bg-tint-primary/10 text-tint-primary'
      default: return 'bg-fill-primary text-label-secondary'
    }
  }

  // Compact view for quick display
  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="surface-card p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-tint-secondary/10 flex items-center justify-center">
              <Users size={16} className="text-tint-secondary" />
            </div>
            <h3 className="font-medium text-label-primary text-[16px]">Shared with Family</h3>
          </div>
          <button 
            onClick={onViewAll}
            className="text-tint-primary text-[14px] font-medium flex items-center gap-1 hover:opacity-80"
          >
            See all <ChevronRight size={16} />
          </button>
        </div>

        <div className="space-y-2">
          {displayedItems.map(item => (
            <div key={item.id} className="flex items-center gap-3 p-2 bg-background-primary rounded-[8px]">
              <span className="text-xl">{item.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium text-label-primary truncate">{item.title}</p>
                <p className="text-[12px] text-label-secondary">{item.sharedAt}</p>
              </div>
              {item.reactions && (
                <div className="flex items-center gap-0.5">
                  {item.reactions.slice(0, 2).map((r, i) => (
                    <span key={i} className="text-[12px]">{r}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    )
  }

  // Full view for Me tab
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-label-primary text-[18px] tracking-[-0.45px] flex items-center gap-2">
          <Heart size={18} className="text-tint-primary" />
          Shared with Family
        </h3>
        <span className="text-[14px] text-label-secondary">
          {sharedAchievements.length} shared
        </span>
      </div>

      {/* Family Feed Header */}
      <div className="surface-card p-4 border-2 border-tint-secondary/20">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-tint-secondary/10 flex items-center justify-center shrink-0">
            <Users size={20} className="text-tint-secondary" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-label-primary text-[15px]">Your Family Feed</p>
            <p className="text-[13px] text-label-secondary mt-0.5">
              Your achievements are shared here for family to celebrate! 🎉
            </p>
          </div>
        </div>
      </div>

      {/* Shared Items */}
      <div className="space-y-2">
        {displayedItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="surface-card p-4 hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{item.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${getTypeColor(item.type)}`}>
                    {getTypeLabel(item.type)}
                  </span>
                </div>
                <p className="font-medium text-label-primary text-[15px]">{item.title}</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[12px] text-label-secondary flex items-center gap-1">
                    <Clock size={10} />
                    Shared {item.sharedAt}
                  </span>
                  {item.xp && (
                    <span className="text-[12px] text-tint-secondary font-medium">+{item.xp} XP</span>
                  )}
                </div>
              </div>
              
              {/* Reactions */}
              {item.reactions && item.reactions.length > 0 && (
                <div className="flex items-center gap-1 bg-fill-primary px-2 py-1 rounded-full">
                  {item.reactions.map((r, i) => (
                    <span key={i} className="text-[14px]">{r}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Expanded detail */}
            <AnimatePresence>
              {selectedItem?.id === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="pt-3 mt-3 border-t border-separator-primary">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <span className="text-[12px] text-label-secondary">Family reactions:</span>
                          {item.reactions?.map((r, i) => (
                            <span key={i} className="text-[16px]">{r}</span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-[12px] text-tint-success">
                        <Check size={12} />
                        Seen by Mom & Dad
                      </div>
                    </div>
                    
                    {/* Quick message option */}
                    <div className="flex gap-2 mt-3">
                      <button className="flex-1 py-2 surface-card rounded-[8px] text-[13px] font-medium text-label-secondary hover:bg-fill-secondary transition-colors flex items-center justify-center gap-1">
                        <MessageCircle size={14} />
                        Send thanks
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Show more/less */}
      {sharedAchievements.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full py-3 text-tint-primary text-[14px] font-medium hover:opacity-80 transition-opacity"
        >
          {showAll ? 'Show less' : `Show ${sharedAchievements.length - 3} more`}
        </button>
      )}

      {/* Empty state */}
      {sharedAchievements.length === 0 && (
        <div className="surface-card p-6 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-fill-primary flex items-center justify-center mb-3">
            <Heart size={28} className="text-label-disabled" />
          </div>
          <p className="font-medium text-label-primary mb-1">No shared achievements yet</p>
          <p className="text-[14px] text-label-secondary">
            Complete goals and lessons to share with your family!
          </p>
        </div>
      )}
    </div>
  )
}

