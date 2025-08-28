const fs = require('fs');
const url = process.argv[2];

if (!url) {
  console.error('Usage: node scripts/set-site-url.js <url>');
  process.exit(1);
}

let env = '';
try {
  env = fs.readFileSync('.env.local', 'utf8');
} catch {}

env = env.replace(/(^|\n)SITE_URL=.*/g, '');
env += `\nSITE_URL=${url}\n`;

fs.writeFileSync('.env.local', env);
console.log('SITE_URL set to', url);
