'use client';

import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;
const GOOGLE_ADS_ID = 'G-9VEDLK3P78'; // Google Ads conversion tracking ID

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_MEASUREMENT_ID || !window.gtag) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    
    // Track page views
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
      custom_map: {
        custom_parameter_1: 'tool_name',
        custom_parameter_2: 'file_type',
      },
    });
  }, [pathname, searchParams]);

  // Don't render in development unless explicitly enabled
  if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_GA_DEV) {
    return null;
  }

  // Always render Google Ads tag, even without GA_MEASUREMENT_ID

  return (
    <>
      {/* Google tag (gtag.js) - Load the script */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
      />
      <Script
        id="google-ads-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}');
            ${GA_MEASUREMENT_ID ? `gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: false,
              custom_map: {
                custom_parameter_1: 'tool_name',
                custom_parameter_2: 'file_type',
              },
            });` : ''}
          `,
        }}
      />
    </>
  );
}

// GA4 Event tracking functions
export const gtag = {
  // Track page views
  pageView: (url: string) => {
    if (!window.gtag) return;
    
    // Track for Google Ads
    window.gtag('config', GOOGLE_ADS_ID, {
      page_path: url,
    });
    
    // Track for GA4 if available
    if (GA_MEASUREMENT_ID) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
      });
    }
  },

  // Track custom events
  event: (action: string, parameters?: Record<string, any>) => {
    if (!window.gtag) return;
    
    window.gtag('event', action, {
      ...parameters,
      send_to: GOOGLE_ADS_ID,
    });
    
    // Also send to GA4 if available
    if (GA_MEASUREMENT_ID) {
      window.gtag('event', action, {
        ...parameters,
        send_to: GA_MEASUREMENT_ID,
      });
    }
  },

  // Google Ads conversion tracking
  adsConversion: (conversionLabel?: string, value?: number) => {
    if (!window.gtag) return;
    
    window.gtag('event', 'conversion', {
      send_to: GOOGLE_ADS_ID + (conversionLabel ? `/${conversionLabel}` : ''),
      value: value || 1,
      currency: 'USD',
    });
  },

  // Track file processing events
  fileEvent: (
    event: 'file_upload' | 'job_start' | 'job_success' | 'job_error' | 'download_zip',
    toolName: string,
    properties?: Record<string, any>
  ) => {
    if (!GA_MEASUREMENT_ID || !window.gtag) return;

    window.gtag('event', event, {
      tool_name: toolName,
      custom_parameter_1: toolName,
      ...properties,
      send_to: GA_MEASUREMENT_ID,
    });
  },

  // Track user interactions
  interaction: (
    event: 'tool_select' | 'pwa_install' | 'keyboard_shortcut',
    properties?: Record<string, any>
  ) => {
    if (!GA_MEASUREMENT_ID || !window.gtag) return;

    window.gtag('event', event, {
      ...properties,
      send_to: GA_MEASUREMENT_ID,
    });
  },

  // Track conversions (tool usage)
  conversion: (toolName: string, value?: number) => {
    if (!GA_MEASUREMENT_ID || !window.gtag) return;

    window.gtag('event', 'conversion', {
      tool_name: toolName,
      custom_parameter_1: toolName,
      value: value || 1,
      currency: 'USD',
      send_to: GA_MEASUREMENT_ID,
    });
  },

  // Track timing events
  timing: (name: string, value: number, category?: string) => {
    if (!GA_MEASUREMENT_ID || !window.gtag) return;

    window.gtag('event', 'timing_complete', {
      name,
      value: Math.round(value),
      event_category: category || 'performance',
      send_to: GA_MEASUREMENT_ID,
    });
  },

  // Track errors
  exception: (description: string, fatal: boolean = false) => {
    if (!GA_MEASUREMENT_ID || !window.gtag) return;

    window.gtag('event', 'exception', {
      description,
      fatal,
      send_to: GA_MEASUREMENT_ID,
    });
  },
};
