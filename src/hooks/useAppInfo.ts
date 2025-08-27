import { useState, useEffect } from 'react';

export type AppInfo = {
  siteUrl: string;
  maxFileMb: number;
  maxPages: number;
  allowedMimes: string[];
  jobTimeoutMs: number;
};

export function useAppInfo() {
  const [appInfo, setAppInfo] = useState<AppInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppInfo = async () => {
      try {
        const response = await fetch('/api/info');
        if (!response.ok) {
          throw new Error(`Failed to fetch app info: ${response.status}`);
        }
        const data = await response.json();
        setAppInfo(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchAppInfo();
  }, []);

  return { appInfo, loading, error };
}
