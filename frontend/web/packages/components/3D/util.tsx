// https://github.com/pmndrs/react-three-fiber/discussions/949
import type { BufferGeometry } from 'three';
import { Geometry } from 'three-stdlib';
import { Debug } from '@react-three/cannon';
import type { getProject } from '@theatre/core';
import { useTheatre } from 'packages/components/3D/TheatreContext';

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

export const DebugDev = (props: Parameters<typeof Debug>[0]): JSX.Element => {
  return process.env.THREED_DEBUG == 'true' ? (
    <Debug {...props} />
  ) : (
    <>{props.children}</>
  );
};

interface TheatreProps {
  children: React.ReactNode;
  getProjectArgs?: Parameters<typeof getProject>;
  sheetArgs: Parameters<ReturnType<typeof getProject>['sheet']>;
}

export const Theatre = ({
  children,
  getProjectArgs = ['codyduongweb'],
  sheetArgs,
}: TheatreProps): JSX.Element | null => {
  const { getProject, SheetProvider } = useTheatre();

  const demoSheet = getProject(...getProjectArgs)?.sheet(...sheetArgs);
  if (!demoSheet) {
    return null;
  }
  return <SheetProvider sheet={demoSheet}>{children}</SheetProvider>;
};
