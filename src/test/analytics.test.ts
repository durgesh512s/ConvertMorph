import { describe, it, expect, vi, beforeEach } from 'vitest';
import { trackEvent, trackFileEvent, trackInteraction } from '@/lib/analytics/events';

// Mock console.log for development mode
const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

describe('Analytics Events', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Set development mode for testing
    Object.assign(process.env, { NODE_ENV: 'development' });
  });

  describe('trackEvent', () => {
    it('should log events in development mode', () => {
      trackEvent('test_event', { test_prop: 'value' });
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '📊 Analytics (dev):',
        'test_event',
        { test_prop: 'value' }
      );
    });

    it('should sanitize properties', () => {
      trackEvent('test_event', { 
        valid_prop: 'value',
        email: 'test@example.com', // Should be filtered out
        filename: 'secret.pdf', // Should be filtered out
      });
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '📊 Analytics (dev):',
        'test_event',
        { valid_prop: 'value' }
      );
    });

    it('should handle different data types', () => {
      trackEvent('test_event', { 
        string_prop: 'text',
        number_prop: 42,
        boolean_prop: true,
      } as any);
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '📊 Analytics (dev):',
        'test_event',
        { 
          string_prop: 'text',
          number_prop: 42,
          boolean_prop: true,
        }
      );
    });
  });

  describe('trackFileEvent', () => {
    it('should track file events with tool name', () => {
      trackFileEvent('file_upload', 'pdf-compress', { 
        file_size_kb: 1024,
        file_count: 1,
      });
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '📊 Analytics (dev):',
        'file_upload',
        { 
          tool_name: 'pdf-compress',
          file_size_kb: 1024,
          file_count: 1,
        }
      );
    });

    it('should track job success with duration', () => {
      trackFileEvent('job_success', 'pdf-merge', { 
        duration_ms: 2500,
        page_count: 10,
      });
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '📊 Analytics (dev):',
        'job_success',
        { 
          tool_name: 'pdf-merge',
          duration_ms: 2500,
          page_count: 10,
        }
      );
    });

    it('should track job errors', () => {
      trackFileEvent('job_error', 'pdf-split', { 
        error_type: 'invalid_range',
        duration_ms: 1000,
      });
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '📊 Analytics (dev):',
        'job_error',
        { 
          tool_name: 'pdf-split',
          error_type: 'invalid_range',
          duration_ms: 1000,
        }
      );
    });
  });

  describe('trackInteraction', () => {
    it('should track page views', () => {
      trackInteraction('page_view', { page_path: '/tools/pdf-compress' });
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '📊 Analytics (dev):',
        'page_view',
        { page_path: '/tools/pdf-compress' }
      );
    });

    it('should track tool selections', () => {
      trackInteraction('tool_select', { 
        tool_name: 'pdf-compress',
        element: 'hero_button',
      });
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '📊 Analytics (dev):',
        'tool_select',
        { 
          tool_name: 'pdf-compress',
          element: 'hero_button',
        }
      );
    });

    it('should track keyboard shortcuts', () => {
      trackInteraction('keyboard_shortcut', { shortcut_key: 'ctrl+u' });
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '📊 Analytics (dev):',
        'keyboard_shortcut',
        { shortcut_key: 'ctrl+u' }
      );
    });

    it('should track PWA install events', () => {
      trackInteraction('pwa_install', { install_prompt: 'shown' });
      
      expect(consoleSpy).toHaveBeenCalledWith(
        '📊 Analytics (dev):',
        'pwa_install',
        { install_prompt: 'shown' }
      );
    });
  });
});
