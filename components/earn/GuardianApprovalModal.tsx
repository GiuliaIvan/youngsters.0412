'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  X, 
  Check, 
  XCircle,
  Shield,
  Smartphone,
  Clock,
  Target,
  Bell
} from 'lucide-react'
import { Chore } from './ChoresEarnSection'

interface GuardianApprovalModalProps {
  isOpen: boolean
  onClose: () => void
  chore: Chore | null
  onApprove: (choreId: number) => void
  onConfirmCompletion: (choreId: number) => void
}

export default function GuardianApprovalModal({
  isOpen,
  onClose,
  chore,
  onApprove,
  onConfirmCompletion
}: GuardianApprovalModalProps) {
  if (!isOpen || !chore) return null

  const isPendingApproval = chore.status === 'pending_approval'
  const isAwaitingConfirmation = chore.status === 'completed'

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-[360px] bg-background-primary rounded-[20px] shadow-floating overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header - simulating parent's phone UI */}
          <div className="bg-gradient-to-r from-tint-secondary to-purple-600 p-4 text-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Shield size={18} />
                <span className="text-[13px] font-medium opacity-90">Parent View</span>
              </div>
              <button 
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Smartphone size={20} />
              </div>
              <div>
                <p className="font-semibold text-[16px]">Vipps Family</p>
                <p className="text-[13px] opacity-80">
                  {isPendingApproval ? 'New chore request' : 'Chore completion'}
                </p>
              </div>
            </div>
          </div>

          {/* Notification preview */}
          <div className="p-4">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-tint-primary/10 flex items-center justify-center shrink-0">
                <Bell size={20} className="text-tint-primary" />
              </div>
              <div className="flex-1">
                <p className="text-[12px] text-label-secondary">Just now</p>
                <p className="font-medium text-label-primary text-[15px] mt-0.5">
                  {isPendingApproval 
                    ? `Emma wants to do a chore` 
                    : `Emma completed a chore`
                  }
                </p>
              </div>
            </div>

            {/* Chore details card */}
            <div className="surface-card p-4 rounded-[14px] mb-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{chore.emoji}</span>
                <div className="flex-1">
                  <p className="font-semibold text-label-primary text-[17px]">{chore.title}</p>
                  {isPendingApproval && (
                    <div className="flex items-center gap-1 mt-1">
                      <Clock size={12} className="text-label-secondary" />
                      <span className="text-[12px] text-label-secondary">Requested just now</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-separator-primary">
                <div>
                  <p className="text-[12px] text-label-secondary">Suggested amount</p>
                  <p className="text-[20px] font-bold text-tint-success">{chore.reward} kr</p>
                </div>
                {chore.goalName && (
                  <div className="text-right">
                    <p className="text-[12px] text-label-secondary">Goes to</p>
                    <p className="text-[14px] font-medium text-label-primary flex items-center gap-1 justify-end">
                      <Target size={12} className="text-tint-secondary" />
                      {chore.goalName}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Info text */}
            <p className="text-[13px] text-label-secondary text-center mb-4">
              {isPendingApproval
                ? "You can approve, adjust the amount, or decline this request."
                : "Confirm that Emma completed this chore to release the reward."}
            </p>

            {/* Action buttons */}
            <div className="space-y-2">
              {isPendingApproval ? (
                <>
                  <button
                    onClick={() => onApprove(chore.id)}
                    className="w-full py-3.5 bg-tint-success text-fixed-white rounded-[12px] font-semibold text-[15px] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <Check size={18} />
                    Approve Chore
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={onClose}
                      className="py-3 bg-amber-100 text-amber-700 rounded-[12px] font-medium text-[14px] hover:bg-amber-200 transition-colors"
                    >
                      Adjust Amount
                    </button>
                    <button
                      onClick={onClose}
                      className="py-3 bg-red-100 text-red-600 rounded-[12px] font-medium text-[14px] flex items-center justify-center gap-1 hover:bg-red-200 transition-colors"
                    >
                      <XCircle size={14} />
                      Decline
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={() => onConfirmCompletion(chore.id)}
                    className="w-full py-3.5 bg-tint-success text-fixed-white rounded-[12px] font-semibold text-[15px] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <Check size={18} />
                    Confirm & Pay {chore.reward} kr
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full py-3 surface-card text-label-secondary rounded-[12px] font-medium text-[14px] hover:bg-fill-secondary transition-colors"
                  >
                    Not Done Yet
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 pt-0">
            <p className="text-[11px] text-label-disabled text-center">
              This is a simulation of how the parent would see and respond to this request in their Vipps app.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

