'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  User, 
  Palette, 
  Users, 
  Settings, 
  HelpCircle, 
  Shield,
  ChevronRight,
  Bell,
  Moon,
  Volume2,
  Eye,
  ExternalLink,
  X,
  Sparkles,
  Heart
} from 'lucide-react'
import Header from '../Header'

interface MenuItem {
  id: string
  icon: any
  label: string
  description?: string
  value?: string
  hasToggle?: boolean
  toggleValue?: boolean
}

const menuSections = [
  {
    title: 'Profile',
    items: [
      { id: 'profile', icon: User, label: 'My Profile', description: 'View and edit your profile' },
      { id: 'avatar', icon: Palette, label: 'Customize Vippsi', description: 'Change the mascot appearance' },
    ]
  },
  {
    title: 'Family',
    items: [
      { id: 'family', icon: Users, label: 'Family Connection', description: 'Connected to: Mom, Dad' },
    ]
  },
  {
    title: 'Settings',
    items: [
      { id: 'notifications', icon: Bell, label: 'Notifications', hasToggle: true, toggleValue: true },
      { id: 'sound', icon: Volume2, label: 'Sounds', hasToggle: true, toggleValue: true },
      { id: 'darkmode', icon: Moon, label: 'Dark Mode', hasToggle: true, toggleValue: false },
    ]
  },
  {
    title: 'About Vippsi',
    items: [
      { id: 'ai', icon: Eye, label: 'How Vippsi Works', description: 'AI transparency' },
      { id: 'help', icon: HelpCircle, label: 'Help & Support' },
      { id: 'privacy', icon: Shield, label: 'Privacy' },
    ]
  },
]

