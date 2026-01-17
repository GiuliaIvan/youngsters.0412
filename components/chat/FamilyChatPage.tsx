'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  Phone, 
  Video, 
  MoreVertical,
  Send,
  Heart,
  Sparkles,
  Check,
  CheckCheck,
  Gift,
  Trophy,
  Target,
  BookOpen,
  Flame,
  MessageCircle,
  Camera,
  Mic,
  Plus
} from 'lucide-react'

interface Message {
  id: number
  type: 'text' | 'achievement' | 'reaction' | 'allowance'
  sender: 'me' | 'mom'
  content: string
  timestamp: string
  read?: boolean
  achievement?: {
    type: 'goal_completed' | 'lesson_completed' | 'badge_earned' | 'streak_milestone'
    title: string
    emoji: string
    xp?: number
    details?: string
  }
  reactions?: string[]
  allowanceAmount?: number
}

const chatMessages: Message[] = [
  {
    id: 1,
    type: 'text',
    sender: 'mom',
    content: 'Good morning sweetie! 🌞',
    timestamp: '08:15',
    read: true
  },
  {
    id: 2,
    type: 'text',
    sender: 'me',
    content: 'Thanks mom! ❤️',
    timestamp: '08:17',
    read: true
  },
  {
    id: 3,
    type: 'achievement',
    sender: 'me',
    content: '',
    timestamp: '14:30',
    read: true,
    achievement: {
      type: 'goal_completed',
      title: 'Soccer Ball ⚽',
      emoji: '⚽',
      xp: 100,
      details: 'Saved 299 kr to reach this goal!'
    },
    reactions: ['❤️', '👏', '🎉']
  },
  {
    id: 4,
    type: 'reaction',
    sender: 'mom',
    content: 'OMG! I\'m SO proud of you Emma! 🥹🎉 You did it all by yourself!',
    timestamp: '14:32',
    read: true
  },
  {
    id: 5,
    type: 'text',
    sender: 'me',
    content: 'Thanks mom!! 🥰',
    timestamp: '14:35',
    read: true
  },
]

interface FamilyChatPageProps {
  onBack: () => void
}

