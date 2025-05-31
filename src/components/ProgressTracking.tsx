"use client";
import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useTheme } from '../context/ThemeProvider';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const ProgressTracking = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Dummy data
  const progressData = {
    weight: {
      current: 75,
      goal: 70,
      history: [78, 77, 76.5, 75.8, 75.2, 75],
      dates: ['Jan 1', 'Jan 7', 'Jan 14', 'Jan 21', 'Jan 28', 'Feb 4'],
    },
    achievements: [
      { id: 1, name: '5 Day Streak', completed: true },
      { id: 2, name: '10 Workouts', completed: true },
      { id: 3, name: '1000 Calories Burned', completed: false },
      { id: 4, name: 'First Month Complete', completed: false },
    ],
    stats: {
      totalWorkouts: 12,
      improvementRate: '+15%',
      daysToGoal: 21,
    }
  };

  // Chart configuration with theme-based colors
  const chartData = {
    labels: progressData.weight.dates,
    datasets: [
      {
        fill: true,
        label: 'Weight Progress',
        data: mounted ? progressData.weight.history : [],
        borderColor: theme === 'dark' ? '#00FFFF' : '#4CAF50', // Electric blue or light green
        backgroundColor: theme === 'dark' 
          ? 'color-mix(in srgb, #00FFFF 15%, transparent)'
          : 'color-mix(in srgb, #4CAF50 15%, transparent)',
        tension: 0.4,
        pointBackgroundColor: theme === 'dark' ? '#00FFFF' : '#4CAF50',
        pointBorderColor: theme === 'dark' ? '#00FFFF' : '#4CAF50',
        pointHoverBackgroundColor: theme === 'dark' ? '#FFFFFF' : '#FFFFFF',
        pointHoverBorderColor: theme === 'dark' ? '#00FFFF' : '#4CAF50',
        pointRadius: 4,
        pointHoverRadius: 6,
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'var(--bg-secondary)',
        titleColor: 'var(--text-primary)',
        bodyColor: 'var(--text-secondary)',
        borderColor: theme === 'dark' ? '#00FFFF' : '#4CAF50',
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        // Add min/max with padding to prevent value overlap
        min: Math.min(...progressData.weight.history) - 0.5,
        max: Math.max(...progressData.weight.history) + 1.5, // Increased padding at top
        grid: {
          color: theme === 'dark' 
            ? 'rgba(0, 255, 255, 0.15)'
            : 'rgba(76, 175, 80, 0.1)',
          lineWidth: 1.5,
          drawBorder: false,
          drawTicks: false,
        },
        ticks: {
          // Add step size to ensure consistent spacing
          stepSize: 0.5,
          color: theme === 'dark' ? '#00FFFF' : 'var(--text-secondary)', // Electric blue in dark mode
          font: {
            weight: theme === 'dark' ? '600' : '400', // Make electric blue text slightly bolder
          },
          callback: (value) => `${value}kg`
        },
        border: {
          display: false
        }
      },
      x: {
        grid: {
          display: false, // Hide vertical grid lines
        },
        ticks: {
          color: theme === 'dark' ? '#00FFFF' : '#4CAF50', // Theme-aware colors for x-axis dates
          font: {
            weight: theme === 'dark' ? '600' : '500', // Slightly bolder in dark mode
          },
        },
        border: {
          display: false
        }
      },
    },
    // Use the same animation style for both desktop and mobile
    animation: {
      x: {
        duration: 1500,
      },
      y: {
        duration: 2000,
        from: 0, // Start from zero for both mobile and desktop
      }
    },
    transitions: {
      active: {
        animation: {
          duration: 2000, // Same duration for both
        }
      }
    },
  };

  return (
    <div className="p-6 rounded-lg card-background">
      <h2 className="text-xl font-semibold mb-6 theme-text-primary flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[var(--accent-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        Progress Tracking
      </h2>

      {/* Weight Progress Section */}
      <div className="mb-6">
        <div className="flex justify-between items-end mb-4">
          <div>
            <p className="text-sm theme-text-secondary">Current Weight</p>
            <p className="text-2xl font-bold theme-text-primary">{progressData.weight.current} kg</p>
          </div>
          <div className="text-right">
            <p className="text-sm theme-text-secondary">Goal Weight</p>
            <p className="text-2xl font-bold text-[var(--accent-color)]">{progressData.weight.goal} kg</p>
          </div>
        </div>
        <div className="h-[200px] mb-6">
          <Line options={chartOptions} data={chartData} />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-3 rounded-lg bg-[color-mix(in_srgb,_var(--accent-color)_10%,_transparent)] border border-[var(--border-color)]">
          <div className="text-2xl font-bold theme-text-primary">{progressData.stats.totalWorkouts}</div>
          <div className="text-sm theme-text-secondary">Total Workouts</div>
        </div>
        <div className="p-3 rounded-lg bg-[color-mix(in_srgb,_var(--accent-color)_10%,_transparent)] border border-[var(--border-color)]">
          <div className="text-2xl font-bold text-[var(--accent-color)]">{progressData.stats.improvementRate}</div>
          <div className="text-sm theme-text-secondary">Improvement</div>
        </div>
        <div className="p-3 rounded-lg bg-[color-mix(in_srgb,_var(--accent-color)_10%,_transparent)] border border-[var(--border-color)]">
          <div className="text-2xl font-bold theme-text-primary">{progressData.stats.daysToGoal}</div>
          <div className="text-sm theme-text-secondary">Days to Goal</div>
        </div>
      </div>

      {/* Achievements */}
      <div>
        <h3 className="text-lg font-semibold mb-3 theme-text-primary">Achievements</h3>
        <div className="space-y-2">
          {progressData.achievements.map((achievement) => (
            <div key={achievement.id} 
                 className={`flex items-center justify-between p-3 rounded-lg border 
                            ${achievement.completed 
                              ? 'border-[var(--accent-color)] bg-[color-mix(in_srgb,_var(--accent-color)_10%,_transparent)]' 
                              : 'border-[var(--border-color)]'}`}>
              <span className={`font-medium ${achievement.completed ? 'text-[var(--accent-color)]' : 'theme-text-secondary'}`}>
                {achievement.name}
              </span>
              {achievement.completed && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[var(--accent-color)]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracking;
