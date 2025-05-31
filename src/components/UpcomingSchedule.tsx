"use client";
import { useState } from 'react';
import { Calendar, Clock, MapPin, User, ChevronLeft, ChevronRight, Plus, Dumbbell, Heart, Zap, Target } from 'lucide-react';

interface ScheduleEvent {
  id: string;
  title: string;
  type: 'workout' | 'class' | 'personal' | 'cardio';
  date: string;
  time: string;
  duration: string;
  location: string;
  instructor?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  participants?: number;
  maxParticipants?: number;
}

const mockEvents: ScheduleEvent[] = [
  {
    id: '1',
    title: 'Upper Body Strength',
    type: 'workout',
    date: '2024-01-15',
    time: '09:00',
    duration: '60 min',
    location: 'Gym Floor A',
    difficulty: 'Intermediate'
  },
  {
    id: '2',
    title: 'HIIT Cardio Class',
    type: 'class',
    date: '2024-01-15',
    time: '18:30',
    duration: '45 min',
    location: 'Studio 1',
    instructor: 'Sarah Johnson',
    difficulty: 'Advanced',
    participants: 12,
    maxParticipants: 15
  },
  {
    id: '3',
    title: 'Personal Training',
    type: 'personal',
    date: '2024-01-16',
    time: '07:00',
    duration: '60 min',
    location: 'Private Room',
    instructor: 'Mike Wilson',
    difficulty: 'Intermediate'
  },
  {
    id: '4',
    title: 'Leg Day Workout',
    type: 'workout',
    date: '2024-01-16',
    time: '16:00',
    duration: '75 min',
    location: 'Gym Floor B',
    difficulty: 'Advanced'
  },
  {
    id: '5',
    title: 'Morning Yoga Flow',
    type: 'class',
    date: '2024-01-17',
    time: '08:00',
    duration: '60 min',
    location: 'Studio 2',
    instructor: 'Emma Davis',
    difficulty: 'Beginner',
    participants: 8,
    maxParticipants: 20
  },
  {
    id: '6',
    title: 'Cardio Circuit',
    type: 'cardio',
    date: '2024-01-17',
    time: '19:00',
    duration: '30 min',
    location: 'Cardio Zone',
    difficulty: 'Intermediate'
  }
];

