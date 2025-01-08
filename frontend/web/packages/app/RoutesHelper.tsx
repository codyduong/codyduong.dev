import getTitle from 'packages/getTitle';
import React, { useEffect } from 'react';
import { Route, RouteProps, Routes, useLocation } from 'react-router';

const Home = React.lazy(() => import('packages/pages/Home'));

const WebAccessibilityStatement = React.lazy(
  () => import('packages/pages/WebAccessibilityStatement'),
);

const Construction3D = React.lazy(
  () => import('packages/components/3D/Construction3D'),
);

const NotFound = React.lazy(() => import('packages/pages/404'));

const ROUTES = [
  {
    path: '',
    element: <Home />,
    title: '',
  },
  {
    path: '/',
    element: <Home />,
    title: '',
  },
  {
    path: '/home',
    element: <Home />,
    title: '',
  },
  {
    path: '/web-accessibility-statement',
    element: <WebAccessibilityStatement />,
    title: 'Web Accessibility Statement',
  },
  {
    path: '/playground',
    element: <Construction3D />,
    title: 'Under Construction',
  },
  {
    path: '/projects',
    element: <Construction3D />,
    title: 'Under Construction',
  },
  {
    path: '/work',
    element: <Construction3D />,
    title: 'Under Construction',
  },
  {
    path: '*',
    element: <NotFound />,
    title: 'Not Found',
  },
] as const satisfies (RouteProps & { title: string })[];

// eslint-disable-next-line react-refresh/only-export-components
export const ROUTES_MINIFIED = ROUTES.map(
  ({ path, title }) =>
    ({
      path,
      title,
    }) as const,
);

const RoutesHelper = (): JSX.Element => {
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    const title = getTitle(pathname);
    if (!import.meta.env.SSR) {
      document.title = title;
    }
  }, [location]);

  return (
    <Routes>
      {ROUTES.map(({ title: _, ...rest }) => (
        <Route key={rest.path} {...rest} />
      ))}
    </Routes>
  );
};

export default RoutesHelper;
