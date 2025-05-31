import React from 'react';
import WorkoutSummary from '../../../components/WorkoutSummary';
import ProgressTracking from '@/components/ProgressTracking';
import ProfileCard from '@/components/ProfileCard';
import UpcomingSchedule from '@/components/UpcomingSchedule';
import TipOfTheDay from '@/components/TipOfTheDay';
import PersonalBestHighlights from '@/components/PersonalBestHighlights';

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

          {/* Progress Tracking Card */}
          <ProgressTracking />

          {/* Tip of the Day Card */}
          <TipOfTheDay />

          {/* Personal Best Highlights Card */}
          <PersonalBestHighlights />

          {/* Upcoming Schedule Card - Spans 2 columns on larger screens */}
          <div className="lg:col-span-2">
            <UpcomingSchedule />
          </div>

          {/* Add more cards as needed */}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;