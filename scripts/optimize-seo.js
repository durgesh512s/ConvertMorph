#!/usr/bin/env node

/**
 * SEO Optimization Script for ConvertMorph
 * Ensures all tool pages have proper metadata, canonical URLs, and OG images
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://convertmorph.com';

// Tool configurations with SEO metadata
const tools = [
  {
    slug: 'pdf-compress',
    title: 'Compress PDF — ConvertMorph',
    description: 'Reduce PDF file size instantly. Choose compression level to balance quality and file size. Fast, private, free forever.',
    keywords: ['PDF compress', 'reduce PDF size', 'PDF compression', 'compress PDF online', 'PDF optimizer', 'shrink PDF']
  },
  {
    slug: 'pdf-merge',
    title: 'Merge PDF — ConvertMorph',
    description: 'Combine multiple PDF files into one document. Drag, drop, and reorder pages easily. Fast, private, free forever.',
    keywords: ['PDF merge', 'combine PDF', 'join PDF files', 'merge PDF online', 'PDF combiner', 'unite PDFs']
  },
  {
    slug: 'pdf-split',
    title: 'Split PDF — ConvertMorph',
    description: 'Extract pages from PDF files. Split by page ranges or extract individual pages. Fast, private, free forever.',
    keywords: ['PDF split', 'extract PDF pages', 'divide PDF', 'split PDF online', 'PDF page extractor', 'separate PDF']
  },
  {
    slug: 'images-to-pdf',
    title: 'Images to PDF — ConvertMorph',
    description: 'Convert JPG, PNG, and other images to PDF. Combine multiple images into one PDF document. Fast, private, free forever.',
    keywords: ['images to PDF', 'JPG to PDF', 'PNG to PDF', 'convert images PDF', 'photo to PDF', 'picture to PDF']
  },
  {
    slug: 'pdf-to-images',
    title: 'PDF to Images — ConvertMorph',
    description: 'Convert PDF pages to JPG, PNG images. Extract all pages or specific pages as high-quality images. Fast, private, free forever.',
    keywords: ['PDF to images', 'PDF to JPG', 'PDF to PNG', 'convert PDF images', 'extract PDF pages', 'PDF page images']
  },
  {
    slug: 'pdf-organize',
    title: 'Organize PDF — ConvertMorph',
    description: 'Reorder, rotate, and delete PDF pages. Drag and drop to reorganize your PDF documents. Fast, private, free forever.',
    keywords: ['organize PDF', 'reorder PDF pages', 'rotate PDF', 'rearrange PDF', 'PDF page organizer', 'sort PDF pages']
  },
  {
    slug: 'pdf-watermark',
    title: 'Add Watermark to PDF — ConvertMorph',
    description: 'Add text or image watermarks to PDF documents. Customize position, opacity, and rotation. Fast, private, free forever.',
    keywords: ['PDF watermark', 'add watermark PDF', 'PDF stamp', 'watermark PDF online', 'PDF branding', 'mark PDF']
  },
  {
    slug: 'pdf-pagenum',
    title: 'Add Page Numbers to PDF — ConvertMorph',
    description: 'Add page numbers to PDF documents. Customize position, format, and starting number. Fast, private, free forever.',
    keywords: ['PDF page numbers', 'add page numbers PDF', 'number PDF pages', 'PDF pagination', 'page numbering PDF']
  },
  {
    slug: 'pdf-sign',
    title: 'Sign PDF — ConvertMorph',
    description: 'Add digital signatures to PDF documents. Draw, type, or upload signature images. Fast, private, free forever.',
    keywords: ['sign PDF', 'PDF signature', 'digital signature PDF', 'e-sign PDF', 'PDF signing', 'electronic signature']
  }
];

// Generate layout.tsx content for a tool
function generateToolLayout(tool) {
  return `import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

export const metadata: Metadata = {
  title: '${tool.title}',
  description: '${tool.description}',
  keywords: ${JSON.stringify(tool.keywords)},
  alternates: {
    canonical: absoluteUrl('/tools/${tool.slug}'),
  },
  openGraph: {
    title: '${tool.title}',
    description: '${tool.description}',
    images: [
      {
        url: absoluteUrl('/og/${tool.slug}.png'),
        width: 1200,
        height: 630,
        alt: '${tool.title.replace(' — ConvertMorph', '')} - ConvertMorph',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools/${tool.slug}'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: '${tool.title}',
    description: '${tool.description}',
    images: [absoluteUrl('/og/${tool.slug}.png')],
  },
}

export default function ${tool.slug.split('-').map(word => 
  word.charAt(0).toUpperCase() + word.slice(1)
).join('')}Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
`;
}

// Check if tool layout exists and create/update if needed
function ensureToolLayouts() {
  const toolsDir = path.join(__dirname, '../src/app/tools');
  
  tools.forEach(tool => {
    const toolDir = path.join(toolsDir, tool.slug);
    const layoutPath = path.join(toolDir, 'layout.tsx');
    
    if (!fs.existsSync(toolDir)) {
      console.log(`Creating directory: ${toolDir}`);
      fs.mkdirSync(toolDir, { recursive: true });
    }
    
    if (!fs.existsSync(layoutPath)) {
      console.log(`Creating layout for: ${tool.slug}`);
      fs.writeFileSync(layoutPath, generateToolLayout(tool));
    } else {
      // Check if layout needs updating
      const currentContent = fs.readFileSync(layoutPath, 'utf8');
      const newContent = generateToolLayout(tool);
      
      if (currentContent !== newContent) {
        console.log(`Updating layout for: ${tool.slug}`);
        fs.writeFileSync(layoutPath, newContent);
      }
    }
  });
}

// Verify OG images exist
function verifyOGImages() {
  const ogDir = path.join(__dirname, '../public/og');
  const missingImages = [];
  
  tools.forEach(tool => {
    const imagePath = path.join(ogDir, `${tool.slug}.png`);
    if (!fs.existsSync(imagePath)) {
      missingImages.push(tool.slug);
    }
  });
  
  if (missingImages.length > 0) {
    console.warn('Missing OG images for:', missingImages.join(', '));
    console.warn('Run: npm run generate:og:tools to create missing images');
  } else {
    console.log('✓ All OG images exist');
  }
}

// Update sitemap with proper lastModified dates
function updateSitemap() {
  const sitemapPath = path.join(__dirname, '../src/app/sitemap.ts');
  
  if (fs.existsSync(sitemapPath)) {
    let content = fs.readFileSync(sitemapPath, 'utf8');
    
    // Update SITE_URL reference
    content = content.replace(
      /const baseUrl = process\.env\.SITE_URL \|\| '[^']*'/,
      `const baseUrl = process.env.SITE_URL || '${SITE_URL}'`
    );
    
    fs.writeFileSync(sitemapPath, content);
    console.log('✓ Sitemap updated');
  }
}

// Main execution
function main() {
  console.log('🚀 Starting SEO optimization...');
  
  try {
    ensureToolLayouts();
    verifyOGImages();
    updateSitemap();
    
    console.log('✅ SEO optimization complete!');
    console.log('\nNext steps:');
    console.log('1. Run: npm run build');
    console.log('2. Run: npm run lhci');
    console.log('3. Check Lighthouse scores');
    
  } catch (error) {
    console.error('❌ SEO optimization failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { tools, generateToolLayout };
