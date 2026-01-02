'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, CheckCircle, Lock, Star, Flame, Trophy, X, ChevronRight, Sparkles, Pause, Volume2, VolumeX, SkipForward, ChevronLeft, Clock, BookOpen, MessageCircle, Share2, Heart } from 'lucide-react'
import Header from '../Header'
import ShareAchievementModal, { Achievement } from '../share/ShareAchievementModal'

interface Lesson {
  id: number
  title: string
  description: string
  duration: string
  xp: number
  emoji: string
  completed: boolean
  locked: boolean
  questions?: Question[]
}

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  vippsiTip: string
}

interface VideoLesson {
  id: number
  title: string
  description: string
  duration: string
  xp: number
  thumbnail: string
  gradient: string
  category: string
  watched: boolean
  watchedPercent: number
  topics: string[]
  keyTakeaways: string[]
  vippsiIntro: string
}

const videoLessons: VideoLesson[] = [
  { 
    id: 1, 
    title: 'Your First Piggy Bank', 
    description: 'Learn why saving money is like planting magic seeds!', 
    duration: '2:30', 
    xp: 40, 
    thumbnail: '🐷',
    gradient: 'from-pink-400 to-rose-500',
    category: 'Saving',
    watched: true,
    watchedPercent: 100,
    topics: ['Why we save', 'How piggy banks work', 'Your first savings goal'],
    keyTakeaways: ['Saving helps you buy bigger things', 'Every coin counts!', 'Set a goal and watch your savings grow'],
    vippsiIntro: "Hey superstar! 🌟 Ready to learn about the magic of saving? Piggy banks are like treasure chests for your dreams!"
  },
  { 
    id: 2, 
    title: 'Money Grows on Trees?', 
    description: 'Discover where money really comes from!', 
    duration: '3:15', 
    xp: 50, 
    thumbnail: '🌳',
    gradient: 'from-emerald-400 to-teal-500',
    category: 'Basics',
    watched: true,
    watchedPercent: 100,
    topics: ['Where money comes from', 'How parents earn money', 'The value of work'],
    keyTakeaways: ['Money is earned through work', 'Different jobs pay differently', 'Hard work leads to rewards'],
    vippsiIntro: "Time for a myth-buster! 🔍 Does money really grow on trees? Let's find out the real story!"
  },
  { 
    id: 3, 
    title: 'Smart Spending Choices', 
    description: 'Should you buy it? Learn to decide!', 
    duration: '3:45', 
    xp: 60, 
    thumbnail: '🛍️',
    gradient: 'from-violet-400 to-purple-500',
    category: 'Spending',
    watched: false,
    watchedPercent: 45,
    topics: ['Needs vs wants', 'Making smart choices', 'Avoiding impulse buys'],
    keyTakeaways: ['Ask "Do I need it or want it?"', 'Wait before you buy', 'Compare prices first'],
    vippsiIntro: "Shopping time! 🛒 But wait... should you really buy that shiny toy? Let's learn to make super smart choices!"
  },
  { 
    id: 4, 
    title: 'Goal Getter!', 
    description: 'Set awesome savings goals like a pro', 
    duration: '4:00', 
    xp: 75, 
    thumbnail: '🎯',
    gradient: 'from-amber-400 to-orange-500',
    category: 'Goals',
    watched: false,
    watchedPercent: 0,
    topics: ['Setting SMART goals', 'Breaking goals into steps', 'Celebrating wins'],
    keyTakeaways: ['Make goals specific', 'Track your progress', 'Celebrate small wins too!'],
    vippsiIntro: "Ready to become a Goal Getter? 🏆 I'll show you the secret to achieving ANY money goal you set!"
  },
  { 
    id: 5, 
    title: 'Sharing is Caring', 
    description: 'The joy of giving and sharing money', 
    duration: '2:45', 
    xp: 45, 
    thumbnail: '💝',
    gradient: 'from-rose-400 to-pink-500',
    category: 'Values',
    watched: false,
    watchedPercent: 0,
    topics: ['Why giving feels good', 'Ways to help others', 'Being generous'],
    keyTakeaways: ['Giving makes us happy', 'You can help in many ways', 'Small acts make big differences'],
    vippsiIntro: "Did you know that sharing money can make you feel even happier than spending it on yourself? 💖 Let's explore!"
  },
]

