import { Activity, Clock, Target, Award, LucideIcon, TrendingUp, Users, UserPlus } from 'lucide-react';

interface Stat {
  label: string;
  value: string;
  icon: LucideIcon;
  gradient: string;
  trend: string;
  description: string;
}

const stats: Stat[] = [
  { 
    label: 'Workouts Completed', 
    value: '142', 
    icon: Activity,
    gradient: 'from-[var(--accent-color)] to-[var(--accent-hover)]',
    trend: '+12%',
    description: 'This month'
  },
  { 
    label: 'Following', 
    value: '56', 
    icon: UserPlus,
    gradient: 'from-purple-500 to-pink-500',
    trend: '+8',
    description: 'This week'
  },
  { 
    label: 'Followers', 
    value: '89', 
    icon: Users,
    gradient: 'from-green-500 to-emerald-500',
    trend: '+15',
    description: 'This month'
  },
  { 
    label: 'Achievements', 
    value: '23', 
    icon: Award,
    gradient: 'from-orange-500 to-red-500',
    trend: '+3',
    description: 'Total badges'
  }
];

export default function ProfileStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div 
            key={index} 
            className="bg-[var(--bg-secondary)]/90 backdrop-blur-xl border border-[var(--border-color)]/30 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 group relative overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Animated background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-color)]/5 via-transparent to-[var(--accent-hover)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Floating particles effect */}
            <div className="absolute top-2 right-2 w-2 h-2 bg-[var(--accent-color)]/30 rounded-full animate-ping"></div>
            <div className="absolute bottom-4 left-4 w-1 h-1 bg-[var(--accent-color)]/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            {/* Icon container with enhanced effects */}
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${stat.gradient} flex items-center justify-center mb-4 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative`}>
              {/* Icon glow effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.gradient} opacity-20 blur-xl scale-150`}></div>
              <IconComponent className="w-7 h-7 text-white relative z-10 group-hover:animate-pulse" />
            </div>

            {/* Enhanced value display */}
            <div className="space-y-2 relative z-10">
              <div className="flex items-baseline justify-between">
                <div className="text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-primary)] to-[var(--accent-color)] group-hover:from-[var(--accent-color)] group-hover:to-[var(--accent-hover)] transition-all duration-300">
                  {stat.value}
                </div>
                
                {/* Trend indicator */}
                <div className="flex items-center gap-1 px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded-lg text-xs font-medium">
                  <TrendingUp className="w-3 h-3" />
                  {stat.trend}
                </div>
              </div>
              
              {/* Label and description */}
              <div>
                <div className="text-[var(--text-secondary)] text-sm lg:text-base font-medium mb-1 group-hover:text-[var(--text-primary)] transition-colors duration-300">
                  {stat.label}
                </div>
                <div className="text-[var(--text-secondary)]/70 text-xs">
                  {stat.description}
                </div>
              </div>
            </div>
            
            {/* Bottom accent line */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
          </div>
        );
      })}
    </div>
  );
}
