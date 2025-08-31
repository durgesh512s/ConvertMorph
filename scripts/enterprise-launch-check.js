#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 ConvertMorph Enterprise Launch Checklist\n');

const checks = [];

// Check 1: Vercel Analytics Integration
function checkVercelAnalytics() {
  try {
    const layoutContent = fs.readFileSync('src/app/layout.tsx', 'utf8');
    const vercelAnalyticsContent = fs.readFileSync('src/components/VercelAnalytics.tsx', 'utf8');
    
    // Check if VercelAnalytics component exists and contains both Analytics and SpeedInsights
    const hasVercelAnalyticsComponent = fs.existsSync('src/components/VercelAnalytics.tsx');
    const hasAnalyticsInComponent = vercelAnalyticsContent.includes('@vercel/analytics') && vercelAnalyticsContent.includes('<Analytics />');
    const hasSpeedInsightsInComponent = vercelAnalyticsContent.includes('@vercel/speed-insights') && vercelAnalyticsContent.includes('<SpeedInsights />');
    const isIntegratedInLayout = layoutContent.includes('VercelAnalytics') && layoutContent.includes('<VercelAnalytics />');
    
    if (hasVercelAnalyticsComponent && hasAnalyticsInComponent && hasSpeedInsightsInComponent && isIntegratedInLayout) {
      checks.push({ name: '✅ Vercel Analytics & Speed Insights', status: 'PASS' });
    } else {
      checks.push({ name: '❌ Vercel Analytics & Speed Insights', status: 'FAIL' });
    }
  } catch (error) {
    checks.push({ name: '❌ Vercel Analytics Check', status: 'ERROR', error: error.message });
  }
}

// Check 2: Error Pages
function checkErrorPages() {
  const errorPages = ['src/app/not-found.tsx', 'src/app/error.tsx', 'src/app/500.tsx'];
  let allExist = true;
  
  errorPages.forEach(page => {
    if (!fs.existsSync(page)) {
      allExist = false;
    }
  });
  
  if (allExist) {
    checks.push({ name: '✅ Error Pages (404, 500, error)', status: 'PASS' });
  } else {
    checks.push({ name: '❌ Error Pages Missing', status: 'FAIL' });
  }
}

// Check 3: Security Headers
function checkSecurityHeaders() {
  try {
    const nextConfig = fs.readFileSync('next.config.ts', 'utf8');
    const vercelConfig = fs.readFileSync('vercel.json', 'utf8');
    
    const hasCSP = nextConfig.includes('Content-Security-Policy');
    const hasHSTS = nextConfig.includes('Strict-Transport-Security');
    const hasXFrame = nextConfig.includes('X-Frame-Options');
    const hasXContentType = nextConfig.includes('X-Content-Type-Options');
    
    if (hasCSP && hasHSTS && hasXFrame && hasXContentType) {
      checks.push({ name: '✅ Security Headers (CSP, HSTS, X-Frame, etc.)', status: 'PASS' });
    } else {
      checks.push({ name: '❌ Security Headers Incomplete', status: 'FAIL' });
    }
  } catch (error) {
    checks.push({ name: '❌ Security Headers Check', status: 'ERROR', error: error.message });
  }
}

// Check 4: Performance Monitoring
function checkPerformanceMonitoring() {
  try {
    const perfMonitorExists = fs.existsSync('src/components/PerformanceMonitor.tsx');
    const layoutContent = fs.readFileSync('src/app/layout.tsx', 'utf8');
    const isIntegrated = layoutContent.includes('PerformanceMonitor');
    
    if (perfMonitorExists && isIntegrated) {
      checks.push({ name: '✅ Performance Monitoring', status: 'PASS' });
    } else {
      checks.push({ name: '❌ Performance Monitoring', status: 'FAIL' });
    }
  } catch (error) {
    checks.push({ name: '❌ Performance Monitoring Check', status: 'ERROR', error: error.message });
  }
}

// Check 5: Build Success
function checkBuild() {
  try {
    console.log('🔨 Running production build...');
    execSync('npm run build', { stdio: 'pipe' });
    checks.push({ name: '✅ Production Build', status: 'PASS' });
  } catch (error) {
    checks.push({ name: '❌ Production Build Failed', status: 'FAIL', error: error.message });
  }
}

