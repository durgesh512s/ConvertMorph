'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useIsClient } from '@/hooks/useIsClient';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export function PWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isClient = useIsClient();

  useEffect(() => {
    if (!isClient) return;

    // Set mounted to true after client hydration
    setMounted(true);

    // Register service worker
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/service-worker.js")
        .then((registration) => {
          console.log("SW registered: ", registration);
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError);
        });
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, [isClient]);

  const handleInstallClick = async () => {
    if (!deferredPrompt || !mounted) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  // Don't render anything during SSR or before client hydration to prevent mismatch
  if (!isClient || !mounted || !isInstallable) return null;

  return (
    <Button
      onClick={handleInstallClick}
      variant="outline"
      size="sm"
      className="gap-1 sm:gap-2 px-2 sm:px-3"
    >
      <Download className="h-4 w-4 flex-shrink-0" />
      <span className="hidden sm:inline">Install App</span>
      <span className="inline sm:hidden">Install</span>
    </Button>
  );
}
