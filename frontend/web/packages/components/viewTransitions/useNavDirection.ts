import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { getNavDirection } from './support';

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export const useNavDirection = (): void => {
  const location = useLocation();
  const prevPath = useRef(location.pathname);

  useIsomorphicLayoutEffect(() => {
    const dir = getNavDirection(prevPath.current, location.pathname);
    const root = document.documentElement;
    if (dir) {
      root.dataset.vtNav = dir;
    } else {
      delete root.dataset.vtNav;
    }
    prevPath.current = location.pathname;
  }, [location.pathname]);
};
