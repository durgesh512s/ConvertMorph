import fsOg from 'fs'
import { createCanvas as createCanvasOg } from 'canvas'

const tools = [
  { slug: 'pdf-compress', title: 'Compress PDF', tagline: 'Fast, Private, Free Forever', icon: '📄' },
  { slug: 'pdf-merge', title: 'Merge PDF', tagline: 'Combine Files in Seconds', icon: '➕' },
  { slug: 'pdf-split', title: 'Split PDF', tagline: 'Divide Pages Easily', icon: '✂️' },
  { slug: 'images-to-pdf', title: 'Images → PDF', tagline: 'Convert JPG/PNG to PDF', icon: '🖼️' },
  { slug: 'pdf-to-images', title: 'PDF → Images', tagline: 'Extract Pages as Images', icon: '📸' },
  { slug: 'pdf-organize', title: 'Organize PDF', tagline: 'Reorder Pages Visually', icon: '🔄' },
  { slug: 'pdf-watermark', title: 'Watermark PDF', tagline: 'Add Text Watermarks', icon: '💧' },
  { slug: 'pdf-pagenum', title: 'Page Numbers', tagline: 'Number PDF Pages', icon: '#️⃣' },
  { slug: 'pdf-sign', title: 'Sign PDF', tagline: 'Digital Signatures', icon: '✍️' },
]

const OG_WIDTH = 1200, OG_HEIGHT = 630

// Ensure og directory exists
const ogDir = './public/og'
if (!fsOg.existsSync(ogDir)) {
  fsOg.mkdirSync(ogDir, { recursive: true })
}

for (const tool of tools) {
  const canvas = createCanvasOg(OG_WIDTH, OG_HEIGHT)
  const ctx = canvas.getContext('2d')
  
  // Create gradient background (blue→cyan)
  const gradient = ctx.createLinearGradient(0, 0, OG_WIDTH, OG_HEIGHT)
  gradient.addColorStop(0, '#1e40af')  // blue-700
  gradient.addColorStop(1, '#06b6d4')  // cyan-500
  
  // Background with rounded corners
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.roundRect(0, 0, OG_WIDTH, OG_HEIGHT, 24)
  ctx.fill()
  
  // Tool icon and title
  ctx.fillStyle = 'white'
  ctx.font = 'bold 64px Inter, -apple-system, BlinkMacSystemFont, sans-serif'
  ctx.textAlign = 'left'
  ctx.textBaseline = 'middle'
  
  const iconText = `${tool.icon} ${tool.title}`
  ctx.fillText(iconText, 80, 200)
  
  // Tagline
  ctx.font = '36px Inter, -apple-system, BlinkMacSystemFont, sans-serif'
  ctx.globalAlpha = 0.9
  ctx.fillText(tool.tagline, 80, 300)
  
  // ConvertMorph.com footer
  ctx.font = '28px Inter, -apple-system, BlinkMacSystemFont, sans-serif'
  ctx.globalAlpha = 0.7
  ctx.fillText('ConvertMorph.com', 80, 500)
  
  // Reset alpha
  ctx.globalAlpha = 1.0
  
  // Save the image
  const buffer = canvas.toBuffer('image/png')
  fsOg.writeFileSync(`${ogDir}/${tool.slug}.png`, buffer)
  console.log(`✅ Generated OG image for ${tool.title}`)
}

console.log('🎉 All branded OG images generated successfully!')
