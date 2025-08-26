'use client';

import { useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { trackEvent, trackFileEvent, trackInteraction, trackPageView } from '@/lib/analytics/events';

export function useAnalytics() {
  const pathname = usePathname();

  // Track page views automatically
  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  // Memoized tracking functions
  const track = useCallback((event: string, properties?: Record<string, string | number | boolean>) => {
    trackEvent(event, properties);
  }, []);

  const trackFile = useCallback((
    event: 'file_upload' | 'job_start' | 'job_success' | 'job_error' | 'download_zip',
    toolName: string,
    properties?: Record<string, string | number | boolean>
  ) => {
    trackFileEvent(event, toolName, properties);
  }, []);

  const trackClick = useCallback((element: string, properties?: Record<string, string | number | boolean>) => {
    trackInteraction('tool_select', { element, ...properties });
  }, []);

  const trackKeyboard = useCallback((shortcut: string) => {
    trackInteraction('keyboard_shortcut', { shortcut_key: shortcut });
  }, []);

  const trackPWAInstall = useCallback((action: 'shown' | 'accepted' | 'dismissed') => {
    trackInteraction('pwa_install', { install_prompt: action });
  }, []);

  return {
    track,
    trackFile,
    trackClick,
    trackKeyboard,
    trackPWAInstall,
  };
}

// Hook for file processing analytics
export function useFileProcessingAnalytics(toolName: string) {
  const { trackFile } = useAnalytics();

  const trackUpload = useCallback((fileCount: number, totalSizeKb: number) => {
    trackFile('file_upload', toolName, {
      file_count: fileCount,
      file_size_kb: totalSizeKb,
    });
  }, [trackFile, toolName]);

  const trackJobStart = useCallback((properties?: Record<string, string | number | boolean>) => {
    trackFile('job_start', toolName, properties);
  }, [trackFile, toolName]);

  const trackJobSuccess = useCallback((durationMs: number, properties?: Record<string, string | number | boolean>) => {
    trackFile('job_success', toolName, {
      duration_ms: durationMs,
      ...properties,
    });
  }, [trackFile, toolName]);

  const trackJobError = useCallback((errorType: string, durationMs?: number) => {
    trackFile('job_error', toolName, {
      error_type: errorType,
      ...(durationMs && { duration_ms: durationMs }),
    });
  }, [trackFile, toolName]);

  const trackDownload = useCallback((properties?: Record<string, string | number | boolean>) => {
    trackFile('download_zip', toolName, properties);
  }, [trackFile, toolName]);

  return {
    trackUpload,
    trackJobStart,
    trackJobSuccess,
    trackJobError,
    trackDownload,
  };
}
