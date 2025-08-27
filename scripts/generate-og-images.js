const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

// Ensure og directories exist
const ogDir = path.join(__dirname, '../public/og');
const blogOgDir = path.join(__dirname, '../public/og/blog');

if (!fs.existsSync(ogDir)) {
  fs.mkdirSync(ogDir, { recursive: true });
}
if (!fs.existsSync(blogOgDir)) {
  fs.mkdirSync(blogOgDir, { recursive: true });
}

// Brand colors
const colors = {
  primary: '#2563eb',
  primaryLight: '#3b82f6',
  grayBg: '#f9fafb',
  gray700: '#374151',
  gray900: '#111827',
  white: '#ffffff'
};

// Tool definitions
const tools = [
  { key: 'compress', name: 'Compress PDF', description: 'Reduce PDF file size instantly' },
  { key: 'merge', name: 'Merge PDF', description: 'Combine multiple PDFs into one' },
  { key: 'split', name: 'Split PDF', description: 'Extract pages from PDF files' },
  { key: 'to-images', name: 'PDF to Images', description: 'Convert PDF pages to images' },
  { key: 'images-to-pdf', name: 'Images to PDF', description: 'Convert images to PDF' },
  { key: 'organize', name: 'Organize PDF', description: 'Reorder and manage PDF pages' },
  { key: 'watermark', name: 'Watermark PDF', description: 'Add watermarks to PDF files' },
  { key: 'pagenum', name: 'Add Page Numbers', description: 'Number PDF pages automatically' },
  { key: 'sign', name: 'Sign PDF', description: 'Add digital signatures to PDFs' }
];

// Blog posts
const blogPosts = [
  { slug: 'convert-images-to-pdf', title: 'How to Convert Images to PDF Online' },
  { slug: 'convert-pdf-to-images', title: 'Convert PDF to Images: Complete Guide' },
  { slug: 'how-to-compress-pdf-files', title: 'How to Compress PDF Files Online' },
  { slug: 'merge-pdf-files-online', title: 'Merge PDF Files Online for Free' },
  { slug: 'split-pdf-pages', title: 'Split PDF Pages: Easy Online Tool' }
];

// Create logo mark SVG as canvas drawing
function drawLogoMark(ctx, x, y, size = 48) {
  const scale = size / 48;
  
  // Background circle with gradient
  const gradient = ctx.createLinearGradient(x, y, x + size, y + size);
  gradient.addColorStop(0, colors.primaryLight);
  gradient.addColorStop(1, colors.primary);
  
  ctx.strokeStyle = gradient;
  ctx.fillStyle = gradient;
  ctx.globalAlpha = 0.1;
  ctx.beginPath();
  ctx.arc(x + size/2, y + size/2, 22 * scale, 0, 2 * Math.PI);
  ctx.fill();
  ctx.globalAlpha = 1;
  ctx.lineWidth = 1 * scale;
  ctx.stroke();
  
  // Document 1 (left)
  const docGradient = ctx.createLinearGradient(x, y, x + size, y + size);
  docGradient.addColorStop(0, '#f8fafc');
  docGradient.addColorStop(1, '#e2e8f0');
  
  ctx.fillStyle = docGradient;
  ctx.strokeStyle = '#cbd5e1';
  ctx.lineWidth = 1 * scale;
  roundRect(ctx, x + 8 * scale, y + 12 * scale, 14 * scale, 18 * scale, 2 * scale);
  ctx.fill();
  ctx.stroke();
  
  // Document 1 lines
  ctx.fillStyle = '#64748b';
  roundRect(ctx, x + 10 * scale, y + 16 * scale, 10 * scale, 1.5 * scale, 0.75 * scale);
  ctx.fill();
  roundRect(ctx, x + 10 * scale, y + 19 * scale, 7 * scale, 1.5 * scale, 0.75 * scale);
  ctx.fill();
  roundRect(ctx, x + 10 * scale, y + 22 * scale, 8 * scale, 1.5 * scale, 0.75 * scale);
  ctx.fill();
  roundRect(ctx, x + 10 * scale, y + 25 * scale, 6 * scale, 1.5 * scale, 0.75 * scale);
  ctx.fill();
  
  // Arrow (center)
  const arrowGradient = ctx.createLinearGradient(x, y, x + size, y + size);
  arrowGradient.addColorStop(0, colors.primaryLight);
  arrowGradient.addColorStop(1, colors.primary);
  
  ctx.fillStyle = arrowGradient;
  ctx.globalAlpha = 0.2;
  ctx.beginPath();
  ctx.arc(x + 24 * scale, y + 24 * scale, 6 * scale, 0, 2 * Math.PI);
  ctx.fill();
  ctx.globalAlpha = 1;
  
  ctx.strokeStyle = colors.primary;
  ctx.lineWidth = 3 * scale;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(x + 20 * scale, y + 24 * scale);
  ctx.lineTo(x + 28 * scale, y + 24 * scale);
  ctx.moveTo(x + 25 * scale, y + 21 * scale);
  ctx.lineTo(x + 28 * scale, y + 24 * scale);
  ctx.lineTo(x + 25 * scale, y + 27 * scale);
  ctx.stroke();
  
  // Document 2 (right)
  const morphGradient = ctx.createLinearGradient(x, y, x + size, y + size);
  morphGradient.addColorStop(0, '#dbeafe');
  morphGradient.addColorStop(1, '#bfdbfe');
  
  ctx.fillStyle = morphGradient;
  ctx.strokeStyle = colors.primary;
  ctx.lineWidth = 1 * scale;
  roundRect(ctx, x + 26 * scale, y + 12 * scale, 14 * scale, 18 * scale, 2 * scale);
  ctx.fill();
  ctx.stroke();
  
  // Document 2 lines
  ctx.fillStyle = colors.primary;
  roundRect(ctx, x + 28 * scale, y + 16 * scale, 10 * scale, 1.5 * scale, 0.75 * scale);
  ctx.fill();
  roundRect(ctx, x + 28 * scale, y + 19 * scale, 7 * scale, 1.5 * scale, 0.75 * scale);
  ctx.fill();
  roundRect(ctx, x + 28 * scale, y + 22 * scale, 8 * scale, 1.5 * scale, 0.75 * scale);
  ctx.fill();
  roundRect(ctx, x + 28 * scale, y + 25 * scale, 9 * scale, 1.5 * scale, 0.75 * scale);
  ctx.fill();
}

