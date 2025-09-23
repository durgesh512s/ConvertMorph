import type { Viewport } from 'next'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0052CC' },
    { media: '(prefers-color-scheme: dark)', color: '#0052CC' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5, // Allow zoom for accessibility
  userScalable: true, // Enable user scaling for better mobile experience
  viewportFit: 'cover',
  colorScheme: 'light dark',
  interactiveWidget: 'resizes-content',
}
