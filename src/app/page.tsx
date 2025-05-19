import React from 'react';
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden">
      <div className="text-center z-10 p-12 rounded-xl max-w-2xl card-background">
        {/* Use themed gradient for heading */}
        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] transition-all duration-300 ease-in-out">
          FreakGym
        </h1>
        {/* Use themed text color for paragraph */}
        <p className="text-xl theme-text-secondary mb-10 max-w-md mx-auto">
          Unleash your inner freak. Transform your body. Elevate your fitness journey.
        </p>
        <div className="flex justify-center gap-6 mt-8">
          {/* Buttons already handle light/dark contrast */}
          <Link href="/login" className="py-3 px-8 bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white font-bold rounded-md transition-all duration-300 transform hover:scale-105">
            Login
          </Link>
          <Link href="/register" className="py-3 px-8 bg-transparent border-2 border-[var(--accent-color)] text-[var(--accent-color)] font-bold rounded-md hover:bg-[color-mix(in_srgb,_var(--accent-color)_10%,_transparent)] transition-all duration-300 transform hover:scale-105">
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}