'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function KeyboardShortcuts() {
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if Ctrl (or Cmd on Mac) is pressed
      const isCtrlOrCmd = event.ctrlKey || event.metaKey;
      
      if (isCtrlOrCmd) {
        switch (event.key.toLowerCase()) {
          case 'u':
            event.preventDefault();
            // Focus on file input if available
            const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
            if (fileInput) {
              fileInput.click();
            }
            break;
          case 'd':
            event.preventDefault();
            // Trigger download if available
            const downloadButton = document.querySelector('[data-download]') as HTMLButtonElement;
            if (downloadButton) {
              downloadButton.click();
            }
            break;
          case 'h':
            event.preventDefault();
            router.push('/');
            break;
          case 't':
            event.preventDefault();
            router.push('/tools');
            break;
        }
      }
      
      // Reset functionality with 'R' key
      if (event.key.toLowerCase() === 'r' && !event.ctrlKey && !event.metaKey) {
        const resetButton = document.querySelector('[data-reset]') as HTMLButtonElement;
        if (resetButton) {
          event.preventDefault();
          resetButton.click();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [router]);

  return null; // This component doesn't render anything
}
