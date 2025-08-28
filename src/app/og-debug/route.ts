import { NextResponse } from 'next/server';

export async function GET() {
  const base = process.env.SITE_URL || 'http://localhost:3000';
  
  const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>ConvertMorph - PDF Tools</title>
    <meta name="description" content="Fast, private, free PDF tools. Compress, merge, split, and convert PDFs online.">
    
    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="ConvertMorph - PDF Tools">
    <meta property="og:description" content="Fast, private, free PDF tools. Compress, merge, split, and convert PDFs online.">
    <meta property="og:url" content="${base}">
    <meta property="og:image" content="${base}/og/og-template.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:site_name" content="ConvertMorph">
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="ConvertMorph - PDF Tools">
    <meta name="twitter:description" content="Fast, private, free PDF tools. Compress, merge, split, and convert PDFs online.">
    <meta name="twitter:image" content="${base}/og/og-template.png">
    
    <!-- LinkedIn -->
    <meta property="og:locale" content="en_US">
  </head>
  <body>
    <h1>OG Debug - Meta Tags Loaded</h1>
    <p>Base URL: ${base}</p>
    <p>This page shows the meta tags that social media crawlers will see.</p>
  </body>
</html>`;

  return new NextResponse(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store'
    }
  });
}
