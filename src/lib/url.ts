export function absoluteUrl(path: string) {
  // Use production URL - check multiple environment variables like sitemap does
  const base = process.env.SITE_URL || 
               process.env.NEXT_PUBLIC_SITE_URL || 
               'https://convertmorph.com';
  
  if (path.startsWith('http')) return path;
  return base.replace(/\/$/, '') + (path.startsWith('/') ? path : `/${path}`);
}
