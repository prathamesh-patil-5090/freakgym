import React from 'react';
import Image from 'next/image'; // Import Image component if using Next/Image for profile pic
import Link from 'next/link'; // Import Link if progress tracking links somewhere
import WorkoutSummary from '../../components/WorkoutSummary';
import ProgressTracking from '@/components/ProgressTracking';
import ProfileCard from '@/components/ProfileCard';

const DashboardPage = () => {
  return (
    <div className="h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[var(--accent-color)] scrollbar-thumb-rounded-full">
      <div className="container mx-auto px-4 py-8">
        {/* Grid for Dashboard Cards/Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min pb-8">
          {/* Profile Card - Enhanced */}
          <ProfileCard />

          {/* Workout Summary Card */}
          <WorkoutSummary />

          {/* Example Card 2 */}
          <ProgressTracking />

          {/* Example Card 3 */}
          <div className="p-6 rounded-lg card-background">
            <h2 className="text-xl font-semibold mb-4 theme-text-primary">
              Upcoming Schedule
            </h2>
            <p className="theme-text-secondary">
              Placeholder for scheduled workouts or events.
            </p>
            {/* Add calendar or list here */}
          </div>

          {/* Add more cards as needed */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;