'use client'

import { motion } from 'framer-motion'
import { 
  User, 
  Bell, 
  Shield, 
  HelpCircle, 
  ChevronRight, 
  Star,
  Settings,
  LogOut,
  Moon,
  Globe
} from 'lucide-react'
import Header from '../Header'

const stats = [
  { label: 'Total Saved', value: '3 450 kr', emoji: '💰' },
  { label: 'Goals Completed', value: '5', emoji: '🎯' },
  { label: 'XP Earned', value: '1 250', emoji: '⭐' },
  { label: 'Current Streak', value: '7 days', emoji: '🔥' },
]

const menuItems = [
  { id: 'profile', icon: User, label: 'Edit Profile', color: 'text-tint-primary' },
  { id: 'notifications', icon: Bell, label: 'Notifications', color: 'text-tint-secondary' },
  { id: 'privacy', icon: Shield, label: 'Privacy & Security', color: 'text-tint-success' },
  { id: 'language', icon: Globe, label: 'Language', color: 'text-[#4ECDC4]' },
  { id: 'theme', icon: Moon, label: 'Appearance', color: 'text-tint-tertiary' },
  { id: 'help', icon: HelpCircle, label: 'Help & Support', color: 'text-label-secondary' },
]

export default function MeTab() {
  return (
    <div className="tab-content bg-background-primary">
      <Header title="Profile" showSettings={true} />
      
      <div className="p-4 space-y-5">
        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="surface-card p-6 flex flex-col items-center"
        >
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-special-avatarUser flex items-center justify-center border-4 border-tint-primary/20">
              <span className="text-[36px] font-semibold text-tint-primary">ES</span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-tint-secondary rounded-full flex items-center justify-center border-2 border-background-primary">
              <Star size={16} className="text-fixed-white" />
            </div>
          </div>
          <h2 className="mt-4 text-[20px] font-semibold text-label-primary">Emma Steen</h2>
          <p className="text-[14px] text-label-secondary">Level 5 • Money Explorer</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-3 py-1 bg-tint-primary/10 text-tint-primary text-[12px] font-medium rounded-full">
              🔥 7 day streak
            </span>
            <span className="px-3 py-1 bg-tint-secondary/10 text-tint-secondary text-[12px] font-medium rounded-full">
              ⭐ 1250 XP
            </span>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="surface-card p-4 text-center"
            >
              <span className="text-2xl">{stat.emoji}</span>
              <p className="text-[18px] font-semibold text-label-primary mt-1">{stat.value}</p>
              <p className="text-[12px] text-label-secondary">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Menu Items */}
        <div className="surface-card overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className={`w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${
                  index < menuItems.length - 1 ? 'separator' : ''
                }`}
              >
                <div className={`w-10 h-10 rounded-full bg-fill-primary flex items-center justify-center`}>
                  <Icon size={20} className={item.color} />
                </div>
                <span className="flex-1 text-left text-[16px] font-medium text-label-primary tracking-[-0.32px]">
                  {item.label}
                </span>
                <ChevronRight size={20} className="text-label-tertiary" />
              </motion.button>
            )
          })}
        </div>

        {/* Parent Controls */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="surface-card p-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-tint-secondary/20 flex items-center justify-center">
              <Shield size={24} className="text-tint-secondary" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-label-primary text-[16px] tracking-[-0.32px]">Parent Dashboard</h3>
              <p className="text-[14px] text-label-secondary">View and manage parental controls</p>
            </div>
            <ChevronRight size={20} className="text-label-tertiary" />
          </div>
        </motion.div>

        {/* Sign Out */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="w-full surface-card p-4 flex items-center justify-center gap-2 text-[#FF6B6B] hover:bg-red-50 transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium text-[16px]">Sign Out</span>
        </motion.button>

        {/* App Version */}
        <p className="text-center text-[12px] text-label-disabled py-4">
          Vipps Youngster v1.0.0
        </p>
      </div>
    </div>
  )
}
