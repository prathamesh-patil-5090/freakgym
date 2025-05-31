"use client";
import { useState } from 'react';
import { Plus, Droplets, Utensils, Dumbbell, MapPin, Heart, Clock, Zap, Coffee, Moon, CheckCircle, Timer } from 'lucide-react';

interface QuickAction {
  id: string;
  title: string;
  icon: string;
  iconComponent: any;
  category: 'hydration' | 'nutrition' | 'exercise' | 'wellness' | 'misc';
  color: string;
  value?: number;
  unit?: string;
  description: string;
  lastLogged?: string;
  streak?: number;
}

const quickActions: QuickAction[] = [
  {
    id: 'water',
    title: 'Water',
    icon: '💧',
    iconComponent: Droplets,
    category: 'hydration',
    color: 'from-blue-500 to-cyan-500',
    value: 250,
    unit: 'ml',
    description: 'Log a glass of water',
    lastLogged: '30 min ago',
    streak: 12
  },
  {
    id: 'meal',
    title: 'Meal',
    icon: '🍽️',
    iconComponent: Utensils,
    category: 'nutrition',
    color: 'from-green-500 to-emerald-500',
    description: 'Log your meal',
    lastLogged: '2 hours ago'
  },
  {
    id: 'workout',
    title: 'Workout',
    icon: '💪',
    iconComponent: Dumbbell,
    category: 'exercise',
    color: 'from-red-500 to-orange-500',
    value: 45,
    unit: 'min',
    description: 'Log workout session',
    lastLogged: 'Yesterday',
    streak: 5
  },
  {
    id: 'walk',
    title: 'Walk',
    icon: '🚶',
    iconComponent: MapPin,
    category: 'exercise',
    color: 'from-purple-500 to-pink-500',
    value: 2000,
    unit: 'steps',
    description: 'Log walking activity',
    lastLogged: '1 hour ago'
  },
  {
    id: 'meditation',
    title: 'Meditation',
    icon: '🧘',
    iconComponent: Heart,
    category: 'wellness',
    color: 'from-indigo-500 to-purple-500',
    value: 10,
    unit: 'min',
    description: 'Log meditation session',
    lastLogged: 'This morning',
    streak: 7
  },
  {
    id: 'sleep',
    title: 'Sleep',
    icon: '😴',
    iconComponent: Moon,
    category: 'wellness',
    color: 'from-slate-500 to-gray-500',
    value: 8,
    unit: 'hours',
    description: 'Log sleep duration',
    lastLogged: 'Last night'
  },
  {
    id: 'coffee',
    title: 'Coffee',
    icon: '☕',
    iconComponent: Coffee,
    category: 'nutrition',
    color: 'from-amber-500 to-orange-500',
    description: 'Log coffee intake',
    lastLogged: '3 hours ago'
  },
  {
    id: 'supplement',
    title: 'Supplements',
    icon: '💊',
    iconComponent: Plus,
    category: 'nutrition',
    color: 'from-teal-500 to-cyan-500',
    description: 'Log supplements taken',
    lastLogged: 'This morning'
  }
];

