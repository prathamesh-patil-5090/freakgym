import React from 'react';

const WorkoutSummary = () => {
  // Dummy data
  const workoutStats = {
    weeklyWorkouts: 4,
    totalMinutes: 280,
    caloriesBurned: 1850,
    currentStreak: 3,
    recentWorkouts: [
      { id: 1, name: 'Upper Body', duration: '45 min', date: '2 days ago' },
      { id: 2, name: 'Legs Day', duration: '60 min', date: 'Yesterday' },
      { id: 3, name: 'Core & Cardio', duration: '30 min', date: 'Today' },
    ]
  };

  return (
    <div className="p-6 rounded-lg card-background">
      <h2 className="text-xl font-semibold mb-6 theme-text-primary flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--accent-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Workout Summary
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-[color-mix(in_srgb,_var(--accent-color)_10%,_transparent)] border border-[var(--border-color)]">
          <div className="text-3xl font-bold theme-text-primary">{workoutStats.weeklyWorkouts}</div>
          <div className="text-sm theme-text-secondary">Workouts this week</div>
        </div>
        <div className="p-4 rounded-lg bg-[color-mix(in_srgb,_var(--accent-color)_10%,_transparent)] border border-[var(--border-color)]">
          <div className="text-3xl font-bold theme-text-primary">{workoutStats.totalMinutes}</div>
          <div className="text-sm theme-text-secondary">Total minutes</div>
        </div>
        <div className="p-4 rounded-lg bg-[color-mix(in_srgb,_var(--accent-color)_10%,_transparent)] border border-[var(--border-color)]">
          <div className="text-3xl font-bold theme-text-primary">{workoutStats.caloriesBurned}</div>
          <div className="text-sm theme-text-secondary">Calories burned</div>
        </div>
        <div className="p-4 rounded-lg bg-[color-mix(in_srgb,_var(--accent-color)_10%,_transparent)] border border-[var(--border-color)]">
          <div className="text-3xl font-bold theme-text-primary">{workoutStats.currentStreak}🔥</div>
          <div className="text-sm theme-text-secondary">Day streak</div>
        </div>
      </div>

      {/* Recent Workouts */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold mb-3 theme-text-primary">Recent Workouts</h3>
        {workoutStats.recentWorkouts.map((workout) => (
          <div key={workout.id} className="flex items-center justify-between p-3 rounded-lg border border-[var(--border-color)] hover:bg-[color-mix(in_srgb,_var(--accent-color)_5%,_transparent)] transition-colors duration-200">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[var(--accent-color)]"></div>
              <span className="font-medium theme-text-primary">{workout.name}</span>
            </div>
            <div className="flex items-center gap-4 text-sm theme-text-secondary">
              <span>{workout.duration}</span>
              <span>{workout.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* View All Link */}
      <div className="mt-4 text-right">
        <button className="text-sm text-[var(--accent-color)] hover:text-[var(--accent-hover)] font-medium transition-colors duration-200">
          View All Workouts →
        </button>
      </div>
    </div>
  );
};

export default WorkoutSummary;
