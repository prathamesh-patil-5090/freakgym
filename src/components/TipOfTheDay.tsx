"use client";
import { useState, useEffect } from 'react';
import { Lightbulb, ChevronLeft, ChevronRight, Bookmark, Share2, RefreshCw, Star, Heart, Zap, Apple, Dumbbell, Brain } from 'lucide-react';

interface Tip {
  id: string;
  title: string;
  content: string;
  category: 'fitness' | 'nutrition' | 'wellness' | 'motivation' | 'recovery' | 'general';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'all';
  tags: string[];
  isBookmarked: boolean;
  likes: number;
  source?: string;
  readTime: string;
  icon: string;
}

const fitnessWisdom: Tip[] = [
  {
    id: '1',
    title: 'Progressive Overload is Key',
    content: 'To build muscle and strength, gradually increase weight, reps, or sets over time. Your muscles adapt to stress, so you need to continuously challenge them with progressive overload.',
    category: 'fitness',
    difficulty: 'beginner',
    tags: ['strength', 'muscle building', 'progression'],
    isBookmarked: false,
    likes: 127,
    source: 'Exercise Science Journal',
    readTime: '1 min',
    icon: '💪'
  },
  {
    id: '2',
    title: 'Hydration Affects Performance',
    content: 'Even mild dehydration (2% of body weight) can reduce physical performance by up to 25%. Drink water before, during, and after workouts for optimal performance.',
    category: 'nutrition',
    difficulty: 'all',
    tags: ['hydration', 'performance', 'water'],
    isBookmarked: true,
    likes: 89,
    source: 'Sports Medicine Research',
    readTime: '45 sec',
    icon: '💧'
  },
  {
    id: '3',
    title: 'Sleep is Your Secret Weapon',
    content: 'During deep sleep, your body releases 95% of its growth hormone. Aim for 7-9 hours of quality sleep to maximize muscle recovery and performance gains.',
    category: 'recovery',
    difficulty: 'all',
    tags: ['sleep', 'recovery', 'growth hormone'],
    isBookmarked: false,
    likes: 203,
    source: 'Sleep Research Institute',
    readTime: '1 min',
    icon: '😴'
  },
  {
    id: '4',
    title: 'Mind-Muscle Connection',
    content: 'Focus on feeling the target muscle working during each rep. Studies show that thinking about the muscle being trained can increase activation by up to 20%.',
    category: 'fitness',
    difficulty: 'intermediate',
    tags: ['mind-muscle', 'technique', 'focus'],
    isBookmarked: false,
    likes: 156,
    source: 'Neuroscience & Exercise',
    readTime: '1 min',
    icon: '🧠'
  },
  {
    id: '5',
    title: 'Protein Timing Matters',
    content: 'Consume 20-40g of protein within 2 hours post-workout to maximize muscle protein synthesis. Your muscles are most receptive to nutrients during this "anabolic window".',
    category: 'nutrition',
    difficulty: 'intermediate',
    tags: ['protein', 'timing', 'recovery'],
    isBookmarked: true,
    likes: 98,
    source: 'Nutrition Research',
    readTime: '1 min',
    icon: '🥩'
  },
  {
    id: '6',
    title: 'Compound Movements Rule',
    content: 'Exercises like squats, deadlifts, and pull-ups work multiple muscle groups simultaneously, giving you more bang for your buck and better functional strength.',
    category: 'fitness',
    difficulty: 'beginner',
    tags: ['compound', 'efficiency', 'strength'],
    isBookmarked: false,
    likes: 174,
    source: 'Strength & Conditioning',
    readTime: '45 sec',
    icon: '🏋️'
  },
  {
    id: '7',
    title: 'Stress Sabotages Progress',
    content: 'Chronic stress elevates cortisol levels, which can break down muscle tissue and promote fat storage. Practice stress management techniques like meditation or yoga.',
    category: 'wellness',
    difficulty: 'all',
    tags: ['stress', 'cortisol', 'mindfulness'],
    isBookmarked: false,
    likes: 142,
    source: 'Psychophysiology Studies',
    readTime: '1 min',
    icon: '🧘'
  },
  {
    id: '8',
    title: 'Variety Prevents Plateaus',
    content: 'Change your workout routine every 4-6 weeks to prevent adaptation plateaus. Your body is incredibly efficient at adapting, so keep challenging it in new ways.',
    category: 'fitness',
    difficulty: 'intermediate',
    tags: ['variety', 'plateaus', 'adaptation'],
    isBookmarked: false,
    likes: 91,
    source: 'Exercise Adaptation Research',
    readTime: '45 sec',
    icon: '🔄'
  },
  {
    id: '9',
    title: 'Consistency Beats Perfection',
    content: 'Showing up consistently, even for shorter workouts, is more effective than sporadic intense sessions. Aim for progress, not perfection.',
    category: 'motivation',
    difficulty: 'all',
    tags: ['consistency', 'motivation', 'habits'],
    isBookmarked: true,
    likes: 267,
    source: 'Behavioral Psychology',
    readTime: '30 sec',
    icon: '🎯'
  },
  {
    id: '10',
    title: 'Listen to Your Body',
    content: 'Pain is your body\'s way of saying "stop." Learn to distinguish between muscle fatigue and actual pain. When in doubt, rest and recover.',
    category: 'wellness',
    difficulty: 'all',
    tags: ['body awareness', 'safety', 'rest'],
    isBookmarked: false,
    likes: 185,
    source: 'Sports Medicine',
    readTime: '45 sec',
    icon: '❤️'
  }
];

