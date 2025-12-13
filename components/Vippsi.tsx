'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, MessageCircle, Lightbulb, Calendar, TrendingUp, ChevronLeft, ChevronRight, Share2, Star, Target, Flame, Gift, PiggyBank, Trophy, Heart, Send, RefreshCw, ThumbsUp, Zap } from 'lucide-react'

interface VippsiProps {
  context?: string
  tip?: string
}

interface YearSlide {
  id: number
  type: 'intro' | 'stat' | 'achievement' | 'highlight' | 'outro'
  gradient: string
  title: string
  value?: string
  subtitle?: string
  emoji?: string
  details?: string[]
}

interface ChatMessage {
  id: number
  sender: 'vippsi' | 'user'
  text: string
  emoji?: string
  isTyping?: boolean
}

interface SavingTip {
  title: string
  tip: string
  emoji: string
  category: string
  action?: string
}

const savingTips: SavingTip[] = [
  {
    title: "The 24-Hour Rule 🕐",
    tip: "Before buying something you want (not need), wait 24 hours. If you still want it tomorrow, then decide! This helps avoid impulse buys.",
    emoji: "⏰",
    category: "Spending",
    action: "Try it next time you see something cool!"
  },
  {
    title: "The Piggy Bank Challenge 🐷",
    tip: "Every time you get coins as change, put them in a jar. At the end of the month, count your treasure! You'd be surprised how much you save.",
    emoji: "🪙",
    category: "Saving",
    action: "Start your coin collection today!"
  },
  {
    title: "Round-Up Savings 📈",
    tip: "When you spend 37 kr, mentally round it to 40 kr and save those 3 kr. Small amounts add up to BIG savings!",
    emoji: "🔢",
    category: "Saving",
    action: "I can track this for you automatically!"
  },
  {
    title: "The No-Spend Day 🚫",
    tip: "Pick one day a week where you don't spend any money. It's like a fun challenge! See how creative you can be.",
    emoji: "🎯",
    category: "Challenge",
    action: "Want me to remind you every week?"
  },
  {
    title: "Pack Your Snacks 🍎",
    tip: "Buying snacks at school adds up fast! If you spend 20 kr daily, that's 400 kr monthly. Packing snacks could save you half!",
    emoji: "🎒",
    category: "Food",
    action: "Let's track your snack spending!"
  },
  {
    title: "The 50/30/20 Rule 💡",
    tip: "When you get money, split it: 50% for things you need, 30% for fun stuff, and 20% goes straight to savings!",
    emoji: "📊",
    category: "Budgeting",
    action: "Want me to help you set this up?"
  },
  {
    title: "Subscription Check 🔍",
    tip: "Do you have apps or games you pay for monthly but don't use? Even 29 kr/month is 348 kr/year! Review what you really need.",
    emoji: "📱",
    category: "Spending",
    action: "Let's review your subscriptions!"
  },
  {
    title: "Goal Visualization 🎯",
    tip: "Put a picture of what you're saving for where you'll see it daily. It makes saving feel more real and motivating!",
    emoji: "🖼️",
    category: "Motivation",
    action: "Add a picture to your goal?"
  },
  {
    title: "The Savings Race 🏁",
    tip: "Challenge a friend or sibling to a savings race! Who can save more this month? Make it fun with a small prize!",
    emoji: "🏆",
    category: "Fun",
    action: "Invite a friend to compete!"
  },
  {
    title: "DIY Before You Buy 🛠️",
    tip: "Before buying something, ask: 'Can I make this myself or find it for free?' You'd be amazed what you can create!",
    emoji: "✂️",
    category: "Creative",
    action: "Try a DIY project this week!"
  },
]

const quickResponses = [
  { text: "Give me another tip! 💡", emoji: "💡" },
  { text: "How much can I save? 🤔", emoji: "🤔" },
  { text: "That's helpful! 👍", emoji: "👍" },
  { text: "Tell me more!", emoji: "✨" },
]

