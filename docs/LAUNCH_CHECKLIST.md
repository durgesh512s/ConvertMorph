# ConvertMorph Launch Checklist

This checklist ensures ConvertMorph is 100% ready for public launch. Complete all items before deploying to production.

## Automated Testing & Performance
- [ ] All Cypress tests passing
- [ ] Lighthouse: Performance ≥90, Accessibility ≥95, SEO ≥95, Best Practices ≥95

## SEO & Discoverability
- [ ] Robots.txt excludes /api/
- [ ] Sitemap includes /tools and /blog
- [ ] JSON-LD valid for tools + blog (SoftwareApplication, FAQ, Article)
- [ ] OG images show in social previews
- [ ] Favicon + manifest + app icons present

## Security & Headers
- [ ] Headers: CSP, Referrer, Nosniff, Permissions
- [ ] No console errors in browser
- [ ] Error messages user-friendly

## Progressive Web App
- [ ] PWA install works; downloads bypass cache
- [ ] Service worker functioning correctly

## Content & Monetization
- [ ] AdSense placeholders present; no layout shift
- [ ] Privacy Policy, Terms, About, Contact pages present
- [ ] Blog has ≥5 posts live

## Pre-Launch Commands
Run these commands to verify readiness:

```bash
# Run all automated checks
npm run prelaunch

# Check AdSense compliance
npm run check:adsense

# Run Lighthouse CI
npm run lhci
```

## Manual Verification
- [ ] Test all PDF tools with various file sizes
- [ ] Verify mobile responsiveness
- [ ] Check dark/light theme switching
- [ ] Test PWA installation on mobile devices
- [ ] Verify analytics tracking works
- [ ] Test error handling with invalid files

## Deployment Readiness
- [ ] GitHub Actions passing
- [ ] Environment variables configured
- [ ] CDN/hosting configured
- [ ] Domain DNS configured
- [ ] SSL certificate active

---

**Launch Approval**: Once all items are checked, the project is ready for public launch.
