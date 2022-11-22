// https://github.com/pmndrs/react-three-fiber/discussions/949
import type { BufferGeometry } from 'three';
import { Geometry } from 'three-stdlib';
import { Debug } from '@react-three/cannon';

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
  console.log(process.env.THREED_DEBUG);
  return process.env.THREED_DEBUG == 'true' ? (
    <Debug {...props} />
  ) : (
    <>{props.children}</>
  );
};

import { getProject } from '@theatre/core';
import { SheetProvider } from '@theatre/r3f';
import studio from '@theatre/studio';
studio.initialize();
studio.ui.hide();

if (process.env.THREED_DEBUG == 'true') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const extension = require('@theatre/r3f/dist/extension');
  studio.extend(extension);
  studio.ui.restore();
}

interface TheatreProps {
  children: React.ReactNode;
  projectName?: string;
  sheetName: string;
}

export const Theatre = ({
  children,
  projectName = 'codyduongweb',
  sheetName,
}: TheatreProps): JSX.Element => {
  const demoSheet = getProject(projectName).sheet(sheetName);
  return <SheetProvider sheet={demoSheet}>{children}</SheetProvider>;
};
