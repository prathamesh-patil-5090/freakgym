"use client";
import React, { useState } from 'react';
import { Flame, Calendar, Target, Award, TrendingUp, Zap, Clock, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface Streak {
  id: string;
  title: string;
  description: string;
  currentStreak: number;
  bestStreak: number;
  category: 'workout' | 'nutrition' | 'wellness' | 'habit';
  icon: string;
  unit: string;
  goal: number;
  color: string;
  isActive: boolean;
  lastActivity: string;
  nextMilestone: number;
  streakData: number[]; // Last 7 days
}

const mockStreaks: Streak[] = [
  {
    id: '1',
    title: 'Workout Streak',
    description: 'Consecutive days with completed workouts',
    currentStreak: 12,
    bestStreak: 23,
    category: 'workout',
    icon: '💪',
    unit: 'days',
    goal: 30,
    color: 'from-blue-500 to-cyan-500',
    isActive: true,
    lastActivity: '2 hours ago',
    nextMilestone: 15,
    streakData: [1, 1, 1, 1, 1, 1, 1] // 1 = completed, 0 = missed
  },
  {
    id: '2',
    title: 'Hydration Streak',
    description: 'Days hitting daily water intake goal',
    currentStreak: 8,
    bestStreak: 15,
    category: 'wellness',
    icon: '💧',
    unit: 'days',
    goal: 21,
    color: 'from-cyan-500 to-blue-500',
    isActive: true,
    lastActivity: '30 min ago',
    nextMilestone: 10,
    streakData: [1, 1, 1, 1, 1, 1, 1]
  },
  {
    id: '3',
    title: 'Protein Goal Streak',
    description: 'Days meeting daily protein target',
    currentStreak: 5,
    bestStreak: 18,
    category: 'nutrition',
    icon: '🥩',
    unit: 'days',
    goal: 14,
    color: 'from-green-500 to-emerald-500',
    isActive: true,
    lastActivity: '4 hours ago',
    nextMilestone: 7,
    streakData: [1, 1, 1, 0, 1, 1, 1]
  },
  {
    id: '4',
    title: 'Sleep Schedule',
    description: 'Consecutive nights with 7+ hours sleep',
    currentStreak: 3,
    bestStreak: 12,
    category: 'wellness',
    icon: '😴',
    unit: 'nights',
    goal: 10,
    color: 'from-purple-500 to-pink-500',
    isActive: false,
    lastActivity: 'Last night',
    nextMilestone: 5,
    streakData: [1, 1, 0, 0, 1, 1, 1]
  },
  {
    id: '5',
    title: 'Meditation Streak',
    description: 'Daily mindfulness practice',
    currentStreak: 15,
    bestStreak: 28,
    category: 'wellness',
    icon: '🧘',
    unit: 'days',
    goal: 30,
    color: 'from-indigo-500 to-purple-500',
    isActive: true,
    lastActivity: 'This morning',
    nextMilestone: 21,
    streakData: [1, 1, 1, 1, 1, 1, 1]
  },
  {
    id: '6',
    title: 'Step Goal Streak',
    description: 'Days reaching 10,000+ steps',
    currentStreak: 6,
    bestStreak: 20,
    category: 'workout',
    icon: '🚶',
    unit: 'days',
    goal: 14,
    color: 'from-orange-500 to-red-500',
    isActive: true,
    lastActivity: '1 hour ago',
    nextMilestone: 7,
    streakData: [1, 1, 1, 1, 0, 1, 1]
  }
];

export default function StreakCounter() {
  const [streaks] = useState<Streak[]>(mockStreaks);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categoryIndex, setCategoryIndex] = useState(0);

  const categories = [
    { id: 'all', label: 'All Streaks', icon: Zap },
    { id: 'workout', label: 'Workouts', icon: Target },
    { id: 'nutrition', label: 'Nutrition', icon: Award },
    { id: 'wellness', label: 'Wellness', icon: Calendar },
    { id: 'habit', label: 'Habits', icon: CheckCircle }
  ];

  const filteredStreaks = selectedCategory === 'all' 
    ? streaks 
    : streaks.filter(streak => streak.category === selectedCategory);

  const getStreakStats = () => {
    const activeStreaks = streaks.filter(s => s.isActive).length;
    const totalDays = streaks.reduce((sum, s) => sum + s.currentStreak, 0);
    const longestStreak = Math.max(...streaks.map(s => s.bestStreak));
    return { activeStreaks, totalDays, longestStreak };
  };

  const { activeStreaks, totalDays, longestStreak } = getStreakStats();

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min((current / goal) * 100, 100);
  };

  const getDaysUntilMilestone = (current: number, milestone: number) => {
    return Math.max(0, milestone - current);
  };

  const renderStreakDots = (streakData: number[]) => {
    return (
      <div className="flex gap-1">
        {streakData.map((day, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full ${
              day === 1 
                ? 'bg-[var(--accent-color)]' 
                : 'bg-[var(--text-secondary)]/30'
            }`}
            title={`Day ${index + 1}: ${day === 1 ? 'Completed' : 'Missed'}`}
          />
        ))}
      </div>
    );
  };

  const nextCategory = () => {
    const newIndex = (categoryIndex + 1) % categories.length;
    setCategoryIndex(newIndex);
    setSelectedCategory(categories[newIndex].id);
  };

  const prevCategory = () => {
    const newIndex = (categoryIndex - 1 + categories.length) % categories.length;
    setCategoryIndex(newIndex);
    setSelectedCategory(categories[newIndex].id);
  };

  const selectCategory = (index: number) => {
    setCategoryIndex(index);
    setSelectedCategory(categories[index].id);
  };

  // Get the current category icon component
  const CurrentCategoryIcon = categories[categoryIndex].icon;
  const PrevCategoryIcon = categoryIndex > 0 ? categories[categoryIndex - 1].icon : null;
  const NextCategoryIcon = categoryIndex < categories.length - 1 ? categories[categoryIndex + 1].icon : null;

  return (
    <div className="bg-transparent border border-[var(--border-color)]/30 rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-color)]/3 via-transparent to-[var(--accent-hover)]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 md:mb-6 relative z-10">
        <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex-shrink-0">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] opacity-20 blur-xl scale-150"></div>
            <Flame className="w-5 h-5 md:w-6 md:h-6 text-white relative z-10" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-primary)] to-[var(--accent-color)] group-hover:from-[var(--accent-color)] group-hover:to-[var(--accent-hover)] transition-all duration-300 truncate">
              Streak Counter
            </h2>
            <p className="text-[var(--text-secondary)] text-xs md:text-sm hidden sm:block">Track your consistency across all goals</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="text-right flex-shrink-0">
          <div className="text-xl md:text-2xl font-bold text-[var(--accent-color)]">
            {activeStreaks}
          </div>
          <div className="text-xs text-[var(--text-secondary)]">Active Streaks</div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6 relative z-10">
        <div className="text-center p-2 md:p-3 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 rounded-xl border border-[var(--border-color)]/30">
          <div className="text-base md:text-lg font-bold text-[var(--accent-color)]">{activeStreaks}</div>
          <div className="text-xs text-[var(--text-secondary)]">Active</div>
        </div>
        <div className="text-center p-2 md:p-3 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 rounded-xl border border-[var(--border-color)]/30">
          <div className="text-base md:text-lg font-bold text-[var(--accent-color)]">{totalDays}</div>
          <div className="text-xs text-[var(--text-secondary)]">Total Days</div>
        </div>
        <div className="text-center p-2 md:p-3 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 rounded-xl border border-[var(--border-color)]/30">
          <div className="text-base md:text-lg font-bold text-[var(--accent-color)]">{longestStreak}</div>
          <div className="text-xs text-[var(--text-secondary)]">Best Ever</div>
        </div>
      </div>

      {/* Category Carousel */}
      <div className="relative mb-4 md:mb-6 relative z-10">
        <div className="bg-[var(--bg-tertiary)]/60 rounded-lg p-3 md:p-4 border border-[var(--border-color)]/30">
          {/* Navigation Arrows */}
          <div className="flex items-center justify-between">
            <button
              onClick={prevCategory}
              className="p-2 hover:bg-[var(--accent-color)]/20 rounded-lg transition-all duration-200 transform hover:scale-110 active:scale-95 touch-manipulation"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-[var(--text-secondary)]" />
            </button>

            {/* Current Category Display */}
            <div className="flex-1 flex items-center justify-center px-2">
              <div className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] rounded-xl text-white shadow-lg transform transition-all duration-300">
                <CurrentCategoryIcon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-medium text-sm md:text-base">{categories[categoryIndex].label}</span>
              </div>
            </div>

            <button
              onClick={nextCategory}
              className="p-2 hover:bg-[var(--accent-color)]/20 rounded-lg transition-all duration-200 transform hover:scale-110 active:scale-95 touch-manipulation"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-[var(--text-secondary)]" />
            </button>
          </div>

          {/* Category Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-3 md:mt-4">
            {categories.map((_, index) => (
              <button
                key={index}
                onClick={() => selectCategory(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 touch-manipulation ${
                  index === categoryIndex
                    ? 'bg-[var(--accent-color)] w-6 h-2'
                    : 'bg-[var(--text-secondary)]/30 hover:bg-[var(--text-secondary)]/50'
                }`}
              />
            ))}
          </div>

          {/* Category Stats */}
          <div className="mt-3 md:mt-4 text-center">
            <div className="text-xs md:text-sm text-[var(--text-secondary)]">
              {filteredStreaks.length} streak{filteredStreaks.length !== 1 ? 's' : ''} in {categories[categoryIndex].label.toLowerCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Streaks List */}
      <div className="space-y-3 md:space-y-4 relative z-10">
        {filteredStreaks.length === 0 ? (
          <div className="text-center py-6 md:py-8">
            <Flame className="w-10 h-10 md:w-12 md:h-12 text-[var(--text-secondary)]/50 mx-auto mb-3" />
            <p className="text-[var(--text-secondary)] text-sm">No streaks found in this category</p>
          </div>
        ) : (
          filteredStreaks.map((streak, index) => (
            <div
              key={streak.id}
              className="group/item p-3 md:p-4 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 backdrop-blur-sm rounded-xl border border-[var(--border-color)]/30 hover:border-[var(--accent-color)]/40 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden touch-manipulation"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Streak background effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${streak.color}/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 rounded-xl`}></div>
              
              <div className="flex items-start gap-3 md:gap-4 relative z-10">
                {/* Streak Icon */}
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-r ${streak.color} flex items-center justify-center shadow-lg flex-shrink-0 transform group-hover/item:scale-110 transition-transform duration-300`}>
                  <span className="text-xl md:text-2xl">{streak.icon}</span>
                </div>

                {/* Streak Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0 pr-2">
                      <h3 className="font-bold text-[var(--text-primary)] group-hover:item:text-[var(--accent-color)] transition-colors duration-300 text-base md:text-lg mb-1 truncate">
                        {streak.title}
                      </h3>
                      <p className="text-[var(--text-secondary)] text-xs md:text-sm mb-2 line-clamp-2">
                        {streak.description}
                      </p>
                    </div>
                    
                    {/* Status Badge */}
                    <div className={`px-2 py-1 rounded-md text-xs font-medium flex-shrink-0 ${
                      streak.isActive 
                        ? 'bg-green-500/20 text-green-600 dark:text-green-400' 
                        : 'bg-red-500/20 text-red-600 dark:text-red-400'
                    }`}>
                      {streak.isActive ? 'Active' : 'Broken'}
                    </div>
                  </div>

                  {/* Current Streak Display - Mobile Layout */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-3">
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                      <span className="text-xl md:text-2xl font-bold text-[var(--accent-color)]">
                        {streak.currentStreak}
                      </span>
                      <span className="text-[var(--text-secondary)] text-sm">
                        {streak.unit}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between sm:justify-start sm:gap-4">
                      <div className="text-xs text-[var(--text-secondary)]">
                        Best: {streak.bestStreak} {streak.unit}
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                        <Clock className="w-3 h-3" />
                        <span className="hidden xs:inline">{streak.lastActivity}</span>
                        <span className="xs:hidden">{streak.lastActivity.split(' ')[0]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs md:text-sm text-[var(--text-secondary)]">
                        Progress to {streak.goal} {streak.unit}
                      </span>
                      <span className="text-xs md:text-sm font-medium text-[var(--accent-color)]">
                        {Math.round(getProgressPercentage(streak.currentStreak, streak.goal))}%
                      </span>
                    </div>
                    <div className="w-full bg-[var(--bg-secondary)]/60 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${streak.color} transition-all duration-500`}
                        style={{ width: `${getProgressPercentage(streak.currentStreak, streak.goal)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Weekly Progress & Next Milestone - Mobile Layout */}
                  <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[var(--text-secondary)]">Last 7 days:</span>
                      {renderStreakDots(streak.streakData)}
                    </div>
                    
                    {getDaysUntilMilestone(streak.currentStreak, streak.nextMilestone) > 0 && (
                      <div className="text-xs text-[var(--accent-color)] font-medium">
                        {getDaysUntilMilestone(streak.currentStreak, streak.nextMilestone)} to milestone
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Accent line */}
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${streak.color} transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-500 origin-left`}></div>
            </div>
          ))
        )}
      </div>

      {/* Motivation Section */}
      <div className="mt-4 md:mt-6 pt-4 border-t border-[var(--border-color)]/30 relative z-10">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-[var(--accent-color)]" />
            <span className="font-semibold text-[var(--text-primary)] text-sm md:text-base">Keep Going!</span>
          </div>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] px-2">
            {activeStreaks > 0 
              ? `You're maintaining ${activeStreaks} active streak${activeStreaks > 1 ? 's' : ''}. Consistency is key!`
              : 'Start a new streak today. Every journey begins with a single step!'
            }
          </p>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
    </div>
  );
}
