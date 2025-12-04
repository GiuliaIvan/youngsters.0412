'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown,
  Sparkles,
  ChevronDown,
  Info
} from 'lucide-react'
import Header from '../Header'

interface SpendingCategory {
  name: string
  emoji: string
  amount: number
  percentage: number
  color: string
  trend: 'up' | 'down' | 'same'
  trendAmount?: number
}

const spendingCategories: SpendingCategory[] = [
  { name: 'Snacks', emoji: '🍿', amount: 14.50, percentage: 35, color: '#FF5B24', trend: 'up', trendAmount: 2 },
  { name: 'Fun & Hobbies', emoji: '🎮', amount: 12, percentage: 29, color: '#6B5CE7', trend: 'down', trendAmount: 3 },
  { name: 'Gifts', emoji: '🎁', amount: 8, percentage: 19, color: '#FF6B9D', trend: 'same' },
  { name: 'Transport', emoji: '🚌', amount: 5, percentage: 12, color: '#00C9B1', trend: 'same' },
  { name: 'Other', emoji: '📦', amount: 2, percentage: 5, color: '#FFD93D', trend: 'down', trendAmount: 1 },
]

const weeklyData = [
  { day: 'Mon', spent: 4.50, saved: 2 },
  { day: 'Tue', spent: 3, saved: 2.50 },
  { day: 'Wed', spent: 6, saved: 1 },
  { day: 'Thu', spent: 2.50, saved: 3 },
  { day: 'Fri', spent: 8, saved: 1.50 },
  { day: 'Sat', spent: 10, saved: 4 },
  { day: 'Sun', spent: 2, saved: 5 },
]

