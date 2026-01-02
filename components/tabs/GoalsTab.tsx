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
  X,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Palette,
  CreditCard,
  Target,
  Zap,
  Star,
  Heart,
  Coins,
  Share2
} from 'lucide-react'
import Header from '../Header'
import ChoresEarnSection from '../earn/ChoresEarnSection'
import ShareAchievementModal, { Achievement } from '../share/ShareAchievementModal'

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
  cardTheme?: CardTheme
}

interface CardTheme {
  gradient: string
  pattern: string
  accentColor: string
}

// Card customization options
const cardGradients = [
  { id: 'sunset', name: 'Sunset', gradient: 'from-orange-400 via-pink-500 to-purple-500' },
  { id: 'ocean', name: 'Ocean', gradient: 'from-cyan-400 via-blue-500 to-indigo-500' },
  { id: 'forest', name: 'Forest', gradient: 'from-green-400 via-emerald-500 to-teal-500' },
  { id: 'candy', name: 'Candy', gradient: 'from-pink-400 via-rose-400 to-red-400' },
  { id: 'night', name: 'Night', gradient: 'from-slate-700 via-purple-800 to-slate-900' },
  { id: 'gold', name: 'Gold', gradient: 'from-yellow-400 via-amber-500 to-orange-500' },
]

const cardPatterns = [
  { id: 'none', name: 'None', pattern: '' },
  { id: 'dots', name: 'Dots', pattern: 'bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:20px_20px]' },
  { id: 'lines', name: 'Lines', pattern: 'bg-[linear-gradient(45deg,_rgba(255,255,255,0.05)_25%,_transparent_25%,_transparent_50%,_rgba(255,255,255,0.05)_50%,_rgba(255,255,255,0.05)_75%,_transparent_75%)] bg-[length:20px_20px]' },
  { id: 'waves', name: 'Waves', pattern: 'bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.1)_0%,_transparent_50%)]' },
]

const goalEmojis = ['🎧', '🎮', '👟', '📱', '🎸', '⚽', '🎁', '✈️', '🎬', '📚', '🎨', '🎤', '🚴', '⌚', '💻', '🎹', '🛹', '🎿', '🏀', '🎯']

const quickAmounts = [100, 250, 500, 1000, 2500, 5000]

