import _any from 'packages/types/any';
import { useEffect } from 'react';

export function useOutsideClick<T extends HTMLElement>(
  ref: React.RefObject<T>,
  onClickOutside: (event: MouseEvent) => void
): void {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent): void {
      if (ref.current && !ref.current.contains(event.target as _any)) {
        onClickOutside(event);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

export function useOutsideTouch<T extends HTMLElement>(
  ref: React.RefObject<T>,
  onClickOutside: (event: TouchEvent) => void
): void {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleTouchOutside(event: TouchEvent): void {
      if (ref.current && !ref.current.contains(event.target as _any)) {
        onClickOutside(event);
      }
    }
    // Bind the event listener
    document.addEventListener('touchstart', handleTouchOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('touchcancel', handleTouchOutside);
    };
  }, [ref]);
}
