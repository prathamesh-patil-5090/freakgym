"use client";
import { useState } from 'react';
import { Target, CheckCircle2, Circle, Plus, Calendar, Award, Flame, Clock, TrendingUp, ChevronLeft, ChevronRight, Trash2 } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  type: 'daily' | 'weekly';
  category: 'fitness' | 'nutrition' | 'wellness' | 'strength';
  target: number;
  current: number;
  unit: string;
  streak: number;
  completed: boolean;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

interface DailyCompletion {
  date: string;
  goalId: string;
  completed: boolean;
}

const mockGoals: Goal[] = [
  {
    id: '1',
    title: 'Drink Water',
    type: 'daily',
    category: 'wellness',
    target: 8,
    current: 5,
    unit: 'glasses',
    streak: 12,
    completed: false,
    priority: 'high',
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    title: 'Complete Workout',
    type: 'daily',
    category: 'fitness',
    target: 1,
    current: 1,
    unit: 'session',
    streak: 8,
    completed: true,
    priority: 'high',
    createdAt: '2024-01-01'
  },
  {
    id: '3',
    title: 'Steps',
    type: 'daily',
    category: 'fitness',
    target: 10000,
    current: 7500,
    unit: 'steps',
    streak: 5,
    completed: false,
    priority: 'medium',
    createdAt: '2024-01-01'
  },
  {
    id: '4',
    title: 'Workout Sessions',
    type: 'weekly',
    category: 'fitness',
    target: 5,
    current: 3,
    unit: 'sessions',
    streak: 3,
    completed: false,
    dueDate: '2024-01-21',
    priority: 'high',
    createdAt: '2024-01-15'
  },
  {
    id: '5',
    title: 'Protein Intake',
    type: 'daily',
    category: 'nutrition',
    target: 120,
    current: 85,
    unit: 'grams',
    streak: 15,
    completed: false,
    priority: 'medium',
    createdAt: '2024-01-01'
  },
  {
    id: '6',
    title: 'Sleep Hours',
    type: 'daily',
    category: 'wellness',
    target: 8,
    current: 7,
    unit: 'hours',
    streak: 4,
    completed: false,
    priority: 'high',
    createdAt: '2024-01-01'
  }
];

