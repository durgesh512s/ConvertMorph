import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock environment variables for tests
Object.assign(process.env, {
  NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

// Mock fetch
global.fetch = vi.fn();

// Mock navigator
Object.defineProperty(window, 'navigator', {
  writable: true,
  value: {
    ...window.navigator,
    onLine: true,
    sendBeacon: vi.fn(),
  },
});

// Mock performance
Object.defineProperty(window, 'performance', {
  writable: true,
  value: {
    ...window.performance,
    now: vi.fn(() => Date.now()),
  },
});