const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "What happens when you save money regularly?",
    options: ["It disappears", "It grows over time", "Nothing happens", "You lose it"],
    correctAnswer: 1,
    explanation: "When you save money regularly, it grows over time! This is called building wealth.",
    vippsiTip: "Even small amounts add up! 🎯"
  },
  {
    id: 2,
    question: "What is a savings goal?",
    options: ["A game you play", "Something you want to buy by saving money", "A type of candy", "A homework assignment"],
    correctAnswer: 1,
    explanation: "A savings goal is something you want to buy or achieve by setting aside money over time!",
    vippsiTip: "Goals help you stay motivated! 💪"
  },
  {
    id: 3,
    question: "If you have 100 kr and spend 30 kr, how much do you have left?",
    options: ["30 kr", "100 kr", "70 kr", "130 kr"],
    correctAnswer: 2,
    explanation: "100 kr - 30 kr = 70 kr. Great math skills!",
    vippsiTip: "Always keep track of your spending! 📊"
  },
  {
    id: 4,
    question: "What's the smartest thing to do with birthday money?",
    options: ["Spend it all immediately", "Save some and spend some", "Hide it under your bed", "Give it away"],
    correctAnswer: 1,
    explanation: "Saving some and spending some is a balanced approach! This is called budgeting.",
    vippsiTip: "Balance is key! 🎉"
  },
]

