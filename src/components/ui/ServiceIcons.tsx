'use client';

import React from 'react';

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function ServiceIcon({ name, className = 'h-8 w-8' }: IconProps) {
  switch (name) {
    case 'dryclean': // Suits / Blazer / Formal Dry Cleaning
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Hanger */}
          <path d="M24 6c-2 0-3.5 1.5-3.5 3s1.5 2.5 3.5 2.5 3.5-1 3.5-2.5c0-.6-.2-1.2-.6-1.6" stroke="#6EC5B8" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M24 11.5L9 18.5c-1 .5-1.5 1.5-1.3 2.6l3 19c.2 1.1 1.1 1.9 2.3 1.9h22c1.2 0 2.1-.8 2.3-1.9l3-19c.2-1.1-.3-2.1-1.3-2.6L24 11.5z" fill="#6EC5B8" fillOpacity="0.12" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
          {/* Lapels */}
          <path d="M17 15l7 11 7-11" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M24 26v16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          {/* Tie & Pocket Square */}
          <path d="M22 17.5l2 3 2-3-2-2.5-2 2.5z" fill="#6EC5B8"/>
          <rect x="29" y="27" width="5" height="1.8" rx="0.9" fill="#6EC5B8"/>
          {/* Sparkle */}
          <path d="M37 10l1.2 2.5L41 14l-2.8 1.5L37 18l-1.2-2.5L33 14l2.8-1.5L37 10z" fill="#6EC5B8"/>
        </svg>
      );

    case 'iron': // High-Pressure Steam Iron
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Handle */}
          <path d="M12 18V13a3 3 0 013-3h18a3 3 0 013 3v5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          {/* Iron Body */}
          <path d="M6 32h33c2.8 0 5.2-2 5.8-4.7L46 22H14L6 32z" fill="#6EC5B8" fillOpacity="0.15" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
          {/* Sole Plate */}
          <path d="M4 35h40" stroke="#6EC5B8" strokeWidth="3" strokeLinecap="round"/>
          {/* Temperature Dial */}
          <circle cx="27" cy="22" r="3.5" fill="#6EC5B8" stroke="currentColor" strokeWidth="2"/>
          {/* Steam Jets */}
          <path d="M12 39v4M20 39v5M28 39v4M36 39v5" stroke="#6EC5B8" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      );

    case 'sofa': // Scandinavian Tufted Armchair / Sofa
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Backrest with cushions */}
          <rect x="8" y="10" width="32" height="18" rx="5" fill="#6EC5B8" fillOpacity="0.15" stroke="currentColor" strokeWidth="2.5"/>
          <path d="M19 14v10M29 14v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          {/* Left Armrest */}
          <rect x="5" y="19" width="7" height="15" rx="3.5" fill="#6EC5B8" stroke="currentColor" strokeWidth="2.5"/>
          {/* Right Armrest */}
          <rect x="36" y="19" width="7" height="15" rx="3.5" fill="#6EC5B8" stroke="currentColor" strokeWidth="2.5"/>
          {/* Seat Cushion */}
          <rect x="11" y="25" width="26" height="9" rx="3" fill="#ffffff" stroke="currentColor" strokeWidth="2.5"/>
          {/* Wooden Legs */}
          <path d="M12 34l-3 7M36 34l3 7M18 34v5M30 34v5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          {/* Cleaning Foam Bubbles */}
          <circle cx="38" cy="11" r="2.5" fill="#6EC5B8"/>
          <circle cx="42" cy="7" r="1.5" fill="#6EC5B8"/>
        </svg>
      );

    case 'wedding': // Bridal Lehenga / Royal Sherwani
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Royal Crown / Top Ornament */}
          <path d="M20 7l4-3 4 3-1 3h-6l-1-3z" fill="#6EC5B8"/>
          {/* Bodice / Kurta */}
          <path d="M18 11h12l2 8-5 2-3-4-3 4-5-2 2-8z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
          {/* Flared Lehenga / Sherwani Base */}
          <path d="M19 21L9 40c-.5.9.1 2 1.2 2h27.6c1.1 0 1.7-1.1 1.2-2L29 21" fill="#6EC5B8" fillOpacity="0.15" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
          {/* Zari Embroidery Waves */}
          <path d="M13 36c3-1.5 6-1.5 9 0s6 1.5 9 0 5-1.5 8 0" stroke="#6EC5B8" strokeWidth="2.2" strokeLinecap="round"/>
          <circle cx="24" cy="29" r="1.5" fill="currentColor"/>
          <circle cx="19" cy="31" r="1.5" fill="currentColor"/>
          <circle cx="29" cy="31" r="1.5" fill="currentColor"/>
          {/* Sparkles */}
          <path d="M38 12l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2z" fill="#6EC5B8"/>
          <path d="M10 16l.8 1.5 1.7.8-1.7.8-.8 1.5-.8-1.5-1.7-.8 1.7-.8.8-1.5z" fill="#6EC5B8"/>
        </svg>
      );

    case 'darning': // Precision Invisible Mending / Needle & Thread
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cloth Patch Frame */}
          <rect x="7" y="11" width="34" height="28" rx="6" fill="#6EC5B8" fillOpacity="0.12" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3"/>
          {/* Needle piercing through */}
          <path d="M38 7l-8 8m0 0l-16 16-3 5 5-3 16-16m-2-4l4 4" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
          {/* Needle Eye */}
          <circle cx="36" cy="9" r="1" fill="#6EC5B8"/>
          {/* Thread Loop Wave */}
          <path d="M37 8c4-4 8 2 5 6s-7-2-9 4 4 8 2 12" stroke="#6EC5B8" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      );

    case 'dyeing': // Color Swatch & Vibrant Droplet
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Droplet Body */}
          <path d="M24 6c0 0-14 15-14 24a14 14 0 0028 0C38 21 24 6 24 6z" fill="#6EC5B8" fillOpacity="0.2" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
          {/* Dynamic Color Liquid Level Waves */}
          <path d="M12 28c3 2 6 2 9 0s6-2 9 0 5 2 6 1" stroke="#6EC5B8" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M14 34c3 1.5 6 1.5 9 0s6-1.5 8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          {/* Color Droplet Accent */}
          <circle cx="21" cy="20" r="3" fill="#6EC5B8"/>
          {/* Splash Rings */}
          <circle cx="24" cy="30" r="16" stroke="#6EC5B8" strokeWidth="1.5" strokeDasharray="2 4"/>
        </svg>
      );

    case 'saree': // Saree Roll Polishing / Silk Drape
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Rolling Polishing Cylinder */}
          <rect x="8" y="10" width="32" height="9" rx="4.5" fill="#6EC5B8" stroke="currentColor" strokeWidth="2.5"/>
          <ellipse cx="40" cy="14.5" rx="2" ry="4.5" fill="#2C3032"/>
          {/* Flowing Silk Fabric Roll */}
          <path d="M12 19v14c0 4 5 7 12 7s12-3 12-7V19" fill="#6EC5B8" fillOpacity="0.15" stroke="currentColor" strokeWidth="2.5"/>
          {/* Zari Silk Pleats */}
          <path d="M18 19v18M24 19v21M30 19v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          {/* Polished Shine Star */}
          <path d="M24 30l1.2 2.5L28 34l-2.8 1.5L24 38l-1.2-2.5L20 34l2.8-1.5L24 30z" fill="#ffffff" stroke="#6EC5B8" strokeWidth="1.5"/>
        </svg>
      );

    case 'bedding': // King Bed with Duvet & Pillows
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Headboard */}
          <rect x="6" y="9" width="36" height="14" rx="3" fill="#2C3032" stroke="currentColor" strokeWidth="2.5"/>
          {/* Twin Pillows */}
          <rect x="10" y="14" width="12" height="7" rx="2.5" fill="#ffffff" stroke="currentColor" strokeWidth="2"/>
          <rect x="26" y="14" width="12" height="7" rx="2.5" fill="#ffffff" stroke="currentColor" strokeWidth="2"/>
          {/* Mattress Base */}
          <rect x="6" y="23" width="36" height="15" rx="3" fill="#6EC5B8" fillOpacity="0.15" stroke="currentColor" strokeWidth="2.5"/>
          {/* Folded Duvet Comforter */}
          <path d="M6 28c5-2 11-2 18 0s13 2 18 0v10H6V28z" fill="#6EC5B8" stroke="currentColor" strokeWidth="2.5"/>
          {/* Bed Legs */}
          <path d="M8 38v4M40 38v4" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      );

    case 'toy': // Teddy Bear / Soft Toys Spa
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Ears */}
          <circle cx="15" cy="14" r="5" fill="#6EC5B8" stroke="currentColor" strokeWidth="2.5"/>
          <circle cx="33" cy="14" r="5" fill="#6EC5B8" stroke="currentColor" strokeWidth="2.5"/>
          {/* Head */}
          <circle cx="24" cy="22" r="11" fill="#ffffff" stroke="currentColor" strokeWidth="2.5"/>
          {/* Eyes & Nose Muzzle */}
          <circle cx="20" cy="20" r="1.5" fill="currentColor"/>
          <circle cx="28" cy="20" r="1.5" fill="currentColor"/>
          <ellipse cx="24" cy="24" rx="4" ry="2.5" fill="#6EC5B8" fillOpacity="0.25"/>
          <polygon points="23,23 25,23 24,24.5" fill="currentColor"/>
          {/* Body */}
          <path d="M15 31c-3 2-4 7-2 10 1 1.5 3 2 5 1l2-1c2 2 5 3 8 3s6-1 8-3l2 1c2 1 4 .5 5-1 2-3 1-8-2-10" fill="#6EC5B8" fillOpacity="0.15" stroke="currentColor" strokeWidth="2.5"/>
          {/* Heart Badge on Chest */}
          <path d="M24 33c-1.5-1.5-3.5-1-4 .5-.5 1.5.5 3 4 5 3.5-2 4.5-3.5 4-5-.5-1.5-2.5-2-4-.5z" fill="#6EC5B8"/>
        </svg>
      );

    case 'carpet': // Geometric Oriental Rug with Tassels
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Tassels Top */}
          <path d="M11 6v3M17 6v3M24 6v3M31 6v3M37 6v3" stroke="#6EC5B8" strokeWidth="2.5" strokeLinecap="round"/>
          {/* Rug Body */}
          <rect x="8" y="9" width="32" height="30" rx="3" fill="#6EC5B8" fillOpacity="0.15" stroke="currentColor" strokeWidth="2.5"/>
          {/* Inner Border */}
          <rect x="12" y="13" width="24" height="22" rx="2" stroke="currentColor" strokeWidth="1.8" strokeDasharray="3 2"/>
          {/* Center Medallion Diamond */}
          <polygon points="24,17 30,24 24,31 18,24" fill="#6EC5B8" stroke="currentColor" strokeWidth="2"/>
          <circle cx="24" cy="24" r="2" fill="#ffffff"/>
          {/* Tassels Bottom */}
          <path d="M11 39v3M17 39v3M24 39v3M31 39v3M37 39v3" stroke="#6EC5B8" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      );

    case 'curtain': // Curtains & Drapery with Tiebacks
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Curtain Rod */}
          <path d="M4 8h40" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="5" cy="8" r="2.5" fill="#6EC5B8"/>
          <circle cx="43" cy="8" r="2.5" fill="#6EC5B8"/>
          {/* Left Drapery Fold */}
          <path d="M8 8v12c4 2 4 8 0 20h8c2-12 1-18 4-20V8H8z" fill="#6EC5B8" fillOpacity="0.18" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
          {/* Right Drapery Fold */}
          <path d="M40 8v12c-4 2-4 8 0 20h-8c-2-12-1-18-4-20V8h12z" fill="#6EC5B8" fillOpacity="0.18" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round"/>
          {/* Tieback Cords */}
          <path d="M7 23c4 1 6 1 8-1" stroke="#6EC5B8" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M41 23c-4 1-6 1-8-1" stroke="#6EC5B8" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
      );

    case 'leather': // Classic Biker Leather Jacket
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Jacket Body */}
          <path d="M14 9l10 5 10-5 6 14-4 2-2 15H14L12 25l-4-2 6-14z" fill="#2C3032" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
          {/* Wide Asymmetrical Lapels */}
          <polygon points="18,11 24,19 19,25 15,16" fill="#6EC5B8" stroke="currentColor" strokeWidth="2"/>
          <polygon points="30,11 24,19 29,25 33,16" fill="#6EC5B8" stroke="currentColor" strokeWidth="2"/>
          {/* Asymmetrical Diagonal Zipper */}
          <path d="M22 19l6 17" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round"/>
          {/* Waist Buckle Belt */}
          <path d="M14 36h20" stroke="#6EC5B8" strokeWidth="3" strokeLinecap="round"/>
          <rect x="22" y="34.5" width="4" height="3" rx="1" fill="#ffffff" stroke="currentColor" strokeWidth="1"/>
        </svg>
      );

    case 'bag': // Designer Luxury Handbag & Tote
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Arched Structured Handle */}
          <path d="M18 19V11a6 6 0 0112 0v8" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round"/>
          {/* Trapeze Handbag Body */}
          <path d="M10 19h28l-3 21H13L10 19z" fill="#6EC5B8" fillOpacity="0.18" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
          {/* Front Flap */}
          <path d="M13 19h22l-2 9H15l-2-9z" fill="#ffffff" stroke="currentColor" strokeWidth="2"/>
          {/* Gold Metallic Turn-Lock Buckle */}
          <rect x="22" y="25" width="4" height="5" rx="1" fill="#6EC5B8" stroke="currentColor" strokeWidth="1.5"/>
          {/* Bottom Studs */}
          <circle cx="15" cy="38" r="1" fill="currentColor"/>
          <circle cx="33" cy="38" r="1" fill="currentColor"/>
        </svg>
      );

    case 'shoe': // Modern Streetwear Sneaker
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Sneaker Upper Silhouette */}
          <path d="M6 32c2-8 6-12 12-14l9-3 7 5 6 5c1 1 2 3 2 5v2H6z" fill="#6EC5B8" fillOpacity="0.18" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
          {/* Ankle Collar & Tongue */}
          <path d="M22 17l-3 4M27 15l-3 4M32 17l-3 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          {/* Aerodynamic Swoop Line */}
          <path d="M10 30c6-1 14-4 22-1" stroke="#6EC5B8" strokeWidth="2.5" strokeLinecap="round"/>
          {/* Thick Chunky Cushioned Sole */}
          <path d="M5 32h38c0 3-2 6-5 6H8c-3 0-5-3-3-6z" fill="#2C3032" stroke="currentColor" strokeWidth="2.5"/>
          {/* Sole Grip Grooves */}
          <path d="M14 38v-2M22 38v-2M30 38v-2" stroke="#6EC5B8" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );

    default: // Clean Washing Basket / Sparkle
      return (
        <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="18" fill="#6EC5B8" fillOpacity="0.15" stroke="currentColor" strokeWidth="2.5"/>
          <path d="M16 24l5 5 11-11" stroke="#6EC5B8" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
  }
}
