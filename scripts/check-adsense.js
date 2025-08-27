#!/usr/bin/env node

/**
 * AdSense Readiness Checker
 * Validates content length and policy compliance for AdSense approval
 */

const fs = require('fs');
const path = require('path');

// Configuration
const MIN_WORD_COUNT = 300;
const REQUIRED_PAGES = [
  { path: '/privacy', name: 'Privacy Policy' },
  { path: '/terms', name: 'Terms of Service' },
  { path: '/about', name: 'About' },
  { path: '/contact', name: 'Contact' }
];

const TOOL_ROUTES = [
  '/tools/pdf-compress',
  '/tools/pdf-merge',
  '/tools/pdf-split',
  '/tools/pdf-to-images',
  '/tools/images-to-pdf'
];

// Helper functions
function countWords(text) {
  // Remove HTML tags and count words
  const cleanText = text.replace(/<[^>]*>/g, ' ');
  const words = cleanText.match(/\b\w+\b/g);
  return words ? words.length : 0;
}

function checkFileExists(filePath) {
  const fullPath = path.join(__dirname, '..', 'src', 'app', filePath, 'page.tsx');
  return fs.existsSync(fullPath);
}

function getPageContent(filePath) {
  try {
    const fullPath = path.join(__dirname, '..', 'src', 'app', filePath, 'page.tsx');
    if (fs.existsSync(fullPath)) {
      return fs.readFileSync(fullPath, 'utf8');
    }
    return '';
  } catch (error) {
    return '';
  }
}

function checkAdSlotPlaceholders() {
  const layoutPath = path.join(__dirname, '..', 'src', 'app', 'layout.tsx');
  const homePath = path.join(__dirname, '..', 'src', 'app', 'page.tsx');
  
  let hasAdSlots = false;
  let hasReservedHeight = false;
  
  try {
    const layoutContent = fs.readFileSync(layoutPath, 'utf8');
    const homeContent = fs.readFileSync(homePath, 'utf8');
    
    // Check for ad slot indicators
    const adSlotPatterns = [
      /ad-slot/i,
      /adsense/i,
      /advertisement/i,
      /ad-banner/i
    ];
    
    const heightPatterns = [
      /height.*\d+/i,
      /min-height/i,
      /h-\d+/i // Tailwind height classes
    ];
    
    const allContent = layoutContent + homeContent;
    
    hasAdSlots = adSlotPatterns.some(pattern => pattern.test(allContent));
    hasReservedHeight = heightPatterns.some(pattern => pattern.test(allContent));
    
  } catch (error) {
    console.warn('Could not check ad slot placeholders:', error.message);
  }
  
  return { hasAdSlots, hasReservedHeight };
}

// Main checking functions
function checkRequiredPages() {
  console.log('\n📄 Checking Required Pages...');
  const results = [];
  
  for (const page of REQUIRED_PAGES) {
    const exists = checkFileExists(page.path);
    const status = exists ? '✅' : '❌';
    console.log(`${status} ${page.name}: ${page.path}`);
    results.push({ ...page, exists });
  }
  
  return results;
}

function checkContentLength() {
  console.log('\n📝 Checking Content Length...');
  const results = [];
  
  // Check homepage
  const homeContent = getPageContent('');
  const homeWordCount = countWords(homeContent);
  const homeStatus = homeWordCount >= MIN_WORD_COUNT ? '✅' : '❌';
  console.log(`${homeStatus} Homepage: ${homeWordCount} words (min: ${MIN_WORD_COUNT})`);
  results.push({ path: '/', wordCount: homeWordCount, sufficient: homeWordCount >= MIN_WORD_COUNT });
  
  // Check tool pages
  for (const route of TOOL_ROUTES) {
    const content = getPageContent(route);
    const wordCount = countWords(content);
    const status = wordCount >= MIN_WORD_COUNT ? '✅' : '❌';
    console.log(`${status} ${route}: ${wordCount} words (min: ${MIN_WORD_COUNT})`);
    results.push({ path: route, wordCount, sufficient: wordCount >= MIN_WORD_COUNT });
  }
  
  return results;
}

function checkAdSenseCompliance() {
  console.log('\n💰 Checking AdSense Compliance...');
  
  const { hasAdSlots, hasReservedHeight } = checkAdSlotPlaceholders();
  
  console.log(`${hasAdSlots ? '✅' : '❌'} Ad slot placeholders present`);
  console.log(`${hasReservedHeight ? '✅' : '❌'} Reserved height for ads (prevents layout shift)`);
  
  return { hasAdSlots, hasReservedHeight };
}

function generateSummary(pageResults, contentResults, adResults) {
  console.log('\n📊 ADSENSE READINESS SUMMARY');
  console.log('=' .repeat(50));
  
  const allPagesExist = pageResults.every(p => p.exists);
  const allContentSufficient = contentResults.every(c => c.sufficient);
  const adComplianceGood = adResults.hasAdSlots && adResults.hasReservedHeight;
  
  console.log(`Required Pages: ${allPagesExist ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Content Length: ${allContentSufficient ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`Ad Compliance: ${adComplianceGood ? '✅ PASS' : '⚠️  NEEDS WORK'}`);
  
  const overallStatus = allPagesExist && allContentSufficient && adComplianceGood;
  console.log(`\nOverall Status: ${overallStatus ? '🎉 READY FOR ADSENSE' : '🔧 NEEDS IMPROVEMENT'}`);
  
  if (!overallStatus) {
    console.log('\n🔧 Action Items:');
    if (!allPagesExist) {
      const missingPages = pageResults.filter(p => !p.exists);
      missingPages.forEach(p => console.log(`   - Create ${p.name} page at ${p.path}`));
    }
    if (!allContentSufficient) {
      const shortPages = contentResults.filter(c => !c.sufficient);
      shortPages.forEach(c => console.log(`   - Add more content to ${c.path} (${c.wordCount}/${MIN_WORD_COUNT} words)`));
    }
    if (!adComplianceGood) {
      if (!adResults.hasAdSlots) {
        console.log('   - Add ad slot placeholder divs');
      }
      if (!adResults.hasReservedHeight) {
        console.log('   - Add reserved height to prevent layout shift');
      }
    }
  }
  
  return overallStatus;
}

// Main execution
function main() {
  console.log('🔍 AdSense Readiness Check');
  console.log('Checking content length and policy compliance...\n');
  
  try {
    const pageResults = checkRequiredPages();
    const contentResults = checkContentLength();
    const adResults = checkAdSenseCompliance();
    
    const isReady = generateSummary(pageResults, contentResults, adResults);
    
    // Exit with appropriate code
    process.exit(isReady ? 0 : 1);
    
  } catch (error) {
    console.error('❌ Error during AdSense readiness check:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  checkRequiredPages,
  checkContentLength,
  checkAdSenseCompliance,
  generateSummary
};