const deadlineOptions = [
  { label: '1 week', days: 7 },
  { label: '2 weeks', days: 14 },
  { label: '1 month', days: 30 },
  { label: '2 months', days: 60 },
  { label: '3 months', days: 90 },
  { label: '6 months', days: 180 },
]

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
  const [activeSection, setActiveSection] = useState<'goals' | 'earn'>('goals')
  
  // Share Achievement State
  const [showShareModal, setShowShareModal] = useState(false)
  const [achievementToShare, setAchievementToShare] = useState<Achievement | null>(null)
  
  // New Goal Wizard State
  const [wizardStep, setWizardStep] = useState(1)
  const [newGoalData, setNewGoalData] = useState({
    emoji: '🎯',
    name: '',
    amount: 0,
    motivation: '',
    deadline: '',
    deadlineDays: 30,
    cardGradient: cardGradients[0],
    cardPattern: cardPatterns[0],
  })

  const totalSteps = 4

  const openNewGoalWizard = () => {
    setShowNewGoal(true)
    setWizardStep(1)
    setNewGoalData({
      emoji: '🎯',
      name: '',
      amount: 0,
      motivation: '',
      deadline: '',
      deadlineDays: 30,
      cardGradient: cardGradients[0],
      cardPattern: cardPatterns[0],
    })
  }

  const closeNewGoalWizard = () => {
    setShowNewGoal(false)
    setWizardStep(1)
  }

  const nextStep = () => {
    if (wizardStep < totalSteps) {
      setWizardStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (wizardStep > 1) {
      setWizardStep(prev => prev - 1)
    }
  }

  const canProceed = () => {
    switch (wizardStep) {
      case 1: return newGoalData.name.trim().length > 0
      case 2: return newGoalData.amount > 0
      case 3: return newGoalData.deadlineDays > 0
      case 4: return true
      default: return false
    }
  }

  const formatDeadlineDate = (days: number) => {
    const date = new Date()
    date.setDate(date.getDate() + days)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const createGoal = () => {
    // Here you would save the goal
    console.log('Creating goal:', newGoalData)
    closeNewGoalWizard()
    // In a real app, you'd add the goal to state/database
  }

  // Handle sharing a completed goal
  const handleShareGoal = (goal: Goal) => {
    const achievement: Achievement = {
      id: goal.id,
      type: 'goal_completed',
      title: goal.name,
      description: `Saved ${goal.target} kr`,
      emoji: goal.emoji,
      xp: 100,
      date: 'Today',
      details: goal.motivation
    }
    setAchievementToShare(achievement)
    setShowShareModal(true)
  }

  const handleShareSubmit = (achievement: Achievement) => {
    console.log('Shared achievement:', achievement)
    // In a real app, this would send to the family feed
  }

  return (
    <div className="tab-content bg-background-primary">
      <Header title="Goals & Earn 🎯" showSettings={true} />
      
      <div className="p-4 space-y-5">
        {/* Section Tabs: Goals / Earn */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="surface-card p-1.5 flex gap-1"
        >
          <button
            onClick={() => setActiveSection('goals')}
            className={`flex-1 py-3 rounded-[8px] font-medium text-[15px] flex items-center justify-center gap-2 transition-all ${
              activeSection === 'goals'
                ? 'bg-tint-primary text-fixed-white shadow-sm'
                : 'text-label-secondary hover:bg-fill-primary'
            }`}
          >
            <Target size={18} />
            My Goals
          </button>
          <button
            onClick={() => setActiveSection('earn')}
            className={`flex-1 py-3 rounded-[8px] font-medium text-[15px] flex items-center justify-center gap-2 transition-all ${
              activeSection === 'earn'
                ? 'bg-tint-success text-fixed-white shadow-sm'
                : 'text-label-secondary hover:bg-fill-primary'
            }`}
          >
            <Coins size={18} />
            Earn
          </button>
        </motion.div>

        {/* Earn Section */}
        <AnimatePresence mode="wait">
          {activeSection === 'earn' && (
            <motion.div
              key="earn"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <ChoresEarnSection />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Goals Section */}
        <AnimatePresence mode="wait">
          {activeSection === 'goals' && (
            <motion.div
              key="goals"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-5"
            >
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3">
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
              </div>

              {/* Vippsi Tip */}
              <div className="surface-card p-4 border-2 border-[#FFD93D]/30">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-tint-primary flex items-center justify-center shrink-0">
                    <span className="text-lg">💡</span>
                  </div>
                  <div>
                    <p className="font-medium text-label-primary text-[14px] tracking-[-0.15px]">Vippsi Tip!</p>
                    <p className="text-[14px] text-label-secondary tracking-[-0.15px] mt-0.5">
                      Complete a chore to fund your AirPods goal faster! Check the Earn tab 💪
                    </p>
                  </div>
                </div>
              </div>

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
              <button
                onClick={openNewGoalWizard}
                className="w-full surface-card p-4 flex items-center justify-center gap-3 border-2 border-dashed border-tint-primary/30 hover:bg-tint-primary/5 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-tint-primary/10 flex items-center justify-center">
                  <Plus size={24} className="text-tint-primary" />
                </div>
                <span className="font-medium text-tint-primary text-[16px]">Add New Goal</span>
              </button>

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
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleShareGoal(goal)}
                            className="w-8 h-8 rounded-full bg-tint-primary/10 flex items-center justify-center hover:bg-tint-primary/20 transition-colors"
                            title="Share with family"
                          >
                            <Share2 size={16} className="text-tint-primary" />
                          </button>
                          <div className="w-8 h-8 rounded-full bg-tint-success flex items-center justify-center">
                            <Check size={18} className="text-fixed-white" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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

      {/* New Goal Wizard Modal */}
      <AnimatePresence>
        {showNewGoal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background-primary flex flex-col"
          >
            {/* Header */}
            <div className="p-4 pt-8 flex items-center justify-between">
              <button 
                onClick={wizardStep === 1 ? closeNewGoalWizard : prevStep}
                className="w-10 h-10 rounded-full bg-fill-primary flex items-center justify-center"
              >
                {wizardStep === 1 ? (
                  <X size={20} className="text-label-secondary" />
                ) : (
                  <ArrowLeft size={20} className="text-label-secondary" />
                )}
              </button>
              
              {/* Progress dots */}
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((step) => (
                  <motion.div
                    key={step}
                    className={`h-2 rounded-full transition-all ${
                      step === wizardStep 
                        ? 'w-8 bg-tint-primary' 
                        : step < wizardStep 
                          ? 'w-2 bg-tint-primary' 
                          : 'w-2 bg-fill-primary'
                    }`}
                    layoutId={`step-${step}`}
                  />
                ))}
              </div>

              <div className="w-10" /> {/* Spacer */}
            </div>

            {/* Step Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <AnimatePresence mode="wait">
                {/* Step 1: Title & Emoji */}
                {wizardStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-4"
                  >
                    <div className="text-center mb-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                        className="w-16 h-16 mx-auto rounded-full bg-tint-primary/10 flex items-center justify-center mb-3"
                      >
                        <Target size={32} className="text-tint-primary" />
                      </motion.div>
                      <h1 className="text-[22px] font-bold text-label-primary mb-1">What's your goal?</h1>
                      <p className="text-[14px] text-label-secondary">Choose an emoji and name for your saving goal</p>
                    </div>

                    {/* Emoji picker - horizontal scroll */}
                    <div>
                      <label className="text-[14px] font-medium text-label-primary block mb-3">
                        Pick an emoji
                      </label>
                      <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
                        {goalEmojis.map((emoji) => (
                          <motion.button
                            key={emoji}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setNewGoalData(prev => ({ ...prev, emoji }))}
                            className={`shrink-0 w-12 h-12 rounded-[14px] text-xl flex items-center justify-center transition-all ${
                              newGoalData.emoji === emoji 
                                ? 'bg-tint-primary/20 border-2 border-tint-primary ring-2 ring-tint-primary/20' 
                                : 'bg-fill-primary hover:bg-fill-secondary'
                            }`}
                          >
                            {emoji}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Goal name */}
                    <div>
                      <label className="text-[14px] font-medium text-label-primary block mb-2">
                        What are you saving for?
                      </label>
                      <input
                        type="text"
                        value={newGoalData.name}
                        onChange={(e) => setNewGoalData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g., AirPods, new game, concert tickets..."
                        className="w-full px-4 py-4 rounded-[16px] border-2 border-separator-primary bg-background-primary focus:border-tint-primary focus:ring-4 focus:ring-tint-primary/20 outline-none transition-all text-[18px]"
                      />
                    </div>

                    {/* Optional motivation */}
                    <div>
                      <label className="text-[14px] font-medium text-label-primary block mb-2">
                        Why do you want this? <span className="text-label-tertiary">(optional)</span>
                      </label>
                      <input
                        type="text"
                        value={newGoalData.motivation}
                        onChange={(e) => setNewGoalData(prev => ({ ...prev, motivation: e.target.value }))}
                        placeholder="e.g., To listen to music while studying..."
                        className="w-full px-4 py-3 rounded-[12px] border border-separator-primary bg-background-primary focus:border-tint-primary/50 outline-none transition-all text-[16px] text-label-secondary"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Amount */}
                {wizardStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                        className="w-20 h-20 mx-auto rounded-full bg-tint-success/10 flex items-center justify-center mb-4"
                      >
                        <span className="text-4xl">{newGoalData.emoji}</span>
                      </motion.div>
                      <h1 className="text-[24px] font-bold text-label-primary mb-2">How much do you need?</h1>
                      <p className="text-[16px] text-label-secondary">Set your target amount for "{newGoalData.name}"</p>
                    </div>

                    {/* Amount input */}
                    <div className="text-center">
                      <div className="relative inline-block">
                        <input
                          type="number"
                          value={newGoalData.amount || ''}
                          onChange={(e) => setNewGoalData(prev => ({ ...prev, amount: parseInt(e.target.value) || 0 }))}
                          placeholder="0"
                          className="text-[48px] font-bold text-center w-48 bg-transparent outline-none text-label-primary"
                        />
                        <span className="text-[24px] font-medium text-label-secondary ml-2">kr</span>
                      </div>
                    </div>

                    {/* Quick amounts */}
                    <div>
                      <label className="text-[14px] font-medium text-label-secondary block mb-3 text-center">
                        Quick select
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {quickAmounts.map((amount) => (
                          <motion.button
                            key={amount}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setNewGoalData(prev => ({ ...prev, amount }))}
                            className={`py-3 rounded-[12px] font-medium text-[16px] transition-all ${
                              newGoalData.amount === amount 
                                ? 'bg-tint-primary text-fixed-white' 
                                : 'bg-fill-primary text-label-primary hover:bg-fill-secondary'
                            }`}
                          >
                            {amount.toLocaleString()} kr
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Vippsi tip */}
                    {newGoalData.amount > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-3 p-4 bg-[#FFD93D]/10 rounded-[16px] border border-[#FFD93D]/30"
                      >
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-white shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src="/Vippsi.png" alt="Vippsi" className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="text-[14px] text-label-primary">
                            <strong>Vippsi says:</strong> If you save 50 kr per week, you'll reach your goal in about {Math.ceil(newGoalData.amount / 50)} weeks! 🚀
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Step 3: Deadline */}
                {wizardStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-8">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                        className="w-20 h-20 mx-auto rounded-full bg-tint-secondary/10 flex items-center justify-center mb-4"
                      >
                        <Calendar size={40} className="text-tint-secondary" />
                      </motion.div>
                      <h1 className="text-[24px] font-bold text-label-primary mb-2">When do you want it?</h1>
                      <p className="text-[16px] text-label-secondary">Set a deadline to stay motivated!</p>
                    </div>

                    {/* Deadline options */}
                    <div className="space-y-3">
                      {deadlineOptions.map((option) => {
                        const weeklyAmount = Math.ceil(newGoalData.amount / (option.days / 7))
                        const isSelected = newGoalData.deadlineDays === option.days
                        return (
                          <motion.button
                            key={option.days}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setNewGoalData(prev => ({ ...prev, deadlineDays: option.days }))}
                            className={`w-full p-4 rounded-[16px] text-left transition-all ${
                              isSelected 
                                ? 'bg-tint-secondary/10 border-2 border-tint-secondary' 
                                : 'bg-fill-primary border-2 border-transparent hover:bg-fill-secondary'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className={`font-semibold text-[16px] ${isSelected ? 'text-tint-secondary' : 'text-label-primary'}`}>
                                  {option.label}
                                </p>
                                <p className="text-[14px] text-label-secondary">
                                  by {formatDeadlineDate(option.days)}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className={`font-medium text-[14px] ${isSelected ? 'text-tint-secondary' : 'text-label-secondary'}`}>
                                  ~{weeklyAmount} kr/week
                                </p>
                                {isSelected && (
                                  <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                  >
                                    <Check size={20} className="text-tint-secondary ml-auto" />
                                  </motion.div>
                                )}
                              </div>
                            </div>
                          </motion.button>
                        )
                      })}
                    </div>

                    {/* Custom date option */}
                    <div className="pt-4 border-t border-separator-primary">
                      <label className="text-[14px] font-medium text-label-secondary block mb-2">
                        Or choose a specific date
                      </label>
                      <input
                        type="date"
                        value={newGoalData.deadline}
                        onChange={(e) => {
                          const selectedDate = new Date(e.target.value)
                          const today = new Date()
                          const diffDays = Math.ceil((selectedDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
                          setNewGoalData(prev => ({ ...prev, deadline: e.target.value, deadlineDays: diffDays }))
                        }}
                        className="w-full px-4 py-3 rounded-[12px] border border-separator-primary bg-background-primary focus:border-tint-secondary outline-none text-[16px]"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Card Customization */}
                {wizardStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    className="space-y-6"
                  >
                    <div className="text-center mb-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', delay: 0.2 }}
                        className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-pink-400 to-purple-500 flex items-center justify-center mb-4"
                      >
                        <Palette size={40} className="text-white" />
                      </motion.div>
                      <h1 className="text-[24px] font-bold text-label-primary mb-2">Design your card!</h1>
                      <p className="text-[16px] text-label-secondary">Make it yours with a custom look</p>
                    </div>

                    {/* Card Preview */}
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className={`relative h-48 rounded-[20px] bg-gradient-to-br ${newGoalData.cardGradient.gradient} ${newGoalData.cardPattern.pattern} overflow-hidden shadow-xl`}
                    >
                      {/* Card content */}
                      <div className="absolute inset-0 p-5 flex flex-col justify-between">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-4xl">{newGoalData.emoji}</span>
                          </div>
                          <div className="w-12 h-8 bg-white/20 rounded-md flex items-center justify-center">
                            <CreditCard size={20} className="text-white/80" />
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-white/80 text-[14px] mb-1">Saving for</p>
                          <p className="text-white font-bold text-[20px]">{newGoalData.name || 'Your Goal'}</p>
                          <div className="flex items-baseline gap-1 mt-2">
                            <span className="text-white font-bold text-[24px]">{newGoalData.amount.toLocaleString()}</span>
                            <span className="text-white/80 text-[14px]">kr</span>
                          </div>
                        </div>
                      </div>

                      {/* Decorative elements */}
                      <div className="absolute top-4 right-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
                      <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-lg" />
                    </motion.div>

                    {/* Gradient picker */}
                    <div>
                      <label className="text-[14px] font-medium text-label-primary block mb-3">
                        Choose a style
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {cardGradients.map((gradient) => (
                          <motion.button
                            key={gradient.id}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setNewGoalData(prev => ({ ...prev, cardGradient: gradient }))}
                            className={`relative h-16 rounded-[12px] bg-gradient-to-br ${gradient.gradient} overflow-hidden transition-all ${
                              newGoalData.cardGradient.id === gradient.id 
                                ? 'ring-4 ring-tint-primary ring-offset-2' 
                                : ''
                            }`}
                          >
                            {newGoalData.cardGradient.id === gradient.id && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute inset-0 flex items-center justify-center bg-black/20"
                              >
                                <Check size={24} className="text-white" />
                              </motion.div>
                            )}
                            <span className="absolute bottom-1 left-2 text-[10px] text-white/80 font-medium">
                              {gradient.name}
                            </span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    {/* Pattern picker */}
                    <div>
                      <label className="text-[14px] font-medium text-label-primary block mb-3">
                        Add a pattern
                      </label>
                      <div className="flex gap-3">
                        {cardPatterns.map((pattern) => (
                          <motion.button
                            key={pattern.id}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setNewGoalData(prev => ({ ...prev, cardPattern: pattern }))}
                            className={`flex-1 py-3 rounded-[12px] font-medium text-[14px] transition-all ${
                              newGoalData.cardPattern.id === pattern.id 
                                ? 'bg-tint-primary text-fixed-white' 
                                : 'bg-fill-primary text-label-primary hover:bg-fill-secondary'
                            }`}
                          >
                            {pattern.name}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom action button */}
            <div className="p-6 bg-background-primary border-t border-separator-primary">
              {wizardStep < totalSteps ? (
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className={`w-full py-4 rounded-[16px] font-semibold text-[16px] flex items-center justify-center gap-2 transition-all ${
                    canProceed() 
                      ? 'bg-tint-primary text-fixed-white hover:opacity-90' 
                      : 'bg-fill-primary text-label-disabled'
                  }`}
                >
                  Continue
                  <ArrowRight size={20} />
                </motion.button>
              ) : (
                <motion.button
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={createGoal}
                  className="w-full py-4 bg-gradient-to-r from-tint-primary to-tint-secondary text-fixed-white font-semibold rounded-[16px] shadow-lg text-[16px] flex items-center justify-center gap-2"
                >
                  <Sparkles size={20} />
                  Create My Goal!
                </motion.button>
              )}

              {/* Step indicator text */}
              <p className="text-center text-[14px] text-label-secondary mt-3">
                Step {wizardStep} of {totalSteps}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Achievement Modal */}
      <ShareAchievementModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        achievement={achievementToShare}
        onShare={handleShareSubmit}
      />
    </div>
  )
}