// Helper function for rounded rectangles
function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

// Generate base OG template
async function generateBaseTemplate() {
  const canvas = createCanvas(1200, 630);
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = colors.white;
  ctx.fillRect(0, 0, 1200, 630);
  
  // Subtle gray background
  ctx.fillStyle = colors.grayBg;
  ctx.fillRect(0, 0, 1200, 630);
  
  // Left side - Logo mark
  drawLogoMark(ctx, 80, 100, 120);
  
  // Right side - Headline placeholder
  ctx.fillStyle = colors.gray900;
  ctx.font = 'bold 64px Inter, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('ConvertMorph', 300, 200);
  
  ctx.font = 'bold 48px Inter, sans-serif';
  ctx.fillStyle = colors.primary;
  ctx.fillText('PDF Tools', 300, 280);
  
  // Bottom - Tagline
  ctx.font = '32px Inter, sans-serif';
  ctx.fillStyle = colors.gray700;
  ctx.fillText('Fast, Private, Free Forever', 300, 450);
  
  // Save
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(path.join(ogDir, 'og-template.png'), buffer);
  console.log('✅ Generated base OG template');
}

// Generate tool-specific OG images
async function generateToolImages() {
  for (const tool of tools) {
    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext('2d');
    
    // Background
    ctx.fillStyle = colors.white;
    ctx.fillRect(0, 0, 1200, 630);
    
    // Top - Logo mark
    drawLogoMark(ctx, 80, 60, 80);
    
    // ConvertMorph text next to logo
    ctx.fillStyle = colors.gray900;
    ctx.font = 'bold 32px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('ConvertMorph', 180, 110);
    
    // Middle - Tool name
    ctx.fillStyle = colors.primary;
    ctx.font = 'bold 72px Inter, sans-serif';
    ctx.textAlign = 'center';
    
    // Calculate text width and adjust if needed
    const toolNameMetrics = ctx.measureText(tool.name);
    if (toolNameMetrics.width > 1000) {
      ctx.font = 'bold 60px Inter, sans-serif';
    }
    
    ctx.fillText(tool.name, 600, 320);
    
    // Bottom - Tagline
    ctx.font = '36px Inter, sans-serif';
    ctx.fillStyle = colors.gray700;
    ctx.textAlign = 'center';
    ctx.fillText('Fast, Private, Free Forever', 600, 480);
    
    // Save
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(ogDir, `og-${tool.key}.png`), buffer);
    console.log(`✅ Generated OG image for ${tool.name}`);
  }
}

// Generate blog OG images
async function generateBlogImages() {
  for (const post of blogPosts) {
    const canvas = createCanvas(1200, 630);
    const ctx = canvas.getContext('2d');
    
    // Background with subtle pattern
    ctx.fillStyle = colors.white;
    ctx.fillRect(0, 0, 1200, 630);
    
    // Subtle background pattern
    ctx.fillStyle = colors.grayBg;
    for (let i = 0; i < 1200; i += 40) {
      for (let j = 0; j < 630; j += 40) {
        if ((i + j) % 80 === 0) {
          ctx.fillRect(i, j, 20, 20);
        }
      }
    }
    
    // Logo mark top-left
    drawLogoMark(ctx, 60, 60, 60);
    
    // ConvertMorph text
    ctx.fillStyle = colors.gray700;
    ctx.font = 'bold 24px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('ConvertMorph', 140, 100);
    
    // Blog title in center
    ctx.fillStyle = colors.gray900;
    ctx.font = 'bold 48px Inter, sans-serif';
    ctx.textAlign = 'center';
    
    // Handle long titles by wrapping text
    const words = post.title.split(' ');
    let line = '';
    let y = 280;
    const maxWidth = 1000;
    
    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, 600, y);
        line = words[n] + ' ';
        y += 60;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 600, y);
    
    // Blog label
    ctx.font = '28px Inter, sans-serif';
    ctx.fillStyle = colors.primary;
    ctx.textAlign = 'center';
    ctx.fillText('Blog', 600, 450);
    
    // Save
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(path.join(blogOgDir, `${post.slug}.png`), buffer);
    console.log(`✅ Generated blog OG image for ${post.title}`);
  }
}

// Main execution
async function generateAllImages() {
  console.log('🎨 Generating OG images for ConvertMorph...\n');
  
  try {
    await generateBaseTemplate();
    await generateToolImages();
    await generateBlogImages();
    
    console.log('\n🎉 All OG images generated successfully!');
    console.log(`📁 Images saved to: ${ogDir}`);
  } catch (error) {
    console.error('❌ Error generating OG images:', error);
    process.exit(1);
  }
}

generateAllImages();
