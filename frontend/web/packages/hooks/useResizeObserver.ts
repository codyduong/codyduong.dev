import { useCallback, useEffect, useMemo, useReducer, useRef, useTransition } from 'react';

type ResizeObserverHookCallback = (entry: ResizeObserverEntry, observer: ResizeObserver) => void;

type ResizeObserverHook = {
  observe: (props: Parameters<ResizeObserver['observe']>, callback: ResizeObserverHookCallback) => void;
  unobserve: ResizeObserver['unobserve'];
};

type ResizeReducerAction =
  | {
      type: 'add';
      target: Element;
      callback: ResizeObserverHookCallback;
    }
  | {
      type: 'remove';
      target: Element;
    };

type Observing = [element: Element, callback: ResizeObserverHookCallback][];

function reducer(state: Observing, action: ResizeReducerAction): Observing {
  if (action.type === 'add') {
    return [...state, [action.target, action.callback]];
  }

  if (action.type === 'remove') {
    return state.filter(([t]) => t !== action.target);
  }

  return state;
}

function useResizeObserver(): ResizeObserverHook {
  const [observing, dispatch] = useReducer(reducer, []);
  // i am going to shoot myself - https://github.com/facebook/react/pull/25692
  const [_, startTransition] = useTransition();
  const observingRef = useRef<Observing>([]);

  const observer = useMemo(
    () =>
      import.meta.env.SSR
        ? null
        : new ResizeObserver((entries, observer) => {
            entries.forEach((entry) => {
              const observed = observingRef.current.find(([o]) => o === entry.target);
              observed?.[1](entry, observer);
            });
          }),
    [],
  );

  useEffect(() => {
    observingRef.current = observing;
  }, [observing]);

  const observe = useCallback<ResizeObserverHook['observe']>(
    ([target, options], callback) => {
      observer?.observe(target, options);
      startTransition(() => {
        dispatch({ type: 'add', target, callback });
      });
    },
    [observer],
  );

  const unobserve = useCallback<ResizeObserverHook['unobserve']>(
    (target) => {
      observer?.unobserve(target as Element);
      startTransition(() => {
        dispatch({ type: 'remove', target });
      });
    },
    [observer],
  );

  useEffect(() => {
    return () => {
      observer?.disconnect();
    };
  }, [observer]);

  return {
    observe,
    unobserve,
  };
}

export default useResizeObserver;
