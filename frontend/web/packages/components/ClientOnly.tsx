export { ClientOnly };

import React, { ComponentProps, ComponentType } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ClientOnlyProps<T extends ComponentType<any>> = {
  component: () => Promise<{ default: T }>;
  fallback?: React.JSX.Element | null;
} & ComponentProps<T>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ClientOnly<T extends ComponentType<any>>(props: ClientOnlyProps<T>) {
  const { component, fallback, ...rest } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [Component, setComponent] = React.useState<any>(() => fallback);

  React.useEffect(() => {
    setComponent(() => React.lazy(component));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <React.Suspense fallback={fallback}>{Component && <Component {...rest} />}</React.Suspense>;
}
