"use client";
import { useState } from 'react';
import { Ruler, TrendingUp, TrendingDown, Minus, Plus, Calendar, Target, Activity, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';

interface Measurement {
  id: string;
  name: string;
  current: number;
  previous: number;
  goal: number;
  unit: string;
  category: 'chest' | 'waist' | 'arms' | 'legs' | 'other';
  lastUpdated: string;
  history: { date: string; value: number }[];
}

const mockMeasurements: Measurement[] = [
  {
    id: '1',
    name: 'Chest',
    current: 42.5,
    previous: 41.8,
    goal: 44.0,
    unit: 'inches',
    category: 'chest',
    lastUpdated: '2 days ago',
    history: [
      { date: '2024-01-01', value: 40.5 },
      { date: '2024-01-15', value: 41.0 },
      { date: '2024-01-30', value: 41.8 },
      { date: '2024-02-15', value: 42.5 }
    ]
  },
  {
    id: '2',
    name: 'Waist',
    current: 32.0,
    previous: 33.2,
    goal: 30.0,
    unit: 'inches',
    category: 'waist',
    lastUpdated: '1 week ago',
    history: [
      { date: '2024-01-01', value: 34.5 },
      { date: '2024-01-15', value: 34.0 },
      { date: '2024-01-30', value: 33.2 },
      { date: '2024-02-15', value: 32.0 }
    ]
  },
  {
    id: '3',
    name: 'Left Bicep',
    current: 16.2,
    previous: 15.8,
    goal: 17.0,
    unit: 'inches',
    category: 'arms',
    lastUpdated: '3 days ago',
    history: [
      { date: '2024-01-01', value: 15.0 },
      { date: '2024-01-15', value: 15.5 },
      { date: '2024-01-30', value: 15.8 },
      { date: '2024-02-15', value: 16.2 }
    ]
  },
  {
    id: '4',
    name: 'Right Thigh',
    current: 25.8,
    previous: 25.5,
    goal: 26.5,
    unit: 'inches',
    category: 'legs',
    lastUpdated: '5 days ago',
    history: [
      { date: '2024-01-01', value: 24.8 },
      { date: '2024-01-15', value: 25.0 },
      { date: '2024-01-30', value: 25.5 },
      { date: '2024-02-15', value: 25.8 }
    ]
  },
  {
    id: '5',
    name: 'Body Weight',
    current: 175.2,
    previous: 172.8,
    goal: 180.0,
    unit: 'lbs',
    category: 'other',
    lastUpdated: 'Today',
    history: [
      { date: '2024-01-01', value: 170.0 },
      { date: '2024-01-15', value: 171.5 },
      { date: '2024-01-30', value: 172.8 },
      { date: '2024-02-15', value: 175.2 }
    ]
  },
  {
    id: '6',
    name: 'Body Fat %',
    current: 12.5,
    previous: 14.2,
    goal: 10.0,
    unit: '%',
    category: 'other',
    lastUpdated: '1 week ago',
    history: [
      { date: '2024-01-01', value: 16.0 },
      { date: '2024-01-15', value: 15.1 },
      { date: '2024-01-30', value: 14.2 },
      { date: '2024-02-15', value: 12.5 }
    ]
  }
];

export default function BodyMeasurementQuickView() {
  const [measurements] = useState<Measurement[]>(mockMeasurements);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [categoryIndex, setCategoryIndex] = useState(0);

  const categories = [
    { id: 'all', label: 'All', icon: Activity },
    { id: 'chest', label: 'Chest', icon: Target },
    { id: 'waist', label: 'Waist', icon: Minus },
    { id: 'arms', label: 'Arms', icon: Plus },
    { id: 'legs', label: 'Legs', icon: BarChart3 },
    { id: 'other', label: 'Other', icon: Ruler }
  ];

  const filteredMeasurements = selectedCategory === 'all' 
    ? measurements 
    : measurements.filter(m => m.category === selectedCategory);

  const getProgressPercentage = (current: number, goal: number, isReduction: boolean = false) => {
    if (isReduction) {
      // For measurements where reduction is the goal (like waist, body fat)
      const start = Math.max(current, goal) + Math.abs(goal - current);
      return Math.min(((start - current) / (start - goal)) * 100, 100);
    } else {
      // For measurements where increase is the goal (like chest, biceps)
      const start = Math.min(current, goal) - Math.abs(goal - current);
      return Math.min(((current - start) / (goal - start)) * 100, 100);
    }
  };

  const getChangeIndicator = (current: number, previous: number) => {
    const change = current - previous;
    const percentage = ((Math.abs(change) / previous) * 100).toFixed(1);
    
    if (change > 0) {
      return {
        icon: TrendingUp,
        color: 'text-green-500',
        text: `+${change.toFixed(1)}`,
        percentage: `+${percentage}%`
      };
    } else if (change < 0) {
      return {
        icon: TrendingDown,
        color: 'text-blue-500',
        text: `${change.toFixed(1)}`,
        percentage: `-${percentage}%`
      };
    } else {
      return {
        icon: Minus,
        color: 'text-[var(--text-secondary)]',
        text: '0.0',
        percentage: '0%'
      };
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'chest': return 'from-blue-500 to-cyan-500';
      case 'waist': return 'from-red-500 to-pink-500';
      case 'arms': return 'from-purple-500 to-indigo-500';
      case 'legs': return 'from-green-500 to-emerald-500';
      case 'other': return 'from-orange-500 to-yellow-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const isReductionGoal = (name: string) => {
    return name.toLowerCase().includes('waist') || 
           name.toLowerCase().includes('fat') || 
           name.toLowerCase().includes('weight') && name.toLowerCase().includes('body');
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
    <div className="bg-transparent border border-[var(--border-color)]/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-color)]/3 via-transparent to-[var(--accent-hover)]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] opacity-20 blur-xl scale-150"></div>
            <Ruler className="w-6 h-6 text-white relative z-10" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-primary)] to-[var(--accent-color)] group-hover:from-[var(--accent-color)] group-hover:to-[var(--accent-hover)] transition-all duration-300">
              Body Measurements
            </h2>
            <p className="text-[var(--text-secondary)] text-sm">Track your physical progress</p>
          </div>
        </div>

        {/* Add Measurement Button */}
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="p-2 bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] rounded-lg hover:scale-105 transition-transform duration-200 shadow-lg"
        >
          <Plus className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6 relative z-10">
        <div className="text-center p-3 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 rounded-xl border border-[var(--border-color)]/30">
          <div className="text-lg font-bold text-[var(--accent-color)]">
            {measurements.filter(m => {
              const change = getChangeIndicator(m.current, m.previous);
              return change.text.startsWith('+');
            }).length}
          </div>
          <div className="text-xs text-[var(--text-secondary)]">Improved</div>
        </div>
        <div className="text-center p-3 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 rounded-xl border border-[var(--border-color)]/30">
          <div className="text-lg font-bold text-[var(--accent-color)]">
            {measurements.length}
          </div>
          <div className="text-xs text-[var(--text-secondary)]">Tracked</div>
        </div>
        <div className="text-center p-3 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 rounded-xl border border-[var(--border-color)]/30">
          <div className="text-lg font-bold text-[var(--accent-color)]">
            {Math.round(measurements.reduce((acc, m) => {
              const isReduction = isReductionGoal(m.name);
              return acc + getProgressPercentage(m.current, m.goal, isReduction);
            }, 0) / measurements.length)}%
          </div>
          <div className="text-xs text-[var(--text-secondary)]">Avg Progress</div>
        </div>
      </div>

      {/* Category Carousel */}
      <div className="relative mb-6 relative z-10">
        <div className="bg-[var(--bg-tertiary)]/60 rounded-lg p-4 border border-[var(--border-color)]/30">
          {/* Navigation Arrows */}
          <div className="flex items-center justify-between">
            <button
              onClick={prevCategory}
              className="p-2 hover:bg-[var(--accent-color)]/20 rounded-lg transition-all duration-200 transform hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5 text-[var(--text-secondary)]" />
            </button>

            {/* Current Category Display */}
            <div className="flex-1 flex items-center justify-center">
              <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] rounded-xl text-white shadow-lg transform transition-all duration-300">
                <CurrentCategoryIcon className="w-5 h-5" />
                <span className="font-medium">{categories[categoryIndex].label}</span>
              </div>
            </div>

            <button
              onClick={nextCategory}
              className="p-2 hover:bg-[var(--accent-color)]/20 rounded-lg transition-all duration-200 transform hover:scale-110"
            >
              <ChevronRight className="w-5 h-5 text-[var(--text-secondary)]" />
            </button>
          </div>

          {/* Category Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {categories.map((_, index) => (
              <button
                key={index}
                onClick={() => selectCategory(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === categoryIndex
                    ? 'bg-[var(--accent-color)] w-6 h-2'
                    : 'bg-[var(--text-secondary)]/30 hover:bg-[var(--text-secondary)]/50'
                }`}
              />
            ))}
          </div>


          {/* Category Stats */}
          <div className="mt-4 text-center">
            <div className="text-sm text-[var(--text-secondary)]">
              {filteredMeasurements.length} measurement{filteredMeasurements.length !== 1 ? 's' : ''} in {categories[categoryIndex].label.toLowerCase()}
            </div>
          </div>
        </div>
      </div>

      {/* Measurements List */}
      <div className="space-y-4 relative z-10">
        {filteredMeasurements.length === 0 ? (
          <div className="text-center py-8">
            <Ruler className="w-12 h-12 text-[var(--text-secondary)]/50 mx-auto mb-3" />
            <p className="text-[var(--text-secondary)] text-sm">No measurements found in this category</p>
          </div>
        ) : (
          filteredMeasurements.map((measurement, index) => {
            const change = getChangeIndicator(measurement.current, measurement.previous);
            const ChangeIcon = change.icon;
            const isReduction = isReductionGoal(measurement.name);
            const progress = getProgressPercentage(measurement.current, measurement.goal, isReduction);
            
            return (
              <div
                key={measurement.id}
                className="group/item p-4 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 backdrop-blur-sm rounded-xl border border-[var(--border-color)]/30 hover:border-[var(--accent-color)]/40 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Category background effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${getCategoryColor(measurement.category)}/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 rounded-xl`}></div>
                
                <div className="flex items-center gap-4 relative z-10">
                  {/* Measurement Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getCategoryColor(measurement.category)} flex items-center justify-center shadow-lg flex-shrink-0 transform group-hover/item:scale-110 transition-transform duration-300`}>
                    <Ruler className="w-6 h-6 text-white" />
                  </div>

                  {/* Measurement Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-[var(--text-primary)] group-hover/item:text-[var(--accent-color)] transition-colors duration-300 text-lg">
                        {measurement.name}
                      </h3>
                      
                      {/* Change Indicator */}
                      <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${change.color} bg-[var(--bg-secondary)]/60`}>
                        <ChangeIcon className="w-3 h-3" />
                        <span>{change.text} {measurement.unit}</span>
                      </div>
                    </div>

                    {/* Current Value and Goal */}
                    <div className="flex items-center gap-6 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-[var(--accent-color)]">
                          {measurement.current}
                        </span>
                        <span className="text-[var(--text-secondary)] text-sm">
                          {measurement.unit}
                        </span>
                      </div>
                      
                      <div className="text-xs text-[var(--text-secondary)]">
                        Goal: {measurement.goal} {measurement.unit}
                      </div>
                      
                      <div className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                        <Calendar className="w-3 h-3" />
                        {measurement.lastUpdated}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-[var(--text-secondary)]">
                          Progress to goal
                        </span>
                        <span className="text-sm font-medium text-[var(--accent-color)]">
                          {Math.round(progress)}%
                        </span>
                      </div>
                      <div className="w-full bg-[var(--bg-secondary)]/60 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full bg-gradient-to-r ${getCategoryColor(measurement.category)} transition-all duration-500`}
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Mini Chart Visualization */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-[var(--text-secondary)]">Trend:</span>
                        <div className="flex items-end gap-0.5 h-4">
                          {measurement.history.slice(-4).map((point, i) => {
                            const maxValue = Math.max(...measurement.history.map(p => p.value));
                            const minValue = Math.min(...measurement.history.map(p => p.value));
                            const height = ((point.value - minValue) / (maxValue - minValue)) * 16 + 4;
                            
                            return (
                              <div
                                key={i}
                                className={`w-1.5 bg-gradient-to-t ${getCategoryColor(measurement.category)} rounded-sm opacity-70`}
                                style={{ height: `${height}px` }}
                                title={`${point.date}: ${point.value} ${measurement.unit}`}
                              />
                            );
                          })}
                        </div>
                      </div>
                      
                      <div className="text-xs font-medium">
                        <span className={change.color}>{change.percentage}</span>
                        <span className="text-[var(--text-secondary)] ml-1">vs last</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${getCategoryColor(measurement.category)} transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-500 origin-left`}></div>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Summary */}
      <div className="mt-6 pt-4 border-t border-[var(--border-color)]/30 relative z-10">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Target className="w-5 h-5 text-[var(--accent-color)]" />
            <span className="font-semibold text-[var(--text-primary)]">Keep Measuring!</span>
          </div>
          <p className="text-sm text-[var(--text-secondary)]">
            {filteredMeasurements.length > 0 
              ? `Tracking ${filteredMeasurements.length} measurement${filteredMeasurements.length > 1 ? 's' : ''}. Consistency leads to progress!`
              : 'Start tracking your measurements to see progress over time.'
            }
          </p>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
    </div>
  );
}
