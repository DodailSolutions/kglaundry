'use client';

import React from 'react';

interface LogoProps {
  variant?: 'dark' | 'light' | 'mono';
  className?: string;
  showTagline?: boolean;
}

export default function Logo({
  variant = 'dark',
  className = 'h-10 w-auto',
  showTagline = false,
}: LogoProps) {
  // Brand colors: Cyan #6EC5B8, Dark Slate #2C3032
  const textColor = variant === 'light' ? '#FFFFFF' : '#2C3032';
  const taglineColor = variant === 'light' ? '#E2E8F0' : '#64748B';

  return (
    <div className="flex items-center gap-2.5">
      <svg
        className={className}
        viewBox="0 0 160 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Hanger + Droplet Monogram Emblem */}
        <g>
          {/* Cyan Droplet Body */}
          <path
            d="M24 5C24 5 10 19 10 28.5C10 36.5 16.3 43 24 43C31.7 43 38 36.5 38 28.5C38 19 24 5 24 5Z"
            fill="#6EC5B8"
          />
          {/* Dark Hanger Top Hook */}
          <path
            d="M24 12C22.3 12 21 13.3 21 15C21 16.7 22.3 17.5 24 18.5C25.5 19.5 26.5 20.7 26.5 22.5"
            stroke="#2C3032"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          {/* Hanger Triangle Base Bar */}
          <path
            d="M16 26.5L24 21.5L32 26.5H16Z"
            fill="#FFFFFF"
            stroke="#2C3032"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Washing Sparkle Accent */}
          <path
            d="M32 9L33.2 11.5L36 12.5L33.2 13.5L32 16L30.8 13.5L28 12.5L30.8 11.5L32 9Z"
            fill="#FFFFFF"
          />
        </g>

        {/* Brand Name Typography */}
        <text
          x="48"
          y="28"
          fill={textColor}
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="22"
          letterSpacing="-0.5"
        >
          KG
        </text>
        <text
          x="82"
          y="28"
          fill="#6EC5B8"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="22"
          letterSpacing="-0.5"
        >
          LAUNDRY
        </text>

        {/* Subtitle / Location */}
        {showTagline && (
          <text
            x="49"
            y="40"
            fill={taglineColor}
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="700"
            fontSize="8.5"
            letterSpacing="1.2"
          >
            HYDERABAD DOORSTEP CARE
          </text>
        )}
      </svg>
    </div>
  );
}
