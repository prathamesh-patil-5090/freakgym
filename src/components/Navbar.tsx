"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-sm z-50 transition-colors duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent 
                                     bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] 
                                     dark:from-[#7DF9FF] dark:to-[#BF00FF] 
                                     transition-all duration-300 ease-in-out">
              FreakGym
            </Link>
          </div>

          {/* Navigation Links (Desktop) & Right Side Items */}
          <div className="hidden md:flex md:items-center md:ml-6">
             <div className="flex items-baseline space-x-4">
               <Link href="/dashboard" className="text-[var(--text-secondary)] hover:text-[var(--accent-color)] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ease-in-out">
                 Dashboard
               </Link>
               <Link href="/grind" className="text-[var(--text-secondary)] hover:text-[var(--accent-color)] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ease-in-out">
                 Grind
               </Link>
               <Link href="/hustle" className="text-[var(--text-secondary)] hover:text-[var(--accent-color)] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ease-in-out">
                 Hustle
               </Link>
               <Link href="/profile" className="text-[var(--text-secondary)] hover:text-[var(--accent-color)] px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ease-in-out">
                 Profile
               </Link>
             </div>
             {/* Theme Toggle Button */}
             <div className="ml-4 flex items-center md:ml-6">
                <ThemeToggle />
             </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button 
              onClick={toggleMobileMenu}
              type="button" 
              className="inline-flex items-center justify-center p-2 rounded-md text-[var(--text-secondary)] hover:text-[var(--accent-color)] focus:outline-none transition-all duration-300 ease-in-out"
              aria-controls="mobile-menu" 
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-64 opacity-100 border-t border-[var(--border-color)]' 
            : 'max-h-0 opacity-0'
        }`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-transparent backdrop-blur-sm">
          <Link 
            href="/dashboard" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[var(--text-secondary)] hover:text-[var(--accent-color)] block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ease-in-out"
          >
            Dashboard
          </Link>
          <Link 
            href="/grind"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[var(--text-secondary)] hover:text-[var(--accent-color)] block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ease-in-out"
          >
            Grind
          </Link>
          <Link 
            href="/hustle"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[var(--text-secondary)] hover:text-[var(--accent-color)] block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ease-in-out"
          >
            Hustle
          </Link>
          <Link 
            href="/profile"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-[var(--text-secondary)] hover:text-[var(--accent-color)] block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ease-in-out"
          >
            Profile
          </Link>
          <div className="pt-2 flex justify-end">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
