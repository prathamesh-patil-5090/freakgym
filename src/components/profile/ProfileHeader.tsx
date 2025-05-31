"use client";
import { Camera, Mail, MapPin, Calendar, Edit3, Save, X, Sparkles } from 'lucide-react';

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

interface ProfileHeaderProps {
  profileData: ProfileData;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function ProfileHeader({ 
  profileData, 
  isEditing, 
  onEdit, 
  onSave, 
  onCancel 
}: ProfileHeaderProps) {
  return (
    <div className="bg-[var(--bg-secondary)]/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-[var(--border-color)]/30 overflow-hidden relative group">
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-color)]/5 via-transparent to-[var(--accent-hover)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {/* Enhanced cover gradient */}
      <div className="relative h-56 bg-gradient-to-br from-[var(--accent-color)]/95 via-[var(--accent-hover)]/90 to-purple-600/85 overflow-hidden">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        
        {/* Floating decorative elements */}
        <div className="absolute top-8 right-8 w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm animate-float"></div>
        <div className="absolute top-16 left-1/4 w-8 h-8 bg-white/15 rounded-full backdrop-blur-sm animate-pulse"></div>
        <div className="absolute bottom-12 right-1/3 w-12 h-12 bg-white/8 rounded-full backdrop-blur-sm animate-bounce"></div>
      </div>
      
      <div className="relative px-8 pb-8">
        {/* Enhanced Profile Picture */}
        <div className="absolute -top-20 left-8 z-20 group/avatar">
          <div className="relative">
            {/* Animated ring */}
            <div className="absolute -inset-2 bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] rounded-full animate-spin-slow opacity-75"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent-hover)] to-[var(--accent-color)] rounded-full animate-pulse"></div>
            
            {/* Profile picture container */}
            <div className="relative w-36 h-36 rounded-full border-4 border-white/90 dark:border-gray-900/90 overflow-hidden bg-gradient-to-br from-[var(--accent-color)] to-[var(--accent-hover)] shadow-2xl backdrop-blur-sm transform group-hover/avatar:scale-105 transition-transform duration-300">
              <div className="w-full h-full flex items-center justify-center text-5xl font-bold text-white bg-gradient-to-br from-black/20 to-transparent relative">
                {profileData.name.split(' ').map(n => n[0]).join('')}
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover/avatar:-translate-x-full transition-transform duration-1000"></div>
              </div>
              
              {/* Enhanced camera button */}
              <button className="absolute bottom-3 right-3 w-10 h-10 bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] rounded-full flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg group/camera">
                <Camera className="w-5 h-5 text-white group-hover/camera:animate-pulse" />
                <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover/camera:scale-100 transition-transform duration-300"></div>
              </button>
            </div>
            
            {/* Status indicator */}
            <div className="absolute top-2 right-2 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-lg animate-pulse"></div>
          </div>
        </div>

        {/* Enhanced Profile Info */}
        <div className="pt-24 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1 min-w-0 space-y-4">
            {/* Name with sparkle effect */}
            <div className="flex items-center gap-2">
              <h1 className="text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-color)] via-[var(--accent-hover)] to-purple-600">
                {profileData.name}
              </h1>
              <Sparkles className="w-6 h-6 text-[var(--accent-color)] animate-twinkle" />
            </div>
            
            {/* Enhanced bio */}
            <p className="text-[var(--text-secondary)] text-lg leading-relaxed max-w-2xl">
              {profileData.bio}
            </p>
            
            {/* Enhanced info badges */}
            <div className="flex flex-wrap gap-3 text-sm">
              <div className="flex items-center gap-2 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 backdrop-blur-sm px-4 py-2 rounded-full border border-[var(--border-color)]/40 hover:border-[var(--accent-color)]/50 transition-all duration-300 group/badge">
                <Mail className="w-4 h-4 text-[var(--accent-color)] group-hover/badge:animate-pulse" />
                <span className="truncate max-w-[200px] text-[var(--text-secondary)] group-hover/badge:text-[var(--text-primary)] transition-colors">
                  {profileData.email}
                </span>
              </div>
              
              <div className="flex items-center gap-2 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 backdrop-blur-sm px-4 py-2 rounded-full border border-[var(--border-color)]/40 hover:border-[var(--accent-color)]/50 transition-all duration-300 group/badge">
                <MapPin className="w-4 h-4 text-[var(--accent-color)] group-hover/badge:animate-pulse" />
                <span className="text-[var(--text-secondary)] group-hover/badge:text-[var(--text-primary)] transition-colors">
                  {profileData.location}
                </span>
              </div>
              
              <div className="flex items-center gap-2 bg-gradient-to-r from-[var(--bg-tertiary)]/80 to-[var(--bg-tertiary)]/60 backdrop-blur-sm px-4 py-2 rounded-full border border-[var(--border-color)]/40 hover:border-[var(--accent-color)]/50 transition-all duration-300 group/badge">
                <Calendar className="w-4 h-4 text-[var(--accent-color)] group-hover/badge:animate-pulse" />
                <span className="text-[var(--text-secondary)] group-hover/badge:text-[var(--text-primary)] transition-colors">
                  Joined {profileData.joinDate}
                </span>
              </div>
            </div>
          </div>
          
          {/* Enhanced action buttons */}
          <div className="flex-shrink-0">
            {!isEditing ? (
              <button
                onClick={onEdit}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-2xl active:scale-95 whitespace-nowrap relative overflow-hidden group/edit"
              >
                {/* Button shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover/edit:-translate-x-full transition-transform duration-700"></div>
                
                <Edit3 className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Edit Profile</span>
              </button>
            ) : (
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={onSave}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl active:scale-95 whitespace-nowrap relative overflow-hidden group/save"
                >
                  <div className="absolute inset-0 bg-white/20 scale-0 group-hover/save:scale-100 transition-transform duration-300 rounded-xl"></div>
                  <Save className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Save</span>
                </button>
                
                <button
                  onClick={onCancel}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl active:scale-95 whitespace-nowrap relative overflow-hidden group/cancel"
                >
                  <div className="absolute inset-0 bg-white/20 scale-0 group-hover/cancel:scale-100 transition-transform duration-300 rounded-xl"></div>
                  <X className="w-4 h-4 relative z-10" />
                  <span className="relative z-10">Cancel</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
