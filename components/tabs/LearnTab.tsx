'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, CheckCircle, Lock, Star, Flame, Trophy, X, ChevronRight } from 'lucide-react'
import Header from '../Header'

interface Lesson {
  id: number
  title: string
  description: string
  duration: string
  xp: number
  emoji: string
  completed: boolean
  locked: boolean
}

const lessons: Lesson[] = [
  { id: 1, title: 'What is Money?', description: 'Learn the basics of money and why we use it', duration: '3 min', xp: 50, emoji: '💵', completed: true, locked: false },
  { id: 2, title: 'Saving vs Spending', description: 'Understand the difference and why both matter', duration: '4 min', xp: 60, emoji: '🏦', completed: true, locked: false },
  { id: 3, title: 'Setting Goals', description: 'How to set and achieve your money goals', duration: '5 min', xp: 75, emoji: '🎯', completed: false, locked: false },
  { id: 4, title: 'Smart Shopping', description: 'Tips for getting the best value', duration: '4 min', xp: 60, emoji: '🛒', completed: false, locked: false },
  { id: 5, title: 'Earning Money', description: 'Ways kids can earn their own money', duration: '5 min', xp: 80, emoji: '💪', completed: false, locked: true },
  { id: 6, title: 'Budgeting Basics', description: 'Create your first simple budget', duration: '6 min', xp: 100, emoji: '📊', completed: false, locked: true },
]

const achievements = [
  { id: 1, name: 'First Lesson', emoji: '🌟', earned: true },
  { id: 2, name: '7 Day Streak', emoji: '🔥', earned: true },
  { id: 3, name: 'Quiz Master', emoji: '🧠', earned: false },
  { id: 4, name: 'Goal Setter', emoji: '🎯', earned: false },
]

export default function LearnTab() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  
  const completedLessons = lessons.filter(l => l.completed).length
  const totalXP = lessons.filter(l => l.completed).reduce((acc, l) => acc + l.xp, 0)

  return (
    <div className="tab-content bg-background-primary">
      <Header title="Learn 📚" />
      
      <div className="p-4 space-y-5">
        {/* Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="surface-card p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#FFD93D]/20 flex items-center justify-center">
              <Flame size={24} className="text-tint-primary" />
            </div>
            <div>
              <p className="font-semibold text-label-primary text-[18px]">7 Day Streak!</p>
              <p className="text-[14px] text-label-secondary">Keep it going! 🔥</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[20px] font-semibold text-tint-secondary">{totalXP} XP</p>
            <p className="text-[12px] text-label-secondary">Total earned</p>
          </div>
        </motion.div>

        {/* Progress */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="surface-card p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-label-primary text-[16px] tracking-[-0.32px]">Your Progress</h3>
            <span className="text-[14px] text-tint-primary font-medium">{completedLessons}/{lessons.length} lessons</span>
          </div>
          <div className="h-3 bg-fill-primary rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-tint-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(completedLessons / lessons.length) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </motion.div>

        {/* Lessons */}
        <div>
          <h3 className="font-medium text-label-primary text-[18px] tracking-[-0.45px] mb-3">Lessons</h3>
          <div className="space-y-3">
            {lessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                className={`surface-card p-4 cursor-pointer transition-colors ${
                  lesson.locked ? 'opacity-60' : 'hover:bg-gray-100'
                } ${lesson.completed ? 'border-2 border-tint-success/20' : ''}`}
                onClick={() => !lesson.locked && setSelectedLesson(lesson)}
              >
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{lesson.emoji}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium text-label-primary text-[16px] tracking-[-0.32px]">{lesson.title}</h4>
                      {lesson.completed && <CheckCircle size={16} className="text-tint-success" />}
                      {lesson.locked && <Lock size={16} className="text-label-disabled" />}
                    </div>
                    <p className="text-[14px] text-label-secondary tracking-[-0.15px]">{lesson.duration} • +{lesson.xp} XP</p>
                  </div>
                  {!lesson.locked && (
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      lesson.completed ? 'bg-tint-success' : 'bg-tint-primary'
                    }`}>
                      {lesson.completed ? (
                        <CheckCircle size={20} className="text-fixed-white" />
                      ) : (
                        <Play size={20} className="text-fixed-white ml-0.5" />
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-label-primary text-[18px] tracking-[-0.45px]">Achievements</h3>
            <button className="text-tint-primary text-[14px] font-medium flex items-center gap-1 hover:opacity-80">
              See all <ChevronRight size={16} />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={`surface-card p-4 min-w-[100px] flex flex-col items-center ${
                  !achievement.earned ? 'opacity-50' : ''
                }`}
              >
                <span className="text-3xl mb-2">{achievement.emoji}</span>
                <p className="text-[12px] font-medium text-label-primary text-center">{achievement.name}</p>
                {achievement.earned && (
                  <span className="text-[10px] text-tint-success font-medium mt-1">Earned!</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Daily Quiz */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="surface-card p-4 border-2 border-tint-secondary/20"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-tint-secondary/20 flex items-center justify-center">
              <Trophy size={24} className="text-tint-secondary" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-label-primary text-[16px] tracking-[-0.32px]">Daily Quiz</h3>
              <p className="text-[14px] text-label-secondary">Test your knowledge and earn XP!</p>
            </div>
            <button className="px-4 py-2 bg-tint-secondary text-fixed-white font-medium rounded-full text-[14px] hover:opacity-90 transition-opacity">
              Play
            </button>
          </div>
        </motion.div>
      </div>

      {/* Lesson Modal */}
      <AnimatePresence>
        {selectedLesson && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-label-primary/30 backdrop-blur-sm z-50"
              onClick={() => setSelectedLesson(null)}
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
                    <span className="text-4xl">{selectedLesson.emoji}</span>
                    <div>
                      <h2 className="text-[20px] font-semibold text-label-primary">{selectedLesson.title}</h2>
                      <p className="text-[14px] text-label-secondary">{selectedLesson.duration} • +{selectedLesson.xp} XP</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedLesson(null)}
                    className="w-8 h-8 rounded-full bg-fill-primary flex items-center justify-center"
                  >
                    <X size={18} className="text-label-secondary" />
                  </button>
                </div>

                <p className="text-[16px] text-label-secondary mb-6">{selectedLesson.description}</p>

                <button className="w-full py-4 bg-tint-primary text-fixed-white font-semibold rounded-[12px] hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-[16px]">
                  <Play size={20} />
                  {selectedLesson.completed ? 'Review Lesson' : 'Start Lesson'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