export default function FamilyChatPage({ onBack }: FamilyChatPageProps) {
  const [messages, setMessages] = useState<Message[]>(chatMessages)
  const [newMessage, setNewMessage] = useState('')
  const [showReactionPicker, setShowReactionPicker] = useState<number | null>(null)

  const quickReactions = ['❤️', '👏', '🔥', '🎉', '😂', '😮']

  const handleSendMessage = () => {
    if (!newMessage.trim()) return
    
    const message: Message = {
      id: messages.length + 1,
      type: 'text',
      sender: 'me',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      read: false
    }
    
    setMessages([...messages, message])
    setNewMessage('')
  }

  const addReaction = (messageId: number, reaction: string) => {
    setMessages(messages.map(msg => {
      if (msg.id === messageId) {
        const currentReactions = msg.reactions || []
        if (!currentReactions.includes(reaction)) {
          return { ...msg, reactions: [...currentReactions, reaction] }
        }
      }
      return msg
    }))
    setShowReactionPicker(null)
  }

  const getAchievementGradient = (type: string) => {
    switch (type) {
      case 'goal_completed':
        return 'from-emerald-400 via-teal-500 to-cyan-500'
      case 'lesson_completed':
        return 'from-violet-500 via-purple-500 to-fuchsia-500'
      case 'badge_earned':
        return 'from-amber-400 via-orange-500 to-red-500'
      case 'streak_milestone':
        return 'from-orange-500 via-red-500 to-pink-500'
      default:
        return 'from-tint-primary to-tint-secondary'
    }
  }

  const getAchievementIcon = (type: string) => {
    switch (type) {
      case 'goal_completed':
        return Target
      case 'lesson_completed':
        return BookOpen
      case 'badge_earned':
        return Trophy
      case 'streak_milestone':
        return Flame
      default:
        return Sparkles
    }
  }

  return (
    <div className="fixed inset-0 bg-background-primary z-50 flex flex-col">
      {/* Chat Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-tint-secondary to-purple-600 text-white px-4 py-4 shadow-lg"
      >
        <div className="flex items-center gap-3 max-w-[402px] mx-auto">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
          >
            <ArrowLeft size={20} />
          </motion.button>
          
          <div className="flex items-center gap-3 flex-1">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center text-lg font-semibold">
                👩
              </div>
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-tint-secondary" />
            </div>
            <div>
              <h1 className="font-semibold text-[17px]">Mom 💕</h1>
              <p className="text-white/80 text-[13px]">Online</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
            >
              <Phone size={18} />
            </motion.button>
            <motion.button 
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
            >
              <Video size={18} />
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 max-w-[402px] mx-auto w-full bg-gradient-to-b from-purple-50/50 to-white">
        {/* Date Separator */}
        <div className="flex justify-center">
          <span className="px-4 py-1.5 bg-white rounded-full text-[12px] text-label-secondary font-medium shadow-sm">
            Today
          </span>
        </div>

        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.02 }}
            className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`relative max-w-[85%] ${message.type === 'achievement' ? 'max-w-[90%]' : ''}`}
              onDoubleClick={() => setShowReactionPicker(message.id)}
            >
              {/* Achievement Message - Special Design */}
              {message.type === 'achievement' && message.achievement && (
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="relative"
                >
                  {/* Achievement Card */}
                  <div className={`rounded-[20px] overflow-hidden shadow-lg bg-gradient-to-br ${getAchievementGradient(message.achievement.type)}`}>
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                    
                    {/* Header */}
                    <div className="px-4 pt-4 pb-3 relative">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-white/25 flex items-center justify-center">
                          {(() => {
                            const Icon = getAchievementIcon(message.achievement.type)
                            return <Icon size={16} className="text-white" />
                          })()}
                        </div>
                        <div>
                          <p className="text-white/80 text-[11px] font-semibold uppercase tracking-wide">
                            {message.achievement.type === 'goal_completed' && '🎯 Goal Reached!'}
                            {message.achievement.type === 'lesson_completed' && '📚 Lesson Done!'}
                            {message.achievement.type === 'badge_earned' && '🏆 Badge Earned!'}
                            {message.achievement.type === 'streak_milestone' && '🔥 Streak Milestone!'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="bg-white/95 mx-2 mb-2 rounded-[14px] p-4 backdrop-blur-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
                          <span className="text-3xl">{message.achievement.emoji}</span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-[16px] text-label-primary">
                            {message.achievement.title}
                          </h3>
                          {message.achievement.details && (
                            <p className="text-[13px] text-label-secondary mt-0.5">
                              {message.achievement.details}
                            </p>
                          )}
                        </div>
                      </div>
                      
                      {/* XP Badge & Share info */}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-tint-primary/10 flex items-center justify-center">
                            <span className="text-[12px]">✨</span>
                          </div>
                          <span className="text-[12px] text-label-secondary">Shared with family</span>
                        </div>
                        {message.achievement.xp && (
                          <div className="px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full">
                            <span className="text-[12px] font-bold text-white">+{message.achievement.xp} XP</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Timestamp */}
                    <div className="flex justify-end px-4 pb-2">
                      <span className="text-white/70 text-[11px]">{message.timestamp}</span>
                      {message.sender === 'me' && (
                        <CheckCheck size={14} className="ml-1 text-white" />
                      )}
                    </div>
                  </div>
                  
                  {/* Reactions */}
                  {message.reactions && message.reactions.length > 0 && (
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -bottom-3 left-4 flex items-center gap-0.5 px-2 py-1 bg-white rounded-full shadow-md border border-gray-100"
                    >
                      {message.reactions.map((r, i) => (
                        <span key={i} className="text-[14px]">{r}</span>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              )}

              {/* Allowance Message */}
              {message.type === 'allowance' && (
                <div className={`rounded-[18px] overflow-hidden shadow-sm ${
                  message.sender === 'me' 
                    ? 'bg-tint-primary text-white' 
                    : 'bg-white border border-gray-100'
                }`}>
                  <div className="p-3.5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        message.sender === 'me' ? 'bg-white/20' : 'bg-tint-success/10'
                      }`}>
                        <Gift size={20} className={message.sender === 'me' ? 'text-white' : 'text-tint-success'} />
                      </div>
                      <div className="flex-1">
                        <p className={`text-[14px] ${message.sender === 'me' ? 'text-white/90' : 'text-label-secondary'}`}>
                          {message.content}
                        </p>
                      </div>
                    </div>
                    <div className={`text-center py-2 rounded-xl ${
                      message.sender === 'me' ? 'bg-white/20' : 'bg-tint-success/10'
                    }`}>
                      <span className={`text-[24px] font-bold ${
                        message.sender === 'me' ? 'text-white' : 'text-tint-success'
                      }`}>
                        +{message.allowanceAmount} kr
                      </span>
                    </div>
                  </div>
                  <div className={`flex justify-end items-center gap-1 px-3 pb-2 ${
                    message.sender === 'me' ? 'text-white/70' : 'text-label-tertiary'
                  }`}>
                    <span className="text-[11px]">{message.timestamp}</span>
                    {message.sender === 'me' && <CheckCheck size={14} />}
                  </div>
                </div>
              )}

              {/* Regular Text Message */}
              {(message.type === 'text' || message.type === 'reaction') && (
                <div className={`rounded-[18px] px-4 py-2.5 shadow-sm ${
                  message.sender === 'me' 
                    ? 'bg-tint-primary text-white rounded-br-[4px]' 
                    : 'bg-white text-label-primary rounded-bl-[4px] border border-gray-100'
                }`}>
                  <p className="text-[15px] leading-[1.4]">{message.content}</p>
                  <div className={`flex justify-end items-center gap-1 mt-1 ${
                    message.sender === 'me' ? 'text-white/70' : 'text-label-tertiary'
                  }`}>
                    <span className="text-[11px]">{message.timestamp}</span>
                    {message.sender === 'me' && (
                      message.read ? <CheckCheck size={14} /> : <Check size={14} />
                    )}
                  </div>
                </div>
              )}

              {/* Reactions (for non-achievement messages) */}
              {message.type !== 'achievement' && message.reactions && message.reactions.length > 0 && (
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`absolute -bottom-2 ${message.sender === 'me' ? 'left-2' : 'right-2'} flex items-center gap-0.5 px-2 py-0.5 bg-white rounded-full shadow-sm border border-gray-100`}
                >
                  {message.reactions.map((r, i) => (
                    <span key={i} className="text-[12px]">{r}</span>
                  ))}
                </motion.div>
              )}

              {/* Reaction Picker */}
              <AnimatePresence>
                {showReactionPicker === message.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 10 }}
                    className={`absolute bottom-full mb-2 ${message.sender === 'me' ? 'right-0' : 'left-0'} flex items-center gap-1 px-2 py-1.5 bg-white rounded-full shadow-lg border border-gray-100`}
                  >
                    {quickReactions.map((r) => (
                      <button
                        key={r}
                        onClick={() => addReaction(message.id, r)}
                        className="w-8 h-8 hover:scale-125 transition-transform flex items-center justify-center"
                      >
                        <span className="text-[18px]">{r}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}

        {/* Typing Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-start"
        >
          <div className="bg-white rounded-[18px] px-4 py-3 rounded-bl-[4px] border border-gray-100 shadow-sm">
            <div className="flex gap-1">
              <motion.span 
                animate={{ y: [0, -4, 0] }} 
                transition={{ repeat: Infinity, duration: 0.6, delay: 0 }}
                className="w-2 h-2 bg-label-tertiary rounded-full"
              />
              <motion.span 
                animate={{ y: [0, -4, 0] }} 
                transition={{ repeat: Infinity, duration: 0.6, delay: 0.1 }}
                className="w-2 h-2 bg-label-tertiary rounded-full"
              />
              <motion.span 
                animate={{ y: [0, -4, 0] }} 
                transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                className="w-2 h-2 bg-label-tertiary rounded-full"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Input Area */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-t border-gray-100 bg-white px-4 py-3 pb-8 max-w-[402px] mx-auto w-full"
      >
        <div className="flex items-center gap-3">
          <motion.button 
            whileTap={{ scale: 0.9 }}
            className="w-10 h-10 rounded-full bg-fill-primary flex items-center justify-center"
          >
            <Plus size={20} className="text-label-secondary" />
          </motion.button>
          
          <div className="flex-1 flex items-center bg-surface-primary rounded-full px-4 py-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Message..."
              className="flex-1 bg-transparent outline-none text-[15px] text-label-primary placeholder:text-label-tertiary"
            />
            <div className="flex items-center gap-2 ml-2">
              <button className="text-label-secondary hover:text-label-primary transition-colors">
                <Camera size={20} />
              </button>
              <button className="text-label-secondary hover:text-label-primary transition-colors">
                <Mic size={20} />
              </button>
            </div>
          </div>
          
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={handleSendMessage}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              newMessage.trim() 
                ? 'bg-tint-primary text-white' 
                : 'bg-fill-primary text-label-disabled'
            }`}
          >
            <Send size={18} />
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
