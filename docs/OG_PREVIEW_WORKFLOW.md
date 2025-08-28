# OG/Twitter Preview Test Pack — ConvertMorph

Complete workflow for testing Open Graph (WhatsApp/FB), LinkedIn, and Twitter cards from localhost.

## Quick Start

1. **Install dependencies** (if not already installed):
   ```bash
   cd docmorph
   npm install
   ```

2. **Start development with tunnel**:
   ```bash
   npm run dev:tunnel
   ```
   This will start Next.js dev server and create a public tunnel URL.

3. **Copy the tunnel URL** from the terminal output (e.g., `https://abc123.loca.lt`)

4. **Set SITE_URL environment variable**:
   ```bash
   npm run og:set https://abc123.loca.lt
   ```

5. **Restart the dev server** to pick up the new SITE_URL:
   ```bash
   # Stop the current dev:tunnel process (Ctrl+C)
   npm run dev:tunnel
   ```

6. **Test the debug route**:
   Visit `https://abc123.loca.lt/og-debug` to verify meta tags are using absolute URLs.

7. **Open social media validators**:
   ```bash
   npm run og:validators https://abc123.loca.lt/tools/pdf-compress
   ```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run tunnel` | Start localtunnel only (port 3000) |
| `npm run dev:tunnel` | Start Next.js dev + tunnel concurrently |
| `npm run og:set <url>` | Set SITE_URL in .env.local |
| `npm run og:validators <url>` | Open social media validators |

## Testing URLs

After setting up your tunnel, test these pages:

- **PDF Compress**: `<TUNNEL_URL>/tools/pdf-compress`
- **PDF Merge**: `<TUNNEL_URL>/tools/pdf-merge`
- **PDF Split**: `<TUNNEL_URL>/tools/pdf-split`
- **Images to PDF**: `<TUNNEL_URL>/tools/images-to-pdf`
- **Debug Route**: `<TUNNEL_URL>/og-debug`

## Social Media Validators

### Facebook/WhatsApp Debugger
- URL: https://developers.facebook.com/tools/debug/
- Enter your tunnel URL + tool path
- Click **"Scrape Again"** if you see cached data

### LinkedIn Post Inspector
- URL: https://www.linkedin.com/post-inspector/
- Enter your tunnel URL + tool path
- Re-inspect if needed

### Twitter/X Card Validator
- URL: https://cards-dev.twitter.com/validator
- Manually paste your URL and validate

## Cache Busting

If you see stale images or metadata:

1. **Add version parameter** to OG images:
   ```typescript
   images: [absoluteUrl('/og/og-compress.png?v=dev2')]
   ```

2. **Force re-scrape** on each platform using their respective buttons

3. **Increment version** each time you update images

## File Structure

```
docmorph/
├── src/lib/url.ts                    # Absolute URL helper
├── src/app/og-debug/route.ts         # Meta debug route
├── scripts/
│   ├── set-site-url.js              # SITE_URL switcher
│   ├── validators.js                # Open validators script
│   └── open-validators.md           # Manual validator links
├── docs/
│   ├── OG_CACHE_BUSTING.md          # Cache busting guide
│   └── OG_PREVIEW_WORKFLOW.md       # This file
└── cypress/e2e/seo/og-meta.cy.ts    # Automated OG tests
```

## Troubleshooting

### Tunnel Issues
- **Connection refused**: Restart tunnel with `npm run tunnel`
- **Different URL**: Update SITE_URL with new tunnel URL
- **HTTPS required**: Localtunnel provides HTTPS by default

### Meta Tag Issues
- **Relative URLs**: Ensure `absoluteUrl()` is used in metadata
- **Missing images**: Check OG image files exist in `/public/og/`
- **Cached previews**: Use version parameters and force re-scrape

### Development Issues
- **SITE_URL not updating**: Restart Next.js dev server after setting
- **ESLint errors**: Scripts use CommonJS (normal for Node.js scripts)
- **Port conflicts**: Change port in tunnel scripts if needed

## Automated Testing

Run the OG meta tests:
```bash
npm run test:e2e -- --spec "cypress/e2e/seo/og-meta.cy.ts"
```

This validates that all tool pages have proper Open Graph and Twitter meta tags.

## Production Deployment

Before deploying:

1. **Remove version parameters** from OG image URLs
2. **Set production SITE_URL** in environment variables
3. **Test with production domain** using validators
4. **Run full test suite** including OG meta tests

---

With this workflow, you can confidently preview how ConvertMorph will appear when shared on WhatsApp, Facebook, LinkedIn, and Twitter before going live.
