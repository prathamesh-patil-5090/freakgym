"use client";
import { useState } from 'react';
import { Trophy, Users, Calendar, Target, Flame, Star, Clock, Award, ChevronRight, Plus, Zap } from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'endurance' | 'strength' | 'flexibility' | 'community' | 'personal';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  target: number;
  current: number;
  unit: string;
  participants: number;
  maxParticipants?: number;
  prize: string;
  startDate: string;
  endDate: string;
  progress: number;
  rank: number;
  isJoined: boolean;
  trending: boolean;
  featured: boolean;
}

const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: '30-Day Plank Challenge',
    description: 'Hold a plank for increasing durations over 30 days. Start with 30 seconds and work up to 5 minutes!',
    type: 'endurance',
    difficulty: 'Intermediate',
    duration: '30 days',
    target: 300,
    current: 180,
    unit: 'seconds',
    participants: 2847,
    maxParticipants: 5000,
    prize: 'Premium Membership',
    startDate: '2024-01-01',
    endDate: '2024-01-30',
    progress: 60,
    rank: 156,
    isJoined: true,
    trending: true,
    featured: false
  },
  {
    id: '2',
    title: 'January Step Marathon',
    description: 'Walk or run 100,000 steps this month. Track your daily progress and compete with others!',
    type: 'endurance',
    difficulty: 'Beginner',
    duration: '1 month',
    target: 100000,
    current: 45230,
    unit: 'steps',
    participants: 1523,
    prize: 'Fitness Tracker',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    progress: 45,
    rank: 423,
    isJoined: true,
    trending: false,
    featured: true
  },
  {
    id: '3',
    title: 'Deadlift PR Challenge',
    description: 'Increase your deadlift personal record by 10% within 6 weeks with proper form and progressive overload.',
    type: 'strength',
    difficulty: 'Advanced',
    duration: '6 weeks',
    target: 10,
    current: 6,
    unit: '% increase',
    participants: 892,
    maxParticipants: 1000,
    prize: 'Lifting Belt',
    startDate: '2024-01-08',
    endDate: '2024-02-19',
    progress: 60,
    rank: 89,
    isJoined: false,
    trending: false,
    featured: false
  },
  {
    id: '4',
    title: 'Daily Yoga Flow',
    description: 'Complete a 20-minute yoga session every day for 21 days to build flexibility and mindfulness.',
    type: 'flexibility',
    difficulty: 'Beginner',
    duration: '21 days',
    target: 21,
    current: 14,
    unit: 'sessions',
    participants: 3104,
    prize: 'Yoga Mat',
    startDate: '2024-01-10',
    endDate: '2024-01-30',
    progress: 67,
    rank: 234,
    isJoined: true,
    trending: true,
    featured: false
  },
  {
    id: '5',
    title: 'Team Cardio Blast',
    description: 'Join a team of 5 and collectively burn 50,000 calories this month through various cardio activities.',
    type: 'community',
    difficulty: 'Intermediate',
    duration: '1 month',
    target: 50000,
    current: 28750,
    unit: 'calories',
    participants: 145,
    maxParticipants: 200,
    prize: 'Team Jerseys',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    progress: 58,
    rank: 8,
    isJoined: false,
    trending: false,
    featured: true
  },
  {
    id: '6',
    title: 'Push-Up Master',
    description: 'Complete 1000 push-ups in any form throughout the month. Track your daily reps and stay consistent!',
    type: 'strength',
    difficulty: 'Intermediate',
    duration: '1 month',
    target: 1000,
    current: 567,
    unit: 'reps',
    participants: 1876,
    prize: 'Resistance Bands',
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    progress: 57,
    rank: 312,
    isJoined: true,
    trending: false,
    featured: false
  }
];

