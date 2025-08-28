export function absoluteUrl(path: string) {
  const base = process.env.SITE_URL || 'http://localhost:3000';
  if (path.startsWith('http')) return path;
  return base.replace(/\/$/, '') + (path.startsWith('/') ? path : `/${path}`);
}
