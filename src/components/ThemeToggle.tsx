"use client";
import { useTheme } from "../context/ThemeProvider";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait until mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with the same dimensions to avoid layout shift
    return <div className="theme-toggle" />;
  }

  return (
    <button 
      onClick={toggleTheme} 
      className="theme-toggle group relative overflow-hidden"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Animated background glow that matches theme accent colors */}
      <span className="absolute inset-0 bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] opacity-20 
                      group-hover:opacity-40 transition-opacity duration-300"></span>
      
      {/* Animated border effect */}
      <span className="absolute inset-0 border border-[var(--accent-color)] opacity-50 
                      rounded-full scale-[1.01] group-hover:scale-[1.03] 
                      transition-all duration-300"></span>
      
      {/* Light pulse effect on hover */}
      <span className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-40 
                      transition-opacity duration-300 ${theme === "dark" ? 
                      "bg-[radial-gradient(#7DF9FF_10%,transparent_70%)]" : 
                      "bg-[radial-gradient(#4CAF50_10%,transparent_70%)]"}`}></span>
      
      {theme === "dark" ? (
        // Sun icon for dark mode (switch to light) - Changed to white color
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      ) : (
        // Moon icon for light mode (switch to dark)
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 relative z-10">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      )}
    </button>
  );
}
