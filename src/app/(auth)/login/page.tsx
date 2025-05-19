"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Left side image component
function LoginImage() {
  return (
    // Keep w-1/2, remove h-screen, keep flex structure for bottom alignment
    <div className="hidden md:flex w-1/2 bg-transparent relative flex-col justify-end h-full mt-17">
      <div className="flex-grow"></div>
      <div className="relative w-full h-[700px]"> {/* Keep fixed height for image area */}
        <Image
          src="/images/fitness-couple.png"
          alt="Fitness couple"
          className="object-contain object-left scale-140"
          style={{ objectPosition: "0% 100%" }}
          fill
          priority
        />
      </div>
    </div>
  );
}

// Right side login form component
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
  };

  return (
    <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4 md:p-8 bg-transparent h-full">
      {/* Add transition classes */}
      <div className="w-full max-w-xl bg-transparent p-8 rounded-xl transition-colors duration-300 ease-in-out">
        {/* Use CSS variable for text gradient - transitions handled by browser */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[var(--accent-color)] to-[var(--accent-hover)] transition-all duration-300 ease-in-out">Login</h1>
        
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              // Border is now handled globally by input selector in globals.css
              className="w-full bg-[var(--bg-secondary)] rounded-md px-8 py-4 text-[var(--text-primary)] focus:border-[var(--accent-color)] focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              // Border is now handled globally by input selector in globals.css
              className="w-full bg-[var(--bg-secondary)] rounded-md px-8 py-4 text-[var(--text-primary)] focus:border-[var(--accent-color)] focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button
            type="submit"
            // Transitions are already applied
            className="w-full bg-[var(--accent-color)] hover:bg-[var(--accent-hover)] text-white font-bold py-4 rounded-md transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
          >
            Login
          </button>
          {/* Google button transitions */}
          <button
            type="button"
            className="w-full flex items-center justify-center bg-white hover:bg-gray-100 text-black font-bold py-4 rounded-md border border-gray-300 transition-all duration-300 mt-4 shadow-md"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Login with Google
          </button>
        </form>
        
        <div className="mt-8 text-center">
          {/* Add transition to text and link colors */}
          <p className="text-[var(--text-secondary)] text-sm md:text-base transition-colors duration-300 ease-in-out">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-[var(--accent-color)] hover:text-[var(--accent-hover)] font-medium hover:underline transition-all duration-300 ease-in-out">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

// Main login page
export default function LoginPage() {
  return (
    <main className="w-full min-h-screen flex items-center justify-center bg-transparent !bg-transparent !backdrop-blur-none overflow-hidden py-4 px-2 md:p-4">
      {/* Removed shadow-2xl class that was creating the border */}
      <div className="flex flex-col md:flex-row w-full gap-4 md:gap-0 max-w-xl md:max-w-4xl bg-transparent items-center md:h-[500px] z-10">
        <LoginImage />
        <LoginForm />
      </div>
    </main>
  );
}