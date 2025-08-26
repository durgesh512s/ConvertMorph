// Analytics event tracking - vendor agnostic, no PII collection
export interface AnalyticsEvent {
  event: string;
  properties?: Record<string, string | number | boolean>;
  timestamp?: number;
}

export interface FileProcessingEvent extends AnalyticsEvent {
  event: 'file_upload' | 'job_start' | 'job_success' | 'job_error' | 'download_zip';
  properties: {
    tool_name: string;
    file_size_kb?: number;
    file_count?: number;
    duration_ms?: number;
    error_type?: string;
    compression_ratio?: number;
    page_count?: number;
  };
}

export interface UserInteractionEvent extends AnalyticsEvent {
  event: 'page_view' | 'tool_select' | 'pwa_install' | 'keyboard_shortcut';
  properties: {
    page_path?: string;
    tool_name?: string;
    element?: string;
    shortcut_key?: string;
    install_prompt?: 'shown' | 'accepted' | 'dismissed';
  };
}

// Event queue for batching
let eventQueue: AnalyticsEvent[] = [];
let isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;

// Update online status
if (typeof window !== 'undefined') {
  window.addEventListener('online', () => { isOnline = true; flushEvents(); });
  window.addEventListener('offline', () => { isOnline = false; });
}

/**
 * Track an analytics event
 * @param event Event name
 * @param properties Event properties (no PII)
 */
export function trackEvent(event: string, properties: Record<string, string | number | boolean> = {}): void {
  // Skip in development unless explicitly enabled
  if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_ANALYTICS_DEV) {
    console.log('📊 Analytics (dev):', event, properties);
    return;
  }

  const analyticsEvent: AnalyticsEvent = {
    event,
    properties: sanitizeProperties(properties),
    timestamp: Date.now(),
  };

  eventQueue.push(analyticsEvent);

  // Flush immediately for critical events or when queue is full
  if (isCriticalEvent(event) || eventQueue.length >= 10) {
    flushEvents();
  }
}

/**
 * Track file processing events with standardized properties
 */
export function trackFileEvent(
  event: FileProcessingEvent['event'],
  toolName: string,
  properties: Partial<FileProcessingEvent['properties']> = {}
): void {
  trackEvent(event, {
    tool_name: toolName,
    ...properties,
  });
}

/**
 * Track user interaction events
 */
export function trackInteraction(
  event: UserInteractionEvent['event'],
  properties: Partial<UserInteractionEvent['properties']> = {}
): void {
  trackEvent(event, properties);
}

/**
 * Track page views automatically
 */
export function trackPageView(path: string): void {
  trackInteraction('page_view', { page_path: path });
}

/**
 * Sanitize properties to ensure no PII is collected
 */
function sanitizeProperties(properties: Record<string, string | number | boolean | null | undefined>): Record<string, string | number | boolean> {
  const sanitized: Record<string, string | number | boolean> = {};

  for (const [key, value] of Object.entries(properties)) {
    // Skip potentially sensitive keys
    if (isPotentiallySensitive(key)) {
      continue;
    }

    // Only allow primitive types
    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      sanitized[key] = value;
    } else if (value !== null && value !== undefined) {
      sanitized[key] = String(value);
    }
  }

  return sanitized;
}

/**
 * Check if a property key might contain PII
 */
function isPotentiallySensitive(key: string): boolean {
  const sensitivePatterns = [
    'email', 'name', 'phone', 'address', 'ip', 'user_id', 'session_id',
    'filename', 'file_path', 'url', 'referrer', 'user_agent'
  ];
  
  return sensitivePatterns.some(pattern => 
    key.toLowerCase().includes(pattern)
  );
}

/**
 * Check if event should be sent immediately
 */
function isCriticalEvent(event: string): boolean {
  return ['job_error', 'page_view'].includes(event);
}

/**
 * Flush events to analytics provider
 */
async function flushEvents(): Promise<void> {
  if (eventQueue.length === 0 || !isOnline) {
    return;
  }

  const events = [...eventQueue];
  eventQueue = [];

  try {
    // Send to analytics endpoint
    await sendEvents(events);
  } catch (error) {
    console.warn('Analytics: Failed to send events', error);
    // Re-queue events for retry (keep only last 50)
    eventQueue = [...events.slice(-50), ...eventQueue];
  }
}

/**
 * Send events to analytics provider
 */
async function sendEvents(events: AnalyticsEvent[]): Promise<void> {
  // Skip if no analytics endpoint configured
  if (!process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    return;
  }

  const response = await fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      events,
      client: 'convertmorph-web',
      version: '1.0.0',
    }),
  });

  if (!response.ok) {
    throw new Error(`Analytics API error: ${response.status}`);
  }
}

/**
 * Flush events before page unload
 */
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    if (eventQueue.length > 0) {
      // Use sendBeacon for reliable delivery
      const data = JSON.stringify({
        events: eventQueue,
        client: 'convertmorph-web',
        version: '1.0.0',
      });

      if (navigator.sendBeacon && process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
        navigator.sendBeacon(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, data);
      }
    }
  });

  // Periodic flush every 30 seconds
  setInterval(flushEvents, 30000);
}

// Performance tracking utilities
export function measurePerformance<T>(
  operation: string,
  fn: () => Promise<T>
): Promise<T> {
  const start = performance.now();
  
  return fn().then(
    (result) => {
      const duration = performance.now() - start;
      trackEvent('performance', {
        operation,
        duration_ms: Math.round(duration),
        success: true,
      });
      return result;
    },
    (error) => {
      const duration = performance.now() - start;
      trackEvent('performance', {
        operation,
        duration_ms: Math.round(duration),
        success: false,
        error_type: error.name || 'unknown',
      });
      throw error;
    }
  );
}
