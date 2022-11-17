import { useState, useEffect } from 'react';

export default function getScrollPosition(): number {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = (): void => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return scrollPosition;
}
