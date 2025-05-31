"use client";
import { User, CheckCircle, AlertCircle } from 'lucide-react';

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

interface PersonalInfoCardProps {
  profileData: ProfileData;
  editData: ProfileData;
  isEditing: boolean;
  onEditDataChange: (data: ProfileData) => void;
}

export default function PersonalInfoCard({ 
  profileData, 
  editData, 
  isEditing, 
  onEditDataChange 
}: PersonalInfoCardProps) {
  const handleInputChange = (field: keyof ProfileData, value: string) => {
    onEditDataChange({ ...editData, [field]: value });
  };

  return (
    <div className="bg-[var(--bg-secondary)]/90 backdrop-blur-xl border border-[var(--border-color)]/30 rounded-2xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-color)]/3 via-transparent to-[var(--accent-hover)]/3 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {/* Header with enhanced styling */}
      <div className="flex items-center gap-4 mb-8 relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] flex items-center justify-center flex-shrink-0 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] opacity-20 blur-xl scale-150"></div>
          <User className="w-6 h-6 text-white relative z-10" />
        </div>
        <div>
          <h2 className="text-xl lg:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-primary)] to-[var(--accent-color)] group-hover:from-[var(--accent-color)] group-hover:to-[var(--accent-hover)] transition-all duration-300">
            Personal Information
          </h2>
          <p className="text-[var(--text-secondary)] text-sm mt-1">Manage your personal details</p>
        </div>
      </div>
      
      <div className="space-y-6 relative z-10">
        {/* Full Name Field */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] mb-3">
            Full Name
            {editData.name && <CheckCircle className="w-4 h-4 text-green-500" />}
          </label>
          {isEditing ? (
            <div className="relative group/input">
              <input
                type="text"
                value={editData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-4 bg-[var(--bg-tertiary)]/90 backdrop-blur-sm border-2 border-[var(--border-color)]/50 rounded-xl text-[var(--text-primary)] focus:border-[var(--accent-color)] focus:outline-none focus:ring-4 focus:ring-[var(--accent-color)]/20 transition-all duration-300 group-hover/input:border-[var(--accent-color)]/30"
                placeholder="Enter your full name"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--accent-color)]/10 to-[var(--accent-hover)]/10 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ) : (
            <div className="px-4 py-4 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 backdrop-blur-sm rounded-xl text-[var(--text-primary)] border border-[var(--border-color)]/30 hover:border-[var(--accent-color)]/30 transition-all duration-300 break-words">
              {profileData.name}
            </div>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] mb-3">
            Email Address
            {editData.email && <CheckCircle className="w-4 h-4 text-green-500" />}
          </label>
          {isEditing ? (
            <div className="relative group/input">
              <input
                type="email"
                value={editData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-4 bg-[var(--bg-tertiary)]/90 backdrop-blur-sm border-2 border-[var(--border-color)]/50 rounded-xl text-[var(--text-primary)] focus:border-[var(--accent-color)] focus:outline-none focus:ring-4 focus:ring-[var(--accent-color)]/20 transition-all duration-300 group-hover/input:border-[var(--accent-color)]/30"
                placeholder="your.email@example.com"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--accent-color)]/10 to-[var(--accent-hover)]/10 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ) : (
            <div className="px-4 py-4 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 backdrop-blur-sm rounded-xl text-[var(--text-primary)] border border-[var(--border-color)]/30 hover:border-[var(--accent-color)]/30 transition-all duration-300 break-all">
              {profileData.email}
            </div>
          )}
        </div>

        {/* Phone Field */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] mb-3">
            Phone Number
            {editData.phone && <CheckCircle className="w-4 h-4 text-green-500" />}
          </label>
          {isEditing ? (
            <div className="relative group/input">
              <input
                type="tel"
                value={editData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-4 bg-[var(--bg-tertiary)]/90 backdrop-blur-sm border-2 border-[var(--border-color)]/50 rounded-xl text-[var(--text-primary)] focus:border-[var(--accent-color)] focus:outline-none focus:ring-4 focus:ring-[var(--accent-color)]/20 transition-all duration-300 group-hover/input:border-[var(--accent-color)]/30"
                placeholder="+1 (555) 123-4567"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--accent-color)]/10 to-[var(--accent-hover)]/10 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ) : (
            <div className="px-4 py-4 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 backdrop-blur-sm rounded-xl text-[var(--text-primary)] border border-[var(--border-color)]/30 hover:border-[var(--accent-color)]/30 transition-all duration-300 break-words">
              {profileData.phone}
            </div>
          )}
        </div>

        {/* Location Field */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-semibold text-[var(--text-secondary)] mb-3">
            Location
            {editData.location && <CheckCircle className="w-4 h-4 text-green-500" />}
          </label>
          {isEditing ? (
            <div className="relative group/input">
              <input
                type="text"
                value={editData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full px-4 py-4 bg-[var(--bg-tertiary)]/90 backdrop-blur-sm border-2 border-[var(--border-color)]/50 rounded-xl text-[var(--text-primary)] focus:border-[var(--accent-color)] focus:outline-none focus:ring-4 focus:ring-[var(--accent-color)]/20 transition-all duration-300 group-hover/input:border-[var(--accent-color)]/30"
                placeholder="New York, NY"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[var(--accent-color)]/10 to-[var(--accent-hover)]/10 opacity-0 group-hover/input:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
          ) : (
            <div className="px-4 py-4 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 backdrop-blur-sm rounded-xl text-[var(--text-primary)] border border-[var(--border-color)]/30 hover:border-[var(--accent-color)]/30 transition-all duration-300 break-words">
              {profileData.location}
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
    </div>
  );
}