export default function InsightsTab() {
  const [period, setPeriod] = useState<'week' | 'month'>('week')
  const totalSpent = spendingCategories.reduce((sum, cat) => sum + cat.amount, 0)
  const maxWeeklySpend = Math.max(...weeklyData.map(d => d.spent + d.saved))

  return (
    <div className="tab-content">
      <Header title="Insights 📊" showSettings={true} />
      
      <div className="p-4 space-y-5">
        {/* Period Toggle */}
        <div className="flex bg-gray-100 rounded-xl p-1">
          <button
            onClick={() => setPeriod('week')}
            className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all ${
              period === 'week' 
                ? 'bg-white text-vipps-dark shadow-sm' 
                : 'text-gray-500'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setPeriod('month')}
            className={`flex-1 py-2.5 rounded-lg font-semibold text-sm transition-all ${
              period === 'month' 
                ? 'bg-white text-vipps-dark shadow-sm' 
                : 'text-gray-500'
            }`}
          >
            This Month
          </button>
        </div>

        {/* Summary Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-3"
        >
          <div className="card p-4">
            <p className="text-xs text-gray-500 font-medium">Spent</p>
            <p className="text-2xl font-bold text-vipps-dark">${totalSpent.toFixed(2)}</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingDown size={14} className="text-green-500" />
              <span className="text-xs text-green-500 font-semibold">15% less</span>
            </div>
          </div>
          <div className="card p-4 bg-gradient-to-br from-green-50 to-white">
            <p className="text-xs text-gray-500 font-medium">Saved</p>
            <p className="text-2xl font-bold text-green-600">$19</p>
            <div className="flex items-center gap-1 mt-1">
              <TrendingUp size={14} className="text-green-500" />
              <span className="text-xs text-green-500 font-semibold">+25% more!</span>
            </div>
          </div>
        </motion.div>

        {/* AI Insight */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-4 bg-gradient-to-r from-vipps-purple/10 to-vipps-pink/10 border border-vipps-purple/20"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-vipps-purple to-vipps-pink flex items-center justify-center shrink-0">
              <Sparkles size={20} className="text-white" />
            </div>
            <div>
              <p className="font-semibold text-vipps-dark text-sm">Vippsi sees a pattern! 🔍</p>
              <p className="text-sm text-gray-600 mt-0.5">
                You spend most on snacks. If you save $5 on snacks, 
                you could reach your AirPods goal 2 weeks faster! 🎧
              </p>
            </div>
          </div>
        </motion.div>

        {/* Weekly Bar Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-5"
        >
          <h3 className="font-bold text-vipps-dark mb-4">Weekly Overview</h3>
          
          <div className="flex items-end justify-between h-40 gap-2">
            {weeklyData.map((day, index) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col gap-0.5" style={{ height: '120px' }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(day.saved / maxWeeklySpend) * 100}%` }}
                    transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
                    className="w-full bg-green-400 rounded-t-md"
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(day.spent / maxWeeklySpend) * 100}%` }}
                    transition={{ delay: 0.3 + index * 0.05, duration: 0.5 }}
                    className="w-full bg-vipps-orange rounded-b-md"
                  />
                </div>
                <span className="text-xs text-gray-500 font-medium">{day.day}</span>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-vipps-orange" />
              <span className="text-xs text-gray-500">Spent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="text-xs text-gray-500">Saved</span>
            </div>
          </div>
        </motion.div>

        {/* Pie Chart Representation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card p-5"
        >
          <h3 className="font-bold text-vipps-dark mb-4">Where does your money go? 🤔</h3>
          
          <div className="flex items-center gap-6">
            {/* Pie Chart */}
            <div className="relative w-32 h-32 shrink-0">
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                {(() => {
                  let currentAngle = 0
                  return spendingCategories.map((cat, index) => {
                    const angle = (cat.percentage / 100) * 360
                    const startAngle = currentAngle
                    currentAngle += angle
                    
                    const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180)
                    const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180)
                    const x2 = 50 + 40 * Math.cos(((startAngle + angle) * Math.PI) / 180)
                    const y2 = 50 + 40 * Math.sin(((startAngle + angle) * Math.PI) / 180)
                    const largeArc = angle > 180 ? 1 : 0
                    
                    return (
                      <motion.path
                        key={cat.name}
                        d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                        fill={cat.color}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                      />
                    )
                  })
                })()}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white flex flex-col items-center justify-center">
                  <span className="text-lg font-bold text-vipps-dark">${totalSpent.toFixed(0)}</span>
                  <span className="text-xs text-gray-400">total</span>
                </div>
              </div>
            </div>
            
            {/* Legend */}
            <div className="flex-1 space-y-2">
              {spendingCategories.slice(0, 4).map((cat, index) => (
                <motion.div
                  key={cat.name}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: cat.color }}
                    />
                    <span className="text-sm text-gray-600">{cat.emoji} {cat.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-vipps-dark">{cat.percentage}%</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Category Breakdown */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="font-bold text-vipps-dark mb-3">Categories</h3>
          <div className="space-y-3">
            {spendingCategories.map((cat, index) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="card p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{cat.emoji}</span>
                    <div>
                      <p className="font-semibold text-vipps-dark">{cat.name}</p>
                      <div className="flex items-center gap-1">
                        {cat.trend === 'up' && (
                          <>
                            <TrendingUp size={12} className="text-red-500" />
                            <span className="text-xs text-red-500">+${cat.trendAmount}</span>
                          </>
                        )}
                        {cat.trend === 'down' && (
                          <>
                            <TrendingDown size={12} className="text-green-500" />
                            <span className="text-xs text-green-500">-${cat.trendAmount}</span>
                          </>
                        )}
                        {cat.trend === 'same' && (
                          <span className="text-xs text-gray-400">Stable</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="font-bold text-vipps-dark">${cat.amount.toFixed(2)}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: cat.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.percentage}%` }}
                    transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Positive Reinforcement */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 }}
          className="card p-5 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50 text-center"
        >
          <div className="text-4xl mb-2">🎉</div>
          <h3 className="font-bold text-green-700">Great job this week!</h3>
          <p className="text-sm text-green-600 mt-1">
            You saved 25% more than last week. Keep it up!
          </p>
        </motion.div>
      </div>
    </div>
  )
}
