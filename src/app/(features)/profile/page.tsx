"use client";
import { useState } from 'react';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileStats from '@/components/profile/ProfileStats';
import PersonalInfoCard from '@/components/profile/PersonalInfoCard';
import FitnessInfoCard from '@/components/profile/FitnessInfoCard';
import AdditionalInfo from '@/components/profile/AdditionalInfo';

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

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    name: 'Prathamesh Patil',
    email: 'prathamesh.patil@example.com',
    phone: '+91 98765 43210',
    location: 'Mumbai, India',
    joinDate: 'April 2023',
    bio: 'Fitness enthusiast passionate about strength training and nutrition. On a journey to become the best version of myself.',
    goals: 'Build lean muscle mass, improve overall strength, and maintain a healthy lifestyle. Currently focusing on powerlifting and functional fitness training.',
    experience: 'Intermediate (2-3 years)'
  });

  const [editData, setEditData] = useState<ProfileData>(profileData);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData(profileData);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  return (
    <div className="h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[var(--accent-color)] scrollbar-thumb-rounded-full">
      <div className="w-full bg-transparent">
        <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Profile Header */}
            <ProfileHeader 
              profileData={profileData}
              isEditing={isEditing}
              onEdit={handleEdit}
              onSave={handleSave}
              onCancel={handleCancel}
            />

            {/* Stats Grid */}
            <ProfileStats />

            {/* Profile Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              <PersonalInfoCard 
                profileData={profileData}
                editData={editData}
                isEditing={isEditing}
                onEditDataChange={setEditData}
              />
              
              <FitnessInfoCard 
                profileData={profileData}
                editData={editData}
                isEditing={isEditing}
                onEditDataChange={setEditData}
              />
            </div>

            {/* Additional Information */}
            <AdditionalInfo />
          </div>
        </div>
      </div>
    </div>
  );
}
