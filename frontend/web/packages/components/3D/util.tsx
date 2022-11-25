// https://github.com/pmndrs/react-three-fiber/discussions/949

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as THREE from 'three';
import type { BufferGeometry } from 'three';
import { Geometry } from 'three-stdlib';
import type { Debug } from '@react-three/cannon';
import type { getProject } from '@theatre/core';
import { useTheatre } from 'packages/components/3D/TheatreContext';
import { editable } from '@theatre/r3f';
import React, { useEffect } from 'react';
import studio from '@theatre/studio';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from 'packages/mono-app/QueryContext';

export function toConvexProps(
  bufferGeometry: BufferGeometry,
  offset: [number, number, number] = [0, 0, 0]
): any {
  const geo = new Geometry().fromBufferGeometry(bufferGeometry);
  // Merge duplicate vertices resulting from glTF export.
  // Cannon assumes contiguous, closed meshes to work
  geo.mergeVertices();
  return [
    geo.vertices.map((v) => [
      v.x + offset[0],
      v.y + offset[1],
      v.z + offset[2],
    ]),
    geo.faces.map((f) => [f.a, f.b, f.c]),
    [],
  ];
}

export function RenderOnThreeDev<
  Props extends [{ children?: React.ReactNode }, unknown?] = Parameters<
    typeof Debug
  >
>({
  DebugComponent,
  predicate = () => {
    return !!useParams()?.debug;
  },
  ...rest
}: Props[0] & {
  DebugComponent: (...args: Props) => JSX.Element;
  predicate?: () => boolean;
}): JSX.Element {
  const query = useQuery();
  console.log(query);

  return predicate() ? <DebugComponent {...rest} /> : <>{rest.children}</>;
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

  const demoSheet = getProject(...getProjectArgs)?.sheet(...sheetArgs);
  if (!demoSheet) {
    return null;
  }
  return <SheetProvider sheet={demoSheet}>{render(editable)}</SheetProvider>;
};
