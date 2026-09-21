import type { RouteObject } from 'react-router';
import App from './App';
import type { HeadValue } from './contexts/HeadContext';
import Redirect from 'packages/components/Redirect';
import Home from 'packages/pages/Home';
import WebAccessibilityStatement from 'packages/pages/WebAccessibilityStatement';
import NotFound from 'packages/pages/404';
import AIUsageStatement from 'packages/pages/AIUsageStatement';
import Sandbox from 'packages/pages/Sandbox';

export const createAppRoutes = (headValue: HeadValue | undefined): RouteObject[] => [
  {
    path: '/',
    element: <App headValue={headValue} />,
    children: [
      { index: true, element: <Home /> },
      { path: 'home', element: <Redirect title="Home" /> },
      { path: 'web-accessibility-statement', element: <WebAccessibilityStatement /> },
      { path: 'ai-usage-statement', element: <AIUsageStatement /> },
      { path: 'sandbox/*', element: <Sandbox /> },
      { path: 'playground', element: <Redirect title="Playground" redirect="/sandbox" /> },
      { path: 'projects/*', element: <Redirect title="Projects" /> },
      { path: 'work/*', element: <Redirect title="Work" /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];
