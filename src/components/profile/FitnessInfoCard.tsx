"use client";
import { Target, Zap, Trophy } from 'lucide-react';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  bio: string;
  goals: string;
  experience: string;
}

interface FitnessInfoCardProps {
  profileData: ProfileData;
  editData: ProfileData;
  isEditing: boolean;
  onEditDataChange: (data: ProfileData) => void;
}

export default function FitnessInfoCard({ 
  profileData, 
  editData, 
  isEditing, 
  onEditDataChange 
}: FitnessInfoCardProps) {
  const handleInputChange = (field: keyof ProfileData, value: string) => {
    onEditDataChange({ ...editData, [field]: value });
  };

  const getExperienceColor = (experience: string) => {
    if (experience.includes('Beginner')) return 'from-blue-500 to-cyan-500';
    if (experience.includes('Intermediate')) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  return (
    <div className="bg-[var(--bg-secondary)]/90 backdrop-blur-xl border border-[var(--border-color)]/30 rounded-2xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-color)]/3 via-transparent to-[var(--accent-hover)]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {/* Header with enhanced styling */}
      <div className="flex items-center gap-4 mb-8 relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] flex items-center justify-center flex-shrink-0 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] opacity-20 blur-xl scale-150"></div>
          <Target className="w-6 h-6 text-white relative z-10" />
        </div>
        <div>
          <h2 className="text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-primary)] to-[var(--accent-color)] group-hover:from-[var(--accent-color)] group-hover:to-[var(--accent-hover)] transition-all duration-300">
            Fitness Profile
          </h2>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Track your fitness journey</p>
        </div>
      </div>
      
      <div className="space-y-6 relative z-10">
        {/* Experience Level */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)]">
            <Trophy className="w-4 h-4 text-[var(--accent-color)]" />
            Experience Level
          </label>
          {isEditing ? (
            <div className="relative group/select">
              <select
                value={editData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                className="w-full px-4 py-4 bg-[var(--bg-tertiary)]/90 backdrop-blur-sm border-2 border-[var(--border-color)]/50 rounded-xl text-[var(--text-primary)] focus:border-[var(--accent-color)] focus:outline-none focus:ring-4 focus:ring-[var(--accent-color)]/20 transition-all duration-300 cursor-pointer appearance-none"
              >
                <option value="Beginner (0-1 year)">🌱 Beginner (0-1 year)</option>
                <option value="Intermediate (2-3 years)">💪 Intermediate (2-3 years)</option>
                <option value="Advanced (4+ years)">🏆 Advanced (4+ years)</option>
              </select>
              {/* Custom dropdown arrow */}
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--accent-color)]/10 to-[var(--accent-hover)]/10 opacity-0 group-hover/select:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ) : (
            <div className={`px-4 py-4 bg-gradient-to-r ${getExperienceColor(profileData.experience)}/10 backdrop-blur-sm rounded-xl border border-[var(--border-color)]/30 hover:border-[var(--accent-color)]/30 transition-all duration-300`}>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${getExperienceColor(profileData.experience)}`}></div>
                <span className="text-[var(--text-primary)] font-medium">{profileData.experience}</span>
              </div>
            </div>
          )}
        </div>

        {/* Fitness Goals */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)]">
            <Zap className="w-4 h-4 text-[var(--accent-color)]" />
            Fitness Goals
          </label>
          {isEditing ? (
            <div className="relative group/textarea">
              <textarea
                value={editData.goals}
                onChange={(e) => handleInputChange('goals', e.target.value)}
                rows={4}
                placeholder="Describe your fitness goals and what you want to achieve..."
                className="w-full px-4 py-4 bg-[var(--bg-tertiary)]/90 backdrop-blur-sm border-2 border-[var(--border-color)]/50 rounded-xl text-[var(--text-primary)] focus:border-[var(--accent-color)] focus:outline-none focus:ring-4 focus:ring-[var(--accent-color)]/20 resize-none transition-all duration-300 group-hover/textarea:border-[var(--accent-color)]/30"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--accent-color)]/10 to-[var(--accent-hover)]/10 opacity-0 group-hover/textarea:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              {/* Character count */}
              <div className="absolute bottom-2 right-2 text-xs text-[var(--text-secondary)]/60 bg-[var(--bg-secondary)]/80 px-2 py-1 rounded">
                {editData.goals.length}/200
              </div>
            </div>
          ) : (
            <div className="px-4 py-4 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 backdrop-blur-sm rounded-xl text-[var(--text-primary)] border border-[var(--border-color)]/30 hover:border-[var(--accent-color)]/30 transition-all duration-300 min-h-[100px] flex items-center">
              <p className="text-[var(--text-primary)] leading-relaxed">{profileData.goals}</p>
            </div>
          )}
        </div>

        {/* Bio */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)]">
            <Target className="w-4 h-4 text-[var(--accent-color)]" />
            Bio
          </label>
          {isEditing ? (
            <div className="relative group/textarea">
              <textarea
                value={editData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                rows={5}
                placeholder="Tell us about yourself, your fitness journey, and what motivates you..."
                className="w-full px-4 py-4 bg-[var(--bg-tertiary)]/90 backdrop-blur-sm border-2 border-[var(--border-color)]/50 rounded-xl text-[var(--text-primary)] focus:border-[var(--accent-color)] focus:outline-none focus:ring-4 focus:ring-[var(--accent-color)]/20 resize-none transition-all duration-300 group-hover/textarea:border-[var(--accent-color)]/30"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--accent-color)]/10 to-[var(--accent-hover)]/10 opacity-0 group-hover/textarea:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              {/* Character count */}
              <div className="absolute bottom-2 right-2 text-xs text-[var(--text-secondary)]/60 bg-[var(--bg-secondary)]/80 px-2 py-1 rounded">
                {editData.bio.length}/300
              </div>
            </div>
          ) : (
            <div className="px-4 py-4 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 backdrop-blur-sm rounded-xl text-[var(--text-primary)] border border-[var(--border-color)]/30 hover:border-[var(--accent-color)]/30 transition-all duration-300 min-h-[120px] flex items-center">
              <p className="text-[var(--text-primary)] leading-relaxed">{profileData.bio}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
    </div>
  );
}
