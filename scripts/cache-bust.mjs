#!/usr/bin/env node

/**
 * Cache Busting Script
 * Generates a unique build ID and updates environment variables for cache busting
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Generate a unique cache bust ID
const generateCacheBustId = () => {
  // Use git commit SHA if available, otherwise generate a hash
  const gitSha = process.env.VERCEL_GIT_COMMIT_SHA || 
                 process.env.GITHUB_SHA || 
                 process.env.CI_COMMIT_SHA;
  
  if (gitSha) {
    return gitSha.substring(0, 8);
  }
  
  // Generate hash based on current time and random data
  const timestamp = Date.now().toString();
  const random = Math.random().toString(36).substring(2, 15);
  return crypto.createHash('md5').update(timestamp + random).digest('hex').substring(0, 8);
};

// Update .env.local with cache bust ID
const updateEnvFile = (cacheBustId) => {
  const envPath = path.join(process.cwd(), '.env.local');
  let envContent = '';
  
  // Read existing .env.local if it exists
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }
  
  // Remove existing NEXT_PUBLIC_CACHE_BUST_ID if present
  envContent = envContent.replace(/^NEXT_PUBLIC_CACHE_BUST_ID=.*$/m, '');
  
  // Add new cache bust ID
  envContent = envContent.trim();
  if (envContent) {
    envContent += '\n';
  }
  envContent += `NEXT_PUBLIC_CACHE_BUST_ID=${cacheBustId}\n`;
  
  // Write back to file
  fs.writeFileSync(envPath, envContent);
  
  console.log(`✓ Cache bust ID generated: ${cacheBustId}`);
  console.log(`✓ Updated .env.local with NEXT_PUBLIC_CACHE_BUST_ID=${cacheBustId}`);
};

// Update manifest.json with new cache bust parameter
const updateManifest = (cacheBustId) => {
  const manifestPath = path.join(process.cwd(), 'public', 'manifest.webmanifest');
  
  if (fs.existsSync(manifestPath)) {
    try {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
      manifest.version = cacheBustId;
      fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
      console.log(`✓ Updated manifest.webmanifest version: ${cacheBustId}`);
    } catch (error) {
      console.warn('⚠ Could not update manifest.webmanifest:', error.message);
    }
  }
};

// Main execution
const main = () => {
  console.log('🚀 Starting cache busting process...');
  
  const cacheBustId = generateCacheBustId();
  
  updateEnvFile(cacheBustId);
  updateManifest(cacheBustId);
  
  console.log('✅ Cache busting setup complete!');
  console.log('💡 This will ensure fresh assets are loaded after deployment.');
  
  return cacheBustId;
};

// Export for use in other scripts
export { generateCacheBustId, updateEnvFile, updateManifest };

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
