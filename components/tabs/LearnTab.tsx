'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Flame, 
  Zap, 
  Lock, 
  Check, 
  Star,
  ChevronRight,
  X,
  BookOpen,
  Trophy
} from 'lucide-react'
import Header from '../Header'

interface Lesson {
  id: number
  title: string
  description: string
  emoji: string
  xp: number
  duration: string
  completed: boolean
  locked: boolean
  questions?: number
}

interface Module {
  id: number
  title: string
  emoji: string
  color: string
  lessons: Lesson[]
  progress: number
}

const modules: Module[] = [
  {
    id: 1,
    title: 'Saving 101',
    emoji: '🏦',
    color: 'from-blue-400 to-cyan-400',
    progress: 75,
    lessons: [
      { id: 1, title: 'What is Saving?', description: 'Learn why saving is smart', emoji: '💰', xp: 50, duration: '3 min', completed: true, locked: false, questions: 5 },
      { id: 2, title: 'Setting Goals', description: 'How to create good saving goals', emoji: '🎯', xp: 75, duration: '5 min', completed: true, locked: false, questions: 6 },
      { id: 3, title: 'The Allowance Trick', description: 'Split your money wisely', emoji: '🧮', xp: 60, duration: '4 min', completed: false, locked: false, questions: 4 },
      { id: 4, title: 'Saving Challenges', description: 'Fun ways to save', emoji: '🎮', xp: 80, duration: '6 min', completed: false, locked: true, questions: 7 },
    ]
  },
  {
    id: 2,
    title: 'Smart Spending',
    emoji: '🧠',
    color: 'from-purple-400 to-pink-400',
    progress: 33,
    lessons: [
      { id: 5, title: 'Needs vs. Wants', description: 'Learn the difference', emoji: '🤔', xp: 50, duration: '3 min', completed: true, locked: false, questions: 5 },
      { id: 6, title: 'The Sale Trap', description: 'Are sales always good?', emoji: '🏷️', xp: 65, duration: '4 min', completed: false, locked: false, questions: 5 },
      { id: 7, title: 'Plan Your Purchases', description: 'Think before you buy', emoji: '📝', xp: 70, duration: '5 min', completed: false, locked: true, questions: 6 },
    ]
  },
  {
    id: 3,
    title: 'Money & Future',
    emoji: '🚀',
    color: 'from-orange-400 to-red-400',
    progress: 0,
    lessons: [
      { id: 8, title: 'Interest Explained', description: 'Money that grows!', emoji: '📈', xp: 80, duration: '5 min', completed: false, locked: true, questions: 6 },
      { id: 9, title: 'Jobs & Income', description: 'How to earn money', emoji: '💼', xp: 75, duration: '6 min', completed: false, locked: true, questions: 7 },
      { id: 10, title: 'Sharing & Giving', description: 'The joy of giving', emoji: '💝', xp: 60, duration: '4 min', completed: false, locked: true, questions: 5 },
    ]
  }
]