export default function UpcomingSchedule() {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedView, setSelectedView] = useState<'list' | 'calendar'>('list');

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'workout': return Dumbbell;
      case 'class': return User;
      case 'personal': return Target;
      case 'cardio': return Heart;
      default: return Zap;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'workout': return 'from-blue-500 to-cyan-500';
      case 'class': return 'from-purple-500 to-pink-500';
      case 'personal': return 'from-green-500 to-emerald-500';
      case 'cardio': return 'from-red-500 to-orange-500';
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

  const getUpcomingEvents = () => {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() + (currentWeek * 7));
    
    return mockEvents.filter(event => {
      const eventDate = new Date(event.date);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      
      return eventDate >= weekStart && eventDate <= weekEnd;
    }).sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateA.getTime() - dateB.getTime();
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
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

  const upcomingEvents = getUpcomingEvents();

  return (
    <div className="bg-transparent border border-[var(--border-color)]/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-color)]/3 via-transparent to-[var(--accent-hover)]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] opacity-20 blur-xl scale-150"></div>
            <Calendar className="w-6 h-6 text-white relative z-10" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-primary)] to-[var(--accent-color)] group-hover:from-[var(--accent-color)] group-hover:to-[var(--accent-hover)] transition-all duration-300">
              Upcoming Schedule
            </h2>
            <p className="text-[var(--text-secondary)] text-sm">Your fitness appointments this week</p>
          </div>
        </div>

        {/* View Toggle & Navigation */}
        <div className="flex items-center gap-2">
          {/* Week Navigation */}
          <div className="flex items-center gap-1 bg-[var(--bg-tertiary)]/60 rounded-lg p-1">
            <button
              onClick={() => setCurrentWeek(prev => prev - 1)}
              className="p-2 rounded-md hover:bg-[var(--accent-color)]/20 transition-colors duration-200"
            >
              <ChevronLeft className="w-4 h-4 text-[var(--text-secondary)]" />
            </button>
            <span className="px-3 py-1 text-sm font-medium text-[var(--text-primary)]">
              {currentWeek === 0 ? 'This Week' : currentWeek > 0 ? `+${currentWeek} Week` : `${currentWeek} Week`}
            </span>
            <button
              onClick={() => setCurrentWeek(prev => prev + 1)}
              className="p-2 rounded-md hover:bg-[var(--accent-color)]/20 transition-colors duration-200"
            >
              <ChevronRight className="w-4 h-4 text-[var(--text-secondary)]" />
            </button>
          </div>

          {/* Add Event Button */}
          <button className="p-2 bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] rounded-lg hover:scale-105 transition-transform duration-200 shadow-lg">
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Events List */}
      <div className="space-y-3 relative z-10">
        {upcomingEvents.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-[var(--text-secondary)]/50 mx-auto mb-3" />
            <p className="text-[var(--text-secondary)] text-sm">No events scheduled for this week</p>
            <button className="mt-3 px-4 py-2 bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] text-white rounded-lg text-sm hover:scale-105 transition-transform duration-200">
              Schedule Workout
            </button>
          </div>
        ) : (
          upcomingEvents.map((event, index) => {
            const IconComponent = getEventTypeIcon(event.type);
            return (
              <div
                key={event.id}
                className="group/item p-4 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 backdrop-blur-sm rounded-xl border border-[var(--border-color)]/30 hover:border-[var(--accent-color)]/40 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Event background effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${getEventTypeColor(event.type)}/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 rounded-xl`}></div>
                
                <div className="flex items-center gap-4 relative z-10">
                  {/* Event Type Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${getEventTypeColor(event.type)} flex items-center justify-center shadow-lg flex-shrink-0 transform group-hover/item:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>

                  {/* Event Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-[var(--text-primary)] group-hover:item:text-[var(--accent-color)] transition-colors duration-300 truncate">
                        {event.title}
                      </h3>
                      <div className={`px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(event.difficulty)}`}>
                        {event.difficulty}
                      </div>
                    </div>

                    {/* Time and Date */}
                    <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)] mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{event.time} ({event.duration})</span>
                      </div>
                    </div>

                    {/* Location and Instructor */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-[var(--text-secondary)]">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                        {event.instructor && (
                          <>
                            <span className="mx-2">•</span>
                            <User className="w-4 h-4" />
                            <span>{event.instructor}</span>
                          </>
                        )}
                      </div>

                      {/* Participants (for classes) */}
                      {event.participants && event.maxParticipants && (
                        <div className="text-xs text-[var(--text-secondary)] bg-[var(--bg-secondary)]/60 px-2 py-1 rounded">
                          {event.participants}/{event.maxParticipants} joined
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="px-4 py-2 bg-gradient-to-r from-[var(--accent-color)]/20 to-[var(--accent-hover)]/20 hover:from-[var(--accent-color)] hover:to-[var(--accent-hover)] text-[var(--accent-color)] hover:text-white rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap">
                    {event.type === 'personal' ? 'View' : 'Join'}
                  </button>
                </div>

                {/* Accent line */}
                <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${getEventTypeColor(event.type)} transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-500 origin-left`}></div>
              </div>
            );
          })
        )}
      </div>

      {/* Quick Stats */}
      {upcomingEvents.length > 0 && (
        <div className="mt-6 pt-4 border-t border-[var(--border-color)]/30">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-[var(--accent-color)]">
                {upcomingEvents.length}
              </div>
              <div className="text-xs text-[var(--text-secondary)]">Events</div>
            </div>
            <div>
              <div className="text-lg font-bold text-[var(--accent-color)]">
                {upcomingEvents.reduce((total, event) => {
                  const duration = parseInt(event.duration);
                  return total + (isNaN(duration) ? 0 : duration);
                }, 0)}m
              </div>
              <div className="text-xs text-[var(--text-secondary)]">Total Time</div>
            </div>
            <div>
              <div className="text-lg font-bold text-[var(--accent-color)]">
                {new Set(upcomingEvents.map(event => event.date)).size}
              </div>
              <div className="text-xs text-[var(--text-secondary)]">Days</div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
    </div>
  );
}
