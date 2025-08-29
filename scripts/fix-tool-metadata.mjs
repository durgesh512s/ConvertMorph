#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Tool metadata mapping
const toolMetadata = {
  'pdf-watermark': {
    title: 'PDF Watermark — ConvertMorph',
    description: 'Add watermarks to PDF files. Insert text or image watermarks with custom positioning. Fast, private, free forever.',
    ogImage: '/og/og-watermark.png'
  },
  'pdf-organize': {
    title: 'PDF Organize — ConvertMorph', 
    description: 'Organize PDF pages by reordering, rotating, and rearranging. Customize your document layout. Fast, private, free forever.',
    ogImage: '/og/og-organize.png'
  },
  'pdf-pagenum': {
    title: 'PDF Page Numbers — ConvertMorph',
    description: 'Add page numbers to PDF documents. Customize position, format, and styling. Fast, private, free forever.',
    ogImage: '/og/og-pagenum.png'
  },
  'pdf-to-images': {
    title: 'PDF to Images — ConvertMorph',
    description: 'Convert PDF pages to images. Extract as JPG, PNG with custom quality settings. Fast, private, free forever.',
    ogImage: '/og/og-pdf-to-images.png'
  },
  'pdf-sign': {
    title: 'PDF Sign — ConvertMorph',
    description: 'Add digital signatures to PDF documents. Sign with text, drawing, or upload signature images. Fast, private, free forever.',
    ogImage: '/og/og-sign.png'
  }
};

// Tools that need fixing
const toolsToFix = [
  'pdf-watermark',
  'pdf-organize', 
  'pdf-pagenum',
  'pdf-to-images',
  'pdf-sign'
];

function createLayoutFile(toolName, metadata) {
  const layoutContent = `import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '${metadata.title}',
  description: '${metadata.description}',
  openGraph: {
    title: '${metadata.title}',
    description: '${metadata.description}',
    images: ['${metadata.ogImage}'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '${metadata.title}',
    description: '${metadata.description}',
    images: ['${metadata.ogImage}'],
  },
}

export default function ${toolName.split('-').map(word => 
  word.charAt(0).toUpperCase() + word.slice(1)
).join('')}Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
`;

  const layoutPath = path.join(__dirname, '..', 'src', 'app', 'tools', toolName, 'layout.tsx');
  fs.writeFileSync(layoutPath, layoutContent);
  log(`✅ Created layout file: ${layoutPath}`);
}

function fixPageFile(toolName) {
  const pagePath = path.join(__dirname, '..', 'src', 'app', 'tools', toolName, 'page.tsx');
  
  if (!fs.existsSync(pagePath)) {
    log(`❌ Page file not found: ${pagePath}`);
    return;
  }

  let content = fs.readFileSync(pagePath, 'utf8');
  
  // Remove metadata imports and exports
  content = content.replace(/import type { Metadata } from 'next'\s*\n/, '');
  content = content.replace(/import { Metadata } from 'next'\s*\n/, '');
  
  // Remove export const metadata blocks
  content = content.replace(/export const metadata: Metadata = \{[\s\S]*?\}\s*\n/g, '');
  
  // Remove standalone metadata const declarations
  content = content.replace(/const metadata: Metadata = \{[\s\S]*?\}\s*\n/g, '');
  
  // Ensure 'use client' is at the top
  if (content.includes("'use client'")) {
    content = content.replace(/'use client'\s*\n/, '');
    content = "'use client'\n\n" + content;
  }
  
  fs.writeFileSync(pagePath, content);
  log(`✅ Fixed page file: ${pagePath}`);
}

function main() {
  log('🔧 Fixing tool metadata issues...\n');
  
  for (const toolName of toolsToFix) {
    log(`📝 Processing ${toolName}...`);
    
    const metadata = toolMetadata[toolName];
    if (!metadata) {
      log(`❌ No metadata found for ${toolName}`);
      continue;
    }
    
    // Create layout file
    createLayoutFile(toolName, metadata);
    
    // Fix page file
    fixPageFile(toolName);
    log(`✅ Completed ${toolName}\n`);
  }
  
  log('🎉 All tools fixed successfully!');
}

main();