const lessons: Lesson[] = [
  { id: 1, title: 'What is Money?', description: 'Learn the basics of money and why we use it', duration: '3 min', xp: 50, emoji: '💵', completed: true, locked: false, questions: sampleQuestions },
  { id: 2, title: 'Saving vs Spending', description: 'Understand the difference and why both matter', duration: '4 min', xp: 60, emoji: '🏦', completed: true, locked: false, questions: sampleQuestions },
  { id: 3, title: 'Setting Goals', description: 'How to set and achieve your money goals', duration: '5 min', xp: 75, emoji: '🎯', completed: false, locked: false, questions: sampleQuestions },
  { id: 4, title: 'Smart Shopping', description: 'Tips for getting the best value', duration: '4 min', xp: 60, emoji: '🛒', completed: false, locked: false, questions: sampleQuestions },
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
  const [isInQuiz, setIsInQuiz] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  
  // Video lesson states
  const [selectedVideo, setSelectedVideo] = useState<VideoLesson | null>(null)
  const [videoViewState, setVideoViewState] = useState<'preview' | 'playing' | 'completed'>('preview')
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [videoProgress, setVideoProgress] = useState(0)
  const [showVippsiChat, setShowVippsiChat] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  
  // Share achievement state
  const [showShareModal, setShowShareModal] = useState(false)
  const [achievementToShare, setAchievementToShare] = useState<Achievement | null>(null)
  
  const completedLessons = lessons.filter(l => l.completed).length
  const totalXP = lessons.filter(l => l.completed).reduce((acc, l) => acc + l.xp, 0)
  const watchedVideos = videoLessons.filter(v => v.watched).length

  // Video lesson functions
  const openVideoLesson = (video: VideoLesson) => {
    setSelectedVideo(video)
    setVideoViewState('preview')
    setVideoProgress(video.watchedPercent)
    setIsPlaying(false)
  }

  const startVideoPlayback = () => {
    setVideoViewState('playing')
    setIsPlaying(true)
    // Simulate video progress
    simulateVideoProgress()
  }

  const simulateVideoProgress = () => {
    const interval = setInterval(() => {
      setVideoProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsPlaying(false)
          setVideoViewState('completed')
          return 100
        }
        return prev + 2
      })
    }, 200)
    
    // Store interval ID so we can clear it when pausing
    return () => clearInterval(interval)
  }

  const togglePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false)
    } else {
      setIsPlaying(true)
      simulateVideoProgress()
    }
  }

  const closeVideoLesson = () => {
    setSelectedVideo(null)
    setVideoViewState('preview')
    setIsPlaying(false)
    setVideoProgress(0)
    setShowVippsiChat(false)
  }

  const skipToEnd = () => {
    setVideoProgress(100)
    setIsPlaying(false)
    setVideoViewState('completed')
  }

  const startQuiz = () => {
    setIsInQuiz(true)
    setCurrentQuestionIndex(0)
    setScore(0)
    setQuizCompleted(false)
    setSelectedAnswer(null)
    setShowResult(false)
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
  }

  const checkAnswer = () => {
    if (selectedAnswer === null || !selectedLesson?.questions) return
    
    const currentQuestion = selectedLesson.questions[currentQuestionIndex]
    const correct = selectedAnswer === currentQuestion.correctAnswer
    setIsCorrect(correct)
    setShowResult(true)
    
    if (correct) {
      setScore(prev => prev + 1)
    }
  }

  const nextQuestion = () => {
    if (!selectedLesson?.questions) return
    
    if (currentQuestionIndex < selectedLesson.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setQuizCompleted(true)
    }
  }

  const closeQuiz = () => {
    setIsInQuiz(false)
    setSelectedLesson(null)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setQuizCompleted(false)
  }

  // Share lesson completion
  const handleShareLesson = (lesson: Lesson) => {
    const achievement: Achievement = {
      id: lesson.id,
      type: 'lesson_completed',
      title: lesson.title,
      description: lesson.description,
      emoji: lesson.emoji,
      xp: lesson.xp,
      date: 'Today',
    }
    setAchievementToShare(achievement)
    setShowShareModal(true)
  }

  // Share video completion
  const handleShareVideo = (video: VideoLesson) => {
    const achievement: Achievement = {
      id: video.id,
      type: 'lesson_completed',
      title: video.title,
      description: video.description,
      emoji: video.thumbnail,
      xp: video.xp,
      date: 'Today',
    }
    setAchievementToShare(achievement)
    setShowShareModal(true)
  }

  const handleShareSubmit = (achievement: Achievement) => {
    console.log('Shared achievement:', achievement)
    // In a real app, this would send to the family feed
  }

  const currentQuestion = selectedLesson?.questions?.[currentQuestionIndex]
  const progress = selectedLesson?.questions 
    ? ((currentQuestionIndex + (showResult ? 1 : 0)) / selectedLesson.questions.length) * 100 
    : 0

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

        {/* Video Lessons Carousel */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-label-primary text-[18px] tracking-[-0.45px]">📺 Video Lessons</h3>
            <span className="text-[14px] text-tint-primary font-medium">{watchedVideos}/{videoLessons.length} watched</span>
          </div>
          
          <div 
            ref={carouselRef}
            className="flex gap-4 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory"
          >
            {videoLessons.map((video, index) => (
              <motion.button
                key={video.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.08 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="min-w-[200px] snap-start cursor-pointer text-left"
                onClick={() => openVideoLesson(video)}
                aria-label={`Watch video: ${video.title}`}
              >
                {/* Video Thumbnail Card */}
                <div className={`relative h-[120px] rounded-[16px] bg-gradient-to-br ${video.gradient} overflow-hidden shadow-lg`}>
                  {/* Thumbnail emoji */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-5xl opacity-90">{video.thumbnail}</span>
                  </div>
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <Play size={20} className="text-gray-800 ml-0.5" />
                    </div>
                  </div>
                  
                  {/* Duration badge */}
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 rounded-md flex items-center gap-1">
                    <Clock size={10} className="text-white" />
                    <span className="text-[10px] text-white font-medium">{video.duration}</span>
                  </div>
                  
                  {/* Watch progress bar */}
                  {video.watchedPercent > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                      <div 
                        className="h-full bg-white rounded-r-full"
                        style={{ width: `${video.watchedPercent}%` }}
                      />
                    </div>
                  )}
                  
                  {/* Completed checkmark */}
                  {video.watched && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-tint-success flex items-center justify-center">
                      <CheckCircle size={14} className="text-white" />
                    </div>
                  )}
                </div>
                
                {/* Video info */}
                <div className="mt-2">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[10px] px-2 py-0.5 bg-fill-primary rounded-full text-label-secondary font-medium">
                      {video.category}
                    </span>
                    <span className="text-[10px] text-tint-secondary font-medium">+{video.xp} XP</span>
                  </div>
                  <h4 className="font-medium text-label-primary text-[14px] tracking-[-0.28px] line-clamp-1">
                    {video.title}
                  </h4>
                  <p className="text-[12px] text-label-secondary line-clamp-1 tracking-[-0.12px]">
                    {video.description}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Lessons */}
        <div>
          <h3 className="font-medium text-label-primary text-[18px] tracking-[-0.45px] mb-3">📖 Quiz Lessons</h3>
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

      {/* Lesson Preview Modal */}
      <AnimatePresence>
        {selectedLesson && !isInQuiz && (
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

                {/* Vippsi Introduction */}
                <div className="flex items-start gap-3 mb-6">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-white shadow-sm border border-tint-primary/20 shrink-0">
                    <img
                      src="/Vippsi.png"
                      alt="Vippsi"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="surface-card p-3 rounded-[12px] flex-1">
                    <p className="text-[14px] text-label-primary">
                      Hey! 👋 Ready to learn about <strong>{selectedLesson.title.toLowerCase()}</strong>? 
                      I'll guide you through a fun quiz with {selectedLesson.questions?.length || 4} questions!
                    </p>
                  </div>
                </div>

                <p className="text-[16px] text-label-secondary mb-6">{selectedLesson.description}</p>

                <button 
                  onClick={startQuiz}
                  className="w-full py-4 bg-tint-primary text-fixed-white font-semibold rounded-[12px] hover:opacity-90 transition-opacity flex items-center justify-center gap-2 text-[16px]"
                >
                  <Play size={20} />
                  {selectedLesson.completed ? 'Practice Again' : 'Start Lesson'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Quiz Modal */}
      <AnimatePresence>
        {isInQuiz && selectedLesson && currentQuestion && !quizCompleted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background-primary z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-4 flex items-center gap-4">
              <button 
                onClick={closeQuiz}
                className="w-10 h-10 rounded-full bg-fill-primary flex items-center justify-center"
              >
                <X size={20} className="text-label-secondary" />
              </button>
              <div className="flex-1 h-3 bg-fill-primary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-tint-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="flex items-center gap-1">
                <Star size={16} className="text-tint-primary" />
                <span className="text-[14px] font-medium text-tint-primary">{score}</span>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-4 flex flex-col">
              {/* Vippsi */}
              <motion.div 
                className="flex justify-center mb-6"
                animate={showResult ? (isCorrect ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : { x: [0, -10, 10, -10, 10, 0] }) : {}}
                transition={{ duration: 0.5 }}
              >
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-white shadow-lg border-4 border-tint-primary/20">
                    <img
                      src="/Vippsi.png"
                      alt="Vippsi"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {showResult && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center text-xl ${
                        isCorrect ? 'bg-tint-success' : 'bg-[#FF6B6B]'
                      }`}
                    >
                      {isCorrect ? '🎉' : '😅'}
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Vippsi Speech Bubble */}
              <motion.div 
                key={currentQuestionIndex + (showResult ? '-result' : '')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="surface-card p-4 rounded-[16px] mb-6 text-center"
              >
                {!showResult ? (
                  <p className="text-[18px] font-medium text-label-primary">
                    {currentQuestion.question}
                  </p>
                ) : (
                  <div>
                    <p className={`text-[18px] font-semibold mb-2 ${isCorrect ? 'text-tint-success' : 'text-[#FF6B6B]'}`}>
                      {isCorrect ? 'Correct! 🎉' : 'Not quite! 🤔'}
                    </p>
                    <p className="text-[14px] text-label-secondary mb-2">
                      {currentQuestion.explanation}
                    </p>
                    <p className="text-[14px] text-tint-primary font-medium">
                      💡 {currentQuestion.vippsiTip}
                    </p>
                  </div>
                )}
              </motion.div>

              {/* Answer Options */}
              {!showResult && (
                <div className="space-y-3 mb-6">
                  {currentQuestion.options.map((option, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleAnswerSelect(index)}
                      className={`w-full p-4 rounded-[12px] text-left font-medium text-[16px] transition-all ${
                        selectedAnswer === index
                          ? 'bg-tint-primary text-fixed-white border-2 border-tint-primary'
                          : 'surface-card border-2 border-transparent hover:border-tint-primary/30'
                      }`}
                    >
                      <span className="mr-3 inline-block w-6 h-6 rounded-full bg-fill-primary text-center text-[14px] leading-6 text-label-primary">
                        {String.fromCharCode(65 + index)}
                      </span>
                      {option}
                    </motion.button>
                  ))}
                </div>
              )}

              {/* Show Results for answered questions */}
              {showResult && (
                <div className="space-y-3 mb-6">
                  {currentQuestion.options.map((option, index) => (
                    <div
                      key={index}
                      className={`w-full p-4 rounded-[12px] text-left font-medium text-[16px] ${
                        index === currentQuestion.correctAnswer
                          ? 'bg-tint-success/20 border-2 border-tint-success text-tint-success'
                          : selectedAnswer === index
                            ? 'bg-[#FF6B6B]/20 border-2 border-[#FF6B6B] text-[#FF6B6B]'
                            : 'surface-card border-2 border-transparent text-label-secondary'
                      }`}
                    >
                      <span className="mr-3 inline-block w-6 h-6 rounded-full bg-fill-primary text-center text-[14px] leading-6">
                        {index === currentQuestion.correctAnswer ? '✓' : selectedAnswer === index ? '✗' : String.fromCharCode(65 + index)}
                      </span>
                      {option}
                    </div>
                  ))}
                </div>
              )}

              {/* Action Button */}
              <div className="mt-auto">
                {!showResult ? (
                  <button
                    onClick={checkAnswer}
                    disabled={selectedAnswer === null}
                    className={`w-full py-4 rounded-[12px] font-semibold text-[16px] transition-all ${
                      selectedAnswer !== null
                        ? 'bg-tint-primary text-fixed-white hover:opacity-90'
                        : 'bg-fill-primary text-label-disabled'
                    }`}
                  >
                    Check Answer
                  </button>
                ) : (
                  <button
                    onClick={nextQuestion}
                    className="w-full py-4 bg-tint-primary text-fixed-white rounded-[12px] font-semibold text-[16px] hover:opacity-90 transition-opacity"
                  >
                    {currentQuestionIndex < (selectedLesson.questions?.length || 0) - 1 ? 'Next Question' : 'See Results'}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quiz Completed Modal */}
      <AnimatePresence>
        {quizCompleted && selectedLesson && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background-primary z-50 flex flex-col items-center justify-center p-6"
          >
            {/* Celebration */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="relative mb-8"
            >
              <div className="w-32 h-32 rounded-full overflow-hidden bg-white shadow-xl border-4 border-tint-primary">
                <img
                  src="/Vippsi.png"
                  alt="Vippsi"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-4 -right-4"
              >
                <Sparkles size={32} className="text-[#FFD93D]" />
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-2 -left-4"
              >
                <span className="text-4xl">🎉</span>
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-[28px] font-bold text-label-primary mb-2"
            >
              Lesson Complete!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-[16px] text-label-secondary mb-8 text-center"
            >
              Great job! You finished "{selectedLesson.title}"
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="surface-card p-6 rounded-[16px] w-full mb-8"
            >
              <div className="flex justify-around">
                <div className="text-center">
                  <p className="text-[32px] font-bold text-tint-primary">{score}/{selectedLesson.questions?.length}</p>
                  <p className="text-[14px] text-label-secondary">Correct</p>
                </div>
                <div className="w-px bg-separator-primary" />
                <div className="text-center">
                  <p className="text-[32px] font-bold text-tint-secondary">+{selectedLesson.xp}</p>
                  <p className="text-[14px] text-label-secondary">XP Earned</p>
                </div>
              </div>
            </motion.div>

            {/* Vippsi Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="surface-card p-4 rounded-[12px] mb-8 w-full"
            >
              <p className="text-[16px] text-label-primary text-center">
                {score === selectedLesson.questions?.length 
                  ? "Perfect score! You're a money genius! 🌟" 
                  : score >= (selectedLesson.questions?.length || 0) / 2 
                    ? "Great work! Keep learning and you'll be a pro! 💪" 
                    : "Nice try! Practice makes perfect! 🎯"}
              </p>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="w-full space-y-3"
            >
              {/* Share Button */}
              <button
                onClick={() => selectedLesson && handleShareLesson(selectedLesson)}
                className="w-full py-4 bg-gradient-to-r from-tint-primary to-tint-secondary text-fixed-white rounded-[12px] font-semibold text-[16px] flex items-center justify-center gap-2 shadow-lg"
              >
                <Heart size={20} />
                Share with Family
              </button>
              <button
                onClick={closeQuiz}
                className="w-full py-4 bg-tint-primary text-fixed-white rounded-[12px] font-semibold text-[16px] hover:opacity-90 transition-opacity"
              >
                Continue Learning
              </button>
              <button
                onClick={startQuiz}
                className="w-full py-3 text-tint-primary font-medium text-[14px]"
              >
                Try Again
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Lesson Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background-primary z-50 flex flex-col overflow-hidden"
          >
            {/* Video Preview State */}
            {videoViewState === 'preview' && (
              <>
                {/* Back header */}
                <div className="p-4 flex items-center gap-3">
                  <button 
                    onClick={closeVideoLesson}
                    className="w-10 h-10 rounded-full bg-fill-primary flex items-center justify-center"
                  >
                    <ChevronLeft size={20} className="text-label-primary" />
                  </button>
                  <span className="text-[16px] font-medium text-label-primary">{selectedVideo.category}</span>
                </div>

                {/* Video Thumbnail Preview */}
                <motion.div 
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`relative mx-4 h-[220px] rounded-[20px] bg-gradient-to-br ${selectedVideo.gradient} overflow-hidden shadow-xl`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-8xl opacity-80">{selectedVideo.thumbnail}</span>
                  </div>
                  
                  {/* Large play button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={startVideoPlayback}
                    className="absolute inset-0 flex items-center justify-center bg-black/20"
                  >
                    <div className="w-20 h-20 rounded-full bg-white/95 flex items-center justify-center shadow-2xl">
                      <Play size={36} className="text-gray-800 ml-1" />
                    </div>
                  </motion.button>
                  
                  {/* Duration badge */}
                  <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/60 rounded-lg flex items-center gap-1.5">
                    <Clock size={14} className="text-white" />
                    <span className="text-[14px] text-white font-medium">{selectedVideo.duration}</span>
                  </div>
                </motion.div>

                {/* Video Info */}
                <div className="p-4 flex-1 overflow-y-auto">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[12px] px-2.5 py-1 bg-fill-primary rounded-full text-label-secondary font-medium">
                        {selectedVideo.category}
                      </span>
                      <span className="text-[12px] text-tint-secondary font-semibold">+{selectedVideo.xp} XP</span>
                    </div>
                    <h1 className="text-[24px] font-bold text-label-primary mb-2">{selectedVideo.title}</h1>
                    <p className="text-[16px] text-label-secondary mb-4">{selectedVideo.description}</p>
                  </motion.div>

                  {/* Vippsi Intro */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-start gap-3 mb-5"
                  >
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-white shadow-sm border-2 border-tint-primary/20 shrink-0">
                      <img src="/Vippsi.png" alt="Vippsi" className="w-full h-full object-cover" />
                    </div>
                    <div className="surface-card p-3 rounded-[12px] flex-1">
                      <p className="text-[14px] text-label-primary">{selectedVideo.vippsiIntro}</p>
                    </div>
                  </motion.div>

                  {/* What You'll Learn */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mb-5"
                  >
                    <h3 className="text-[16px] font-semibold text-label-primary mb-3 flex items-center gap-2">
                      <BookOpen size={18} className="text-tint-primary" />
                      What You'll Learn
                    </h3>
                    <div className="space-y-2">
                      {selectedVideo.topics.map((topic, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-tint-primary" />
                          <span className="text-[14px] text-label-secondary">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Start Watching Button */}
                <div className="p-4 bg-background-primary border-t border-separator-primary">
                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    onClick={startVideoPlayback}
                    className={`w-full py-4 rounded-[12px] font-semibold text-[16px] flex items-center justify-center gap-2 bg-gradient-to-r ${selectedVideo.gradient} text-white shadow-lg`}
                  >
                    <Play size={20} />
                    {selectedVideo.watchedPercent > 0 && selectedVideo.watchedPercent < 100 
                      ? 'Continue Watching' 
                      : selectedVideo.watched 
                        ? 'Watch Again' 
                        : 'Start Watching'}
                  </motion.button>
                </div>
              </>
            )}

            {/* Video Playing State */}
            {videoViewState === 'playing' && (
              <>
                {/* Video Player Area */}
                <div className={`relative h-[300px] bg-gradient-to-br ${selectedVideo.gradient}`}>
                  {/* Animated background elements */}
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <span className="text-[120px] opacity-60">{selectedVideo.thumbnail}</span>
                  </motion.div>

                  {/* Overlay Controls */}
                  <div className="absolute inset-0 bg-black/20 flex flex-col justify-between p-4">
                    {/* Top bar */}
                    <div className="flex items-center justify-between">
                      <button 
                        onClick={closeVideoLesson}
                        className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm"
                      >
                        <X size={20} className="text-white" />
                      </button>
                      <button 
                        onClick={() => setIsMuted(!isMuted)}
                        className="w-10 h-10 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-sm"
                      >
                        {isMuted ? <VolumeX size={18} className="text-white" /> : <Volume2 size={18} className="text-white" />}
                      </button>
                    </div>

                    {/* Center play/pause */}
                    <div className="flex items-center justify-center gap-8">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={togglePlayPause}
                        className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-xl"
                      >
                        {isPlaying ? (
                          <Pause size={28} className="text-gray-800" />
                        ) : (
                          <Play size={28} className="text-gray-800 ml-1" />
                        )}
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={skipToEnd}
                        className="w-12 h-12 rounded-full bg-white/40 flex items-center justify-center backdrop-blur-sm"
                      >
                        <SkipForward size={20} className="text-white" />
                      </motion.button>
                    </div>

                    {/* Bottom progress */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[12px] text-white/80 font-medium">
                          {Math.floor(videoProgress / 100 * parseInt(selectedVideo.duration.split(':')[0]))}:{String(Math.floor(videoProgress / 100 * parseInt(selectedVideo.duration.split(':')[1]))).padStart(2, '0')}
                        </span>
                        <div className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full bg-white rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${videoProgress}%` }}
                          />
                        </div>
                        <span className="text-[12px] text-white/80 font-medium">{selectedVideo.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Live Content Area */}
                <div className="flex-1 p-4 overflow-y-auto">
                  <motion.h2 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[18px] font-semibold text-label-primary mb-3"
                  >
                    {selectedVideo.title}
                  </motion.h2>

                  {/* Vippsi Chat button */}
                  <motion.button
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    onClick={() => setShowVippsiChat(!showVippsiChat)}
                    className={`w-full p-3 rounded-[12px] flex items-center gap-3 transition-all ${
                      showVippsiChat ? 'bg-tint-primary/10 border-2 border-tint-primary' : 'surface-card'
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-white shadow-sm border border-tint-primary/20">
                      <img src="/Vippsi.png" alt="Vippsi" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-[14px] font-medium text-label-primary">Chat with Vippsi</p>
                      <p className="text-[12px] text-label-secondary">Ask questions about this lesson!</p>
                    </div>
                    <MessageCircle size={20} className={showVippsiChat ? 'text-tint-primary' : 'text-label-secondary'} />
                  </motion.button>

                  {/* Vippsi Chat Panel */}
                  <AnimatePresence>
                    {showVippsiChat && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="mt-3 overflow-hidden"
                      >
                        <div className="surface-card p-4 rounded-[12px] space-y-3">
                          <div className="flex items-start gap-2">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-white shrink-0">
                              <img src="/Vippsi.png" alt="Vippsi" className="w-full h-full object-cover" />
                            </div>
                            <div className="bg-tint-primary/10 rounded-[12px] p-3 flex-1">
                              <p className="text-[14px] text-label-primary">
                                Hey! 👋 I'm here to help! Do you have any questions about what you're learning?
                              </p>
                            </div>
                          </div>
                          
                          {/* Quick question buttons */}
                          <div className="flex flex-wrap gap-2">
                            {['What does this mean?', 'Can you give an example?', 'Why is this important?'].map((q, i) => (
                              <button 
                                key={i}
                                className="px-3 py-1.5 text-[12px] bg-fill-primary rounded-full text-label-primary hover:bg-fill-secondary transition-colors"
                              >
                                {q}
                              </button>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Key Takeaways (appears as video progresses) */}
                  {videoProgress > 30 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4"
                    >
                      <h3 className="text-[16px] font-semibold text-label-primary mb-3 flex items-center gap-2">
                        <Sparkles size={18} className="text-tint-secondary" />
                        Key Takeaways
                      </h3>
                      <div className="space-y-2">
                        {selectedVideo.keyTakeaways.slice(0, Math.ceil(videoProgress / 33)).map((takeaway, i) => (
                          <motion.div 
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-2 surface-card p-3 rounded-[10px]"
                          >
                            <CheckCircle size={16} className="text-tint-success mt-0.5 shrink-0" />
                            <span className="text-[14px] text-label-primary">{takeaway}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </>
            )}

            {/* Video Completed State */}
            {videoViewState === 'completed' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex-1 flex flex-col items-center justify-center p-6"
              >
                {/* Celebration */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                  className="relative mb-6"
                >
                  <div className={`w-28 h-28 rounded-full bg-gradient-to-br ${selectedVideo.gradient} flex items-center justify-center shadow-xl`}>
                    <span className="text-6xl">{selectedVideo.thumbnail}</span>
                  </div>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -top-2 -right-2 w-10 h-10 bg-tint-success rounded-full flex items-center justify-center shadow-lg"
                  >
                    <CheckCircle size={24} className="text-white" />
                  </motion.div>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-[26px] font-bold text-label-primary mb-2 text-center"
                >
                  Video Complete! 🎉
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-[16px] text-label-secondary mb-6 text-center"
                >
                  Great job watching "{selectedVideo.title}"
                </motion.p>

                {/* XP Earned */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  className="surface-card px-8 py-4 rounded-[16px] mb-6"
                >
                  <div className="flex items-center gap-3">
                    <Star size={32} className="text-tint-secondary" />
                    <div>
                      <p className="text-[28px] font-bold text-tint-secondary">+{selectedVideo.xp} XP</p>
                      <p className="text-[14px] text-label-secondary">Earned!</p>
                    </div>
                  </div>
                </motion.div>

                {/* What you learned */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="w-full surface-card p-4 rounded-[16px] mb-6"
                >
                  <h3 className="text-[16px] font-semibold text-label-primary mb-3 flex items-center gap-2">
                    <Sparkles size={18} className="text-tint-primary" />
                    What You Learned
                  </h3>
                  <div className="space-y-2">
                    {selectedVideo.keyTakeaways.map((takeaway, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + i * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle size={16} className="text-tint-success mt-0.5 shrink-0" />
                        <span className="text-[14px] text-label-primary">{takeaway}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Vippsi encouragement */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex items-start gap-3 mb-6 w-full"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-white shadow-sm border-2 border-tint-primary/20 shrink-0">
                    <img src="/Vippsi.png" alt="Vippsi" className="w-full h-full object-cover" />
                  </div>
                  <div className="surface-card p-3 rounded-[12px] flex-1">
                    <p className="text-[14px] text-label-primary">
                      Amazing work! 🌟 You're becoming a real money expert! Ready to test what you've learned with a quick quiz?
                    </p>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="w-full space-y-3"
                >
                  {/* Share Button */}
                  <button
                    onClick={() => selectedVideo && handleShareVideo(selectedVideo)}
                    className="w-full py-4 bg-gradient-to-r from-tint-primary to-tint-secondary text-fixed-white rounded-[12px] font-semibold text-[16px] flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Heart size={20} />
                    Share with Family
                  </button>
                  <button
                    onClick={() => {
                      closeVideoLesson()
                      // Find a matching quiz lesson
                      const matchingLesson = lessons.find(l => !l.locked && !l.completed)
                      if (matchingLesson) {
                        setSelectedLesson(matchingLesson)
                      }
                    }}
                    className={`w-full py-4 rounded-[12px] font-semibold text-[16px] flex items-center justify-center gap-2 bg-gradient-to-r ${selectedVideo.gradient} text-white`}
                  >
                    <Trophy size={20} />
                    Take the Quiz
                  </button>
                  <button
                    onClick={closeVideoLesson}
                    className="w-full py-3 text-label-primary font-medium text-[14px]"
                  >
                    Continue Learning
                  </button>
                </motion.div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Achievement Modal */}
      <ShareAchievementModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        achievement={achievementToShare}
        onShare={handleShareSubmit}
      />
    </div>
  )
}
