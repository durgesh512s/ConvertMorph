const { execSync } = require('child_process');
const url = process.argv[2];

if (!url) {
  console.error('Usage: node scripts/validators.js <url>');
  console.error('Example: node scripts/validators.js https://abc123.loca.lt/tools/pdf-compress');
  process.exit(1);
}

try {
  console.log('Opening social media validators...');
  
  // Open Facebook Debugger
  execSync(`open "https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(url)}"`);
  console.log('✅ Opened Facebook/WhatsApp Debugger');
  
  // Open LinkedIn Inspector
  execSync(`open "https://www.linkedin.com/post-inspector/inspect/?url=${encodeURIComponent(url)}"`);
  console.log('✅ Opened LinkedIn Post Inspector');
  
  console.log('📝 Open Twitter validator manually and paste the URL:');
  console.log('   https://cards-dev.twitter.com/validator');
  console.log(`   Test URL: ${url}`);
  
} catch (error) {
  console.error('❌ Error opening validators:', error.message);
  console.log('\n📋 Manual links:');
  console.log(`Facebook: https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(url)}`);
  console.log(`LinkedIn: https://www.linkedin.com/post-inspector/inspect/?url=${encodeURIComponent(url)}`);
  console.log('Twitter: https://cards-dev.twitter.com/validator');
}
