"use client";
import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeProvider';

// Helper function to generate deterministic "random" values using a seed
const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export default function BackgroundEffects() {
  const { theme } = useTheme();
  const isLightMode = theme === 'light';
  
  // Use state to ensure we only render the bubbles client-side
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Generate bubble props deterministically to avoid hydration errors
  const generateBubbles = (count: number, type: string) => {
    const bubbles = [];
    for (let i = 0; i < count; i++) {
      // Use index as seed for deterministic generation
      const seed = i * 1000;
      
      // Generate consistent values for each bubble
      const size = type === 'small' 
        ? 20 + seededRandom(seed) * 60 
        : type === 'medium' 
          ? 40 + seededRandom(seed + 1) * 30 
          : 80 + seededRandom(seed + 2) * 40;
      
      const left = 5 + seededRandom(seed + 3) * 90;
      const delay = seededRandom(seed + 4) * 10;
      const duration = type === 'small' 
        ? 15 + seededRandom(seed + 5) * 20 
        : type === 'medium' 
          ? 25 + seededRandom(seed + 6) * 15 
          : 35 + seededRandom(seed + 7) * 10;
      
      const opacity = 0.1 + seededRandom(seed + 8) * (type === 'small' ? 0.3 : type === 'medium' ? 0.2 : 0.15);
      
      const color = isLightMode ? '76, 175, 80' : '0, 255, 255'; // Green or Electric Blue

      bubbles.push({
        key: `${type}-bubble-${i}`,
        style: {
          position: "absolute",
          left: `${left}%`,
          bottom: `-${size}px`,
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: "transparent",
          borderRadius: "50%",
          background: `radial-gradient(circle at ${30 + seededRandom(seed + 9) * 5}% ${30 + seededRandom(seed + 10) * 5}%, rgba(${color}, ${opacity + (type === 'small' ? 0.1 : 0.05)}), rgba(${color}, ${opacity / (type === 'small' ? 4 : 5)}))`,
          boxShadow: `inset ${type === 'large' ? 3 : 1}px ${type === 'large' ? 3 : 1}px ${size / (type === 'small' ? 10 : type === 'medium' ? 8 : 6)}px rgba(255, 255, 255, ${type === 'large' ? 0.4 : 0.5})`,
          animation: `${type === 'small' ? 'risingBubble' : type === 'medium' ? 'risingBubbleWiggle' : 'risingBubbleSlow'} ${duration}s ease-in-out infinite ${delay}s`,
          zIndex: type === 'small' ? 3 : type === 'medium' ? 2 : 1
        }
      });
    }
    return bubbles;
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      {/* Background elements */}
      <div className="bg-grid"></div>
      <div className="circuit-overlay"></div>
      <div className="radial-gradient"></div>
      
      {/* Improved glowing elements - boxShadow is now handled by CSS */}
      <ul className="glow-elements">
        <li className="opacity-[0.6] dark:opacity-[0.8]"></li>
        <li className="opacity-[0.5] dark:opacity-[0.7]"></li>
        <li className="opacity-[0.4] dark:opacity-[0.6]"></li>
        <li className="opacity-[0.7] dark:opacity-[0.9]"></li>
        <li className="opacity-[0.5] dark:opacity-[0.7]"></li>
      </ul>
      
      {/* Enhanced particle system with big circles */}
      <div className="particles">
        {[...Array(24)].map((_, i) => {
          let cls = "";
          if (i % 5 === 0) cls = "particle-large";
          else if (i % 3 === 0) cls = "particle-medium";
          return <span key={i} className={cls}></span>;
        })}
        
        {/* Big circle particles - Use CSS variable for background */}
        <span className="particle-big" style={{
          left: "15%",
          top: "60%",
          width: "120px",
          height: "120px",
          background: "color-mix(in srgb, var(--accent-color) 8%, transparent)",
          borderRadius: "50%",
          position: "absolute",
          filter: "blur(20px)"
        }}></span>
        <span className="particle-big" style={{
          left: "75%",
          top: "30%",
          width: "180px",
          height: "180px",
          background: "color-mix(in srgb, var(--accent-color) 10%, transparent)",
          borderRadius: "50%",
          position: "absolute",
          filter: "blur(25px)"
        }}></span>
        <span className="particle-big" style={{
          left: "40%",
          top: "80%",
          width: "150px",
          height: "150px",
          background: "color-mix(in srgb, var(--accent-color) 7%, transparent)",
          borderRadius: "50%",
          position: "absolute",
          filter: "blur(30px)"
        }}></span>
        <span className="particle-big" style={{
          left: "85%",
          top: "75%",
          width: "100px",
          height: "100px",
          background: "color-mix(in srgb, var(--accent-color) 9%, transparent)",
          borderRadius: "50%",
          position: "absolute",
          filter: "blur(15px)"
        }}></span>
        <span className="particle-big" style={{
          left: "25%",
          top: "20%",
          width: "200px",
          height: "200px",
          background: "color-mix(in srgb, var(--accent-color) 6%, transparent)",
          borderRadius: "50%",
          position: "absolute",
          filter: "blur(40px)"
        }}></span>
        
        {/* Bubble particles for both light and dark mode */}
        {isMounted && (
          <>
            {/* Small bubbles - further decreased count */}
            {generateBubbles(isLightMode ? 8 : 12, 'small').map(bubble => (
              <span 
                key={bubble.key}
                className="rising-bubble"
                style={bubble.style as React.CSSProperties}
              />
            ))}
            
            {/* Medium bubbles - further decreased count */}
            {generateBubbles(isLightMode ? 6 : 8, 'medium').map(bubble => (
              <span 
                key={bubble.key}
                className="rising-bubble"
                style={bubble.style as React.CSSProperties}
              />
            ))}
            
            {/* Large bubbles - further decreased count */}
            {generateBubbles(isLightMode ? 3 : 4, 'large').map(bubble => (
              <span 
                key={bubble.key}
                className="rising-bubble"
                style={bubble.style as React.CSSProperties}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
