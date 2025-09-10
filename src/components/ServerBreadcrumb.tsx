import { headers } from 'next/headers';
import { absoluteUrl } from '@/lib/url';

interface BreadcrumbItem {
  position: number;
  name: string;
  item: string;
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
      // Blog post specific breadcrumbs
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
      case 'convertmorph-free-online-tools':
        name = 'ConvertMorph Free Online Tools';
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
}

export async function ServerBreadcrumb() {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '/';
  
  // Debug logging - always log in production to diagnose the issue
  console.log('ServerBreadcrumb - pathname received:', pathname);
  console.log('ServerBreadcrumb - all headers:', Object.fromEntries(headersList.entries()));
  
  const breadcrumbs = generateBreadcrumbs(pathname);
  
  // Debug logging - always log in production to diagnose the issue
  console.log('ServerBreadcrumb - generated breadcrumbs:', breadcrumbs);
  
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

  // Debug logging - log the final JSON-LD
  console.log('ServerBreadcrumb - final JSON-LD:', JSON.stringify(breadcrumbJsonLd, null, 2));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(breadcrumbJsonLd)
      }}
    />
  );
}
