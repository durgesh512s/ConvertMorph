import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { absoluteUrl } from '@/lib/url';

interface BreadcrumbItem {
  position: number;
  name: string;
  item: string;
  isLast?: boolean;
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
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
    
    // Use static mapping for all segments - no dynamic title extraction
    if (!name) {
      // Map path segments to readable names
      switch (segment) {
      case 'tools':
        name = 'All Tools';
        break;
      case 'blog':
        name = 'Blogs';
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
      case 'background-remover':
        name = 'Background Remover';
        break;
      case 'grammar-checker':
        name = 'Grammar Checker';
        break;
      case 'paraphraser':
        name = 'Paraphraser';
        break;
      case 'plagiarism-checker':
        name = 'Plagiarism Checker';
        break;
      // For blog posts, try to get title from document or use formatted slug
      case 'organize-pdf-pages':
        name = 'Organize PDF Pages';
        break;
      case 'add-watermark-to-pdf':
        name = 'Add Watermark to PDF';
        break;
      case 'merge-pdf-files-online':
        name = 'Merge PDF Files Online';
        break;
      case 'how-to-compress-pdf-files':
        name = 'How to Compress PDF Files';
        break;
      case 'split-pdf-pages':
        name = 'Split PDF Pages';
        break;
      case 'sign-pdf-documents':
        name = 'Sign PDF Documents';
        break;
      case 'convert-images-to-pdf':
        name = 'Convert Images to PDF';
        break;
      case 'convert-pdf-to-images':
        name = 'Convert PDF to Images';
        break;
      case 'add-page-numbers-to-pdf':
        name = 'Add Page Numbers to PDF';
        break;
      case 'compress-images-online':
        name = 'Compress Images Online';
        break;
      case 'resize-images-online':
        name = 'Resize Images Online';
        break;
      case 'convert-image-formats-online':
        name = 'Convert Image Formats Online';
        break;
      case 'crop-images-online':
        name = 'Crop Images Online';
        break;
      case 'text-analysis-tools':
        name = 'Text Analysis Tools';
        break;
      case 'tax-calculator-guide':
        name = 'Tax Calculator Guide';
        break;
      case 'emi-calculator-guide':
        name = 'EMI Calculator Guide';
        break;
      case 'sip-calculator-guide':
        name = 'SIP Calculator Guide';
        break;
      case 'hra-calculator-guide':
        name = 'HRA Calculator Guide';
        break;
      case 'loan-calculator-guide':
        name = 'Loan Calculator Guide';
        break;
      default:
        // Capitalize and format unknown segments
        name = segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
      }
    }
    
    breadcrumbs.push({
      position: index + 2,
      name,
      item: absoluteUrl(path),
      isLast: index === pathSegments.length - 1
    });
  });

  return breadcrumbs;
}

interface UnifiedBreadcrumbProps {
  pathname: string;
}

export function UnifiedBreadcrumb({ pathname }: UnifiedBreadcrumbProps) {
  // Generate server-side breadcrumbs only - no client-side processing
  const breadcrumbs = generateBreadcrumbs(pathname);
  
  // Generate JSON-LD using server-side breadcrumbs only
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

  // Don't render breadcrumbs on homepage - no structured data either
  if (pathname === '/' || breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <>
      {/* JSON-LD Structured Data - Single source of truth */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd)
        }}
      />
      
      {/* Visible Breadcrumb Navigation */}
      <nav 
        aria-label="Breadcrumb" 
        className="flex items-center space-x-1 text-sm text-muted-foreground py-2 px-4 bg-muted/30 border-b"
        itemScope 
        itemType="https://schema.org/BreadcrumbList"
      >
        <ol className="flex items-center space-x-1">
          {breadcrumbs.map((crumb, index) => (
            <li 
              key={`breadcrumb-${crumb.position}-${crumb.name}`}
              className="flex items-center"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <meta itemProp="position" content={crumb.position.toString()} />
              
              {index === 0 ? (
                <Link
                  href="/"
                  className="flex items-center hover:text-foreground transition-colors"
                  itemProp="item"
                  aria-label="Home"
                >
                  <Home className="h-4 w-4" />
                  <span className="sr-only" itemProp="name">{crumb.name}</span>
                </Link>
              ) : crumb.isLast ? (
                <span 
                  className="font-medium text-foreground"
                  itemProp="name"
                  aria-current="page"
                >
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.item.replace(/^https?:\/\/[^\/]+/, '') || '/'}
                  className="hover:text-foreground transition-colors"
                  itemProp="item"
                >
                  <span itemProp="name">{crumb.name}</span>
                </Link>
              )}
              
              {!crumb.isLast && (
                <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground/60" />
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
