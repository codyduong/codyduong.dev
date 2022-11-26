import type { getProject } from '@theatre/core';
import { useTheatre } from 'packages/components/3D/TheatreContext';
import { editable } from '@theatre/r3f';
import React, { useEffect } from 'react';
import { useQuery } from 'packages/mono-app/QueryContext';
import { Debug } from '@react-three/cannon';

import studio from '@theatre/studio';
studio.initialize();
studio.ui.hide();

function showStudioOnQuery(): void {
  if (useQuery().has('theatrejs')) {
    studio.ui.restore();
  } else {
    studio.ui.hide();
  }
}

export function RunOnThreeDev<T extends () => R, R>(toRun: T): R | null {
  return useQuery().has('3D_DEBUG') ? toRun() : null;
}

export function RenderOnThreeDev<
  Props extends [{ children?: React.ReactNode }, unknown?]
>({
  DebugComponent,
  ...rest
}: Props[0] & {
  DebugComponent: (...args: Props) => JSX.Element;
}): JSX.Element {
  return useQuery().get('3D_DEBUG') ? (
    <DebugComponent {...rest} />
  ) : (
    <>{rest.children}</>
  );
}

export function PhysicsDebug(props: Parameters<typeof Debug>[0]): JSX.Element {
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

  useEffect(() => {
    if (studio.ui.isHidden) {
      const theatrejsRoot = document.getElementById('theatrejs-studio-root');
      if (theatrejsRoot) {
        theatrejsRoot.ariaHidden = 'true';
      }
    }
  }, [studio.ui]);

  showStudioOnQuery();

  const demoSheet = getProject(...getProjectArgs)?.sheet(...sheetArgs);
  if (!demoSheet) {
    return null;
  }
  return <SheetProvider sheet={demoSheet}>{render(editable)}</SheetProvider>;
};
