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

// Specific ad components for different placements
export function HeaderAd() {
  return (
    <AdSense
      adSlot="1234567890" // Replace with your actual ad slot ID
      adFormat="banner"
      className="w-full"
      style={{ minHeight: '90px' }}
    />
  );
}

export function ContentAd() {
  return (
    <AdSense
      adSlot="0987654321" // Replace with your actual ad slot ID
      adFormat="rectangle"
      className="w-full max-w-4xl mx-auto"
      style={{ minHeight: '250px' }}
    />
  );
}

export function SidebarAd() {
  return (
    <AdSense
      adSlot="1122334455" // Replace with your actual ad slot ID
      adFormat="auto"
      className="w-full"
      style={{ minHeight: '600px' }}
    />
  );
}
