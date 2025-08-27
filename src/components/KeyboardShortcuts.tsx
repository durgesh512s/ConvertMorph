'use client';

import { useEffect } from 'react';

interface KeyboardShortcutsProps {
  onUpload?: () => void;
  onDownload?: () => void;
  onClear?: () => void;
}

export function KeyboardShortcuts({ onUpload, onDownload, onClear }: KeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check for modifier keys (Ctrl on Windows/Linux, Cmd on Mac)
      const isModifierPressed = event.ctrlKey || event.metaKey;
      
      // Ctrl/Cmd + U for upload
      if (isModifierPressed && event.key.toLowerCase() === 'u') {
        event.preventDefault();
        onUpload?.();
        return;
      }
      
      // D for download (no modifier needed)
      if (event.key.toLowerCase() === 'd' && !isModifierPressed && !event.altKey && !event.shiftKey) {
        // Only trigger if not in an input field
        const target = event.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA' && !target.isContentEditable) {
          event.preventDefault();
          onDownload?.();
        }
        return;
      }
      
      // Escape to clear
      if (event.key === 'Escape') {
        event.preventDefault();
        onClear?.();
        return;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onUpload, onDownload, onClear]);

  return null; // This component doesn't render anything
}