export default function LearnTab() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  
  const totalXP = 1250
  const streak = 7
  const lessonsCompleted = 3

  return (
    <div className="tab-content">
      <Header title="Learn 📚" showSettings={true} />
      
      <div className="p-4 space-y-5">
        {/* Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-around bg-gradient-to-r from-vipps-orange/10 to-vipps-coral/10 rounded-2xl p-4"
        >
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center flame-animate">
              <Flame size={20} className="text-white" />
            </div>
            <div>
              <p className="text-lg font-bold text-vipps-dark">{streak}</p>
              <p className="text-xs text-gray-500">Streak</p>
            </div>
          </div>
          <div className="w-px h-10 bg-gray-200" />
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-vipps-purple to-vipps-pink flex items-center justify-center">
              <Zap size={20} className="text-white" />
            </div>
            <div>
              <p className="text-lg font-bold text-vipps-dark">{totalXP}</p>
              <p className="text-xs text-gray-500">Total XP</p>
            </div>
          </div>
          <div className="w-px h-10 bg-gray-200" />
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
              <Check size={20} className="text-white" />
            </div>
            <div>
              <p className="text-lg font-bold text-vipps-dark">{lessonsCompleted}</p>
              <p className="text-xs text-gray-500">Done</p>
            </div>
          </div>
        </motion.div>

        {/* Daily Goal Progress */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card p-4"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-vipps-dark">Daily Goal</p>
            <span className="text-sm text-vipps-orange font-semibold">1/2 lessons</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-vipps-orange to-vipps-coral rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '50%' }}
              transition={{ duration: 0.8 }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Complete 1 more lesson to keep your streak! 🔥
          </p>
        </motion.div>

        {/* Modules */}
        <div className="space-y-4">
          {modules.map((module, moduleIndex) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + moduleIndex * 0.1 }}
            >
              {/* Module Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${module.color} flex items-center justify-center text-2xl`}>
                    {module.emoji}
                  </div>
                  <div>
                    <h3 className="font-bold text-vipps-dark">{module.title}</h3>
                    <p className="text-xs text-gray-500">
                      {module.lessons.filter(l => l.completed).length}/{module.lessons.length} completed
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-vipps-orange">{module.progress}%</span>
                </div>
              </div>

              {/* Module Progress Bar */}
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${module.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${module.progress}%` }}
                  transition={{ duration: 0.8, delay: 0.3 + moduleIndex * 0.1 }}
                />
              </div>

              {/* Lessons */}
              <div className="space-y-2">
                {module.lessons.map((lesson, lessonIndex) => (
                  <motion.button
                    key={lesson.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + moduleIndex * 0.1 + lessonIndex * 0.05 }}
                    onClick={() => !lesson.locked && setSelectedLesson(lesson)}
                    disabled={lesson.locked}
                    className={`w-full card p-4 flex items-center gap-4 text-left transition-all ${
                      lesson.locked 
                        ? 'bg-gray-50 opacity-60' 
                        : lesson.completed 
                          ? 'bg-green-50 border-2 border-green-200'
                          : 'hover:shadow-md'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${
                      lesson.locked ? 'bg-gray-200' : lesson.completed ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {lesson.locked ? <Lock size={20} className="text-gray-400" /> : lesson.emoji}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className={`font-semibold ${lesson.locked ? 'text-gray-400' : 'text-vipps-dark'}`}>
                          {lesson.title}
                        </h4>
                        {lesson.completed && (
                          <Check size={16} className="text-green-500" />
                        )}
                      </div>
                      <p className={`text-xs ${lesson.locked ? 'text-gray-300' : 'text-gray-500'}`}>
                        {lesson.duration} • +{lesson.xp} XP
                      </p>
                    </div>
                    {!lesson.locked && !lesson.completed && (
                      <ChevronRight size={20} className="text-gray-400" />
                    )}
                    {lesson.completed && (
                      <div className="flex items-center gap-1">
                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                        <Star size={16} className="text-yellow-400 fill-yellow-400" />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lesson Detail Modal */}
      <AnimatePresence>
        {selectedLesson && !showQuiz && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
              onClick={() => setSelectedLesson(null)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-50 max-w-[430px] mx-auto"
            >
              <div className="bg-white rounded-t-3xl shadow-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{selectedLesson.emoji}</span>
                    <div>
                      <h2 className="text-xl font-bold text-vipps-dark">{selectedLesson.title}</h2>
                      <p className="text-sm text-gray-500">{selectedLesson.description}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedLesson(null)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                  >
                    <X size={18} className="text-gray-500" />
                  </button>
                </div>

                {/* Lesson Info */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <BookOpen size={20} className="mx-auto text-vipps-purple mb-1" />
                    <p className="text-sm font-semibold text-vipps-dark">{selectedLesson.duration}</p>
                    <p className="text-xs text-gray-500">Length</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <Zap size={20} className="mx-auto text-vipps-orange mb-1" />
                    <p className="text-sm font-semibold text-vipps-dark">+{selectedLesson.xp}</p>
                    <p className="text-xs text-gray-500">XP</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <Trophy size={20} className="mx-auto text-yellow-500 mb-1" />
                    <p className="text-sm font-semibold text-vipps-dark">{selectedLesson.questions}</p>
                    <p className="text-xs text-gray-500">Questions</p>
                  </div>
                </div>

                {/* Vippsi Preview */}
                <div className="bg-gradient-to-r from-vipps-cream to-white rounded-2xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-vipps-orange to-vipps-coral flex items-center justify-center shrink-0">
                      <span className="text-lg">🦊</span>
                    </div>
                    <div>
                      <p className="font-semibold text-vipps-dark text-sm">Vippsi says:</p>
                      <p className="text-sm text-gray-600 mt-0.5">
                        "This lesson teaches you something really useful! 
                        Ready to become a saving master? 💪"
                      </p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setShowQuiz(true)}
                  className="w-full py-4 bg-gradient-to-r from-vipps-orange to-vipps-coral text-white font-bold rounded-2xl hover:opacity-90 transition-opacity"
                >
                  Start Lesson 🚀
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuiz && selectedLesson && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white z-50 max-w-[430px] mx-auto"
          >
            <div className="h-full flex flex-col p-6">
              {/* Quiz Header */}
              <div className="flex items-center justify-between mb-6">
                <button 
                  onClick={() => {
                    setShowQuiz(false)
                    setSelectedLesson(null)
                    setCurrentQuestion(0)
                  }}
                  className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  <X size={20} className="text-gray-500" />
                </button>
                <div className="flex-1 mx-4">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-vipps-orange to-vipps-coral rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestion + 1) / (selectedLesson.questions || 5)) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Zap size={16} className="text-vipps-orange" />
                  <span className="font-bold text-vipps-dark">+{selectedLesson.xp}</span>
                </div>
              </div>

              {/* Question */}
              <div className="flex-1 flex flex-col">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex-1"
                >
                  <div className="text-center mb-8">
                    <span className="text-6xl mb-4 block">🤔</span>
                    <h2 className="text-xl font-bold text-vipps-dark">
                      What's the best reason to save money?
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {[
                      'To buy something you really want',
                      'Because your parents say so',
                      'To have money for unexpected things',
                      'All of these are good reasons!'
                    ].map((answer, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + index * 0.1 }}
                        className="w-full p-4 text-left rounded-2xl border-2 border-gray-200 hover:border-vipps-orange hover:bg-vipps-cream/30 transition-all font-medium text-vipps-dark"
                        onClick={() => {
                          if (currentQuestion < (selectedLesson.questions || 5) - 1) {
                            setCurrentQuestion(prev => prev + 1)
                          } else {
                            // Quiz complete
                            setShowQuiz(false)
                            setSelectedLesson(null)
                            setCurrentQuestion(0)
                          }
                        }}
                      >
                        <span className="text-vipps-orange font-bold mr-2">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        {answer}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Vippsi Helper */}
                <div className="mt-auto pt-4">
                  <div className="bg-gradient-to-r from-vipps-cream to-white rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-vipps-orange to-vipps-coral flex items-center justify-center">
                      <span className="text-lg">💡</span>
                    </div>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-vipps-dark">Tip:</span> Think about what could happen in the future!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
