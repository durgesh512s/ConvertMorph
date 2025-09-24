'use client';

import { useEffect, useRef, useState } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: 'auto' | 'rectangle' | 'banner' | 'leaderboard';
  className?: string;
  style?: React.CSSProperties;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function AdSense({ 
  adSlot, 
  adFormat = 'auto', 
  className = '',
  style = {}
}: AdSenseProps) {
  const adRef = useRef<HTMLModElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState(false);

  useEffect(() => {
    // Check if AdSense script is available
    if (typeof window !== 'undefined') {
      // Initialize adsbygoogle array if it doesn't exist
      if (!window.adsbygoogle) {
        window.adsbygoogle = [];
      }

      // Check if AdSense script is loaded
      const checkAdSense = () => {
        try {
          if (window.adsbygoogle && adRef.current) {
            // Push ad to AdSense queue
            window.adsbygoogle.push({});
            setAdLoaded(true);
          }
        } catch (error) {
          console.warn('AdSense error:', error);
          setAdError(true);
        }
      };

      // Wait a bit for AdSense script to load
      const timer = setTimeout(checkAdSense, 1000);

      return () => clearTimeout(timer);
    }
    
    return undefined;
  }, []);

  // Don't render anything if ad failed to load or AdSense is not available
  if (adError || (typeof window !== 'undefined' && !window.adsbygoogle)) {
    return null;
  }

  // Only render the ad container when we're ready to show ads
  return (
    <div className={`adsense-container ${className}`} style={style}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: 'block',
          ...style
        }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
}

// Auto ads component - Google will automatically place ads
export function AutoAd({ className = '', style = {} }: { className?: string; style?: React.CSSProperties }) {
  return (
    <AdSense
      adSlot="auto" // Auto ads don't need specific slot IDs
      adFormat="auto"
      className={className}
      style={style}
    />
  );
}

// Specific ad components for different placements (if you want manual control)
export function HeaderAd() {
  return (
    <div className="w-full" style={{ minHeight: '90px' }}>
      {/* Auto ads will be placed here by Google */}
    </div>
  );
}

export function ContentAd() {
  return (
    <div className="w-full max-w-4xl mx-auto" style={{ minHeight: '250px' }}>
      {/* Auto ads will be placed here by Google */}
    </div>
  );
}

export function SidebarAd() {
  return (
    <div className="w-full" style={{ minHeight: '600px' }}>
      {/* Auto ads will be placed here by Google */}
    </div>
  );
}