export default function ActiveChallenges() {
  const [challenges] = useState<Challenge[]>(mockChallenges);
  const [filter, setFilter] = useState<'all' | 'joined' | 'available'>('all');
  const [sortBy, setSortBy] = useState<'trending' | 'participants' | 'ending'>('trending');

  const getChallengeTypeIcon = (type: string) => {
    switch (type) {
      case 'endurance': return '🏃';
      case 'strength': return '💪';
      case 'flexibility': return '🧘';
      case 'community': return '👥';
      case 'personal': return '🎯';
      default: return '🏆';
    }
  };

  const getChallengeTypeColor = (type: string) => {
    switch (type) {
      case 'endurance': return 'from-blue-500 to-cyan-500';
      case 'strength': return 'from-red-500 to-orange-500';
      case 'flexibility': return 'from-purple-500 to-pink-500';
      case 'community': return 'from-green-500 to-emerald-500';
      case 'personal': return 'from-yellow-500 to-orange-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-600 dark:text-green-400';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400';
      case 'Advanced': return 'bg-red-500/20 text-red-600 dark:text-red-400';
      default: return 'bg-gray-500/20 text-gray-600 dark:text-gray-400';
    }
  };

  const getRemainingDays = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const filteredChallenges = challenges.filter(challenge => {
    if (filter === 'joined') return challenge.isJoined;
    if (filter === 'available') return !challenge.isJoined;
    return true;
  });

  const sortedChallenges = [...filteredChallenges].sort((a, b) => {
    switch (sortBy) {
      case 'trending':
        if (a.trending && !b.trending) return -1;
        if (!a.trending && b.trending) return 1;
        return b.participants - a.participants;
      case 'participants':
        return b.participants - a.participants;
      case 'ending':
        return getRemainingDays(a.endDate) - getRemainingDays(b.endDate);
      default:
        return 0;
    }
  });

  const joinedChallenges = challenges.filter(c => c.isJoined).length;
  const totalProgress = challenges.filter(c => c.isJoined).reduce((sum, c) => sum + c.progress, 0);
  const avgProgress = joinedChallenges > 0 ? Math.round(totalProgress / joinedChallenges) : 0;

  return (
    <div className="bg-transparent border border-[var(--border-color)]/30 rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-color)]/3 via-transparent to-[var(--accent-hover)]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 md:mb-6 relative z-10">
        <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex-shrink-0">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] opacity-20 blur-xl scale-150"></div>
            <Trophy className="w-5 h-5 md:w-6 md:h-6 text-white relative z-10" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-primary)] to-[var(--accent-color)] group-hover:from-[var(--accent-color)] group-hover:to-[var(--accent-hover)] transition-all duration-300 truncate">
              Active Challenges
            </h2>
            <p className="text-[var(--text-secondary)] text-xs md:text-sm hidden sm:block">Join challenges and compete with the community</p>
          </div>
        </div>

        {/* Create Challenge Button */}
        <button className="p-2 bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] rounded-lg hover:scale-105 active:scale-95 transition-transform duration-200 shadow-lg touch-manipulation flex-shrink-0">
          <Plus className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6 relative z-10">
        <div className="text-center p-2 md:p-3 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 rounded-xl border border-[var(--border-color)]/30">
          <div className="text-base md:text-lg font-bold text-[var(--accent-color)]">{joinedChallenges}</div>
          <div className="text-xs text-[var(--text-secondary)]">Joined</div>
        </div>
        <div className="text-center p-2 md:p-3 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 rounded-xl border border-[var(--border-color)]/30">
          <div className="text-base md:text-lg font-bold text-[var(--accent-color)]">{avgProgress}%</div>
          <div className="text-xs text-[var(--text-secondary)]">Avg Progress</div>
        </div>
        <div className="text-center p-2 md:p-3 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 rounded-xl border border-[var(--border-color)]/30">
          <div className="text-base md:text-lg font-bold text-[var(--accent-color)]">
            {Math.min(...challenges.filter(c => c.isJoined).map(c => c.rank))}
          </div>
          <div className="text-xs text-[var(--text-secondary)]">Best Rank</div>
        </div>
      </div>

      {/* Filters - Mobile Layout */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 relative z-10">
        <div className="flex items-center gap-1 bg-[var(--bg-tertiary)]/60 rounded-lg p-1 overflow-x-auto scrollbar-none">
          {['all', 'joined', 'available'].map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption as any)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 capitalize whitespace-nowrap touch-manipulation ${
                filter === filterOption
                  ? 'bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] text-white'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {filterOption}
            </button>
          ))}
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-3 py-2 bg-[var(--bg-tertiary)]/60 rounded-lg text-sm text-[var(--text-primary)] border border-[var(--border-color)]/30 focus:border-[var(--accent-color)] focus:outline-none touch-manipulation"
        >
          <option value="trending">Trending</option>
          <option value="participants">Most Popular</option>
          <option value="ending">Ending Soon</option>
        </select>
      </div>

      {/* Challenges List */}
      <div className="space-y-3 md:space-y-4 relative z-10">
        {sortedChallenges.length === 0 ? (
          <div className="text-center py-6 md:py-8">
            <Trophy className="w-10 h-10 md:w-12 md:h-12 text-[var(--text-secondary)]/50 mx-auto mb-3" />
            <p className="text-[var(--text-secondary)] text-sm">No challenges found</p>
            <button className="mt-3 px-4 py-2 bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] text-white rounded-lg text-sm hover:scale-105 active:scale-95 transition-transform duration-200 touch-manipulation">
              Browse All Challenges
            </button>
          </div>
        ) : (
          sortedChallenges.map((challenge, index) => (
            <div
              key={challenge.id}
              className="group/item p-3 md:p-4 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 backdrop-blur-sm rounded-xl border border-[var(--border-color)]/30 hover:border-[var(--accent-color)]/40 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden touch-manipulation"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Challenge background effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${getChallengeTypeColor(challenge.type)}/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 rounded-xl`}></div>
              
              {/* Featured/Trending badges - Mobile positioning */}
              {(challenge.featured || challenge.trending) && (
                <div className="absolute top-2 right-2 flex flex-col gap-1">
                  {challenge.featured && (
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      <span className="hidden xs:inline">Featured</span>
                    </div>
                  )}
                  {challenge.trending && (
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Flame className="w-3 h-3" />
                      <span className="hidden xs:inline">Trending</span>
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex items-start gap-3 md:gap-4 relative z-10">
                {/* Challenge Type Icon */}
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-r ${getChallengeTypeColor(challenge.type)} flex items-center justify-center shadow-lg flex-shrink-0 transform group-hover/item:scale-110 transition-transform duration-300`}>
                  <span className="text-xl md:text-2xl">{getChallengeTypeIcon(challenge.type)}</span>
                </div>

                {/* Challenge Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0 pr-2">
                      <h3 className="font-bold text-[var(--text-primary)] group-hover:item:text-[var(--accent-color)] transition-colors duration-300 text-base md:text-lg mb-1 truncate">
                        {challenge.title}
                      </h3>
                      <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-2 line-clamp-2">
                        {challenge.description}
                      </p>
                    </div>
                  </div>

                  {/* Challenge Meta Info - Mobile Layout */}
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs text-[var(--text-secondary)] mb-3">
                    <div className={`px-2 py-1 rounded-md font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                      {challenge.difficulty}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span className="truncate">{challenge.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{challenge.participants.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span className="hidden xs:inline">{getRemainingDays(challenge.endDate)} days left</span>
                      <span className="xs:hidden">{getRemainingDays(challenge.endDate)}d</span>
                    </div>
                  </div>

                  {/* Progress Section */}
                  {challenge.isJoined && (
                    <div className="mb-3">
                      <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-1 mb-1">
                        <span className="text-sm text-[var(--text-secondary)] truncate">
                          {challenge.current.toLocaleString()} / {challenge.target.toLocaleString()} {challenge.unit}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-[var(--accent-color)]">
                            {challenge.progress}%
                          </span>
                          <span className="text-xs text-[var(--text-secondary)]">
                            Rank #{challenge.rank}
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-[var(--bg-secondary)]/60 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${getChallengeTypeColor(challenge.type)} transition-all duration-500`}
                          style={{ width: `${challenge.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Prize and Action - Mobile Layout */}
                  <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2">
                    <div className="flex items-center gap-2 text-sm min-w-0">
                      <Award className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                      <span className="text-[var(--text-secondary)] hidden xs:inline">Prize:</span>
                      <span className="font-medium text-[var(--text-primary)] truncate">{challenge.prize}</span>
                    </div>

                    <button
                      className={`px-3 md:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-1 touch-manipulation flex-shrink-0 ${
                        challenge.isJoined
                          ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-600 dark:text-green-400 hover:from-green-500/30 hover:to-emerald-500/30'
                          : 'bg-gradient-to-r from-[var(--accent-color)]/20 to-[var(--accent-hover)]/20 hover:from-[var(--accent-color)] hover:to-[var(--accent-hover)] text-[var(--accent-color)] hover:text-white'
                      }`}
                    >
                      {challenge.isJoined ? (
                        <>
                          <Target className="w-4 h-4" />
                          <span className="hidden xs:inline">View Progress</span>
                          <span className="xs:hidden">View</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4" />
                          <span className="hidden xs:inline">Join Challenge</span>
                          <span className="xs:hidden">Join</span>
                        </>
                      )}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Accent line */}
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${getChallengeTypeColor(challenge.type)} transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-500 origin-left`}></div>
            </div>
          ))
        )}
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
    </div>
  );
}