const yearInVippsiSlides: YearSlide[] = [
  {
    id: 1,
    type: 'intro',
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-500',
    title: 'Your 2024',
    subtitle: 'in Vippsi',
    emoji: '✨',
  },
  {
    id: 2,
    type: 'stat',
    gradient: 'from-emerald-400 to-teal-500',
    title: 'You Saved',
    value: '3,450 kr',
    subtitle: 'That\'s amazing! 🎉',
    emoji: '💰',
    details: ['Your biggest month was August', 'You saved 15% more than last year!'],
  },
  {
    id: 3,
    type: 'stat',
    gradient: 'from-orange-400 to-rose-500',
    title: 'Goals Crushed',
    value: '4',
    subtitle: 'Out of 5 goals completed!',
    emoji: '🎯',
    details: ['AirPods ✓', 'Birthday Gift for Mom ✓', 'Video Game ✓', 'Concert Tickets ✓'],
  },
  {
    id: 4,
    type: 'stat',
    gradient: 'from-amber-400 to-orange-500',
    title: 'Learning Streak',
    value: '42 days',
    subtitle: 'Your longest streak! 🔥',
    emoji: '📚',
    details: ['You completed 18 lessons', 'Earned 1,240 XP total'],
  },
  {
    id: 5,
    type: 'achievement',
    gradient: 'from-pink-500 to-rose-500',
    title: 'Top Achievement',
    value: 'Super Saver',
    subtitle: 'Saved 3 months in a row! 🏆',
    emoji: '🌟',
  },
  {
    id: 6,
    type: 'highlight',
    gradient: 'from-blue-400 to-indigo-500',
    title: 'Your Best Month',
    value: 'August',
    subtitle: 'You saved 890 kr! 💪',
    emoji: '📅',
    details: ['That\'s 3x your average!', 'You also earned 5 badges'],
  },
  {
    id: 7,
    type: 'stat',
    gradient: 'from-cyan-400 to-blue-500',
    title: 'Badges Earned',
    value: '12',
    subtitle: 'You\'re a collector! ✨',
    emoji: '🏅',
    details: ['Goal Getter', 'Money Master', 'Quiz Champion', '+ 9 more'],
  },
  {
    id: 8,
    type: 'outro',
    gradient: 'from-violet-500 via-purple-500 to-pink-500',
    title: 'Amazing Year!',
    subtitle: 'Keep it going in 2025! 🚀',
    emoji: '🎉',
    details: ['You\'re in the top 10% of savers!', 'Vippsi is proud of you!'],
  },
]

