export { ClientOnly };

import React, { ComponentType } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ClientOnlyProps<T extends ComponentType<any>> = {
  component: () => Promise<{ default: T }>;
  fallback?: JSX.Element | null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ClientOnly<T extends ComponentType<any>>(props: ClientOnlyProps<T>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [Component, setComponent] = React.useState<any>(() => props.fallback);

  React.useEffect(() => {
    setComponent(() => React.lazy(props.component));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <React.Suspense fallback={props.fallback}>{Component && <Component />}</React.Suspense>;
}
