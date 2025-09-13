/**
 * Utility functions for generating consistent IDs that prevent hydration mismatches
 */

let idCounter = 0;

/**
 * Generate a consistent ID that won't cause hydration mismatches
 * Uses a counter instead of random values to ensure server/client consistency
 */
export function generateId(prefix: string = 'id'): string {
  return `${prefix}-${++idCounter}`;
}

/**
 * Generate a file ID for uploaded files
 */
export function generateFileId(): string {
  return generateId('file');
}

/**
 * Generate a signature element ID
 */
export function generateSignatureId(): string {
  return generateId('sig');
}

/**
 * Generate a text element ID
 */
export function generateTextId(): string {
  return generateId('text');
}

/**
 * Reset the counter (useful for testing)
 */
export function resetIdCounter(): void {
  idCounter = 0;
}

/**
 * Generate a timestamp-based ID for cases where uniqueness across sessions is needed
 * Only use this when the component is client-side only
 */
export function generateTimestampId(prefix: string = 'ts'): string {
  if (typeof window === 'undefined') {
    // Fallback for SSR - use counter instead
    return generateId(prefix);
  }
  return `${prefix}-${Date.now()}`;
}

/**
 * Generate a consistent timestamp for history tracking
 * Uses counter for SSR safety, actual timestamp for client-side
 */
export function generateHistoryTimestamp(): number {
  if (typeof window === 'undefined') {
    // Fallback for SSR - use counter
    return ++idCounter;
  }
  return Date.now();
}
