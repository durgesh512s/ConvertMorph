# ConvertMorph
Fast, private PDF & image tools. Many operations run locally in your browser.

## 🚀 Features

- **PDF Compress** - Reduce file size with multiple compression levels
- **PDF Merge** - Combine multiple PDFs into one document
- **PDF Split** - Split PDFs by page ranges or individual pages
- **Images to PDF** - Convert JPG/PNG images to PDF format
- **PDF to Images** - Extract PDF pages as high-quality images

## 🔒 Privacy First

- **Local Processing** - Many tools run entirely in your browser
- **Auto-Delete** - Temporary files deleted within 1 hour
- **No Tracking** - Your files never leave your device for local operations
- **Secure** - HTTPS encryption and minimal data collection

## 🛠️ Tech Stack

- **Framework** - Next.js 14 with App Router
- **Language** - TypeScript
- **Styling** - Tailwind CSS + shadcn/ui
- **PDF Processing** - pdf-lib, pdfjs-dist
- **Image Processing** - sharp
- **File Validation** - file-type, zod
- **Icons** - Lucide React

## 📦 Local Development

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/docmorph.git
cd docmorph

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Environment Variables

See `.env.example` for all available configuration options:

```bash
# Site Configuration
SITE_URL=http://localhost:3000

# File Processing Limits
MAX_FILE_SIZE_MB=25
MAX_PAGES=200
JOB_TIMEOUT_MS=90000

# Security
ALLOWED_MIMES=application/pdf,image/jpeg,image/png
RATE_LIMIT_POINTS=60
RATE_LIMIT_DURATION=3600
```

## 🏗️ Project Structure

```
docmorph/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── tools/          # PDF tool pages
│   │   ├── about/          # About page
│   │   ├── blog/           # Blog section
│   │   ├── contact/        # Contact page
│   │   └── privacy/        # Privacy policy
│   ├── components/         # Reusable UI components
│   │   ├── Dropzone.tsx    # File upload component
│   │   ├── Navbar.tsx      # Navigation
│   │   └── Footer.tsx      # Footer
│   └── lib/                # Utility libraries
│       ├── pdf/            # PDF processing utilities
│       ├── validation/     # File validation
│       └── storage/        # Temporary file management
├── public/                 # Static assets
│   ├── robots.txt         # SEO robots file
│   └── sitemap.xml        # SEO sitemap
└── README.md
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Docker

```bash
# Build image
docker build -t docmorph .

# Run container
docker run -p 3000:3000 docmorph
```

## 📊 Performance

- **Lighthouse Score** - 95+ across all metrics
- **Core Web Vitals** - Optimized for LCP, FID, CLS
- **Bundle Size** - Optimized with code splitting
- **Local Processing** - Zero server round-trips for many operations

## 🔐 Security

- **File Validation** - Strict MIME type and size checking
- **Rate Limiting** - Prevents abuse and DoS attacks
- **HTTPS Only** - All traffic encrypted in production
- **No File Storage** - Files auto-deleted after processing
- **CSP Headers** - Content Security Policy implemented

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 API Reference

### File Processing Limits

| Limit | Value |
|-------|-------|
| Max file size | 25MB |
| Max pages per PDF | 200 |
| Max files per batch | 20 |
| Processing timeout | 90 seconds |

### Supported Formats

| Input | Output |
|-------|--------|
| PDF | PDF (compressed, split, merged) |
| JPG/JPEG | PDF |
| PNG | PDF |
| PDF | JPG/PNG images |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation** - Check this README and inline comments
- **Issues** - Report bugs via GitHub Issues
- **Email** - support@docmorph.com
- **Response Time** - Usually within 24 hours

## 🗺️ Roadmap

### Phase 1 (Current)
- [x] Core PDF tools (compress, merge, split)
- [x] Image conversion tools
- [x] Local browser processing
- [x] Responsive UI/UX

### Phase 2 (Next)
- [ ] Advanced PDF features (watermarks, page numbers)
- [ ] OCR text extraction
- [ ] Batch processing improvements
- [ ] PWA support

### Phase 3 (Future)
- [ ] Image editing tools
- [ ] Finance calculators
- [ ] Multi-language support
- [ ] Advanced compression algorithms

## 📈 Analytics

We collect minimal, privacy-focused analytics:
- Page views and tool usage
- Error rates and performance metrics
- Device and browser information (anonymized)

No personal information or file contents are tracked.

## 🔄 Updates

- **Automatic Updates** - New features deployed automatically
- **Breaking Changes** - Communicated via changelog
- **Security Updates** - Applied immediately

---

Built with ❤️ for privacy and performance.
