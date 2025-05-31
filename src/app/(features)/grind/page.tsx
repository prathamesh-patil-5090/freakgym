import React from 'react';
import GoalsTracker from '@/components/GoalsTracker';
import ActiveChallenges from '@/components/ActiveChallenges';
import QuickLogButtons from '@/components/QuickLogButtons';
import { Target, Zap, Trophy, Flame, Star } from 'lucide-react';

const GrindPage = () => {
  return (
    <div className="h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[var(--accent-color)] scrollbar-thumb-rounded-full">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Page Header */}
        <div className="mb-8 relative">
          {/* Background decorative elements */}
          <div className="absolute inset-0 -z-10">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-color)]/5 via-transparent to-[var(--accent-hover)]/10 rounded-3xl blur-3xl"></div>
            
            {/* Floating decorative icons */}
            <div className="absolute top-4 right-8 w-16 h-16 bg-gradient-to-r from-[var(--accent-color)]/10 to-[var(--accent-hover)]/10 rounded-full flex items-center justify-center animate-float">
              <Trophy className="w-8 h-8 text-[var(--accent-color)]/60" />
            </div>
            <div className="absolute top-12 left-1/4 w-12 h-12 bg-gradient-to-r from-[var(--accent-color)]/15 to-[var(--accent-hover)]/15 rounded-full flex items-center justify-center animate-pulse">
              <Target className="w-6 h-6 text-[var(--accent-color)]/70" />
            </div>
            <div className="absolute bottom-4 right-1/3 w-10 h-10 bg-gradient-to-r from-[var(--accent-color)]/8 to-[var(--accent-hover)]/8 rounded-full flex items-center justify-center animate-bounce">
              <Flame className="w-5 h-5 text-[var(--accent-color)]/50" />
            </div>
            <div className="absolute top-8 right-1/4 w-6 h-6 bg-[var(--accent-color)]/20 rounded-full animate-twinkle"></div>
            <div className="absolute bottom-8 left-8 w-8 h-8 bg-[var(--accent-color)]/15 rounded-full animate-pulse-slow"></div>
          </div>
          
          {/* Main header content */}
          <div className="text-center py-12 relative">
            {/* Title with enhanced styling */}
            <div className="relative inline-block mb-6">
              {/* Title glow effect */}
              <div className="absolute inset-0 text-3xl md:text-5xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] blur-sm opacity-50 transform scale-110"></div>
              
              {/* Main title */}
              <h1 className="relative text-3xl md:text-5xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-color)] via-[var(--accent-hover)] to-purple-600 transform transition-all duration-500 hover:scale-105">
                The Grind
              </h1>
              
              {/* Decorative elements around title */}
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-[var(--accent-color)] rounded-full animate-ping opacity-75"></div>
              <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-[var(--accent-hover)] rounded-full animate-pulse"></div>
              <Star className="absolute -top-4 -right-6 w-6 h-6 text-[var(--accent-color)] animate-twinkle" />
              <Zap className="absolute -bottom-4 -left-6 w-5 h-5 text-[var(--accent-hover)] animate-pulse" />
            </div>
            
            {/* Enhanced subtitle */}
            <div className="relative max-w-2xl mx-auto">
              {/* Subtitle background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--accent-color)]/5 to-transparent rounded-2xl blur-xl"></div>
              
              <p className="relative text-lg md:text-xl lg:text-2xl text-[var(--text-secondary)] leading-relaxed px-6 py-4 bg-gradient-to-r from-[var(--bg-secondary)]/30 to-[var(--bg-secondary)]/10 backdrop-blur-sm rounded-2xl border border-[var(--border-color)]/20 shadow-lg">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-secondary)] to-[var(--accent-color)]">
                  Push your limits, track your goals, and conquer challenges
                </span>
              </p>
              
              {/* Decorative lines */}
              <div className="absolute left-0 top-1/2 w-8 h-px bg-gradient-to-r from-[var(--accent-color)] to-transparent transform -translate-y-1/2"></div>
              <div className="absolute right-0 top-1/2 w-8 h-px bg-gradient-to-l from-[var(--accent-color)] to-transparent transform -translate-y-1/2"></div>
            </div>
            
            {/* Motivational badges */}
            <div className="flex flex-wrap justify-center gap-3 mt-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--accent-color)]/10 to-[var(--accent-hover)]/10 backdrop-blur-sm rounded-full border border-[var(--accent-color)]/20 group hover:border-[var(--accent-color)]/40 transition-all duration-300">
                <Target className="w-4 h-4 text-[var(--accent-color)] group-hover:animate-pulse" />
                <span className="text-sm font-medium text-[var(--text-primary)]">Goal Focused</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--accent-color)]/10 to-[var(--accent-hover)]/10 backdrop-blur-sm rounded-full border border-[var(--accent-color)]/20 group hover:border-[var(--accent-color)]/40 transition-all duration-300">
                <Trophy className="w-4 h-4 text-[var(--accent-color)] group-hover:animate-pulse" />
                <span className="text-sm font-medium text-[var(--text-primary)]">Challenge Ready</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[var(--accent-color)]/10 to-[var(--accent-hover)]/10 backdrop-blur-sm rounded-full border border-[var(--accent-color)]/20 group hover:border-[var(--accent-color)]/40 transition-all duration-300">
                <Flame className="w-4 h-4 text-[var(--accent-color)] group-hover:animate-pulse" />
                <span className="text-sm font-medium text-[var(--text-primary)]">Beast Mode</span>
              </div>
            </div>
          </div>
          
          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[var(--accent-color)] to-transparent rounded-full"></div>
        </div>

        {/* Grid for Components */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-min pb-8">
          {/* Goals Tracker */}
          <GoalsTracker />

          {/* Active Challenges */}
          <ActiveChallenges />

          {/* Quick Log Buttons */}
          <QuickLogButtons />
        </div>
      </div>
    </div>
  );
};

export default GrindPage;
