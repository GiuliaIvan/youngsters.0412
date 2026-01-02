'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Plus, 
  Check, 
  Clock, 
  ChevronRight,
  Sparkles,
  Coins,
  CheckCircle,
  XCircle,
  AlertCircle,
  Zap,
  Target
} from 'lucide-react'
import ChoreRequestModal from './ChoreRequestModal'
import GuardianApprovalModal from './GuardianApprovalModal'

export interface Chore {
  id: number
  title: string
  emoji: string
  reward: number
  status: 'suggested' | 'pending_approval' | 'approved' | 'completed' | 'confirmed'
  goalId?: number
  goalName?: string
  createdAt: string
  xpReward: number
}

// Placeholder data
const suggestedChores: Chore[] = [
  { id: 101, title: 'Walk the dog', emoji: '🐕', reward: 30, status: 'suggested', xpReward: 15, createdAt: '' },
  { id: 102, title: 'Do the dishes', emoji: '🍽️', reward: 20, status: 'suggested', xpReward: 10, createdAt: '' },
  { id: 103, title: 'Clean your room', emoji: '🧹', reward: 40, status: 'suggested', xpReward: 20, createdAt: '' },
  { id: 104, title: 'Take out trash', emoji: '🗑️', reward: 15, status: 'suggested', xpReward: 8, createdAt: '' },
  { id: 105, title: 'Help with laundry', emoji: '👕', reward: 25, status: 'suggested', xpReward: 12, createdAt: '' },
]

const initialChores: Chore[] = [
  { 
    id: 1, 
    title: 'Walk the dog', 
    emoji: '🐕', 
    reward: 30, 
    status: 'approved', 
    goalId: 1, 
    goalName: 'AirPods',
    xpReward: 15,
    createdAt: 'Today'
  },
  { 
    id: 2, 
    title: 'Vacuum living room', 
    emoji: '🧹', 
    reward: 50, 
    status: 'pending_approval',
    xpReward: 25,
    createdAt: 'Today'
  },
  { 
    id: 3, 
    title: 'Wash the car', 
    emoji: '🚗', 
    reward: 75, 
    status: 'completed',
    goalId: 2,
    goalName: 'New Game',
    xpReward: 35,
    createdAt: 'Yesterday'
  },
]

const completedChoresHistory: Chore[] = [
  { id: 10, title: 'Help with groceries', emoji: '🛒', reward: 40, status: 'confirmed', xpReward: 20, createdAt: '2 days ago' },
  { id: 11, title: 'Clean bathroom', emoji: '🚿', reward: 60, status: 'confirmed', xpReward: 30, createdAt: '3 days ago' },
  { id: 12, title: 'Mow the lawn', emoji: '🌱', reward: 100, status: 'confirmed', xpReward: 50, createdAt: 'Last week' },
]

interface ChoresEarnSectionProps {
  compact?: boolean
  onNavigateToFull?: () => void
}

