'use client';

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Set mounted to true after client hydration
    setMounted(true);
    
    // Check for saved theme preference or default to light mode
    try {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        setIsDark(true);
        document.documentElement.classList.add('dark');
      } else {
        setIsDark(false);
        document.documentElement.classList.remove('dark');
      }
    } catch (error) {
      // Fallback for environments without localStorage
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (!mounted) return;
    
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    try {
      if (newTheme) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    } catch (error) {
      // Fallback for environments without localStorage
      console.warn('Unable to save theme preference:', error);
    }
  };

  // Prevent hydration mismatch by showing consistent UI until mounted
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className="p-2"
        aria-label="Toggle theme"
        disabled
      >
        <Moon className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      className="p-2"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Button>
  );
}
