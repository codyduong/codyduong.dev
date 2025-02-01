import { useScroll } from 'packages/app/contexts/ScrollContext';
import React, { createContext, useContext, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

type TransitionImgContextType = {
  img: React.ReactNode;
  setImg: (node: React.ReactNode) => void;
  transitioning: boolean;
  setTransitioning: React.Dispatch<React.SetStateAction<boolean>>;
};

const TransitionImgContext = createContext<TransitionImgContextType>({
  img: null,
  setImg: () => {},
  transitioning: false,
  setTransitioning: () => {},
});

export const TransitionImgProvider = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const { pageRef: mainRef } = useScroll();
  const [node, setNode] = useState<React.ReactNode>(null);
  const [m, setM] = useState<HTMLElement | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    if (!import.meta.env.SSR) {
      // lol! there should only be one hopefully
      setM(document.getElementsByTagName('main')[0]);
    }
  }, [setM]);

  const main = mainRef?.current ?? m;

  return (
    <TransitionImgContext
      value={{
        img: node,
        setImg: setNode,
        transitioning,
        setTransitioning,
      }}
    >
      {children}
      {main && node && ReactDOM.createPortal(node, main)}
    </TransitionImgContext>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTransitionImg = (): TransitionImgContextType => {
  return useContext(TransitionImgContext);
};

interface TransitionProps {
  children: React.ReactNode;
}

const OLDCONSOLEERR = console.error;

/**
 * some of my worst work yet. LOL! w/e
 */
export const Transition = ({ children }: TransitionProps): null => {
  const { setImg } = useTransitionImg();

  try {
    // suppress err about rendering higher-order-component in lower-order-component w/out use-effect
    // in summary useeffect runs too late. this works. does it have any consequences? who knows...
    console.error = (...args: unknown[]) => {
      if (typeof args[0] === 'string' && args[0].startsWith('Cannot update a component')) {
        return;
      }
      OLDCONSOLEERR(...args);
    };
    setImg(children);
  } finally {
    console.error = OLDCONSOLEERR;
  }

  return null;
};
