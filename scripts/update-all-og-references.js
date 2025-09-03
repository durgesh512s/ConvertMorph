const fs = require('fs');
const path = require('path');

// All tools with their correct OG image filenames
const toolConfigs = [
  'pdf-compress',
  'pdf-merge', 
  'pdf-split',
  'images-to-pdf',
  'pdf-to-images',
  'pdf-organize',
  'pdf-watermark',
  'pdf-sign',
  'pdf-pagenum',
  'image-compress',
  'image-convert',
  'image-crop',
  'image-resize',
  'text-compare',
  'word-counter',
  'tax-calculator',
  'emi-calculator',
  'sip-calculator',
  'hra-calculator',
  'loan-calculator'
];

// All blog posts with their correct OG image filenames
const blogConfigs = [
  'add-page-numbers-to-pdf',
  'add-watermark-to-pdf',
  'compress-images-online',
  'convert-image-formats-online',
  'convert-images-to-pdf',
  'convert-pdf-to-images',
  'convertmorph-free-pdf-tools',
  'crop-images-online',
  'emi-calculator-guide',
  'how-to-compress-pdf-files',
  'hra-calculator-guide',
  'loan-calculator-guide',
  'merge-pdf-files-online',
  'organize-pdf-pages',
  'resize-images-online',
  'sign-pdf-documents',
  'sip-calculator-guide',
  'split-pdf-pages',
  'tax-calculator-guide',
  'text-analysis-tools'
];

function updateToolOGReferences() {
  console.log('🔧 Updating tool OG image references...\n');
  let updated = 0;
  
  for (const toolSlug of toolConfigs) {
    const layoutPath = path.join(__dirname, `../src/app/tools/${toolSlug}/layout.tsx`);
    
    if (fs.existsSync(layoutPath)) {
      try {
        let content = fs.readFileSync(layoutPath, 'utf8');
        const expectedOGPath = `/og/${toolSlug}.png`;
        
        // Update any old OG image references to the new format
        const ogImageRegex = /url:\s*absoluteUrl\(['"`]\/og\/[^'"`]*['"`]\)/g;
        const twitterImageRegex = /images:\s*\[absoluteUrl\(['"`]\/og\/[^'"`]*['"`]\)\]/g;
        
        const newOGReference = `url: absoluteUrl('${expectedOGPath}')`;
        const newTwitterReference = `images: [absoluteUrl('${expectedOGPath}')]`;
        
        content = content.replace(ogImageRegex, newOGReference);
        content = content.replace(twitterImageRegex, newTwitterReference);
        
        fs.writeFileSync(layoutPath, content);
        console.log(`✅ Updated OG reference for ${toolSlug}`);
        updated++;
      } catch (error) {
        console.error(`❌ Error updating ${toolSlug}:`, error.message);
      }
    } else {
      console.log(`⚠️  Layout file not found for ${toolSlug} - OG image may not be configured`);
    }
  }
  
  return updated;
}

function verifyBlogOGReferences() {
  console.log('\n📝 Verifying blog OG image references...\n');
  let verified = 0;
  
  for (const blogSlug of blogConfigs) {
    const expectedOGPath = `/og/blog/${blogSlug}.png`;
    const ogImagePath = path.join(__dirname, `../public${expectedOGPath}`);
    
    if (fs.existsSync(ogImagePath)) {
      console.log(`✅ Blog OG image exists: ${blogSlug}`);
      verified++;
    } else {
      console.log(`❌ Blog OG image missing: ${blogSlug}`);
    }
  }
  
  return verified;
}

function verifyToolOGImages() {
  console.log('\n🔧 Verifying tool OG images...\n');
  let verified = 0;
  
  for (const toolSlug of toolConfigs) {
    const expectedOGPath = `/og/${toolSlug}.png`;
    const ogImagePath = path.join(__dirname, `../public${expectedOGPath}`);
    
    if (fs.existsSync(ogImagePath)) {
      console.log(`✅ Tool OG image exists: ${toolSlug}`);
      verified++;
    } else {
      console.log(`❌ Tool OG image missing: ${toolSlug}`);
    }
  }
  
  return verified;
}

function generateMissingLayoutFiles() {
  console.log('\n🏗️  Checking for missing tool layout files...\n');
  let created = 0;
  
  for (const toolSlug of toolConfigs) {
    const layoutPath = path.join(__dirname, `../src/app/tools/${toolSlug}/layout.tsx`);
    
    if (!fs.existsSync(layoutPath)) {
      // Create a basic layout file with OG metadata
      const toolName = toolSlug.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
      
      const layoutContent = `import type { Metadata } from 'next'
import { absoluteUrl } from '@/lib/url'

export const metadata: Metadata = {
  title: '${toolName} — ConvertMorph',
  description: 'Professional ${toolName.toLowerCase()} tool. Fast, private, free forever.',
  keywords: ["${toolSlug.replace('-', ' ')}", "${toolName.toLowerCase()}", "online tool", "free tool"],
  alternates: {
    canonical: absoluteUrl('/tools/${toolSlug}'),
  },
  openGraph: {
    title: '${toolName} — ConvertMorph',
    description: 'Professional ${toolName.toLowerCase()} tool. Fast, private, free forever.',
    images: [
      {
        url: absoluteUrl('/og/${toolSlug}.png'),
        width: 1200,
        height: 630,
        alt: '${toolName} - ConvertMorph',
      }
    ],
    type: 'website',
    url: absoluteUrl('/tools/${toolSlug}'),
    siteName: 'ConvertMorph',
  },
  twitter: {
    card: 'summary_large_image',
    title: '${toolName} — ConvertMorph',
    description: 'Professional ${toolName.toLowerCase()} tool. Fast, private, free forever.',
    images: [absoluteUrl('/og/${toolSlug}.png')],
  },
}

export default function ${toolSlug.split('-').map(word => 
  word.charAt(0).toUpperCase() + word.slice(1)
).join('')}Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
`;
      
      try {
        fs.writeFileSync(layoutPath, layoutContent);
        console.log(`✅ Created layout file for ${toolSlug}`);
        created++;
      } catch (error) {
        console.error(`❌ Error creating layout for ${toolSlug}:`, error.message);
      }
    }
  }
  
  return created;
}

// Main execution
function main() {
  console.log('🎯 Updating all OG image references...\n');
  
  const toolsUpdated = updateToolOGReferences();
  const layoutsCreated = generateMissingLayoutFiles();
  const toolImagesVerified = verifyToolOGImages();
  const blogImagesVerified = verifyBlogOGReferences();
  
  console.log('\n📊 Summary:');
  console.log(`✅ Tool layouts updated: ${toolsUpdated}`);
  console.log(`✅ Tool layouts created: ${layoutsCreated}`);
  console.log(`✅ Tool OG images verified: ${toolImagesVerified}/${toolConfigs.length}`);
  console.log(`✅ Blog OG images verified: ${blogImagesVerified}/${blogConfigs.length}`);
  
  const totalExpected = toolConfigs.length + blogConfigs.length;
  const totalVerified = toolImagesVerified + blogImagesVerified;
  
  console.log(`\n🎉 OG Image Integration: ${totalVerified}/${totalExpected} (${Math.round(totalVerified/totalExpected*100)}%)`);
  
  if (totalVerified === totalExpected) {
    console.log('\n🚀 All OG images are properly integrated!');
    console.log('📱 Your website is ready for stunning social media sharing.');
  } else {
    console.log('\n⚠️  Some OG images may be missing. Check the output above for details.');
  }
}

main();
