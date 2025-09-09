'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { INTERNAL_LINKING_STRATEGY } from '@/lib/crawl-optimization';

interface CrawlOptimizationProps {
  children: React.ReactNode;
}

export function CrawlOptimization({ children }: CrawlOptimizationProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Preload critical resources based on current page
    const preloadCriticalResources = () => {
      // Preload critical CSS
      const criticalCSS = document.createElement('link');
      criticalCSS.rel = 'preload';
      criticalCSS.as = 'style';
      criticalCSS.href = '/globals.css';
      document.head.appendChild(criticalCSS);

      // Tool-specific preloads
      if (pathname.startsWith('/tools/pdf-')) {
        const pdfWorker = document.createElement('link');
        pdfWorker.rel = 'preload';
        pdfWorker.as = 'script';
        pdfWorker.href = '/pdf.worker.min.js';
        document.head.appendChild(pdfWorker);
      }

      // Prefetch related tool pages
      if (pathname.startsWith('/tools/')) {
        const currentTool = pathname.split('/tools/')[1];
        const relatedTools = INTERNAL_LINKING_STRATEGY.toolRelations[currentTool as keyof typeof INTERNAL_LINKING_STRATEGY.toolRelations];
        
        if (relatedTools) {
          relatedTools.slice(0, 3).forEach(tool => {
            const prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.href = `/tools/${tool}`;
            document.head.appendChild(prefetchLink);
          });
        }
      }

      // Prefetch hub pages from any page
      if (!INTERNAL_LINKING_STRATEGY.hubPages.includes(pathname)) {
        INTERNAL_LINKING_STRATEGY.hubPages.forEach(hubPage => {
          const prefetchLink = document.createElement('link');
          prefetchLink.rel = 'prefetch';
          prefetchLink.href = hubPage;
          document.head.appendChild(prefetchLink);
        });
      }
    };

    // DNS prefetch for external resources
    const dnsPrefetch = () => {
      const domains = [
        'fonts.googleapis.com',
        'fonts.gstatic.com',
        'www.google-analytics.com',
        'pagead2.googlesyndication.com'
      ];

      domains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = `//${domain}`;
        document.head.appendChild(link);
      });
    };

    // Add structured data for better crawling
    const addStructuredData = () => {
      if (pathname.startsWith('/tools/')) {
        const toolName = pathname.split('/tools/')[1];
        if (toolName) {
          const structuredData = {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": `${toolName.replace(/-/g, ' ')} - ConvertMorph`,
            "url": `https://convertmorph.com${pathname}`,
            "applicationCategory": "UtilityApplication",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          };

          const script = document.createElement('script');
          script.type = 'application/ld+json';
          script.textContent = JSON.stringify(structuredData);
          document.head.appendChild(script);
        }
      }
    };

    preloadCriticalResources();
    dnsPrefetch();
    addStructuredData();

    // Cleanup function
    return () => {
      // Remove dynamically added elements on unmount
      const dynamicLinks = document.querySelectorAll('link[rel="prefetch"], link[rel="preload"], link[rel="dns-prefetch"]');
      dynamicLinks.forEach(link => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
    };
  }, [pathname]);

  return <>{children}</>;
}

// Hook for getting related tools for internal linking
export function useRelatedTools(currentTool: string) {
  const relatedTools = INTERNAL_LINKING_STRATEGY.toolRelations[currentTool as keyof typeof INTERNAL_LINKING_STRATEGY.toolRelations] || [];
  return relatedTools.slice(0, 4); // Limit to 4 related tools
}

// Component for strategic internal linking
export function RelatedToolsLinks({ currentTool }: { currentTool: string }) {
  const relatedTools = useRelatedTools(currentTool);

  if (relatedTools.length === 0) return null;

  return (
    <div className="mt-8 p-4 bg-gray-50 rounded-lg">
      <h3 className="text-lg font-semibold mb-3">Related Tools</h3>
      <div className="grid grid-cols-2 gap-2">
        {relatedTools.map(tool => (
          <a
            key={tool}
            href={`/tools/${tool}`}
            className="text-blue-600 hover:text-blue-800 text-sm"
            rel="nofollow" // Prevent link juice dilution
          >
            {tool.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </a>
        ))}
      </div>
    </div>
  );
}
