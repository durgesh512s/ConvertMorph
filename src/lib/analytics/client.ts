export function track(name: string, data: Record<string, unknown> = {}) {
  const body = JSON.stringify({ name, ...data });
  
  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: 'application/json' });
    navigator.sendBeacon('/api/analytics', blob);
    return;
  }
  
  fetch('/api/analytics', { 
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' }, 
    body 
  });
}
