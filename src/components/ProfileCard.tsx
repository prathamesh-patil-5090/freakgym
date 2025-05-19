"use client";
import React from "react";
import Image from "next/image";
import { useTheme } from "../context/ThemeProvider";
import userImage from "@/assets/prathamesh.jpeg";

interface ProfileCardProps {
  user?: {
    name: string;
    image?: string;
    role: string;
    bio: string;
    joinDate: string;
    stats: {
      workouts: number;
      following: number;
      followers: number;
    };
    badges: string[];
    socialLinks?: {
      type: string;
      url: string;
    }[];
  };
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  user = {
    name: "Prathamesh Patil",
    role: "Premium Member",
    bio: "Fitness enthusiast passionate about strength training and nutrition. On a journey to become the best version of myself.",
    joinDate: "Member since Apr 2023",
    stats: {
      workouts: 142,
      following: 56,
      followers: 89,
    },
    badges: ["Consistent", "Power Lifter", "Early Bird"],
    socialLinks: [
      { type: "instagram", url: "#" },
      { type: "twitter", url: "#" },
      { type: "facebook", url: "#" },
    ],
    image: "", // Add the image path here
  },
}) => {
  const { theme } = useTheme();

  return (
    <div className="rounded-xl overflow-hidden card-background shadow-lg hover:shadow-xl transition-all duration-500">
      {/* Gradient Header with Floating Elements */}
      <div className="relative h-32 overflow-hidden">
        {/* Dynamic gradient background - Updated for electric blue in dark mode */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background:
              theme === "dark"
                ? "linear-gradient(135deg, rgba(0, 255, 255, 0.3) 0%, rgba(125, 249, 255, 0.2) 100%)"
                : "linear-gradient(135deg, rgba(76, 175, 80, 0.2) 0%, rgba(46, 125, 50, 0.2) 100%)",
          }}
        />
      </div>

      {/* Profile Image */}
      <div className="relative -mt-16 flex justify-center">
        <div className="relative group">
          {/* Glowing ring animation - Modified for electric blue in dark mode */}
          <div
            className="absolute -inset-0.5 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-500"
            style={{
              background:
                theme === "dark"
                  ? "linear-gradient(135deg, #00FFFF 0%, #7DF9FF 100%)"
                  : "linear-gradient(135deg, var(--accent-color) 0%, var(--accent-hover) 100%)",
            }}
          />
          {/* Profile image container */}
          <div className="relative h-32 w-32 rounded-full overflow-hidden border-4 border-[var(--bg-primary)] bg-[var(--bg-secondary)]">
            <Image
              src={userImage}
              alt={user.name}
              width={128}
              height={128}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
              priority
              quality={100}
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-6 py-4">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)]">
            {user.name}
          </h2>
          <div className="flex items-center justify-center gap-2 mt-1">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-[color-mix(in_srgb,_var(--accent-color)_15%,_transparent)] text-[var(--accent-color)] border border-[var(--accent-color)] border-opacity-20">
              {user.role}
            </span>
            <span className="text-xs theme-text-secondary">
              {user.joinDate}
            </span>
          </div>
        </div>
        {/* User info */}
        <div className="mb-6 text-center">
          <p className="mt-3 text-sm theme-text-secondary leading-relaxed max-w-sm mx-auto">
            {user.bio}
          </p>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-6">
          <div className="flex flex-col items-center p-3 rounded-lg bg-[color-mix(in_srgb,_var(--accent-color)_10%,_transparent)] border border-[var(--border-color)] transition-transform hover:scale-105">
            <span className="text-lg font-bold theme-text-primary">
              {user.stats.workouts}
            </span>
            <span className="text-xs theme-text-secondary">Workouts</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg bg-[color-mix(in_srgb,_var(--accent-color)_10%,_transparent)] border border-[var(--border-color)] transition-transform hover:scale-105">
            <span className="text-lg font-bold theme-text-primary">
              {user.stats.following}
            </span>
            <span className="text-xs theme-text-secondary">Following</span>
          </div>
          <div className="flex flex-col items-center p-3 rounded-lg bg-[color-mix(in_srgb,_var(--accent-color)_10%,_transparent)] border border-[var(--border-color)] transition-transform hover:scale-105">
            <span className="text-lg font-bold theme-text-primary">
              {user.stats.followers}
            </span>
            <span className="text-xs theme-text-secondary">Followers</span>
          </div>
        </div>
        {/* Badges */}
        <div className="mb-6">
          <h3 className="text-sm font-medium theme-text-secondary mb-3 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1 text-[var(--accent-color)]"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            Achievements
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {user.badges.map((badge, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 rounded-full bg-[color-mix(in_srgb,_var(--accent-color)_15%,_transparent)] border border-[var(--border-color)] theme-text-primary hover:bg-[color-mix(in_srgb,_var(--accent-color)_25%,_transparent)] hover:border-[var(--accent-color)] transition-colors duration-300 cursor-default"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
        {/* Social Links */}
        {user.socialLinks && (
          <div className="flex justify-center space-x-6 pt-2">
            {user.socialLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                className="text-[var(--text-secondary)] hover:text-[var(--accent-color)] transition-all duration-300 hover:scale-125"
              >
                {link.type === "instagram" && (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                )}
                {link.type === "twitter" && (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.087 10.087 0 01-3.127 1.195 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                )}
                {link.type === "facebook" && (
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                )}
              </a>
            ))}
          </div>
        )}
      </div>
      {/* Card footer */}
      <div className="px-6 py-4 border-t border-[var(--border-color)]">
        <button className="relative w-full py-2.5 rounded-md overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] transition-transform duration-500 group-hover:scale-105"></div>
          <span className="relative text-white font-medium">Edit Profile</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