export default function GoalsTracker() {
  const [goals, setGoals] = useState<Goal[]>(mockGoals);
  const [activeTab, setActiveTab] = useState<'daily' | 'weekly'>('daily');
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'fitness': return '💪';
      case 'nutrition': return '🥗';
      case 'wellness': return '🧘';
      case 'strength': return '🏋️';
      default: return '🎯';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'fitness': return 'from-blue-500 to-cyan-500';
      case 'nutrition': return 'from-green-500 to-emerald-500';
      case 'wellness': return 'from-purple-500 to-pink-500';
      case 'strength': return 'from-red-500 to-orange-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-600 dark:text-red-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400';
      case 'low': return 'bg-green-500/20 text-green-600 dark:text-green-400';
      default: return 'bg-gray-500/20 text-gray-600 dark:text-gray-400';
    }
  };

  const getProgress = (goal: Goal) => {
    return Math.min((goal.current / goal.target) * 100, 100);
  };

  const filteredGoals = goals.filter(goal => goal.type === activeTab);

  const completedGoals = filteredGoals.filter(goal => goal.completed).length;
  const totalGoals = filteredGoals.length;
  const completionRate = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0;

  const updateGoalProgress = (goalId: string, newCurrent: number) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const completed = newCurrent >= goal.target;
        return {
          ...goal,
          current: newCurrent,
          completed,
          streak: completed ? goal.streak + 1 : goal.streak
        };
      }
      return goal;
    }));
  };

  const toggleGoalCompletion = (goalId: string) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const completed = !goal.completed;
        return {
          ...goal,
          completed,
          current: completed ? goal.target : Math.min(goal.current, goal.target - 1),
          streak: completed ? goal.streak + 1 : Math.max(0, goal.streak - 1)
        };
      }
      return goal;
    }));
  };

  const getDaysInWeek = () => {
    const days = [];
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        weekday: 'short', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  return (
    <div className="bg-transparent border border-[var(--border-color)]/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-color)]/3 via-transparent to-[var(--accent-hover)]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] opacity-20 blur-xl scale-150"></div>
            <Target className="w-6 h-6 text-white relative z-10" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-primary)] to-[var(--accent-color)] group-hover:from-[var(--accent-color)] group-hover:to-[var(--accent-hover)] transition-all duration-300">
              Goals Tracker
            </h2>
            <p className="text-[var(--text-secondary)] text-sm">Track your daily and weekly fitness goals</p>
          </div>
        </div>

        {/* Add Goal Button */}
        <button 
          onClick={() => setShowAddGoal(true)}
          className="p-2 bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] rounded-lg hover:scale-105 transition-transform duration-200 shadow-lg"
        >
          <Plus className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 bg-[var(--bg-tertiary)]/60 rounded-lg p-1 mb-6 relative z-10">
        <button
          onClick={() => setActiveTab('daily')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'daily'
              ? 'bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] text-white shadow-lg'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          Daily Goals
        </button>
        <button
          onClick={() => setActiveTab('weekly')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            activeTab === 'weekly'
              ? 'bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] text-white shadow-lg'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          Weekly Goals
        </button>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-3 gap-4 mb-6 relative z-10">
        <div className="text-center p-3 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 rounded-xl border border-[var(--border-color)]/30">
          <div className="text-lg font-bold text-[var(--accent-color)]">{completedGoals}/{totalGoals}</div>
          <div className="text-xs text-[var(--text-secondary)]">Completed</div>
        </div>
        <div className="text-center p-3 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 rounded-xl border border-[var(--border-color)]/30">
          <div className="text-lg font-bold text-[var(--accent-color)]">{Math.round(completionRate)}%</div>
          <div className="text-xs text-[var(--text-secondary)]">Success Rate</div>
        </div>
        <div className="text-center p-3 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 rounded-xl border border-[var(--border-color)]/30">
          <div className="text-lg font-bold text-[var(--accent-color)]">
            {Math.max(...filteredGoals.map(g => g.streak), 0)}
          </div>
          <div className="text-xs text-[var(--text-secondary)]">Best Streak</div>
        </div>
      </div>

      {/* Goals List */}
      <div className="space-y-3 relative z-10">
        {filteredGoals.length === 0 ? (
          <div className="text-center py-8">
            <Target className="w-12 h-12 text-[var(--text-secondary)]/50 mx-auto mb-3" />
            <p className="text-[var(--text-secondary)] text-sm">No {activeTab} goals set</p>
            <button 
              onClick={() => setShowAddGoal(true)}
              className="mt-3 px-4 py-2 bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] text-white rounded-lg text-sm hover:scale-105 transition-transform duration-200"
            >
              Add Your First Goal
            </button>
          </div>
        ) : (
          filteredGoals.map((goal, index) => (
            <div
              key={goal.id}
              className="group/item p-4 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 backdrop-blur-sm rounded-xl border border-[var(--border-color)]/30 hover:border-[var(--accent-color)]/40 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Goal background effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryColor(goal.category)}/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 rounded-xl`}></div>
              
              <div className="flex items-center gap-4 relative z-10">
                {/* Category Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getCategoryColor(goal.category)} flex items-center justify-center shadow-lg flex-shrink-0 transform group-hover/item:scale-110 transition-transform duration-300`}>
                  <span className="text-xl">{getCategoryIcon(goal.category)}</span>
                </div>

                {/* Goal Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-[var(--text-primary)] group-hover/item:text-[var(--accent-color)] transition-colors duration-300 truncate">
                      {goal.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <div className={`px-2 py-1 rounded-md text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                        {goal.priority}
                      </div>
                      {goal.streak > 0 && (
                        <div className="flex items-center gap-1 text-orange-500">
                          <Flame className="w-3 h-3" />
                          <span className="text-xs font-medium">{goal.streak}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-[var(--text-secondary)]">
                        {goal.current} / {goal.target} {goal.unit}
                      </span>
                      <span className="text-sm font-medium text-[var(--accent-color)]">
                        {Math.round(getProgress(goal))}%
                      </span>
                    </div>
                    <div className="w-full bg-[var(--bg-secondary)]/60 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${getCategoryColor(goal.category)} transition-all duration-500`}
                        style={{ width: `${getProgress(goal)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleGoalCompletion(goal.id)}
                        className="flex items-center gap-1 text-sm font-medium transition-colors duration-200"
                      >
                        {goal.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                          <Circle className="w-4 h-4 text-[var(--text-secondary)]" />
                        )}
                        <span className={goal.completed ? 'text-green-500' : 'text-[var(--text-secondary)]'}>
                          {goal.completed ? 'Completed' : 'Mark Complete'}
                        </span>
                      </button>
                    </div>

                    {/* Quick Progress Buttons */}
                    {!goal.completed && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => updateGoalProgress(goal.id, Math.max(0, goal.current - 1))}
                          className="w-6 h-6 rounded bg-[var(--bg-secondary)]/60 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-color)] transition-colors"
                        >
                          -
                        </button>
                        <button
                          onClick={() => updateGoalProgress(goal.id, Math.min(goal.target, goal.current + 1))}
                          className="w-6 h-6 rounded bg-[var(--bg-secondary)]/60 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-color)] transition-colors"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Accent line */}
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${getCategoryColor(goal.category)} transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-500 origin-left`}></div>
            </div>
          ))
        )}
      </div>

      {/* Weekly Calendar View for Daily Goals */}
      {activeTab === 'daily' && (
        <div className="mt-6 pt-4 border-t border-[var(--border-color)]/30 relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-[var(--text-primary)]">This Week Overview</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setDate(selectedDate.getDate() - 7);
                  setSelectedDate(newDate);
                }}
                className="p-1 hover:bg-[var(--accent-color)]/20 rounded transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-[var(--text-secondary)]" />
              </button>
              <button
                onClick={() => {
                  const newDate = new Date(selectedDate);
                  newDate.setDate(selectedDate.getDate() + 7);
                  setSelectedDate(newDate);
                }}
                className="p-1 hover:bg-[var(--accent-color)]/20 rounded transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-[var(--text-secondary)]" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {getDaysInWeek().map((day, index) => {
              const isToday = day.toDateString() === new Date().toDateString();
              const completedToday = filteredGoals.filter(g => g.completed).length;
              const totalToday = filteredGoals.length;
              
              return (
                <div
                  key={index}
                  className={`p-2 rounded-lg text-center text-xs ${
                    isToday 
                      ? 'bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] text-white' 
                      : 'bg-[var(--bg-tertiary)]/60 text-[var(--text-secondary)]'
                  }`}
                >
                  <div className="font-medium">
                    {day.toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  <div className="text-xs mt-1">
                    {day.getDate()}
                  </div>
                  {isToday && (
                    <div className="text-xs mt-1 opacity-80">
                      {completedToday}/{totalToday}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
    </div>
  );
}
