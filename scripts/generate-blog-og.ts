const fs = require('fs');
const { createCanvas } = require('canvas');

// Blog posts with their frontmatter data
const blogPosts = [
  { 
    slug: 'convert-images-to-pdf', 
    title: 'How to Convert Images to PDF Online',
    excerpt: 'Learn how to convert JPG, PNG, and other image formats to PDF files quickly and easily.'
  },
  { 
    slug: 'convert-pdf-to-images', 
    title: 'Convert PDF to Images: Complete Guide',
    excerpt: 'Extract pages from PDF files as high-quality images in various formats.'
  },
  { 
    slug: 'how-to-compress-pdf-files', 
    title: 'How to Compress PDF Files Online',
    excerpt: 'Reduce PDF file sizes while maintaining quality with our compression guide.'
  },
  { 
    slug: 'merge-pdf-files-online', 
    title: 'Merge PDF Files Online for Free',
    excerpt: 'Combine multiple PDF documents into a single file with our step-by-step guide.'
  },
  { 
    slug: 'split-pdf-pages', 
    title: 'Split PDF Pages: Easy Online Tool',
    excerpt: 'Learn how to extract specific pages or split PDF documents into separate files.'
  },
  { 
    slug: 'organize-pdf-pages', 
    title: 'Organize PDF Pages: Reorder and Rearrange',
    excerpt: 'Learn how to organize, reorder, and rearrange PDF pages with our free online tool.'
  },
  { 
    slug: 'add-watermark-to-pdf', 
    title: 'Add Watermark to PDF: Complete Guide',
    excerpt: 'Protect and brand your PDF documents with text or image watermarks using our free tool.'
  },
  { 
    slug: 'sign-pdf-documents', 
    title: 'Sign PDF Documents: Digital Signature Guide',
    excerpt: 'Add secure digital signatures to your PDF documents with our easy-to-use signing tool.'
  },
  { 
    slug: 'add-page-numbers-to-pdf', 
    title: 'Add Page Numbers to PDF: Professional Formatting',
    excerpt: 'Add professional page numbering to your PDF documents with customizable positioning and styles.'
  },
  { 
    slug: 'convertmorph-free-pdf-tools', 
    title: 'ConvertMorph - Free Online PDF Tools for Document Processing',
    excerpt: 'Discover ConvertMorph\'s comprehensive suite of free online PDF tools for secure document processing.'
  },
  { 
    slug: 'compress-images-online', 
    title: 'Compress Images Online: Reduce Image Size Without Quality Loss',
    excerpt: 'Learn how to compress images online effectively while maintaining quality. Complete guide to reducing JPEG, PNG, WebP file sizes.'
  },
  { 
    slug: 'resize-images-online', 
    title: 'Resize Images Online: Free Image Resizer Tool',
    excerpt: 'Resize images online for free with our powerful image resizer. Change image dimensions while maintaining quality for web, social media, and print.'
  },
  { 
    slug: 'convert-image-formats-online', 
    title: 'Convert Image Formats Online: Free Image Converter',
    excerpt: 'Convert images between JPEG, PNG, WebP, and other formats online. Free image format converter with quality control and batch processing.'
  },
  { 
    slug: 'crop-images-online', 
    title: 'Crop Images Online: Complete Guide to Image Cropping',
    excerpt: 'Learn how to crop images online with precision using professional tools. Complete guide to aspect ratios, batch cropping, and format conversion.'
  },
]

const BLOG_WIDTH = 1200, BLOG_HEIGHT = 630

// Ensure blog og directory exists
const blogOgDir = './public/og/blog'
if (!fs.existsSync(blogOgDir)) {
  fs.mkdirSync(blogOgDir, { recursive: true })
}

for (const post of blogPosts) {
  const canvas = createCanvas(BLOG_WIDTH, BLOG_HEIGHT)
  const ctx = canvas.getContext('2d')
  
  // Create gradient background (blue→cyan)
  const gradient = ctx.createLinearGradient(0, 0, BLOG_WIDTH, BLOG_HEIGHT)
  gradient.addColorStop(0, '#1e40af')  // blue-700
  gradient.addColorStop(1, '#06b6d4')  // cyan-500
  
  // Background with rounded corners
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.roundRect(0, 0, BLOG_WIDTH, BLOG_HEIGHT, 24)
  ctx.fill()
  
  // Blog icon
  ctx.fillStyle = 'white'
  ctx.font = 'bold 48px Inter, -apple-system, BlinkMacSystemFont, sans-serif'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  ctx.fillText('📝', 80, 120)
  
  // Blog title - handle text wrapping
  ctx.font = 'bold 52px Inter, -apple-system, BlinkMacSystemFont, sans-serif'
  ctx.fillStyle = 'white'
  
  const words = post.title.split(' ')
  let line = ''
  let y = 200
  const maxWidth = 1040 // Leave margin on right
  const lineHeight = 65
  
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' '
    const metrics = ctx.measureText(testLine)
    const testWidth = metrics.width
    
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line.trim(), 80, y)
      line = words[n] + ' '
      y += lineHeight
    } else {
      line = testLine
    }
  }
  ctx.fillText(line.trim(), 80, y)
  
  // Excerpt
  ctx.font = '32px Inter, -apple-system, BlinkMacSystemFont, sans-serif'
  ctx.globalAlpha = 0.9
  
  // Handle excerpt wrapping
  const excerptWords = post.excerpt.split(' ')
  let excerptLine = ''
  let excerptY = y + 80
  const excerptMaxWidth = 1040
  const excerptLineHeight = 45
  
  for (let n = 0; n < excerptWords.length; n++) {
    const testLine = excerptLine + excerptWords[n] + ' '
    const metrics = ctx.measureText(testLine)
    const testWidth = metrics.width
    
    if (testWidth > excerptMaxWidth && n > 0) {
      ctx.fillText(excerptLine.trim(), 80, excerptY)
      excerptLine = excerptWords[n] + ' '
      excerptY += excerptLineHeight
    } else {
      excerptLine = testLine
    }
  }
  ctx.fillText(excerptLine.trim(), 80, excerptY)
  
  // ConvertMorph.com footer
  ctx.font = '28px Inter, -apple-system, BlinkMacSystemFont, sans-serif'
  ctx.globalAlpha = 0.7
  ctx.fillText('ConvertMorph.com', 80, 550)
  
  // Reset alpha
  ctx.globalAlpha = 1.0
  
  // Save the image
  const buffer = canvas.toBuffer('image/png')
  fs.writeFileSync(`${blogOgDir}/${post.slug}.png`, buffer)
  console.log(`✅ Generated blog OG image for ${post.title}`)
}

console.log('🎉 All blog OG images generated successfully!')
