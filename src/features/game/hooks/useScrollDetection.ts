import { useState, useEffect } from 'react';

/**
 * Hook that detects if the user has scrolled down by any amount
 * @returns {boolean} Whether the page has been scrolled down
 */
export const useScrollDetection = (): boolean => {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Set hasScrolled to true if scrolled down by any amount
      setHasScrolled(window.scrollY > 0);
    };

    // Initial check
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return hasScrolled;
};
