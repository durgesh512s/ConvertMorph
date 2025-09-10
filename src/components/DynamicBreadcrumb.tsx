'use client';

import { usePathname } from 'next/navigation';
import { absoluteUrl } from '@/lib/url';

interface BreadcrumbItem {
  position: number;
  name: string;
  item: string;
}

export function DynamicBreadcrumb() {
  const pathname = usePathname();
  
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [
      {
        position: 1,
        name: 'Home',
        item: absoluteUrl('/')
      }
    ];

    // Split pathname and build breadcrumbs dynamically
    const pathSegments = pathname.split('/').filter(segment => segment !== '');
    
    pathSegments.forEach((segment, index) => {
      const path = '/' + pathSegments.slice(0, index + 1).join('/');
      let name = '';
      
      // Map path segments to readable names
      switch (segment) {
        case 'tools':
          name = 'Tools';
          break;
        case 'blog':
          name = 'Blog';
          break;
        case 'about':
          name = 'About';
          break;
        case 'contact':
          name = 'Contact';
          break;
        case 'privacy':
          name = 'Privacy Policy';
          break;
        case 'terms':
          name = 'Terms of Service';
          break;
        // Tool-specific breadcrumbs
        case 'pdf-compress':
          name = 'PDF Compress';
          break;
        case 'pdf-merge':
          name = 'PDF Merge';
          break;
        case 'pdf-split':
          name = 'PDF Split';
          break;
        case 'image-compress':
          name = 'Image Compress';
          break;
        case 'image-resize':
          name = 'Image Resize';
          break;
        case 'image-convert':
          name = 'Image Converter';
          break;
        case 'image-crop':
          name = 'Image Crop';
          break;
        case 'word-counter':
          name = 'Word Counter';
          break;
        case 'text-compare':
          name = 'Text Comparison';
          break;
        case 'tax-calculator':
          name = 'Tax Calculator';
          break;
        case 'emi-calculator':
          name = 'EMI Calculator';
          break;
        case 'sip-calculator':
          name = 'SIP Calculator';
          break;
        case 'hra-calculator':
          name = 'HRA Calculator';
          break;
        case 'loan-calculator':
          name = 'Loan Calculator';
          break;
        case 'images-to-pdf':
          name = 'Images to PDF';
          break;
        case 'pdf-to-images':
          name = 'PDF to Images';
          break;
        case 'pdf-organize':
          name = 'PDF Organize';
          break;
        case 'pdf-watermark':
          name = 'PDF Watermark';
          break;
        case 'pdf-pagenum':
          name = 'PDF Page Numbers';
          break;
        case 'pdf-sign':
          name = 'PDF Fill & Sign';
          break;
        default:
          // Capitalize and format unknown segments
          name = segment
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
      }
      
      breadcrumbs.push({
        position: index + 2,
        name,
        item: absoluteUrl(path)
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();
  
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map(crumb => ({
      "@type": "ListItem",
      "position": crumb.position,
      "name": crumb.name,
      "item": crumb.item
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbJsonLd)
      }}
    />
  );
}
