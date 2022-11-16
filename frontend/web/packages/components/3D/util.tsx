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
  return process.env.NODE_ENV === 'development' ? (
    <Debug {...props} />
  ) : (
    <>{props.children}</>
  );
};
