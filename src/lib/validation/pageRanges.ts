export function parsePageRanges(input: string, maxPages: number): number[] {
  if (!input) throw new Error('No ranges provided');
  
  const parts = input.split(',').map(s => s.trim()).filter(Boolean);
  const pages = new Set<number>();
  
  for (const p of parts) {
    const m = p.match(/^([0-9]+)(?:-([0-9]+))?$/);
    if (!m) throw new Error(`Invalid token: ${p}`);
    
    const start = Number(m[1]);
    const end = m[2] ? Number(m[2]) : start;
    
    if (start < 1 || end < 1 || start > maxPages || end > maxPages || start > end) {
      throw new Error(`Out of range: ${p}`);
    }
    
    for (let i = start; i <= end; i++) {
      pages.add(i);
    }
  }
  
  return Array.from(pages).sort((a, b) => a - b);
}