// Check 6: TypeScript Compilation
function checkTypeScript() {
  try {
    execSync('npx tsc --noEmit', { stdio: 'pipe' });
    checks.push({ name: '✅ TypeScript Compilation', status: 'PASS' });
  } catch (error) {
    checks.push({ name: '❌ TypeScript Errors', status: 'FAIL', error: error.message });
  }
}

// Check 7: ESLint
function checkLinting() {
  try {
    execSync('npm run lint', { stdio: 'pipe' });
    checks.push({ name: '✅ ESLint Checks', status: 'PASS' });
  } catch (error) {
    checks.push({ name: '❌ ESLint Errors', status: 'FAIL', error: error.message });
  }
}

// Check 8: SEO Metadata
function checkSEOMetadata() {
  try {
    const layoutContent = fs.readFileSync('src/app/layout.tsx', 'utf8');
    const hasMetadata = layoutContent.includes('export const metadata');
    const hasOG = layoutContent.includes('openGraph');
    const hasTwitter = layoutContent.includes('twitter');
    const hasRobots = layoutContent.includes('robots');
    
    if (hasMetadata && hasOG && hasTwitter && hasRobots) {
      checks.push({ name: '✅ SEO Metadata Complete', status: 'PASS' });
    } else {
      checks.push({ name: '❌ SEO Metadata Incomplete', status: 'FAIL' });
    }
  } catch (error) {
    checks.push({ name: '❌ SEO Metadata Check', status: 'ERROR', error: error.message });
  }
}

// Check 9: Sitemap
function checkSitemap() {
  const sitemapExists = fs.existsSync('src/app/sitemap.ts');
  if (sitemapExists) {
    checks.push({ name: '✅ Sitemap Configuration', status: 'PASS' });
  } else {
    checks.push({ name: '❌ Sitemap Missing', status: 'FAIL' });
  }
}

// Check 10: Robots.txt
function checkRobots() {
  const robotsExists = fs.existsSync('src/app/robots.ts');
  if (robotsExists) {
    checks.push({ name: '✅ Robots.txt Configuration', status: 'PASS' });
  } else {
    checks.push({ name: '❌ Robots.txt Missing', status: 'FAIL' });
  }
}

// Run all checks
async function runChecks() {
  console.log('Running enterprise launch checks...\n');
  
  checkVercelAnalytics();
  checkErrorPages();
  checkSecurityHeaders();
  checkPerformanceMonitoring();
  checkSEOMetadata();
  checkSitemap();
  checkRobots();
  checkTypeScript();
  checkLinting();
  checkBuild(); // Run build last as it takes time
  
  // Display results
  console.log('\n📊 ENTERPRISE LAUNCH CHECKLIST RESULTS\n');
  console.log('='.repeat(50));
  
  let passCount = 0;
  let failCount = 0;
  
  checks.forEach(check => {
    console.log(check.name);
    if (check.error) {
      console.log(`   Error: ${check.error.substring(0, 100)}...`);
    }
    if (check.status === 'PASS') passCount++;
    if (check.status === 'FAIL' || check.status === 'ERROR') failCount++;
  });
  
  console.log('='.repeat(50));
  console.log(`✅ Passed: ${passCount}`);
  console.log(`❌ Failed: ${failCount}`);
  console.log(`📊 Success Rate: ${Math.round((passCount / checks.length) * 100)}%`);
  
  if (failCount === 0) {
    console.log('\n🎉 READY FOR ENTERPRISE DEPLOYMENT!');
    console.log('✅ All checks passed - ConvertMorph is GSC & AdSense ready');
  } else {
    console.log('\n⚠️  DEPLOYMENT NOT RECOMMENDED');
    console.log('❌ Please fix failing checks before deployment');
  }
  
  console.log('\n🚀 Next Steps:');
  console.log('1. Deploy to Vercel');
  console.log('2. Verify HTTPS is working');
  console.log('3. Submit to Google Search Console');
  console.log('4. Apply for Google AdSense');
  console.log('5. Monitor performance metrics');
}

runChecks().catch(console.error);
