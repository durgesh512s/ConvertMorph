import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const tools = [
  { slug: 'pdf-split', oldImage: 'og-split.png' },
  { slug: 'images-to-pdf', oldImage: 'og-images-to-pdf.png' },
  { slug: 'pdf-to-images', oldImage: 'og-to-images.png' },
  { slug: 'pdf-organize', oldImage: 'og-organize.png' },
  { slug: 'pdf-watermark', oldImage: 'og-watermark.png' },
  { slug: 'pdf-pagenum', oldImage: 'og-pagenum.png' },
  { slug: 'pdf-sign', oldImage: 'og-sign.png' },
]

for (const tool of tools) {
  const layoutPath = path.join(__dirname, `../src/app/tools/${tool.slug}/layout.tsx`)
  
  if (fs.existsSync(layoutPath)) {
    let content = fs.readFileSync(layoutPath, 'utf8')
    
    // Replace old OG image path with new one
    const newImage = `${tool.slug}.png`
    content = content.replace(new RegExp(`/og/${tool.oldImage}`, 'g'), `/og/${newImage}`)
    
    fs.writeFileSync(layoutPath, content)
    console.log(`✅ Updated metadata for ${tool.slug}`)
  } else {
    console.log(`⚠️  Layout file not found for ${tool.slug}`)
  }
}

console.log('🎉 All tool metadata updated successfully!')
