'use client';

import Script from 'next/script';

const GTM_ID = 'GTM-5XPD58C8';

interface GoogleTagManagerProps {
  gtmId?: string;
}

export function GoogleTagManager({ gtmId = GTM_ID }: GoogleTagManagerProps = {}) {
  // Don't render in development unless explicitly enabled
  if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_GTM_DEV) {
    return null;
  }

  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl+'&cb='+Date.now();f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />
    </>
  );
}

export function GoogleTagManagerNoScript({ gtmId = GTM_ID }: GoogleTagManagerProps = {}) {
  // Don't render in development unless explicitly enabled
  if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_GTM_DEV) {
    return null;
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}&cb=${Date.now()}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}

// GTM Event tracking functions
export const gtm = {
  // Push events to dataLayer
  push: (event: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push(event);
    }
  },

  // Track page views
  pageView: (url: string) => {
    gtm.push({
      event: 'page_view',
      page_path: url,
    });
  },

  // Track custom events
  event: (eventName: string, parameters?: Record<string, any>) => {
    gtm.push({
      event: eventName,
      ...parameters,
    });
  },

  // Track conversions
  conversion: (conversionName: string, value?: number) => {
    gtm.push({
      event: 'conversion',
      conversion_name: conversionName,
      value: value || 1,
      currency: 'USD',
    });
  },

  // Track tool usage
  toolUsage: (toolName: string, action: string, properties?: Record<string, any>) => {
    gtm.push({
      event: 'tool_usage',
      tool_name: toolName,
      action: action,
      ...properties,
    });
  },
};

// Extend window type for dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}
