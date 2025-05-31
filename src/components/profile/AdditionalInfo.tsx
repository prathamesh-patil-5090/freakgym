"use client";
import { Info, Clock } from 'lucide-react';

export default function AdditionalInfo() {
  const infoItems = [
    { 
      title: "Recent Workout", 
      content: "Completed an intense leg day session with 5 sets of squats, deadlifts, and Bulgarian split squats. New PR on back squats!",
      time: "3 hours ago",
      type: "workout"
    },
    { 
      title: "Achievement Unlocked", 
      content: "🏆 Power Lifter badge earned! Congratulations on reaching new strength milestones in your powerlifting journey.",
      time: "Yesterday",
      type: "achievement"
    },
    { 
      title: "Consistency Streak", 
      content: "🔥 23-day workout streak! Your dedication to fitness is truly inspiring. Keep up the momentum!",
      time: "Today",
      type: "goal"
    },
    { 
      title: "Nutrition Focus", 
      content: "Remember to fuel your workouts with proper nutrition. Aim for 1.6g protein per kg body weight for optimal muscle growth.",
      time: "This morning",
      type: "nutrition"
    },
    { 
      title: "Community Recognition", 
      content: "📈 You've inspired 5 new members this week! Your workout posts and progress updates are motivating others.",
      time: "2 days ago",
      type: "progress"
    },
    { 
      title: "Early Bird Achievement", 
      content: "🌅 Early Bird badge maintained! 15 consecutive morning workouts completed. Great job starting your days strong!",
      time: "This week",
      type: "achievement"
    },
    { 
      title: "Strength Milestone", 
      content: "💪 New personal record: Deadlift 180kg! Your strength training consistency is paying off tremendously.",
      time: "4 days ago",
      type: "workout"
    },
    { 
      title: "Recovery Reminder", 
      content: "😴 Don't forget about recovery! Quality sleep and rest days are crucial for muscle growth and performance.",
      time: "6 hours ago",
      type: "rest"
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'workout': return '💪';
      case 'tip': return '💡';
      case 'goal': return '🎯';
      case 'achievement': return '🏆';
      case 'nutrition': return '🥗';
      case 'rest': return '😴';
      case 'progress': return '📈';
      case 'challenge': return '🔥';
      default: return '📝';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'workout': return 'from-blue-500 to-cyan-500';
      case 'tip': return 'from-yellow-500 to-orange-500';
      case 'goal': return 'from-purple-500 to-pink-500';
      case 'achievement': return 'from-green-500 to-emerald-500';
      case 'nutrition': return 'from-red-500 to-rose-500';
      case 'rest': return 'from-indigo-500 to-blue-500';
      case 'progress': return 'from-teal-500 to-cyan-500';
      case 'challenge': return 'from-orange-500 to-red-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  return (
    <div className="bg-[var(--bg-secondary)]/90 backdrop-blur-xl rounded-2xl p-6 lg:p-8 border border-[var(--border-color)]/30 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-color)]/3 via-transparent to-[var(--accent-hover)]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] flex items-center justify-center flex-shrink-0 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] opacity-20 blur-xl scale-150"></div>
          <Info className="w-6 h-6 text-white relative z-10" />
        </div>
        <div>
          <h3 className="text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-primary)] to-[var(--accent-color)] group-hover:from-[var(--accent-color)] group-hover:to-[var(--accent-hover)] transition-all duration-300">
            Activity Feed
          </h3>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Your latest fitness activities and updates</p>
        </div>
      </div>
      
      {/* Activity Items */}
      <div className="space-y-4 relative z-10">
        {infoItems.map((item, index) => (
          <div 
            key={index} 
            className="group/item p-4 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 backdrop-blur-sm rounded-xl border border-[var(--border-color)]/30 hover:border-[var(--accent-color)]/40 transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] relative overflow-hidden"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            {/* Item background effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${getTypeColor(item.type)}/5 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300 rounded-xl`}></div>
            
            <div className="flex items-start gap-4 relative z-10">
              {/* Icon */}
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${getTypeColor(item.type)} flex items-center justify-center text-white font-bold text-lg shadow-lg flex-shrink-0 transform group-hover/item:scale-110 transition-transform duration-300`}>
                {getTypeIcon(item.type)}
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-[var(--text-primary)] group-hover/item:text-[var(--accent-color)] transition-colors duration-300">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-1 text-xs text-[var(--text-secondary)]/70 bg-[var(--bg-secondary)]/60 px-2 py-1 rounded-lg">
                    <Clock className="w-3 h-3" />
                    {item.time}
                  </div>
                </div>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed group-hover/item:text-[var(--text-primary)] transition-colors duration-300">
                  {item.content}
                </p>
              </div>
            </div>
            
            {/* Accent line */}
            <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${getTypeColor(item.type)} transform scale-x-0 group-hover/item:scale-x-100 transition-transform duration-500 origin-left`}></div>
          </div>
        ))}
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
    </div>
  );
}