export default function QuickLogButtons() {
  const [recentLogs, setRecentLogs] = useState<string[]>([]);
  const [animatingActions, setAnimatingActions] = useState<Set<string>>(new Set());

  const handleQuickLog = (action: QuickAction) => {
    // Add to recent logs
    setRecentLogs(prev => [action.id, ...prev.slice(0, 4)]);
    
    // Add animation
    setAnimatingActions(prev => new Set([...prev, action.id]));
    
    // Remove animation after delay
    setTimeout(() => {
      setAnimatingActions(prev => {
        const newSet = new Set(prev);
        newSet.delete(action.id);
        return newSet;
      });
    }, 600);

    // Here you would typically send the data to your backend
    console.log(`Logged: ${action.title}`, {
      value: action.value,
      unit: action.unit,
      timestamp: new Date().toISOString()
    });
  };

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case 'hydration': return 'Hydration';
      case 'nutrition': return 'Nutrition';
      case 'exercise': return 'Exercise';
      case 'wellness': return 'Wellness';
      case 'misc': return 'Other';
      default: return 'Activities';
    }
  };

  const groupedActions = quickActions.reduce((acc, action) => {
    if (!acc[action.category]) {
      acc[action.category] = [];
    }
    acc[action.category].push(action);
    return acc;
  }, {} as Record<string, QuickAction[]>);

  const getTodayStats = () => {
    const stats = {
      logsToday: recentLogs.length + 8, // Mock data
      streakDays: Math.max(...quickActions.filter(a => a.streak).map(a => a.streak!), 0),
      avgDaily: 12
    };
    return stats;
  };

  const todayStats = getTodayStats();

  return (
    <div className="bg-transparent border border-[var(--border-color)]/30 rounded-2xl p-4 md:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-color)]/3 via-transparent to-[var(--accent-hover)]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 md:mb-6 relative z-10">
        <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 flex-shrink-0">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] opacity-20 blur-xl scale-150"></div>
            <Zap className="w-5 h-5 md:w-6 md:h-6 text-white relative z-10" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg md:text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-primary)] to-[var(--accent-color)] group-hover:from-[var(--accent-color)] group-hover:to-[var(--accent-hover)] transition-all duration-300 truncate">
              Quick Log
            </h2>
            <p className="text-[var(--text-secondary)] text-xs md:text-sm hidden sm:block">Log your daily activities instantly</p>
          </div>
        </div>

        {/* Add Custom Activity Button */}
        <button className="p-2 bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] rounded-lg hover:scale-105 active:scale-95 transition-transform duration-200 shadow-lg touch-manipulation flex-shrink-0">
          <Plus className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4 md:mb-6 relative z-10">
        <div className="text-center p-2 md:p-3 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 rounded-xl border border-[var(--border-color)]/30">
          <div className="text-base md:text-lg font-bold text-[var(--accent-color)]">{todayStats.logsToday}</div>
          <div className="text-xs text-[var(--text-secondary)]">Today</div>
        </div>
        <div className="text-center p-2 md:p-3 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 rounded-xl border border-[var(--border-color)]/30">
          <div className="text-base md:text-lg font-bold text-[var(--accent-color)]">{todayStats.streakDays}</div>
          <div className="text-xs text-[var(--text-secondary)]">Best Streak</div>
        </div>
        <div className="text-center p-2 md:p-3 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 rounded-xl border border-[var(--border-color)]/30">
          <div className="text-base md:text-lg font-bold text-[var(--accent-color)]">{todayStats.avgDaily}</div>
          <div className="text-xs text-[var(--text-secondary)]">Avg/Day</div>
        </div>
      </div>

      {/* Quick Action Categories */}
      <div className="space-y-4 md:space-y-6 relative z-10">
        {Object.entries(groupedActions).map(([category, actions]) => (
          <div key={category}>
            <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-3 flex items-center gap-2">
              {getCategoryTitle(category)}
              <span className="text-xs bg-[var(--accent-color)]/20 text-[var(--accent-color)] px-2 py-1 rounded-full">
                {actions.length}
              </span>
            </h3>
            
            {/* Mobile: Single column, Desktop: Two columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {actions.map((action, index) => {
                const IconComponent = action.iconComponent;
                const isAnimating = animatingActions.has(action.id);
                const wasRecentlyLogged = recentLogs.includes(action.id);
                
                return (
                  <button
                    key={action.id}
                    onClick={() => handleQuickLog(action)}
                    className={`group/item p-3 md:p-4 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 backdrop-blur-sm rounded-xl border border-[var(--border-color)]/30 hover:border-[var(--accent-color)]/40 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden text-left touch-manipulation ${
                      isAnimating ? 'scale-95 bg-green-500/20' : ''
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Action background effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${action.color}/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 rounded-xl`}></div>
                    
                    {/* Success checkmark animation */}
                    {isAnimating && (
                      <div className="absolute inset-0 flex items-center justify-center bg-green-500/20 rounded-xl z-20">
                        <CheckCircle className="w-6 h-6 md:w-8 md:h-8 text-green-500 animate-bounce" />
                      </div>
                    )}
                    
                    <div className="flex items-start gap-3 relative z-10">
                      {/* Icon */}
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center shadow-lg flex-shrink-0 transform group-hover:item:scale-110 transition-transform duration-300`}>
                        <span className="text-lg md:text-xl">{action.icon}</span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h4 className="font-semibold text-[var(--text-primary)] group-hover:item:text-[var(--accent-color)] transition-colors duration-300 text-sm md:text-base truncate pr-2">
                            {action.title}
                          </h4>
                          {action.streak && (
                            <div className="flex items-center gap-1 text-orange-500 flex-shrink-0">
                              <span className="text-xs">🔥</span>
                              <span className="text-xs font-medium">{action.streak}</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Value and Unit */}
                        {action.value && action.unit && (
                          <div className="text-sm font-medium text-[var(--accent-color)] mb-1">
                            +{action.value} {action.unit}
                          </div>
                        )}
                        
                        {/* Description */}
                        <p className="text-xs text-[var(--text-secondary)] mb-2 leading-relaxed line-clamp-2">
                          {action.description}
                        </p>
                        
                        {/* Last logged info - Mobile layout */}
                        {action.lastLogged && (
                          <div className="flex items-center gap-1 text-xs text-[var(--text-secondary)]/70">
                            <Clock className="w-3 h-3" />
                            <span className="truncate">Last: {action.lastLogged}</span>
                          </div>
                        )}

                        {/* Recently logged indicator */}
                        {wasRecentlyLogged && (
                          <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        )}
                      </div>
                    </div>

                    {/* Accent line */}
                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${action.color} transform scale-x-0 group-hover:item:scale-x-100 transition-transform duration-500 origin-left`}></div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      {recentLogs.length > 0 && (
        <div className="mt-4 md:mt-6 pt-4 border-t border-[var(--border-color)]/30 relative z-10">
          <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-3">Recent Logs</h3>
          <div className="flex gap-2 flex-wrap">
            {recentLogs.slice(0, 5).map((actionId, index) => {
              const action = quickActions.find(a => a.id === actionId);
              if (!action) return null;
              
              return (
                <div
                  key={`${actionId}-${index}`}
                  className="flex items-center gap-2 bg-[var(--accent-color)]/10 text-[var(--accent-color)] px-2 md:px-3 py-1 rounded-full text-xs font-medium"
                >
                  <span>{action.icon}</span>
                  <span className="hidden xs:inline">{action.title}</span>
                  <span className="xs:hidden">{action.title.substring(0, 3)}</span>
                  {action.value && action.unit && (
                    <span className="opacity-70 hidden sm:inline">+{action.value}{action.unit}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Timer Section for Active Sessions */}
      <div className="mt-4 md:mt-6 pt-4 border-t border-[var(--border-color)]/30 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-[var(--text-secondary)]">Quick Timers</h3>
        </div>
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-3">
          <button className="flex items-center gap-2 p-3 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 rounded-lg border border-[var(--border-color)]/30 hover:border-[var(--accent-color)]/40 active:scale-95 transition-all duration-300 text-sm touch-manipulation">
            <Timer className="w-4 h-4 text-[var(--accent-color)] flex-shrink-0" />
            <span className="text-[var(--text-primary)] truncate">5 min break</span>
          </button>
          <button className="flex items-center gap-2 p-3 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 rounded-lg border border-[var(--border-color)]/30 hover:border-[var(--accent-color)]/40 active:scale-95 transition-all duration-300 text-sm touch-manipulation">
            <Dumbbell className="w-4 h-4 text-[var(--accent-color)] flex-shrink-0" />
            <span className="text-[var(--text-primary)] truncate">Workout timer</span>
          </button>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
    </div>
  );
}
