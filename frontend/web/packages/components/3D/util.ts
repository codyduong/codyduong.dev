// https://github.com/pmndrs/react-three-fiber/discussions/949

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as THREE from 'three';
import type { BufferGeometry } from 'three';
import { ConvexGeometry, Geometry } from 'three-stdlib';
// import { ConvexHull, VertexNode } from 'three/examples/jsm/math/ConvexHull';
import type {
  CompoundBodyProps,
  ConvexPolyhedronArgs,
  ConvexPolyhedronProps,
} from '@react-three/cannon';

export function toConvexProps(
  bufferGeometry: BufferGeometry,
): ConvexPolyhedronArgs {
  const geo = new Geometry().fromBufferGeometry(bufferGeometry);

  // Merge duplicate vertices resulting from glTF export.
  // Cannon assumes contiguous, closed meshes to work
  geo.mergeVertices();

  return [
    geo.vertices.map((v) => [v.x, v.y, v.z]),
    geo.faces.map((f) => [f.a, f.b, f.c]),
    [],
  ];
}

export function toConvexPolyhedronArgs(
  bufferGeometry: BufferGeometry,
): ConvexPolyhedronArgs {
  const geo = new Geometry().fromBufferGeometry(bufferGeometry);

  geo.mergeVertices();

  return toConvexProps(new ConvexGeometry(geo.vertices));
}

export function toConvexPolyhedronShape(
  bufferGeometry: BufferGeometry,
  params: ConvexPolyhedronProps,
): CompoundBodyProps['shapes'][number] {
  return {
    ...params,
    type: 'ConvexPolyhedron' as const,
    // @ts-expect-error: todo
    args: toConvexPolyhedronArgs(bufferGeometry),
  };
}

export function toConvexPolyhedronShapes(
  ...args: [bufferGeometry: BufferGeometry, params: ConvexPolyhedronProps][]
): CompoundBodyProps['shapes'] {
  return args.map((v) => toConvexPolyhedronShape(...v));
}
