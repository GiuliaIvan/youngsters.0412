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
    <div className="tab-content">
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
          className="card p-5 bg-gradient-to-br from-vipps-orange to-vipps-coral text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
          
          <p className="text-white/80 text-sm font-medium">Your Balance</p>
          <motion.h2 
            className="text-4xl font-bold mt-1"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            $124.50
          </motion.h2>
          <div className="flex items-center gap-4 mt-4">
            <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-full text-sm font-semibold">
              <ArrowUpRight size={16} />
              Send
            </button>
            <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors px-4 py-2 rounded-full text-sm font-semibold">
              <ArrowDownLeft size={16} />
              Request
            </button>
          </div>
        </motion.div>

        {/* Streak Counter */}
        <motion.div 
          variants={itemVariants}
          className="card p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center flame-animate">
              <Flame size={24} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-vipps-dark">7 Day Streak! 🔥</p>
              <p className="text-sm text-gray-500">You're learning every day - keep going!</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-vipps-orange">+350</p>
            <p className="text-xs text-gray-500">XP this week</p>
          </div>
        </motion.div>

        {/* AI "Now" Module */}
        <motion.div 
          variants={itemVariants}
          className="card p-4 border-2 border-vipps-orange/20 bg-gradient-to-r from-vipps-cream to-white"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-vipps-orange to-vipps-coral flex items-center justify-center shrink-0">
              <Zap size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-vipps-orange bg-vipps-orange/10 px-2 py-0.5 rounded-full">
                  Now
                </span>
                <Sparkles size={14} className="text-vipps-orange" />
              </div>
              <h3 className="font-bold text-vipps-dark mt-1">Today's Challenge</h3>
              <p className="text-sm text-gray-600 mt-0.5">
                Save $10 today to reach your AirPods goal faster! 🎧
              </p>
              <div className="flex gap-2 mt-3">
                <button className="px-4 py-2 bg-vipps-orange text-white text-sm font-semibold rounded-full hover:bg-vipps-coral transition-colors">
                  Save Now
                </button>
                <button className="px-4 py-2 text-gray-500 text-sm font-medium hover:bg-gray-100 rounded-full transition-colors">
                  Later
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Goals Preview */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-vipps-dark">Your Saving Goals</h3>
            <button className="text-vipps-orange text-sm font-semibold flex items-center gap-1 hover:underline">
              See all <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {/* Goal Card */}
            <div className="card p-4 min-w-[180px] shrink-0">
              <div className="text-3xl mb-2">🎧</div>
              <h4 className="font-bold text-vipps-dark">AirPods</h4>
              <p className="text-xs text-gray-500 mb-3">$120 / $200</p>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-vipps-orange to-vipps-coral rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '60%' }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
              <p className="text-xs text-vipps-orange font-semibold mt-2">60% complete</p>
            </div>

            {/* Goal Card 2 */}
            <div className="card p-4 min-w-[180px] shrink-0">
              <div className="text-3xl mb-2">🎮</div>
              <h4 className="font-bold text-vipps-dark">New Game</h4>
              <p className="text-xs text-gray-500 mb-3">$30 / $60</p>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-vipps-purple to-vipps-pink rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '50%' }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
              </div>
              <p className="text-xs text-vipps-purple font-semibold mt-2">50% complete</p>
            </div>

            {/* Add Goal Card */}
            <div className="card p-4 min-w-[140px] shrink-0 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 bg-gray-50/50">
              <div className="w-12 h-12 rounded-full bg-vipps-orange/10 flex items-center justify-center mb-2">
                <Plus size={24} className="text-vipps-orange" />
              </div>
              <p className="text-sm font-semibold text-gray-500">New Goal</p>
            </div>
          </div>
        </motion.div>

        {/* Transactions */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-vipps-dark">Recent Transactions</h3>
            <button className="text-vipps-orange text-sm font-semibold flex items-center gap-1 hover:underline">
              See all <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="card divide-y divide-gray-100">
            {transactions.map((tx, index) => (
              <motion.div 
                key={tx.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="flex items-center justify-between p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                    {tx.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-vipps-dark text-sm">{tx.name}</p>
                    <p className="text-xs text-gray-400">{tx.date}</p>
                  </div>
                </div>
                <span className={`font-bold ${tx.amount > 0 ? 'text-green-500' : 'text-vipps-dark'}`}>
                  {tx.amount > 0 ? '+' : ''}{tx.amount < 0 ? '-' : ''}${Math.abs(tx.amount / 10).toFixed(2)}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Learn Preview */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-vipps-dark">Continue Learning</h3>
            <button className="text-vipps-orange text-sm font-semibold flex items-center gap-1 hover:underline">
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
                className={`card p-4 min-w-[160px] shrink-0 ${
                  lesson.progress === 100 ? 'bg-green-50 border-2 border-green-200' : ''
                }`}
              >
                <div className="text-3xl mb-2">{lesson.emoji}</div>
                <h4 className="font-bold text-vipps-dark text-sm">{lesson.title}</h4>
                <p className="text-xs text-gray-500">{lesson.duration} • +{lesson.xp} XP</p>
                {lesson.progress === 100 ? (
                  <span className="inline-block mt-2 text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    ✓ Completed
                  </span>
                ) : lesson.progress > 0 ? (
                  <div className="mt-2">
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-vipps-orange rounded-full"
                        style={{ width: `${lesson.progress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <span className="inline-block mt-2 text-xs font-semibold text-gray-400">
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
