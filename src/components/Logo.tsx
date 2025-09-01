'use client';

import { useEffect, useState } from 'react';

export default function Logo() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex items-center space-x-4">
      {/* Logo Mark - Much larger and more dynamic */}
      <div className="relative">
        <svg 
          width="48" 
          height="48" 
          viewBox="0 0 48 48" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="flex-shrink-0"
        >
          {/* Background gradient circle */}
          <defs>
            <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <linearGradient id="docGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
            <linearGradient id="morphGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#dbeafe" />
              <stop offset="100%" stopColor="#bfdbfe" />
            </linearGradient>
          </defs>
          
          {/* Background circle with gradient */}
          <circle cx="24" cy="24" r="22" fill="url(#bgGradient)" opacity="0.1" stroke="url(#bgGradient)" strokeWidth="1"/>
          
          {/* Document 1 (left) - Enhanced */}
          <rect x="8" y="12" width="14" height="18" rx="2" fill="url(#docGradient)" stroke="#cbd5e1" strokeWidth="1"/>
          <rect x="10" y="16" width="10" height="1.5" rx="0.75" fill="#64748b"/>
          <rect x="10" y="19" width="7" height="1.5" rx="0.75" fill="#64748b"/>
          <rect x="10" y="22" width="8" height="1.5" rx="0.75" fill="#64748b"/>
          <rect x="10" y="25" width="6" height="1.5" rx="0.75" fill="#64748b"/>
          
          {/* Dynamic Arrow (center) - Much more prominent */}
          <g transform="translate(24, 24)">
            <circle cx="0" cy="0" r="6" fill="url(#bgGradient)" opacity="0.2"/>
            <path d="M-4 0 L4 0 M1 -3 L4 0 L1 3" stroke="#2563eb" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
          </g>
          
          {/* Document 2 (right) - Enhanced with morph effect */}
          <rect x="26" y="12" width="14" height="18" rx="2" fill="url(#morphGradient)" stroke="#2563eb" strokeWidth="1"/>
          <rect x="28" y="16" width="10" height="1.5" rx="0.75" fill="#2563eb"/>
          <rect x="28" y="19" width="7" height="1.5" rx="0.75" fill="#2563eb"/>
          <rect x="28" y="22" width="8" height="1.5" rx="0.75" fill="#2563eb"/>
          <rect x="28" y="25" width="9" height="1.5" rx="0.75" fill="#2563eb"/>
          
          {/* Enhanced Morphing effect particles - Only show animations after mount */}
          <circle cx="20" cy="14" r="1" fill="#3b82f6" opacity="0.8">
            {mounted && <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite"/>}
          </circle>
          <circle cx="28" cy="18" r="1.2" fill="#2563eb" opacity="0.6">
            {mounted && <animate attributeName="opacity" values="0.6;0.9;0.6" dur="1.5s" repeatCount="indefinite"/>}
          </circle>
          <circle cx="22" cy="28" r="0.8" fill="#3b82f6" opacity="0.7">
            {mounted && <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2.5s" repeatCount="indefinite"/>}
          </circle>
          <circle cx="26" cy="32" r="1" fill="#2563eb" opacity="0.5">
            {mounted && <animate attributeName="opacity" values="0.5;0.8;0.5" dur="1.8s" repeatCount="indefinite"/>}
          </circle>
        </svg>
      </div>
      
      {/* Wordmark - Clean and elegant */}
      <span className="font-black text-2xl tracking-tight leading-none">
        <span className="text-gray-900 dark:text-white">Convert</span>
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-700">Morph</span>
      </span>
    </div>
  )
}
