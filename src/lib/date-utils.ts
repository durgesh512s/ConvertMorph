/**
 * Utility functions for consistent date formatting across server and client
 * to prevent hydration mismatches
 */

/**
 * Format a date string consistently for both server and client rendering
 * Uses a fixed locale to prevent hydration mismatches
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    // Use a fixed locale and format to ensure consistency
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (error) {
    console.warn('Invalid date string:', dateString);
    return dateString;
  }
}

/**
 * Format a date string in short format (MM/DD/YYYY)
 */
export function formatDateShort(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  } catch (error) {
    console.warn('Invalid date string:', dateString);
    return dateString;
  }
}

/**
 * Get current date in a consistent format
 */
export function getCurrentDate(): string {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Get current year
 */
export function getCurrentYear(): number {
  return new Date().getFullYear();
}