export default function MeTab() {
  const [showAIModal, setShowAIModal] = useState(false)
  const [toggleStates, setToggleStates] = useState({
    notifications: true,
    sound: true,
    darkmode: false,
  })

  const handleToggle = (id: string) => {
    setToggleStates(prev => ({
      ...prev,
      [id]: !prev[id as keyof typeof prev]
    }))
  }

  return (
    <div className="tab-content">
      <Header title="Me 👤" />
      
      <div className="p-4 space-y-5">
        {/* Profile Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card p-5 flex items-center gap-4"
        >
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-vipps-orange to-vipps-coral flex items-center justify-center text-3xl font-bold text-white">
              E
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-500 border-2 border-white flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-vipps-dark">Emma</h2>
            <p className="text-sm text-gray-500">13 years old • New York</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-1 bg-vipps-cream text-vipps-orange text-xs font-semibold rounded-full">
                🔥 7 day streak
              </span>
              <span className="px-2 py-1 bg-purple-100 text-vipps-purple text-xs font-semibold rounded-full">
                ⚡ 1250 XP
              </span>
            </div>
          </div>
        </motion.div>

        {/* Vippsi Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-5 bg-gradient-to-r from-vipps-cream to-orange-50"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-vipps-orange to-vipps-coral flex items-center justify-center shadow-lg">
                <div className="relative w-10 h-10">
                  <div className="absolute top-3 left-1 w-2 h-2 bg-white rounded-full" />
                  <div className="absolute top-3 right-1 w-2 h-2 bg-white rounded-full" />
                  <div className="absolute top-3.5 left-1.5 w-1.5 h-1.5 bg-vipps-dark rounded-full" />
                  <div className="absolute top-3.5 right-1.5 w-1.5 h-1.5 bg-vipps-dark rounded-full" />
                  <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 w-4 h-2 border-b-2 border-white rounded-b-full" />
                </div>
              </div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-xl">👑</div>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-vipps-dark">Your Vippsi</h3>
              <p className="text-sm text-gray-600">Equipped: Crown, Sunglasses</p>
              <button className="mt-2 text-vipps-orange text-sm font-semibold flex items-center gap-1">
                Customize <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Menu Sections */}
        {menuSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + sectionIndex * 0.05 }}
          >
            <h3 className="font-semibold text-gray-500 text-sm mb-2 px-1">{section.title}</h3>
            <div className="card divide-y divide-gray-100">
              {section.items.map((item) => {
                const Icon = item.icon
                const isToggle = item.hasToggle
                const isAI = item.id === 'ai'
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (isToggle) {
                        handleToggle(item.id)
                      } else if (isAI) {
                        setShowAIModal(true)
                      }
                    }}
                    className="w-full p-4 flex items-center gap-4 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                      <Icon size={20} className="text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-vipps-dark">{item.label}</p>
                      {item.description && (
                        <p className="text-xs text-gray-500">{item.description}</p>
                      )}
                    </div>
                    {isToggle ? (
                      <div className={`w-12 h-7 rounded-full p-1 transition-colors ${
                        toggleStates[item.id as keyof typeof toggleStates] 
                          ? 'bg-vipps-orange' 
                          : 'bg-gray-200'
                      }`}>
                        <motion.div
                          className="w-5 h-5 rounded-full bg-white shadow"
                          animate={{
                            x: toggleStates[item.id as keyof typeof toggleStates] ? 20 : 0
                          }}
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      </div>
                    ) : (
                      <ChevronRight size={20} className="text-gray-400" />
                    )}
                  </button>
                )
              })}
            </div>
          </motion.div>
        ))}

        {/* App Version */}
        <div className="text-center py-4">
          <p className="text-xs text-gray-400">Vipps U15 Prototype v0.1.0</p>
          <p className="text-xs text-gray-400">Made with ❤️ for young savers</p>
        </div>
      </div>

      {/* AI Transparency Modal */}
      <AnimatePresence>
        {showAIModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
              onClick={() => setShowAIModal(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 max-w-[430px] mx-auto"
            >
              <div className="bg-white rounded-t-3xl shadow-2xl p-6 max-h-[80vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-vipps-purple to-vipps-pink flex items-center justify-center">
                      <Eye size={24} className="text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-vipps-dark">How Vippsi Works</h2>
                  </div>
                  <button 
                    onClick={() => setShowAIModal(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                  >
                    <X size={18} className="text-gray-500" />
                  </button>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <div className="bg-vipps-cream/50 rounded-2xl p-4">
                    <div className="flex items-start gap-3">
                      <Sparkles className="text-vipps-orange shrink-0 mt-1" size={20} />
                      <div>
                        <h3 className="font-bold text-vipps-dark">What is Vippsi?</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Vippsi is an AI-powered friend that helps you understand money better. 
                          Vippsi learns from how you use the app to give you personalized tips!
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-2xl p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="text-blue-500 shrink-0 mt-1" size={20} />
                      <div>
                        <h3 className="font-bold text-vipps-dark">Your Data is Safe</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          We never share your data with others. Everything Vippsi learns 
                          is only used to help you - nobody else.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-2xl p-4">
                    <div className="flex items-start gap-3">
                      <Users className="text-green-500 shrink-0 mt-1" size={20} />
                      <div>
                        <h3 className="font-bold text-vipps-dark">Parents Can See</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Your parents can see your progress and help you. 
                          They cannot see private conversations with Vippsi.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-2xl p-4">
                    <div className="flex items-start gap-3">
                      <Heart className="text-purple-500 shrink-0 mt-1" size={20} />
                      <div>
                        <h3 className="font-bold text-vipps-dark">Made for You</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Vippsi is designed especially for young people aged 12-14. 
                          All content is appropriate for your age.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-2xl">
                  <p className="text-sm text-gray-500 text-center">
                    Have questions? Talk to an adult or contact us!
                  </p>
                  <button className="w-full mt-3 py-3 border-2 border-vipps-orange text-vipps-orange font-semibold rounded-xl hover:bg-vipps-cream transition-colors flex items-center justify-center gap-2">
                    <HelpCircle size={18} />
                    Contact Support
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