export default function TipOfTheDay() {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [tips, setTips] = useState<Tip[]>(fitnessWisdom);
  const [isAnimating, setIsAnimating] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  const currentTip = tips[currentTipIndex];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'fitness': return Dumbbell;
      case 'nutrition': return Apple;
      case 'wellness': return Heart;
      case 'motivation': return Zap;
      case 'recovery': return RefreshCw;
      default: return Brain;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'fitness': return 'from-blue-500 to-cyan-500';
      case 'nutrition': return 'from-green-500 to-emerald-500';
      case 'wellness': return 'from-purple-500 to-pink-500';
      case 'motivation': return 'from-orange-500 to-red-500';
      case 'recovery': return 'from-indigo-500 to-blue-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-600 dark:text-green-400';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400';
      case 'advanced': return 'bg-red-500/20 text-red-600 dark:text-red-400';
      default: return 'bg-blue-500/20 text-blue-600 dark:text-blue-400';
    }
  };

  const nextTip = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentTipIndex((prev) => (prev + 1) % tips.length);
      setIsAnimating(false);
    }, 150);
  };

  const prevTip = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentTipIndex((prev) => (prev - 1 + tips.length) % tips.length);
      setIsAnimating(false);
    }, 150);
  };

  const toggleBookmark = () => {
    setTips(prev => prev.map(tip => 
      tip.id === currentTip.id 
        ? { ...tip, isBookmarked: !tip.isBookmarked }
        : tip
    ));
  };

  const likeTip = () => {
    setTips(prev => prev.map(tip => 
      tip.id === currentTip.id 
        ? { ...tip, likes: tip.likes + 1 }
        : tip
    ));
  };

  const getRandomTip = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * tips.length);
      setCurrentTipIndex(randomIndex);
      setIsAnimating(false);
    }, 150);
  };

  // Auto-rotate tips every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextTip();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const CategoryIcon = getCategoryIcon(currentTip.category);

  return (
    <div className="bg-transparent border border-[var(--border-color)]/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-color)]/3 via-transparent to-[var(--accent-hover)]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] opacity-20 blur-xl scale-150"></div>
            <Lightbulb className="w-6 h-6 text-white relative z-10" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-primary)] to-[var(--accent-color)] group-hover:from-[var(--accent-color)] group-hover:to-[var(--accent-hover)] transition-all duration-300">
              Did You Know?
            </h2>
            <p className="text-[var(--text-secondary)] text-sm">Daily fitness wisdom</p>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={getRandomTip}
            className="p-2 hover:bg-[var(--accent-color)]/20 rounded-lg transition-colors duration-200"
            title="Random tip"
          >
            <RefreshCw className="w-4 h-4 text-[var(--text-secondary)]" />
          </button>
          <div className="flex items-center gap-1 bg-[var(--bg-tertiary)]/60 rounded-lg p-1">
            <button
              onClick={prevTip}
              className="p-2 rounded-md hover:bg-[var(--accent-color)]/20 transition-colors duration-200"
            >
              <ChevronLeft className="w-4 h-4 text-[var(--text-secondary)]" />
            </button>
            <span className="px-3 py-1 text-sm font-medium text-[var(--text-primary)]">
              {currentTipIndex + 1} / {tips.length}
            </span>
            <button
              onClick={nextTip}
              className="p-2 rounded-md hover:bg-[var(--accent-color)]/20 transition-colors duration-200"
            >
              <ChevronRight className="w-4 h-4 text-[var(--text-secondary)]" />
            </button>
          </div>
        </div>
      </div>

      {/* Tip Content */}
      <div className={`relative z-10 transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
        {/* Category and Difficulty Tags */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(currentTip.category)}/20 border border-[var(--border-color)]/30`}>
              <CategoryIcon className="w-4 h-4" style={{ color: 'var(--accent-color)' }} />
              <span className="text-sm font-medium text-[var(--text-primary)] capitalize">
                {currentTip.category}
              </span>
            </div>
            <div className={`px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(currentTip.difficulty)}`}>
              {currentTip.difficulty}
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
            <span>{currentTip.readTime}</span>
          </div>
        </div>

        {/* Tip Title */}
        <h3 className="text-lg font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--accent-color)] transition-colors duration-300">
          {currentTip.title}
        </h3>

        {/* Tip Content */}
        <p className="text-[var(--text-secondary)] leading-relaxed mb-4 text-sm">
          {currentTip.content}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {currentTip.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-[var(--bg-tertiary)]/60 text-[var(--text-secondary)] text-xs rounded-md border border-[var(--border-color)]/30"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Source and Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--border-color)]/30">
          <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
            {currentTip.source && (
              <>
                <span className="font-medium">Source:</span>
                <span>{currentTip.source}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Like Button */}
            <button
              onClick={likeTip}
              className="flex items-center gap-1 px-3 py-2 hover:bg-[var(--accent-color)]/20 rounded-lg transition-all duration-200 group/like"
            >
              <Heart className="w-4 h-4 text-[var(--text-secondary)] group-hover/like:text-red-500 transition-colors" />
              <span className="text-xs text-[var(--text-secondary)] group-hover/like:text-[var(--text-primary)]">
                {currentTip.likes}
              </span>
            </button>

            {/* Bookmark Button */}
            <button
              onClick={toggleBookmark}
              className="p-2 hover:bg-[var(--accent-color)]/20 rounded-lg transition-colors duration-200 group/bookmark"
            >
              <Bookmark 
                className={`w-4 h-4 transition-colors ${
                  currentTip.isBookmarked 
                    ? 'text-[var(--accent-color)] fill-current' 
                    : 'text-[var(--text-secondary)] group-hover/bookmark:text-[var(--accent-color)]'
                }`} 
              />
            </button>

            {/* Share Button */}
            <button className="p-2 hover:bg-[var(--accent-color)]/20 rounded-lg transition-colors duration-200 group/share">
              <Share2 className="w-4 h-4 text-[var(--text-secondary)] group-hover/share:text-[var(--accent-color)]" />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--bg-tertiary)]/60">
        <div 
          className="h-full bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] transition-all duration-300"
          style={{ width: `${((currentTipIndex + 1) / tips.length) * 100}%` }}
        ></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 text-4xl opacity-10 pointer-events-none">
        {currentTip.icon}
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
    </div>
  );
}
