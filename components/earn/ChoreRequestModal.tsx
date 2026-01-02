'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  ArrowLeft, 
  ArrowRight,
  Sparkles,
  Target,
  Coins,
  Check
} from 'lucide-react'
import { Chore } from './ChoresEarnSection'

interface ChoreRequestModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (chore: Omit<Chore, 'id' | 'status' | 'createdAt'>) => void
  suggestedChores: Chore[]
}

const choreEmojis = ['🐕', '🍽️', '🧹', '🗑️', '👕', '🚗', '🌱', '🛒', '📦', '🐱', '🪴', '🚿', '🛏️', '📚', '🧺']

const quickAmounts = [15, 25, 30, 50, 75, 100]

const goals = [
  { id: 1, name: 'AirPods', emoji: '🎧' },
  { id: 2, name: 'New Game', emoji: '🎮' },
  { id: 3, name: 'Movie Ticket', emoji: '🎬' },
]

export default function ChoreRequestModal({ 
  isOpen, 
  onClose, 
  onSubmit,
  suggestedChores 
}: ChoreRequestModalProps) {
  const [step, setStep] = useState(1)
  const [selectedSuggested, setSelectedSuggested] = useState<Chore | null>(null)
  const [choreData, setChoreData] = useState({
    title: '',
    emoji: '🧹',
    reward: 0,
    goalId: undefined as number | undefined,
    goalName: undefined as string | undefined,
    xpReward: 0,
  })

  const totalSteps = 3

  const resetAndClose = () => {
    setStep(1)
    setSelectedSuggested(null)
    setChoreData({
      title: '',
      emoji: '🧹',
      reward: 0,
      goalId: undefined,
      goalName: undefined,
      xpReward: 0,
    })
    onClose()
  }

  const selectSuggested = (chore: Chore) => {
    setSelectedSuggested(chore)
    setChoreData({
      title: chore.title,
      emoji: chore.emoji,
      reward: chore.reward,
      goalId: undefined,
      goalName: undefined,
      xpReward: chore.xpReward,
    })
    setStep(3) // Skip to goal selection
  }

  const canProceed = () => {
    switch (step) {
      case 1: return choreData.title.trim().length > 0
      case 2: return choreData.reward > 0
      case 3: return true
      default: return false
    }
  }

  const handleSubmit = () => {
    // Calculate XP based on reward if not from suggestion
    const xpReward = choreData.xpReward || Math.floor(choreData.reward / 2)
    
    onSubmit({
      ...choreData,
      xpReward,
    })
    resetAndClose()
  }

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(prev => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(prev => prev - 1)
    }
  }

  const selectGoal = (goal: typeof goals[0] | null) => {
    if (goal) {
      setChoreData(prev => ({
        ...prev,
        goalId: goal.id,
        goalName: goal.name,
      }))
    } else {
      setChoreData(prev => ({
        ...prev,
        goalId: undefined,
        goalName: undefined,
      }))
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-background-primary flex flex-col"
      >
        {/* Header */}
        <div className="p-4 pt-8 flex items-center justify-between">
          <button 
            onClick={step === 1 ? resetAndClose : prevStep}
            className="w-10 h-10 rounded-full bg-fill-primary flex items-center justify-center"
          >
            {step === 1 ? (
              <X size={20} className="text-label-secondary" />
            ) : (
              <ArrowLeft size={20} className="text-label-secondary" />
            )}
          </button>
          
          {/* Progress dots */}
          <div className="flex gap-2">
            {[1, 2, 3].map((s) => (
              <motion.div
                key={s}
                className={`h-2 rounded-full transition-all ${
                  s === step 
                    ? 'w-8 bg-tint-primary' 
                    : s < step 
                      ? 'w-2 bg-tint-primary' 
                      : 'w-2 bg-fill-primary'
                }`}
              />
            ))}
          </div>

          <div className="w-10" />
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <AnimatePresence mode="wait">
            {/* Step 1: Choose or Create Chore */}
            {step === 1 && (
              <motion.div
                key="step1"
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
                    className="w-16 h-16 mx-auto rounded-full bg-tint-success/10 flex items-center justify-center mb-3"
                  >
                    <Coins size={32} className="text-tint-success" />
                  </motion.div>
                  <h1 className="text-[22px] font-bold text-label-primary mb-1">What can you do?</h1>
                  <p className="text-[14px] text-label-secondary">Choose a suggested chore or create your own</p>
                </div>

                {/* Suggested Chores */}
                <div>
                  <label className="text-[14px] font-medium text-label-primary block mb-3">
                    Quick picks
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {suggestedChores.slice(0, 4).map(chore => (
                      <motion.button
                        key={chore.id}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => selectSuggested(chore)}
                        className="p-3 surface-card rounded-[12px] text-left hover:bg-fill-primary transition-colors"
                      >
                        <span className="text-2xl block mb-1">{chore.emoji}</span>
                        <p className="text-[14px] font-medium text-label-primary">{chore.title}</p>
                        <p className="text-[12px] text-tint-success font-medium">+{chore.reward} kr</p>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-separator-primary" />
                  <span className="text-[12px] text-label-secondary">or create your own</span>
                  <div className="flex-1 h-px bg-separator-primary" />
                </div>

                {/* Emoji picker */}
                <div>
                  <label className="text-[14px] font-medium text-label-primary block mb-2">
                    Pick an emoji
                  </label>
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {choreEmojis.map(emoji => (
                      <motion.button
                        key={emoji}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setChoreData(prev => ({ ...prev, emoji }))}
                        className={`shrink-0 w-11 h-11 rounded-[10px] text-xl flex items-center justify-center transition-all ${
                          choreData.emoji === emoji 
                            ? 'bg-tint-primary/20 border-2 border-tint-primary' 
                            : 'bg-fill-primary hover:bg-fill-secondary'
                        }`}
                      >
                        {emoji}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Chore name */}
                <div>
                  <label className="text-[14px] font-medium text-label-primary block mb-2">
                    What's the chore?
                  </label>
                  <input
                    type="text"
                    value={choreData.title}
                    onChange={(e) => setChoreData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Wash the car, babysit..."
                    className="w-full px-4 py-4 rounded-[14px] border-2 border-separator-primary bg-background-primary focus:border-tint-primary focus:ring-4 focus:ring-tint-primary/20 outline-none transition-all text-[17px]"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 2: Suggest Amount */}
            {step === 2 && (
              <motion.div
                key="step2"
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
                    className="w-16 h-16 mx-auto rounded-full bg-tint-success/10 flex items-center justify-center mb-3"
                  >
                    <span className="text-3xl">{choreData.emoji}</span>
                  </motion.div>
                  <h1 className="text-[22px] font-bold text-label-primary mb-1">How much is it worth?</h1>
                  <p className="text-[14px] text-label-secondary">Suggest an amount for "{choreData.title}"</p>
                </div>

                {/* Amount input */}
                <div className="text-center">
                  <div className="relative inline-block">
                    <input
                      type="number"
                      value={choreData.reward || ''}
                      onChange={(e) => setChoreData(prev => ({ ...prev, reward: parseInt(e.target.value) || 0 }))}
                      placeholder="0"
                      className="text-[48px] font-bold text-center w-40 bg-transparent outline-none text-label-primary"
                    />
                    <span className="text-[24px] font-medium text-label-secondary ml-1">kr</span>
                  </div>
                </div>

                {/* Quick amounts */}
                <div>
                  <label className="text-[14px] font-medium text-label-secondary block mb-3 text-center">
                    Quick select
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {quickAmounts.map(amount => (
                      <motion.button
                        key={amount}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setChoreData(prev => ({ ...prev, reward: amount }))}
                        className={`py-3 rounded-[12px] font-medium text-[16px] transition-all ${
                          choreData.reward === amount 
                            ? 'bg-tint-success text-fixed-white' 
                            : 'bg-fill-primary text-label-primary hover:bg-fill-secondary'
                        }`}
                      >
                        {amount} kr
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Vippsi tip */}
                {choreData.reward > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 p-4 bg-tint-primary/10 rounded-[14px] border border-tint-primary/20"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-white shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src="/Vippsi.png" alt="Vippsi" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-[14px] text-label-primary">
                        <strong>Vippsi tip:</strong> Parents usually approve fair amounts. Your suggestion looks good! 👍
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Step 3: Link to Goal (Optional) */}
            {step === 3 && (
              <motion.div
                key="step3"
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
                    className="w-16 h-16 mx-auto rounded-full bg-tint-secondary/10 flex items-center justify-center mb-3"
                  >
                    <Target size={32} className="text-tint-secondary" />
                  </motion.div>
                  <h1 className="text-[22px] font-bold text-label-primary mb-1">Fund a goal?</h1>
                  <p className="text-[14px] text-label-secondary">Send the money straight to a saving goal</p>
                </div>

                {/* Summary card */}
                <div className="surface-card p-4 rounded-[14px]">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{choreData.emoji}</span>
                    <div className="flex-1">
                      <p className="font-medium text-label-primary">{choreData.title}</p>
                      <p className="text-[14px] text-tint-success font-medium">+{choreData.reward} kr</p>
                    </div>
                  </div>
                </div>

                {/* Goal options */}
                <div className="space-y-2">
                  {goals.map(goal => (
                    <motion.button
                      key={goal.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => selectGoal(goal)}
                      className={`w-full p-4 rounded-[14px] flex items-center gap-3 transition-all ${
                        choreData.goalId === goal.id
                          ? 'bg-tint-secondary/10 border-2 border-tint-secondary'
                          : 'surface-card border-2 border-transparent hover:border-tint-secondary/30'
                      }`}
                    >
                      <span className="text-2xl">{goal.emoji}</span>
                      <span className="font-medium text-label-primary text-[16px] flex-1 text-left">{goal.name}</span>
                      {choreData.goalId === goal.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                        >
                          <Check size={20} className="text-tint-secondary" />
                        </motion.div>
                      )}
                    </motion.button>
                  ))}

                  {/* No goal option */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => selectGoal(null)}
                    className={`w-full p-4 rounded-[14px] flex items-center gap-3 transition-all ${
                      choreData.goalId === undefined
                        ? 'bg-fill-primary border-2 border-label-tertiary'
                        : 'surface-card border-2 border-transparent hover:border-separator-primary'
                    }`}
                  >
                    <span className="text-2xl">💰</span>
                    <span className="font-medium text-label-secondary text-[16px] flex-1 text-left">Add to my balance</span>
                    {choreData.goalId === undefined && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <Check size={20} className="text-label-secondary" />
                      </motion.div>
                    )}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom action button */}
        <div className="p-6 bg-background-primary border-t border-separator-primary">
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={nextStep}
            disabled={!canProceed()}
            className={`w-full py-4 rounded-[14px] font-semibold text-[16px] flex items-center justify-center gap-2 transition-all ${
              canProceed() 
                ? step === 3 
                  ? 'bg-gradient-to-r from-tint-success to-emerald-500 text-fixed-white shadow-lg'
                  : 'bg-tint-primary text-fixed-white hover:opacity-90' 
                : 'bg-fill-primary text-label-disabled'
            }`}
          >
            {step === 3 ? (
              <>
                <Sparkles size={20} />
                Send Request to Parent
              </>
            ) : (
              <>
                Continue
                <ArrowRight size={20} />
              </>
            )}
          </motion.button>

          <p className="text-center text-[14px] text-label-secondary mt-3">
            Step {step} of {totalSteps}
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

