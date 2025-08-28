# OG Cache Busting & Re-scrape Guide

Social media platforms cache Open Graph images and metadata aggressively. This guide helps you force fresh previews during development and testing.

## Cache Busting Strategies

### 1. Version Query Parameters
Add version parameters to your OG image URLs when testing:

```typescript
// In your metadata
openGraph: { 
  images: [absoluteUrl('/og/og-compress.png?v=dev1')] 
},
twitter: { 
  card: 'summary_large_image', 
  images: [absoluteUrl('/og/og-compress.png?v=dev1')] 
}
```

Increment the version (`dev1` → `dev2` → `dev3`) each time you update images.

### 2. Timestamp Parameters
For automated cache busting:

```typescript
const timestamp = Date.now();
openGraph: { 
  images: [absoluteUrl(`/og/og-compress.png?t=${timestamp}`)] 
}
```

## Platform-Specific Re-scraping

### Facebook/WhatsApp Debugger
1. Go to: https://developers.facebook.com/tools/debug/
2. Enter your URL
3. Click **"Scrape Again"** button
4. Verify the new image appears

### LinkedIn Post Inspector
1. Go to: https://www.linkedin.com/post-inspector/
2. Enter your URL
3. Click **"Inspect"**
4. If cached, wait 24 hours or try with version parameter

### Twitter/X Card Validator
1. Go to: https://cards-dev.twitter.com/validator
2. Enter your URL
3. Click **"Preview card"**
4. Re-validate if needed

## Development Workflow

1. **Update OG images** or metadata
2. **Add version parameter**: `?v=dev2`
3. **Test locally**: Visit `/og-debug` to verify tags
4. **Force re-scrape** on each platform
5. **Verify previews** show updated content

## Common Issues

- **Stale images**: Always increment version parameter
- **Mixed content**: Ensure HTTPS tunnel for image URLs
- **404 errors**: Verify image paths are correct
- **Size issues**: OG images should be 1200x630px

## Quick Commands

```bash
# Update SITE_URL to tunnel
npm run og:set https://abc123.loca.lt

# Open validators automatically
npm run og:validators https://abc123.loca.lt/tools/pdf-compress