export default function Vippsi({ context = 'home', tip }: VippsiProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isHappy, setIsHappy] = useState(false)
  const [showYearInVippsi, setShowYearInVippsi] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideProgress, setSlideProgress] = useState(0)
  
  // Saving Tips Chat state
  const [showSavingTips, setShowSavingTips] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [usedTipIndices, setUsedTipIndices] = useState<number[]>([])
  const [isVippsiTyping, setIsVippsiTyping] = useState(false)
  const [tipCount, setTipCount] = useState(0)

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

  // Auto-advance slides
  useEffect(() => {
    if (!showYearInVippsi) return
    
    let progressInterval: NodeJS.Timeout | null = null
    
    progressInterval = setInterval(() => {
      setSlideProgress(prev => {
        if (prev >= 100) {
          // Move to next slide
          setCurrentSlide(c => {
            if (c < yearInVippsiSlides.length - 1) {
              return c + 1
            }
            // Clear interval when we reach the end
            if (progressInterval) clearInterval(progressInterval)
            return c
          })
          return 0
        }
        return prev + 2
      })
    }, 100)

    return () => {
      if (progressInterval) clearInterval(progressInterval)
    }
  }, [showYearInVippsi, currentSlide])

  const goToNextSlide = () => {
    if (currentSlide < yearInVippsiSlides.length - 1) {
      setCurrentSlide(prev => prev + 1)
      setSlideProgress(0)
    }
  }

  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1)
      setSlideProgress(0)
    }
  }

  const openYearInVippsi = () => {
    setShowYearInVippsi(true)
    setCurrentSlide(0)
    setSlideProgress(0)
    setIsOpen(false)
  }

  const closeYearInVippsi = () => {
    setShowYearInVippsi(false)
    setCurrentSlide(0)
    setSlideProgress(0)
  }

  // Saving Tips functions
  const getRandomTip = (): SavingTip => {
    const availableIndices = savingTips.map((_, i) => i).filter(i => !usedTipIndices.includes(i))
    if (availableIndices.length === 0) {
      // Reset if we've used all tips
      setUsedTipIndices([])
      return savingTips[Math.floor(Math.random() * savingTips.length)]
    }
    const randomIndex = availableIndices[Math.floor(Math.random() * availableIndices.length)]
    setUsedTipIndices(prev => [...prev, randomIndex])
    return savingTips[randomIndex]
  }

  const openSavingTips = () => {
    setShowSavingTips(true)
    setIsOpen(false)
    setChatMessages([])
    setTipCount(0)
    
    // Start with Vippsi greeting
    setTimeout(() => {
      setChatMessages([{
        id: 1,
        sender: 'vippsi',
        text: "Hey! 👋 Ready to learn some awesome saving tips? I've got tons of secrets to share!",
        emoji: "💡"
      }])
      
      // Then give first tip
      setTimeout(() => {
        setIsVippsiTyping(true)
        setTimeout(() => {
          setIsVippsiTyping(false)
          const tip = getRandomTip()
          setChatMessages(prev => [...prev, {
            id: 2,
            sender: 'vippsi',
            text: `**${tip.title}**\n\n${tip.tip}`,
            emoji: tip.emoji
          }])
          setTipCount(1)
          
          // Add action prompt
          if (tip.action) {
            setTimeout(() => {
              setChatMessages(prev => [...prev, {
                id: 3,
                sender: 'vippsi',
                text: `💪 ${tip.action}`,
                emoji: "💪"
              }])
            }, 500)
          }
        }, 1500)
      }, 1000)
    }, 300)
  }

  const closeSavingTips = () => {
    setShowSavingTips(false)
    setChatMessages([])
    setTipCount(0)
  }

  const handleQuickResponse = (response: string) => {
    // Add user message
    const newId = chatMessages.length + 1
    setChatMessages(prev => [...prev, {
      id: newId,
      sender: 'user',
      text: response
    }])

    // Vippsi responds
    setTimeout(() => {
      setIsVippsiTyping(true)
      
      setTimeout(() => {
        setIsVippsiTyping(false)
        
        if (response.includes("another tip") || response.includes("Tell me more")) {
          const tip = getRandomTip()
          setTipCount(prev => prev + 1)
          
          const responses = [
            "Ooh, you want more? I love it! Here's another one:",
            "Great choice! This one's really good:",
            "You're on a roll! Check this out:",
            "Love your enthusiasm! Try this:",
          ]
          
          setChatMessages(prev => [...prev, {
            id: prev.length + 1,
            sender: 'vippsi',
            text: responses[Math.floor(Math.random() * responses.length)],
            emoji: "✨"
          }])
          
          setTimeout(() => {
            setChatMessages(prev => [...prev, {
              id: prev.length + 1,
              sender: 'vippsi',
              text: `**${tip.title}**\n\n${tip.tip}`,
              emoji: tip.emoji
            }])
            
            if (tip.action) {
              setTimeout(() => {
                setChatMessages(prev => [...prev, {
                  id: prev.length + 1,
                  sender: 'vippsi',
                  text: `💪 ${tip.action}`,
                  emoji: "💪"
                }])
              }, 500)
            }
          }, 800)
        } else if (response.includes("How much")) {
          setChatMessages(prev => [...prev, {
            id: prev.length + 1,
            sender: 'vippsi',
            text: "Great question! Based on your spending, if you try these tips you could save around **200-400 kr** extra per month! 📈 That's over **2,400 kr a year** - enough for something really cool!",
            emoji: "💰"
          }])
        } else if (response.includes("helpful") || response.includes("👍")) {
          const encouragements = [
            "Yay! I'm so glad! 🎉 Remember, small steps lead to big savings. You've got this!",
            "That makes me happy! 😊 You're already thinking smarter about money!",
            "Woohoo! 🌟 Every tip you try brings you closer to your goals!",
          ]
          setChatMessages(prev => [...prev, {
            id: prev.length + 1,
            sender: 'vippsi',
            text: encouragements[Math.floor(Math.random() * encouragements.length)],
            emoji: "🎉"
          }])
        }
      }, 1200)
    }, 300)
  }

  const currentSlideData = yearInVippsiSlides[currentSlide] || yearInVippsiSlides[0]

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
                    const isYearInVippsi = suggestion.text === "My Year in Vippsi"
                    const isSavingTip = suggestion.text === "Give me a saving tip"
                    return (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="surface-card p-4 rounded-[12px] flex flex-col items-center gap-2 hover:bg-gray-100 transition-colors"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          if (isYearInVippsi) {
                            openYearInVippsi()
                          } else if (isSavingTip) {
                            openSavingTips()
                          }
                        }}
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
                  <button 
                    onClick={openYearInVippsi}
                    className="w-full py-3 bg-tint-secondary text-fixed-white font-medium rounded-[12px] hover:opacity-90 transition-opacity text-[16px]"
                  >
                    View Summary ✨
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Year in Vippsi Experience */}
      <AnimatePresence>
        {showYearInVippsi && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col"
          >
            {/* Background gradient */}
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.gradient}`}
            />

            {/* Animated particles/sparkles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white/30 rounded-full"
                  initial={{
                    x: Math.random() * 400,
                    y: Math.random() * 800,
                    scale: Math.random() * 0.5 + 0.5,
                  }}
                  animate={{
                    y: [null, -100],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: Math.random() * 3 + 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>

            {/* Top bar with progress indicators */}
            <div className="relative z-10 p-4 pt-8">
              <div className="flex gap-1.5 mb-4">
                {yearInVippsiSlides.map((_, index) => (
                  <div
                    key={index}
                    className="flex-1 h-1 rounded-full bg-white/30 overflow-hidden"
                  >
                    <motion.div
                      className="h-full bg-white rounded-full"
                      initial={{ width: 0 }}
                      animate={{ 
                        width: index < currentSlide ? '100%' : 
                               index === currentSlide ? `${slideProgress}%` : '0%' 
                      }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                ))}
              </div>

              {/* Close and share buttons */}
              <div className="flex items-center justify-between">
                <button
                  onClick={closeYearInVippsi}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                >
                  <X size={20} className="text-white" />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Share2 size={18} className="text-white" />
                </button>
              </div>
            </div>

            {/* Main content area - tappable for navigation */}
            <div className="relative flex-1 flex items-center justify-center px-6">
              {/* Left tap zone */}
              <button
                onClick={goToPrevSlide}
                className="absolute left-0 top-0 bottom-0 w-1/3 z-10"
                aria-label="Previous slide"
              />
              
              {/* Right tap zone */}
              <button
                onClick={goToNextSlide}
                className="absolute right-0 top-0 bottom-0 w-1/3 z-10"
                aria-label="Next slide"
              />

              {/* Slide content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="text-center max-w-[320px]"
                >
                  {/* Emoji/Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
                    className="text-8xl mb-6"
                  >
                    {currentSlideData.emoji}
                  </motion.div>

                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-white text-[28px] font-bold mb-2"
                  >
                    {currentSlideData.title}
                  </motion.h1>

                  {/* Main value (for stat slides) */}
                  {currentSlideData.value && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: 'spring', delay: 0.4, stiffness: 150 }}
                      className="text-white text-[64px] font-bold mb-2 leading-none"
                    >
                      {currentSlideData.value}
                    </motion.div>
                  )}

                  {/* Subtitle */}
                  {currentSlideData.subtitle && (
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-white/90 text-[20px] font-medium mb-6"
                    >
                      {currentSlideData.subtitle}
                    </motion.p>
                  )}

                  {/* Details */}
                  {currentSlideData.details && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="bg-white/20 backdrop-blur-sm rounded-[16px] p-4 mt-4"
                    >
                      {currentSlideData.details.map((detail, i) => (
                        <motion.p
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + i * 0.1 }}
                          className="text-white text-[16px] py-1"
                        >
                          {detail}
                        </motion.p>
                      ))}
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom navigation */}
            <div className="relative z-10 p-6 pb-10">
              {/* Vippsi avatar */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex items-center justify-center gap-3 mb-4"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden bg-white shadow-lg border-2 border-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/Vippsi.png"
                    alt="Vippsi"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-white font-medium text-[16px]">Your Year in Vippsi 2024</span>
              </motion.div>

              {/* Navigation arrows on final slide */}
              {currentSlide === yearInVippsiSlides.length - 1 && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  onClick={closeYearInVippsi}
                  className="w-full py-4 bg-white text-gray-800 font-semibold rounded-[16px] shadow-lg text-[16px] flex items-center justify-center gap-2"
                >
                  <Star size={20} className="text-tint-secondary" />
                  Let's Make 2025 Even Better!
                </motion.button>
              )}

              {/* Navigation hint */}
              {currentSlide < yearInVippsiSlides.length - 1 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="text-white/70 text-center text-[14px]"
                >
                  Tap to continue →
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Saving Tips Chat Experience */}
      <AnimatePresence>
        {showSavingTips && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col bg-gradient-to-b from-[#FFD93D]/20 via-white to-white"
          >
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-sm border-b border-separator-primary p-4 pt-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-12 h-12 rounded-full overflow-hidden bg-white shadow-md border-2 border-[#FFD93D]"
                    animate={{ rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/Vippsi.png"
                      alt="Vippsi"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div>
                    <h2 className="font-semibold text-[18px] text-label-primary flex items-center gap-2">
                      Saving Tips
                      <Lightbulb size={18} className="text-[#FFD93D]" />
                    </h2>
                    <p className="text-[14px] text-label-secondary">Chat with Vippsi</p>
                  </div>
                </div>
                <button 
                  onClick={closeSavingTips}
                  className="w-10 h-10 rounded-full bg-fill-primary flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X size={20} className="text-label-secondary" />
                </button>
              </div>
              
              {/* Tip counter */}
              {tipCount > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 flex items-center justify-center gap-2"
                >
                  <div className="px-3 py-1 bg-[#FFD93D]/20 rounded-full flex items-center gap-1.5">
                    <Zap size={14} className="text-[#FFD93D]" />
                    <span className="text-[12px] font-medium text-label-primary">{tipCount} tip{tipCount > 1 ? 's' : ''} learned!</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Chat messages area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {chatMessages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.sender === 'vippsi' && (
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-white shadow-sm border border-[#FFD93D]/30 mr-2 shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/Vippsi.png"
                          alt="Vippsi"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className={`max-w-[80%] ${
                      message.sender === 'user' 
                        ? 'bg-tint-primary text-fixed-white rounded-[16px] rounded-br-[4px]' 
                        : 'bg-fill-primary text-label-primary rounded-[16px] rounded-bl-[4px]'
                    } p-4`}>
                      {message.text.includes('**') ? (
                        <div className="space-y-2">
                          {message.text.split('\n\n').map((part, i) => (
                            <p key={i} className={`text-[15px] ${
                              part.includes('**') ? 'font-semibold' : ''
                            }`}>
                              {part.replace(/\*\*/g, '')}
                            </p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[15px]">{message.text}</p>
                      )}
                    </div>
                    {message.sender === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-tint-primary/20 ml-2 shrink-0 flex items-center justify-center">
                        <span className="text-sm">😊</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {isVippsiTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-white shadow-sm border border-[#FFD93D]/30 mr-2 shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/Vippsi.png"
                      alt="Vippsi"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="bg-fill-primary rounded-[16px] rounded-bl-[4px] px-4 py-3">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-label-secondary rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-label-secondary rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-label-secondary rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick response buttons */}
            <div className="p-4 bg-white border-t border-separator-primary">
              <div className="flex flex-wrap gap-2 mb-3">
                {quickResponses.map((response, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    onClick={() => handleQuickResponse(response.text)}
                    disabled={isVippsiTyping}
                    className={`px-4 py-2 rounded-full text-[14px] font-medium transition-all ${
                      isVippsiTyping 
                        ? 'bg-fill-primary text-label-disabled' 
                        : 'bg-[#FFD93D]/20 text-label-primary hover:bg-[#FFD93D]/30 active:scale-95'
                    }`}
                  >
                    {response.text}
                  </motion.button>
                ))}
              </div>

              {/* Motivational footer */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex items-center justify-center gap-2 text-[12px] text-label-secondary"
              >
                <PiggyBank size={14} className="text-tint-primary" />
                <span>Every tip could save you 100+ kr!</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
