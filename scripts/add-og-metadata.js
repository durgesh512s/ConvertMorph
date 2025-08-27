const fs = require('fs');
const path = require('path');

// Tool metadata mapping
const toolMetadata = {
  'pdf-merge': {
    title: 'Merge PDF — ConvertMorph',
    description: 'Combine multiple PDF files into one document. Drag, drop, reorder pages and merge PDFs instantly. Fast, private, free forever.',
    ogImage: '/og/og-merge.png'
  },
  'pdf-split': {
    title: 'Split PDF — ConvertMorph',
    description: 'Extract pages from PDF files. Split by page ranges, individual pages, or custom selections. Fast, private, free forever.',
    ogImage: '/og/og-split.png'
  },
  'pdf-to-images': {
    title: 'PDF to Images — ConvertMorph',
    description: 'Convert PDF pages to high-quality images (PNG, JPG). Extract all pages or select specific ones. Fast, private, free forever.',
    ogImage: '/og/og-to-images.png'
  },
  'images-to-pdf': {
    title: 'Images to PDF — ConvertMorph',
    description: 'Convert images to PDF documents. Combine multiple images into one PDF with custom page sizes. Fast, private, free forever.',
    ogImage: '/og/og-images-to-pdf.png'
  },
  'pdf-organize': {
    title: 'Organize PDF — ConvertMorph',
    description: 'Reorder, rotate, and manage PDF pages with drag-and-drop interface. Organize your documents easily. Fast, private, free forever.',
    ogImage: '/og/og-organize.png'
  },
  'pdf-watermark': {
    title: 'Watermark PDF — ConvertMorph',
    description: 'Add text or image watermarks to PDF files. Customize position, opacity, and rotation. Fast, private, free forever.',
    ogImage: '/og/og-watermark.png'
  },
  'pdf-pagenum': {
    title: 'Add Page Numbers — ConvertMorph',
    description: 'Add page numbers to PDF documents. Customize position, format, and starting number. Fast, private, free forever.',
    ogImage: '/og/og-pagenum.png'
  },
  'pdf-sign': {
    title: 'Sign PDF — ConvertMorph',
    description: 'Add digital signatures to PDF documents. Draw, type, or upload signature images. Fast, private, free forever.',
    ogImage: '/og/og-sign.png'
  }
};

// Blog metadata mapping
const blogMetadata = {
  'convert-images-to-pdf': {
    title: 'How to Convert Images to PDF Online — ConvertMorph',
    description: 'Learn how to convert images to PDF online for free. Step-by-step guide with tips for best quality and file organization.',
    ogImage: '/og/blog/convert-images-to-pdf.png'
  },
  'convert-pdf-to-images': {
    title: 'Convert PDF to Images: Complete Guide — ConvertMorph',
    description: 'Complete guide to converting PDF pages to images. Learn about formats, quality settings, and best practices.',
    ogImage: '/og/blog/convert-pdf-to-images.png'
  },
  'how-to-compress-pdf-files': {
    title: 'How to Compress PDF Files Online — ConvertMorph',
    description: 'Learn how to compress PDF files online while maintaining quality. Tips for reducing file size and choosing compression levels.',
    ogImage: '/og/blog/how-to-compress-pdf-files.png'
  },
  'merge-pdf-files-online': {
    title: 'Merge PDF Files Online for Free — ConvertMorph',
    description: 'Learn how to merge PDF files online for free. Step-by-step guide to combining multiple PDFs into one document.',
    ogImage: '/og/blog/merge-pdf-files-online.png'
  },
  'split-pdf-pages': {
    title: 'Split PDF Pages: Easy Online Tool — ConvertMorph',
    description: 'Learn how to split PDF pages online. Extract specific pages or ranges from PDF documents with our easy guide.',
    ogImage: '/og/blog/split-pdf-pages.png'
  }
};

function addMetadataToFile(filePath, metadata) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check if metadata already exists
    if (content.includes('export const metadata')) {
      console.log(`⚠️  Metadata already exists in ${filePath}`);
      return false;
    }
    
    // Create metadata block
    const metadataBlock = `import type { Metadata } from 'next'

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

`;
    
    // Insert metadata at the top of the file
    const updatedContent = metadataBlock + content;
    
    fs.writeFileSync(filePath, updatedContent, 'utf8');
    console.log(`✅ Added metadata to ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function processToolPages() {
  const toolsDir = path.join(__dirname, '../src/app/tools');
  let processed = 0;
  
  console.log('🔧 Processing tool pages...\n');
  
  for (const [toolKey, metadata] of Object.entries(toolMetadata)) {
    const toolPagePath = path.join(toolsDir, toolKey, 'page.tsx');
    
    if (fs.existsSync(toolPagePath)) {
      if (addMetadataToFile(toolPagePath, metadata)) {
        processed++;
      }
    } else {
      console.log(`⚠️  Tool page not found: ${toolPagePath}`);
    }
  }
  
  return processed;
}

function processBlogPages() {
  const blogDir = path.join(__dirname, '../src/app/blog');
  let processed = 0;
  
  console.log('\n📝 Processing blog pages...\n');
  
  for (const [blogSlug, metadata] of Object.entries(blogMetadata)) {
    const blogPagePath = path.join(blogDir, blogSlug, 'page.tsx');
    
    if (fs.existsSync(blogPagePath)) {
      if (addMetadataToFile(blogPagePath, metadata)) {
        processed++;
      }
    } else {
      console.log(`⚠️  Blog page not found: ${blogPagePath}`);
    }
  }
  
  return processed;
}

// Main execution
function main() {
  console.log('🎯 Adding OG metadata to pages...\n');
  
  const toolsProcessed = processToolPages();
  const blogsProcessed = processBlogPages();
  
  console.log('\n📊 Summary:');
  console.log(`✅ Tool pages processed: ${toolsProcessed}`);
  console.log(`✅ Blog pages processed: ${blogsProcessed}`);
  console.log(`🎉 Total pages updated: ${toolsProcessed + blogsProcessed}`);
  
  if (toolsProcessed + blogsProcessed > 0) {
    console.log('\n🚀 All metadata has been added successfully!');
    console.log('📱 Your pages are now ready for social sharing with branded OG images.');
  }
}

main();
