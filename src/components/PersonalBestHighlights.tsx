"use client";
import { useState } from 'react';
import { Trophy, TrendingUp, Calendar, Target, Award, Flame, Crown, Star, ChevronLeft, ChevronRight, Dumbbell, Timer } from 'lucide-react';

interface PersonalRecord {
  id: string;
  exercise: string;
  currentPR: number;
  previousPR: number;
  unit: string;
  category: 'strength' | 'cardio' | 'endurance' | 'bodyweight';
  dateAchieved: string;
  improvement: number;
  reps?: number;
  sets?: number;
  bodyweight?: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Elite';
  milestones: { value: number; date: string; note?: string }[];
}

const mockPRs: PersonalRecord[] = [
  {
    id: '1',
    exercise: 'Bench Press',
    currentPR: 275,
    previousPR: 245,
    unit: 'lbs',
    category: 'strength',
    dateAchieved: '2024-01-15',
    improvement: 30,
    reps: 1,
    sets: 1,
    difficulty: 'Advanced',
    milestones: [
      { value: 185, date: '2023-06-01', note: 'First bodyweight bench' },
      { value: 225, date: '2023-09-15', note: 'Two plates milestone' },
      { value: 245, date: '2023-12-01' },
      { value: 275, date: '2024-01-15', note: 'New PR!' }
    ]
  },
  {
    id: '2',
    exercise: 'Deadlift',
    currentPR: 405,
    previousPR: 385,
    unit: 'lbs',
    category: 'strength',
    dateAchieved: '2024-01-10',
    improvement: 20,
    reps: 1,
    sets: 1,
    difficulty: 'Advanced',
    milestones: [
      { value: 225, date: '2023-05-01' },
      { value: 315, date: '2023-08-20', note: 'Three plates!' },
      { value: 385, date: '2023-11-30' },
      { value: 405, date: '2024-01-10', note: 'Four plates achieved!' }
    ]
  },
  {
    id: '3',
    exercise: '5K Run',
    currentPR: 22.5,
    previousPR: 24.2,
    unit: 'min',
    category: 'cardio',
    dateAchieved: '2024-01-08',
    improvement: -1.7,
    difficulty: 'Intermediate',
    milestones: [
      { value: 28.5, date: '2023-04-01', note: 'First 5K' },
      { value: 26.0, date: '2023-07-15' },
      { value: 24.2, date: '2023-10-20' },
      { value: 22.5, date: '2024-01-08', note: 'Sub-23 minutes!' }
    ]
  },
  {
    id: '4',
    exercise: 'Pull-ups',
    currentPR: 18,
    previousPR: 15,
    unit: 'reps',
    category: 'bodyweight',
    dateAchieved: '2024-01-12',
    improvement: 3,
    bodyweight: 185,
    difficulty: 'Advanced',
    milestones: [
      { value: 5, date: '2023-03-01', note: 'First unassisted set' },
      { value: 10, date: '2023-06-15', note: 'Double digits!' },
      { value: 15, date: '2023-10-01' },
      { value: 18, date: '2024-01-12', note: 'New max!' }
    ]
  },
  {
    id: '5',
    exercise: 'Squat',
    currentPR: 315,
    previousPR: 295,
    unit: 'lbs',
    category: 'strength',
    dateAchieved: '2024-01-14',
    improvement: 20,
    reps: 1,
    sets: 1,
    difficulty: 'Advanced',
    milestones: [
      { value: 185, date: '2023-05-01' },
      { value: 225, date: '2023-08-01', note: 'Two plates' },
      { value: 295, date: '2023-12-15' },
      { value: 315, date: '2024-01-14', note: 'Three plates!' }
    ]
  },
  {
    id: '6',
    exercise: 'Plank Hold',
    currentPR: 4.5,
    previousPR: 3.2,
    unit: 'min',
    category: 'endurance',
    dateAchieved: '2024-01-11',
    improvement: 1.3,
    difficulty: 'Intermediate',
    milestones: [
      { value: 1.0, date: '2023-04-01', note: 'First minute' },
      { value: 2.0, date: '2023-07-01' },
      { value: 3.2, date: '2023-11-01' },
      { value: 4.5, date: '2024-01-11', note: 'Over 4 minutes!' }
    ]
  }
];

