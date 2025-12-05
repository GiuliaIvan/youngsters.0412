'use client'

import { motion } from 'framer-motion'
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Target, 
  Zap, 
  ChevronRight,
  Sparkles,
  Plus,
  Flame
} from 'lucide-react'
import Header from '../Header'

const transactions = [
  { id: 1, name: 'Corner Store - Snacks', amount: -35, date: 'Today', icon: '🍿', category: 'snacks' },
  { id: 2, name: 'Allowance from Mom', amount: 100, date: 'Yesterday', icon: '💰', category: 'income' },
  { id: 3, name: 'Birthday Gift', amount: 200, date: '2 days ago', icon: '🎁', category: 'gift' },
  { id: 4, name: 'Movie Theater', amount: -120, date: '3 days ago', icon: '🎬', category: 'fun' },
]

const lessons = [
  { id: 1, title: 'What is Saving?', duration: '3 min', xp: 50, emoji: '🏦', progress: 100 },
  { id: 2, title: 'Setting Goals', duration: '5 min', xp: 75, emoji: '🎯', progress: 60 },
  { id: 3, title: 'Smart Spending', duration: '4 min', xp: 60, emoji: '🧠', progress: 0 },
]

export default function HomeTab() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="tab-content bg-background-primary">
      <Header 
        title="Hey, Emma! 👋" 
        greeting="Welcome back"
        showNotification={true}
      />
      
      <motion.div 
        className="p-4 space-y-5"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Balance Card */}
        <motion.div 
          variants={itemVariants}
          className="rounded-default p-5 bg-tint-primary text-fixed-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-fixed-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-fixed-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <p className="text-fixed-white/80 text-[14px] font-medium tracking-[-0.15px]">Your Balance</p>
          <motion.h2 
            className="text-[32px] font-semibold mt-1"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            1 192 kr
          </motion.h2>
          <div className="flex items-center gap-4 mt-4">
            <button className="flex items-center gap-2 bg-fixed-white/20 hover:bg-fixed-white/30 transition-colors px-4 py-2 rounded-full text-[14px] font-medium">
              <ArrowUpRight size={16} />
              Send
            </button>
            <button className="flex items-center gap-2 bg-fixed-white/20 hover:bg-fixed-white/30 transition-colors px-4 py-2 rounded-full text-[14px] font-medium">
              <ArrowDownLeft size={16} />
              Request
            </button>
          </div>
        </motion.div>

        {/* Streak Counter */}
        <motion.div 
          variants={itemVariants}
          className="surface-card p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#FFD93D]/20 flex items-center justify-center">
              <Flame size={24} className="text-tint-primary" />
            </div>
            <div>
              <p className="font-medium text-label-primary text-[16px] tracking-[-0.32px]">7 Day Streak! 🔥</p>
              <p className="text-[14px] text-label-secondary tracking-[-0.15px]">You're learning every day - keep going!</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[20px] font-semibold text-tint-primary">+350</p>
            <p className="text-[12px] text-label-secondary">XP this week</p>
          </div>
        </motion.div>

        {/* AI "Now" Module */}
        <motion.div 
          variants={itemVariants}
          className="surface-card p-4 border-2 border-tint-primary/20"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-tint-primary flex items-center justify-center shrink-0">
              <Zap size={20} className="text-fixed-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-medium text-tint-primary bg-tint-primary/10 px-2 py-0.5 rounded-full">
                  Now
                </span>
                <Sparkles size={14} className="text-tint-primary" />
              </div>
              <h3 className="font-medium text-label-primary text-[16px] tracking-[-0.32px] mt-1">Today's Challenge</h3>
              <p className="text-[14px] text-label-secondary tracking-[-0.15px] mt-0.5">
                Save 100 kr today to reach your AirPods goal faster! 🎧
              </p>
              <div className="flex gap-2 mt-3">
                <button className="px-4 py-2 bg-tint-primary text-fixed-white text-[14px] font-medium rounded-full hover:opacity-90 transition-opacity">
                  Save Now
                </button>
                <button className="px-4 py-2 text-label-secondary text-[14px] font-medium hover:bg-surface-primary rounded-full transition-colors">
                  Later
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Goals Preview */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-label-primary text-[18px] tracking-[-0.45px]">Your Saving Goals</h3>
            <button className="text-tint-primary text-[14px] font-medium flex items-center gap-1 hover:opacity-80">
              See all <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {/* Goal Card */}
            <div className="surface-card p-4 min-w-[180px] shrink-0">
              <div className="text-3xl mb-2">🎧</div>
              <h4 className="font-medium text-label-primary text-[16px] tracking-[-0.32px]">AirPods</h4>
              <p className="text-[12px] text-label-secondary mb-3">1 200 kr / 2 000 kr</p>
              <div className="h-2 bg-fill-primary rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-tint-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '60%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <p className="text-[12px] text-tint-primary font-medium mt-2">60% complete</p>
            </div>

            {/* Goal Card 2 */}
            <div className="surface-card p-4 min-w-[180px] shrink-0">
              <div className="text-3xl mb-2">🎮</div>
              <h4 className="font-medium text-label-primary text-[16px] tracking-[-0.32px]">New Game</h4>
              <p className="text-[12px] text-label-secondary mb-3">300 kr / 600 kr</p>
              <div className="h-2 bg-fill-primary rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-tint-secondary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '50%' }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
              </div>
              <p className="text-[12px] text-tint-secondary font-medium mt-2">50% complete</p>
            </div>

            {/* Add Goal Card */}
            <div className="surface-card p-4 min-w-[140px] shrink-0 flex flex-col items-center justify-center border-2 border-dashed border-label-tertiary">
              <div className="w-12 h-12 rounded-full bg-tint-primary/10 flex items-center justify-center mb-2">
                <Plus size={24} className="text-tint-primary" />
              </div>
              <p className="text-[14px] font-medium text-label-secondary">New Goal</p>
            </div>
          </div>
        </motion.div>

        {/* Transactions */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-label-primary text-[18px] tracking-[-0.45px]">Recent Transactions</h3>
            <button className="text-tint-primary text-[14px] font-medium flex items-center gap-1 hover:opacity-80">
              See all <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="surface-card overflow-hidden">
            {transactions.map((tx, index) => (
              <motion.div 
                key={tx.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className={`flex items-center justify-between p-4 ${
                  index < transactions.length - 1 ? 'separator' : ''
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-fill-primary flex items-center justify-center text-xl">
                    {tx.icon}
                  </div>
                  <div>
                    <p className="font-medium text-label-primary text-[14px] tracking-[-0.15px]">{tx.name}</p>
                    <p className="text-[12px] text-label-secondary">{tx.date}</p>
                  </div>
                </div>
                <span className={`font-medium text-[16px] tracking-[-0.32px] ${tx.amount > 0 ? 'text-tint-success' : 'text-label-primary'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount} kr
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Learn Preview */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-label-primary text-[18px] tracking-[-0.45px]">Continue Learning</h3>
            <button className="text-tint-primary text-[14px] font-medium flex items-center gap-1 hover:opacity-80">
              All lessons <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {lessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className={`surface-card p-4 min-w-[160px] shrink-0 ${
                  lesson.progress === 100 ? 'border-2 border-tint-success/30' : ''
                }`}
              >
                <div className="text-3xl mb-2">{lesson.emoji}</div>
                <h4 className="font-medium text-label-primary text-[14px] tracking-[-0.15px]">{lesson.title}</h4>
                <p className="text-[12px] text-label-secondary">{lesson.duration} • +{lesson.xp} XP</p>
                {lesson.progress === 100 ? (
                  <span className="inline-block mt-2 text-[12px] font-medium text-tint-success bg-fill-success px-2 py-1 rounded-full">
                    ✓ Completed
                  </span>
                ) : lesson.progress > 0 ? (
                  <div className="mt-2">
                    <div className="h-1.5 bg-fill-primary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-tint-primary rounded-full"
                        style={{ width: `${lesson.progress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <span className="inline-block mt-2 text-[12px] font-medium text-label-disabled">
                    Start →
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
