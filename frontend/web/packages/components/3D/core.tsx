import type { getProject } from '@theatre/core';
import { useTheatre } from 'packages/components/3D/TheatreContext';
import { editable } from '@theatre/r3f';
import React, { ReactNode, useEffect } from 'react';
import { Debug } from '@react-three/cannon';
import type { ThreeElements } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import { DebugProvider } from '@react-three/cannon/dist/debug-provider';
import { useUrlSearchParams } from 'packages/app/contexts/UrlSearchParamsContext';

/**
 * Mock editable for production
 */
const editableMock: {
  [K in keyof typeof editable as K extends keyof ThreeElements ? K : never]: (
    args: ThreeElements[Extract<keyof ThreeElements, K>],
  ) => ReactNode;
} & { line: unknown } = {
  line: Line,
  mesh: React.forwardRef((props, ref) => <mesh ref={ref} {...props} />),
  lineSegments: React.forwardRef((props, ref) => (
    <lineSegments ref={ref} {...props} />
  )),
  lineLoop: React.forwardRef((props, ref) => <lineLoop ref={ref} {...props} />),
  points: React.forwardRef((props, ref) => <points ref={ref} {...props} />),
  group: React.forwardRef((props, ref) => <group ref={ref} {...props} />),
  perspectiveCamera: React.forwardRef((props, ref) => (
    <perspectiveCamera ref={ref} {...props} />
  )),
  orthographicCamera: React.forwardRef((props, ref) => (
    <orthographicCamera ref={ref} {...props} />
  )),
  spotLight: React.forwardRef((props, ref) => (
    <spotLight ref={ref} {...props} />
  )),
  pointLight: React.forwardRef((props, ref) => (
    <pointLight ref={ref} {...props} />
  )),
  directionalLight: React.forwardRef((props, ref) => (
    <directionalLight ref={ref} {...props} />
  )),
  fog: React.forwardRef((props, ref) => <fog ref={ref} {...props} />),
  primitive: React.forwardRef((props, ref) => (
    <primitive ref={ref} object={props.object} {...props} />
  )),
  hemisphereLight: React.forwardRef((props, ref) => (
    <hemisphereLight ref={ref} {...props} />
  )),
  ambientLight: React.forwardRef((props, ref) => (
    <ambientLight ref={ref} {...props} />
  )),
};

/**
 * only include Theatre.js Studio in "development" builds,
 * show it only if thearejs is in the query params
 */
let initialized = false;
async function showStudioOnQuery(
  query: ReturnType<typeof useUrlSearchParams>,
): Promise<void> {
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
  DebugComponent: (...args: Parameters<typeof DebugProvider>) => JSX.Element;
}): JSX.Element {
  return useUrlSearchParams().get('3D_DEBUG') ? (
    <DebugComponent {...rest} />
  ) : (
    <>{rest.children}</>
  );
}

export function PhysicsDebug(
  props: Parameters<typeof DebugProvider>[0],
): JSX.Element {
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
}: TheatreProps): JSX.Element | null => {
  const { getProject, SheetProvider } = useTheatre();

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
