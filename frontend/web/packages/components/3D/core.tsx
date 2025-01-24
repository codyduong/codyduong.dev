import { editable } from '@theatre/r3f';
import React, { useEffect } from 'react';
import { Debug } from '@react-three/cannon';
import type { ThreeElements } from '@react-three/fiber';
import { DebugProvider } from '@react-three/cannon/dist/debug-provider';
import { useUrlSearchParams } from 'packages/app/contexts/UrlSearchParamsContext';
import { getProject } from '@theatre/core';
import { SheetProvider } from '@theatre/r3f';

/**
 * Mock editable for production
 */
const editableMock: {
  [K in keyof typeof editable as K extends keyof ThreeElements ? K : never]: (
    args: ThreeElements[Extract<keyof ThreeElements, K>],
  ) => React.ReactNode;
} = {
  // @ts-expect-error: idk what this element is
  line: ({ ref, ...props }) => <line ref={ref} {...props} />,
  mesh: ({ ref, ...props }) => <mesh ref={ref} {...props} />,
  lineSegments: ({ ref, ...props }) => <lineSegments ref={ref} {...props} />,
  lineLoop: ({ ref, ...props }) => <lineLoop ref={ref} {...props} />,
  points: ({ ref, ...props }) => <points ref={ref} {...props} />,
  group: ({ ref, ...props }) => <group ref={ref} {...props} />,
  perspectiveCamera: ({ ref, ...props }) => <perspectiveCamera ref={ref} {...props} />,
  orthographicCamera: ({ ref, ...props }) => <orthographicCamera ref={ref} {...props} />,
  spotLight: ({ ref, ...props }) => <spotLight ref={ref} {...props} />,
  pointLight: ({ ref, ...props }) => <pointLight ref={ref} {...props} />,
  directionalLight: ({ ref, ...props }) => <directionalLight ref={ref} {...props} />,
  fog: ({ ref, ...props }) => <fog ref={ref} {...props} />,
  primitive: ({ ref, ...props }) => <primitive ref={ref} {...props} />,
  hemisphereLight: ({ ref, ...props }) => <hemisphereLight ref={ref} {...props} />,
  ambientLight: ({ ref, ...props }) => <ambientLight ref={ref} {...props} />,
};

/**
 * only include Theatre.js Studio in "development" builds,
 * show it only if thearejs is in the query params
 */
let initialized = false;
async function showStudioOnQuery(query: ReturnType<typeof useUrlSearchParams>): Promise<void> {
  if (process.env.NODE_ENV === 'development') {
    const { default: studio } = await import('@theatre/studio');

    if (!initialized) {
      studio.initialize();
      initialized = true;
    }
    if (query.has('theatrejs')) {
      studio.ui.restore();
    } else {
      studio.ui.hide();
    }
  }
}

export function RunOnThreeDev<T extends () => R, R>(toRun: T): R | null {
  return useUrlSearchParams().has('3D_DEBUG') ? toRun() : null;
}

export function RenderOnThreeDev({
  DebugComponent,
  ...rest
}: { children?: React.ReactNode } & {
  DebugComponent: (...args: Parameters<typeof DebugProvider>) => React.JSX.Element;
}): React.JSX.Element {
  return useUrlSearchParams().get('3D_DEBUG') ? <DebugComponent {...rest} /> : <>{rest.children}</>;
}

export function PhysicsDebug(props: Parameters<typeof DebugProvider>[0]): React.JSX.Element {
  return <RenderOnThreeDev DebugComponent={Debug} {...props} />;
}

interface TheatreProps {
  getProjectArgs?: Parameters<typeof getProject>;
  sheetArgs: Parameters<ReturnType<typeof getProject>['sheet']>;
  render: (e: typeof editable) => React.ReactNode;
}

export const Theatre = ({
  getProjectArgs = ['codyduongweb'],
  sheetArgs,
  render,
}: TheatreProps): React.JSX.Element | null => {
  const query = useUrlSearchParams();
  useEffect(() => {
    showStudioOnQuery(query);
  }, [query]);

  /**
   * If we aren't importing a state and deploying, then there is no need for the SheetProvider
   */
  if (!getProjectArgs[1]?.['state'] && process.env.NODE_ENV !== 'development') {
    return <>{render(editableMock as unknown as typeof editable)}</>;
  }

  const demoSheet = getProject(...getProjectArgs)?.sheet(...sheetArgs);
  if (!demoSheet) {
    return null;
  }

  return <SheetProvider sheet={demoSheet}>{render(editable)}</SheetProvider>;
};