export default function ChoresEarnSection({ compact = false, onNavigateToFull }: ChoresEarnSectionProps) {
  const [chores, setChores] = useState<Chore[]>(initialChores)
  const [showNewChoreModal, setShowNewChoreModal] = useState(false)
  const [showGuardianModal, setShowGuardianModal] = useState(false)
  const [selectedChoreForApproval, setSelectedChoreForApproval] = useState<Chore | null>(null)
  const [showCompletionFeedback, setShowCompletionFeedback] = useState(false)
  const [completedChore, setCompletedChore] = useState<Chore | null>(null)
  const [showHistory, setShowHistory] = useState(false)

  const activeChores = chores.filter(c => c.status !== 'confirmed')
  const pendingApproval = chores.filter(c => c.status === 'pending_approval')
  const approvedChores = chores.filter(c => c.status === 'approved')
  const completedAwaitingConfirm = chores.filter(c => c.status === 'completed')

  const totalEarned = completedChoresHistory.reduce((acc, c) => acc + c.reward, 0) + 
    chores.filter(c => c.status === 'confirmed').reduce((acc, c) => acc + c.reward, 0)

  // Handle adding a new chore from the modal
  const handleAddChore = (chore: Omit<Chore, 'id' | 'status' | 'createdAt'>) => {
    const newChore: Chore = {
      ...chore,
      id: Date.now(),
      status: 'pending_approval',
      createdAt: 'Just now'
    }
    setChores(prev => [newChore, ...prev])
    setShowNewChoreModal(false)
  }

  // Handle marking a chore as done
  const handleMarkDone = (choreId: number) => {
    setChores(prev => prev.map(c => 
      c.id === choreId ? { ...c, status: 'completed' as const } : c
    ))
  }

  // Handle guardian confirmation (simulated)
  const handleGuardianConfirm = (choreId: number) => {
    const chore = chores.find(c => c.id === choreId)
    if (chore) {
      setChores(prev => prev.map(c => 
        c.id === choreId ? { ...c, status: 'confirmed' as const } : c
      ))
      setCompletedChore(chore)
      setShowGuardianModal(false)
      setShowCompletionFeedback(true)
      
      // Hide feedback after 3 seconds
      setTimeout(() => {
        setShowCompletionFeedback(false)
        setCompletedChore(null)
      }, 3000)
    }
  }

  // Handle guardian approval of a pending chore
  const handleGuardianApprove = (choreId: number) => {
    setChores(prev => prev.map(c => 
      c.id === choreId ? { ...c, status: 'approved' as const } : c
    ))
    setShowGuardianModal(false)
  }

  // Simulate opening guardian modal
  const openGuardianApproval = (chore: Chore) => {
    setSelectedChoreForApproval(chore)
    setShowGuardianModal(true)
  }

  const getStatusBadge = (status: Chore['status']) => {
    switch (status) {
      case 'pending_approval':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-[11px] font-medium">
            <Clock size={10} />
            Waiting for approval
          </span>
        )
      case 'approved':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-tint-primary/10 text-tint-primary rounded-full text-[11px] font-medium">
            <CheckCircle size={10} />
            Ready to do
          </span>
        )
      case 'completed':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-[11px] font-medium">
            <AlertCircle size={10} />
            Done - awaiting confirm
          </span>
        )
      case 'confirmed':
        return (
          <span className="flex items-center gap-1 px-2 py-1 bg-tint-success/10 text-tint-success rounded-full text-[11px] font-medium">
            <Check size={10} />
            Completed!
          </span>
        )
      default:
        return null
    }
  }

  // Compact view for Home tab preview
  if (compact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="surface-card p-4"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-tint-success/20 flex items-center justify-center">
              <Coins size={16} className="text-tint-success" />
            </div>
            <h3 className="font-medium text-label-primary text-[16px]">Earn Money</h3>
          </div>
          <button 
            onClick={onNavigateToFull}
            className="text-tint-primary text-[14px] font-medium flex items-center gap-1 hover:opacity-80"
          >
            See all <ChevronRight size={16} />
          </button>
        </div>

        {approvedChores.length > 0 ? (
          <div className="space-y-2">
            {approvedChores.slice(0, 2).map(chore => (
              <div key={chore.id} className="flex items-center gap-3 p-3 bg-background-primary rounded-[8px]">
                <span className="text-xl">{chore.emoji}</span>
                <div className="flex-1">
                  <p className="text-[14px] font-medium text-label-primary">{chore.title}</p>
                  <p className="text-[12px] text-tint-success font-medium">+{chore.reward} kr</p>
                </div>
                <button 
                  onClick={() => handleMarkDone(chore.id)}
                  className="px-3 py-1.5 bg-tint-primary text-fixed-white text-[12px] font-medium rounded-full"
                >
                  Done
                </button>
              </div>
            ))}
          </div>
        ) : pendingApproval.length > 0 ? (
          <div className="text-center py-2">
            <p className="text-[14px] text-label-secondary">
              {pendingApproval.length} chore{pendingApproval.length > 1 ? 's' : ''} waiting for approval
            </p>
          </div>
        ) : (
          <div className="text-center py-2">
            <p className="text-[14px] text-label-secondary">No active chores</p>
            <button 
              onClick={() => setShowNewChoreModal(true)}
              className="text-tint-primary text-[14px] font-medium mt-1"
            >
              + Add a chore
            </button>
          </div>
        )}

        <ChoreRequestModal 
          isOpen={showNewChoreModal}
          onClose={() => setShowNewChoreModal(false)}
          onSubmit={handleAddChore}
          suggestedChores={suggestedChores}
        />
      </motion.div>
    )
  }

  // Full view for Goals tab
  return (
    <div className="space-y-4">
      {/* Completion Feedback Toast */}
      <AnimatePresence>
        {showCompletionFeedback && completedChore && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            className="fixed top-20 left-4 right-4 z-50 max-w-[370px] mx-auto"
          >
            <div className="bg-tint-success text-white p-4 rounded-[16px] shadow-floating flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <Sparkles size={24} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[16px]">Nice! You earned {completedChore.reward} kr! 🎉</p>
                <p className="text-white/80 text-[14px]">+{completedChore.xpReward} XP earned</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Earn Header with Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="surface-card p-4"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-tint-success to-emerald-500 flex items-center justify-center">
            <Coins size={24} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-label-primary text-[18px]">Earn Money 💪</h3>
            <p className="text-[14px] text-label-secondary">Complete chores to fund your goals!</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-background-primary rounded-[10px] p-3 text-center">
            <p className="text-[20px] font-semibold text-tint-success">{totalEarned} kr</p>
            <p className="text-[12px] text-label-secondary">Total earned</p>
          </div>
          <div className="bg-background-primary rounded-[10px] p-3 text-center">
            <p className="text-[20px] font-semibold text-tint-primary">{approvedChores.length}</p>
            <p className="text-[12px] text-label-secondary">Active tasks</p>
          </div>
        </div>
      </motion.div>

      {/* Pending Approval Section */}
      {pendingApproval.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h4 className="font-medium text-label-primary text-[16px] mb-2 flex items-center gap-2">
            <Clock size={16} className="text-amber-500" />
            Waiting for Approval
          </h4>
          <div className="space-y-2">
            {pendingApproval.map(chore => (
              <div key={chore.id} className="surface-card p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{chore.emoji}</span>
                  <div className="flex-1">
                    <p className="font-medium text-label-primary text-[15px]">{chore.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[14px] text-tint-success font-medium">+{chore.reward} kr</span>
                      {chore.goalName && (
                        <span className="text-[12px] text-label-secondary flex items-center gap-1">
                          <Target size={10} />
                          → {chore.goalName}
                        </span>
                      )}
                    </div>
                  </div>
                  {getStatusBadge(chore.status)}
                </div>
                
                {/* Demo: Simulate parent approval */}
                <button
                  onClick={() => openGuardianApproval(chore)}
                  className="w-full mt-3 py-2 border border-tint-secondary text-tint-secondary rounded-[8px] text-[13px] font-medium hover:bg-tint-secondary/5 transition-colors"
                >
                  👨‍👩‍👧 Simulate Parent Approval
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Ready To Do Section */}
      {approvedChores.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h4 className="font-medium text-label-primary text-[16px] mb-2 flex items-center gap-2">
            <Zap size={16} className="text-tint-primary" />
            Ready to Do
          </h4>
          <div className="space-y-2">
            {approvedChores.map(chore => (
              <div key={chore.id} className="surface-card p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{chore.emoji}</span>
                  <div className="flex-1">
                    <p className="font-medium text-label-primary text-[15px]">{chore.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[14px] text-tint-success font-medium">+{chore.reward} kr</span>
                      <span className="text-[12px] text-tint-primary">+{chore.xpReward} XP</span>
                      {chore.goalName && (
                        <span className="text-[12px] text-label-secondary flex items-center gap-1">
                          <Target size={10} />
                          → {chore.goalName}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleMarkDone(chore.id)}
                    className="px-4 py-2 bg-tint-primary text-fixed-white rounded-full text-[14px] font-medium hover:opacity-90 transition-opacity"
                  >
                    Done ✓
                  </button>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Awaiting Confirmation Section */}
      {completedAwaitingConfirm.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="font-medium text-label-primary text-[16px] mb-2 flex items-center gap-2">
            <CheckCircle size={16} className="text-blue-500" />
            Done - Awaiting Parent Confirmation
          </h4>
          <div className="space-y-2">
            {completedAwaitingConfirm.map(chore => (
              <div key={chore.id} className="surface-card p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{chore.emoji}</span>
                  <div className="flex-1">
                    <p className="font-medium text-label-primary text-[15px]">{chore.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[14px] text-tint-success font-medium">+{chore.reward} kr</span>
                    </div>
                  </div>
                  {getStatusBadge(chore.status)}
                </div>
                
                {/* Demo: Simulate parent confirmation */}
                <button
                  onClick={() => openGuardianApproval(chore)}
                  className="w-full mt-3 py-2 border border-tint-success text-tint-success rounded-[8px] text-[13px] font-medium hover:bg-tint-success/5 transition-colors"
                >
                  👨‍👩‍👧 Simulate Parent Confirmation
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Add New Chore Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        onClick={() => setShowNewChoreModal(true)}
        className="w-full surface-card p-4 flex items-center justify-center gap-3 border-2 border-dashed border-tint-primary/30 hover:bg-tint-primary/5 transition-colors"
      >
        <div className="w-10 h-10 rounded-full bg-tint-primary/10 flex items-center justify-center">
          <Plus size={24} className="text-tint-primary" />
        </div>
        <span className="font-medium text-tint-primary text-[16px]">Propose a New Chore</span>
      </motion.button>

      {/* Completed History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center justify-between w-full mb-2"
        >
          <h4 className="font-medium text-label-primary text-[16px] flex items-center gap-2">
            <Check size={16} className="text-tint-success" />
            Completed ({completedChoresHistory.length})
          </h4>
          <ChevronRight size={18} className={`text-label-tertiary transition-transform ${showHistory ? 'rotate-90' : ''}`} />
        </button>
        
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-2">
                {completedChoresHistory.map(chore => (
                  <div key={chore.id} className="surface-card p-3 flex items-center gap-3 opacity-70">
                    <span className="text-xl">{chore.emoji}</span>
                    <div className="flex-1">
                      <p className="font-medium text-label-primary text-[14px]">{chore.title}</p>
                      <p className="text-[12px] text-label-secondary">{chore.createdAt}</p>
                    </div>
                    <span className="text-[14px] text-tint-success font-medium">+{chore.reward} kr</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Modals */}
      <ChoreRequestModal 
        isOpen={showNewChoreModal}
        onClose={() => setShowNewChoreModal(false)}
        onSubmit={handleAddChore}
        suggestedChores={suggestedChores}
      />

      <GuardianApprovalModal
        isOpen={showGuardianModal}
        onClose={() => setShowGuardianModal(false)}
        chore={selectedChoreForApproval}
        onApprove={handleGuardianApprove}
        onConfirmCompletion={handleGuardianConfirm}
      />
    </div>
  )
}

