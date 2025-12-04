'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, PieChart, ArrowRight } from 'lucide-react'
import Header from '../Header'

const spendingCategories = [
  { name: 'Snacks & Food', amount: 450, percentage: 35, color: 'bg-tint-primary', emoji: '🍿' },
  { name: 'Gaming', amount: 320, percentage: 25, color: 'bg-tint-secondary', emoji: '🎮' },
  { name: 'Entertainment', amount: 260, percentage: 20, color: 'bg-[#4ECDC4]', emoji: '🎬' },
  { name: 'Other', amount: 256, percentage: 20, color: 'bg-label-disabled', emoji: '📦' },
]

const weeklyData = [
  { day: 'Mon', spent: 45, saved: 20 },
  { day: 'Tue', spent: 30, saved: 50 },
  { day: 'Wed', spent: 80, saved: 10 },
  { day: 'Thu', spent: 25, saved: 40 },
  { day: 'Fri', spent: 120, saved: 0 },
  { day: 'Sat', spent: 60, saved: 30 },
  { day: 'Sun', spent: 20, saved: 80 },
]

export default function InsightsTab() {
  const maxSpent = Math.max(...weeklyData.map(d => d.spent))
  const totalSpent = weeklyData.reduce((acc, d) => acc + d.spent, 0)
  const totalSaved = weeklyData.reduce((acc, d) => acc + d.saved, 0)

  return (
    <div className="tab-content bg-background-primary">
      <Header title="Insights 📊" />
      
      <div className="p-4 space-y-5">
        {/* Weekly Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-3"
        >
          <div className="surface-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown size={16} className="text-tint-primary" />
              <p className="text-[12px] text-label-secondary font-medium">Spent this week</p>
            </div>
            <p className="text-[24px] font-semibold text-label-primary">{totalSpent} kr</p>
            <p className="text-[12px] text-tint-primary font-medium mt-1">-15% from last week</p>
          </div>
          <div className="surface-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-tint-success" />
              <p className="text-[12px] text-label-secondary font-medium">Saved this week</p>
            </div>
            <p className="text-[24px] font-semibold text-label-primary">{totalSaved} kr</p>
            <p className="text-[12px] text-tint-success font-medium mt-1">+25% from last week 🎉</p>
          </div>
        </motion.div>

        {/* Weekly Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="surface-card p-4"
        >
          <h3 className="font-medium text-label-primary text-[18px] tracking-[-0.45px] mb-4">This Week</h3>
          <div className="flex items-end justify-between gap-2 h-32">
            {weeklyData.map((day, index) => (
              <motion.div 
                key={day.day}
                className="flex-1 flex flex-col items-center gap-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
              >
                <div className="w-full flex flex-col items-center gap-0.5">
                  <motion.div 
                    className="w-full bg-tint-primary rounded-t"
                    initial={{ height: 0 }}
                    animate={{ height: `${(day.spent / maxSpent) * 80}px` }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                  />
                </div>
                <span className="text-[10px] text-label-secondary font-medium">{day.day}</span>
              </motion.div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded bg-tint-primary" />
              <span className="text-[12px] text-label-secondary">Spent</span>
            </div>
          </div>
        </motion.div>

        {/* Spending Breakdown */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="surface-card p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-label-primary text-[18px] tracking-[-0.45px]">Where does your money go?</h3>
            <PieChart size={20} className="text-tint-secondary" />
          </div>
          
          <div className="space-y-3">
            {spendingCategories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{category.emoji}</span>
                    <span className="text-[14px] font-medium text-label-primary tracking-[-0.15px]">{category.name}</span>
                  </div>
                  <span className="text-[14px] font-medium text-label-primary">{category.amount} kr</span>
                </div>
                <div className="h-2 bg-fill-primary rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full ${category.color} rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${category.percentage}%` }}
                    transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Vippsi Insight */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="surface-card p-4 border-2 border-tint-secondary/20"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-tint-secondary flex items-center justify-center shrink-0">
              <span className="text-lg">🤖</span>
            </div>
            <div>
              <p className="font-medium text-label-primary text-[14px] tracking-[-0.15px]">Vippsi's Insight</p>
              <p className="text-[14px] text-label-secondary tracking-[-0.15px] mt-1">
                You spent 35% on snacks this week! If you saved half of that, you'd reach your AirPods goal 2 weeks faster! 🎧
              </p>
              <button className="flex items-center gap-1 text-tint-secondary font-medium text-[14px] mt-2 hover:opacity-80">
                See saving tips <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Comparison */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="surface-card p-4"
        >
          <h3 className="font-medium text-label-primary text-[18px] tracking-[-0.45px] mb-3">Compared to other kids your age</h3>
          <div className="flex items-center gap-4">
            <div className="flex-1 text-center p-3 surface-card">
              <p className="text-[24px] font-semibold text-tint-success">Top 20%</p>
              <p className="text-[12px] text-label-secondary mt-1">in saving</p>
            </div>
            <div className="flex-1 text-center p-3 surface-card">
              <p className="text-[24px] font-semibold text-tint-secondary">Average</p>
              <p className="text-[12px] text-label-secondary mt-1">in spending</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