export default function PersonalBestHighlights() {
  const [personalRecords] = useState<PersonalRecord[]>(mockPRs);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categoryIndex, setCategoryIndex] = useState(0);

  const categories = [
    { id: 'all', label: 'All PRs', icon: Trophy },
    { id: 'strength', label: 'Strength', icon: Crown },
    { id: 'cardio', label: 'Cardio', icon: TrendingUp },
    { id: 'bodyweight', label: 'Bodyweight', icon: Star },
    { id: 'endurance', label: 'Endurance', icon: Target }
  ];

  const filteredPRs = selectedCategory === 'all' 
    ? personalRecords 
    : personalRecords.filter(pr => pr.category === selectedCategory);

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

  const CurrentCategoryIcon = categories[categoryIndex].icon;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'strength': return 'from-red-500 to-orange-500';
      case 'cardio': return 'from-blue-500 to-cyan-500';
      case 'bodyweight': return 'from-purple-500 to-pink-500';
      case 'endurance': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500/20 text-green-600 dark:text-green-400';
      case 'Intermediate': return 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400';
      case 'Advanced': return 'bg-orange-500/20 text-orange-600 dark:text-orange-400';
      case 'Elite': return 'bg-red-500/20 text-red-600 dark:text-red-400';
      default: return 'bg-gray-500/20 text-gray-600 dark:text-gray-400';
    }
  };

  const getImprovementDisplay = (current: number, previous: number, unit: string) => {
    const improvement = current - previous;
    const percentage = ((Math.abs(improvement) / previous) * 100).toFixed(1);
    
    if (improvement > 0) {
      return {
        icon: TrendingUp,
        color: 'text-green-500',
        text: `+${improvement.toFixed(1)}`,
        percentage: `+${percentage}%`
      };
    } else if (improvement < 0) {
      return {
        icon: TrendingUp,
        color: 'text-blue-500',
        text: `${improvement.toFixed(1)}`,
        percentage: `-${percentage}%`
      };
    } else {
      return {
        icon: Target,
        color: 'text-[var(--text-secondary)]',
        text: '0.0',
        percentage: '0%'
      };
    }
  };

  const getExerciseIcon = (category: string) => {
    switch (category) {
      case 'strength': return Dumbbell;
      case 'cardio': return TrendingUp;
      case 'bodyweight': return Star;
      case 'endurance': return Timer;
      default: return Trophy;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

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
              Personal Records
            </h2>
            <p className="text-[var(--text-secondary)] text-xs md:text-sm hidden sm:block">Your best achievements and milestones</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="text-right flex-shrink-0">
          <div className="text-xl md:text-2xl font-bold text-[var(--accent-color)]">
            {personalRecords.filter(pr => getImprovementDisplay(pr.currentPR, pr.previousPR, pr.unit).text.startsWith('+')).length}
          </div>
          <div className="text-xs text-[var(--text-secondary)]">Recent PRs</div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6 relative z-10">
        <div className="text-center p-2 md:p-3 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 rounded-xl border border-[var(--border-color)]/30">
          <div className="text-base md:text-lg font-bold text-[var(--accent-color)]">
            {personalRecords.filter(pr => getImprovementDisplay(pr.currentPR, pr.previousPR, pr.unit).text.startsWith('+')).length}
          </div>
          <div className="text-xs text-[var(--text-secondary)]">Improved</div>
        </div>
        <div className="text-center p-2 md:p-3 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 rounded-xl border border-[var(--border-color)]/30">
          <div className="text-base md:text-lg font-bold text-[var(--accent-color)]">
            {personalRecords.length}
          </div>
          <div className="text-xs text-[var(--text-secondary)]">Total PRs</div>
        </div>
        <div className="text-center p-2 md:p-3 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 rounded-xl border border-[var(--border-color)]/30">
          <div className="text-base md:text-lg font-bold text-[var(--accent-color)]">
            {personalRecords.filter(pr => pr.difficulty === 'Advanced' || pr.difficulty === 'Elite').length}
          </div>
          <div className="text-xs text-[var(--text-secondary)]">Elite Level</div>
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
              {filteredPRs.length} personal record{filteredPRs.length !== 1 ? 's' : ''} in {categories[categoryIndex].label.toLowerCase()}
            </div>
          </div>
        </div>
      </div>

      {/* PRs List */}
      <div className="space-y-3 md:space-y-4 relative z-10">
        {filteredPRs.length === 0 ? (
          <div className="text-center py-6 md:py-8">
            <Trophy className="w-10 h-10 md:w-12 md:h-12 text-[var(--text-secondary)]/50 mx-auto mb-3" />
            <p className="text-[var(--text-secondary)] text-sm">No personal records found in this category</p>
          </div>
        ) : (
          filteredPRs.map((pr, index) => {
            const improvement = getImprovementDisplay(pr.currentPR, pr.previousPR, pr.unit);
            const ImprovementIcon = improvement.icon;
            const ExerciseIcon = getExerciseIcon(pr.category);
            
            return (
              <div
                key={pr.id}
                className="group/item p-3 md:p-4 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 backdrop-blur-sm rounded-xl border border-[var(--border-color)]/30 hover:border-[var(--accent-color)]/40 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden touch-manipulation"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Category background effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryColor(pr.category)}/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 rounded-xl`}></div>
                
                <div className="flex items-center gap-3 md:gap-4 relative z-10">
                  {/* Exercise Icon */}
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-r ${getCategoryColor(pr.category)} flex items-center justify-center shadow-lg flex-shrink-0 transform group-hover/item:scale-110 transition-transform duration-300`}>
                    <ExerciseIcon className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>

                  {/* PR Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-[var(--text-primary)] group-hover:item:text-[var(--accent-color)] transition-colors duration-300 text-base md:text-lg truncate pr-2">
                        {pr.exercise}
                      </h3>
                      
                      {/* Difficulty Badge */}
                      <div className={`px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(pr.difficulty)} flex-shrink-0`}>
                        {pr.difficulty}
                      </div>
                    </div>

                    {/* Current PR and Improvement - Mobile Layout */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl md:text-2xl font-bold text-[var(--accent-color)]">
                          {pr.currentPR}
                        </span>
                        <span className="text-[var(--text-secondary)] text-sm">
                          {pr.unit}
                        </span>
                        {pr.reps && (
                          <span className="text-[var(--text-secondary)] text-xs">
                            x{pr.reps}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between sm:justify-start sm:gap-4">
                        {/* Improvement Indicator */}
                        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${improvement.color} bg-[var(--bg-secondary)]/60`}>
                          <ImprovementIcon className="w-3 h-3" />
                          <span>{improvement.text} {pr.unit}</span>
                        </div>
                        
                        <div className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                          <Calendar className="w-3 h-3" />
                          <span className="hidden xs:inline">{formatDate(pr.dateAchieved)}</span>
                          <span className="xs:hidden">{new Date(pr.dateAchieved).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Visualization */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs md:text-sm text-[var(--text-secondary)]">
                          Progress from previous PR
                        </span>
                        <span className="text-xs md:text-sm font-medium">
                          <span className={improvement.color}>{improvement.percentage}</span>
                        </span>
                      </div>
                      <div className="w-full bg-[var(--bg-secondary)]/60 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${getCategoryColor(pr.category)} transition-all duration-500`}
                          style={{ width: `${Math.min((Math.abs(pr.improvement) / pr.previousPR) * 100 * 2, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Milestone Progress - Mobile Layout */}
                    <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2">
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-[var(--text-secondary)]">Milestones:</span>
                        <div className="flex items-center gap-0.5">
                          {pr.milestones.slice(-4).map((milestone, i) => (
                            <div
                              key={i}
                              className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${getCategoryColor(pr.category)} opacity-${i === pr.milestones.length - 1 ? '100' : '60'}`}
                              title={`${milestone.value} ${pr.unit} - ${formatDate(milestone.date)}${milestone.note ? `: ${milestone.note}` : ''}`}
                            />
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-xs text-[var(--text-secondary)]">
                        Previous: {pr.previousPR} {pr.unit}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${getCategoryColor(pr.category)} transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-500 origin-left`}></div>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Summary */}
      <div className="mt-4 md:mt-6 pt-4 border-t border-[var(--border-color)]/30 relative z-10">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Award className="w-4 h-4 md:w-5 md:h-5 text-[var(--accent-color)]" />
            <span className="font-semibold text-[var(--text-primary)] text-sm md:text-base">Keep Breaking Records!</span>
          </div>
          <p className="text-xs md:text-sm text-[var(--text-secondary)] px-2">
            {filteredPRs.length > 0 
              ? `You have ${filteredPRs.length} personal record${filteredPRs.length > 1 ? 's' : ''} in this category. Every new PR is a victory!`
              : 'Start setting personal records to track your progress and achievements.'
            }
          </p>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
    </div>
  );
}
