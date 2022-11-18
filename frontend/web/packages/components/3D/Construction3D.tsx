import * as THREE from 'three';
import { Suspense, useMemo } from 'react';
import { Canvas, PrimitiveProps, useLoader } from '@react-three/fiber';
import { editable as e } from '@theatre/r3f';
import { OrbitControls } from '@react-three/drei';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import {
  Physics,
  usePlane,
  useCompoundBody,
  useBox,
} from '@react-three/cannon';
import { DebugDev, toConvexProps } from 'packages/components/3D/util';
import { Typography } from 'packages/components/Typography';
import styled from 'styled-components';
import { Theatre } from './util';

const Plane = (props: any): JSX.Element => {
  const [rotation, position]: [
    [number, number, number],
    [number, number, number]
  ] = [
    [-1.57079632679, 0, 0],
    [0, -0.5, 0],
  ];

  const [ref] = usePlane(() => ({
    rotation,
    position,
    width: 100,
    height: 100,
    type: 'Static',
  }));

  return (
    <e.mesh
      // @ts-expect-error: ?
      ref={ref}
      theatreKey="floor"
      position={[0, -0.5, 0]}
      rotation={[-1.57079632679, 0, 0]}
    >
      <planeGeometry />
      {/* eslint-disable-next-line react/no-unknown-property */}
      <meshPhongMaterial transparent color="white" opacity={0} />
    </e.mesh>
  );
};

interface ConeProps {
  cone: THREE.Group;
  coneCollisions: readonly [cone: any, cylinder: any];
  primitiveProps?: Omit<PrimitiveProps, 'object'>;
}

const Cone = ({
  cone,
  coneCollisions,
  primitiveProps,
}: ConeProps): JSX.Element => {
  const [ref] = useCompoundBody(() => ({
    ...{
      shapes: [
        { type: 'ConvexPolyhedron', args: coneCollisions[0] },
        { type: 'ConvexPolyhedron', args: coneCollisions[1] },
      ],
      mass: 5,
      position: [0, 8, 0],
    },
    ...primitiveProps,
  }));

  return (
    <primitive
      ref={ref}
      editableType="mesh"
      object={cone}
      scale={[5, 5, 5]}
      castShadow
      receieveShadow
    />
  );
};

const CanvasSection = styled.section`
  position: absolute;
  width: 100%;
  top: ${(props) => props.theme.spacing.rem[300]};
  bottom: 0;
`;

const UnderConstructionSection = styled.section`
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 40vh;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  box-sizing: border-box;
  padding: ${(props) => props.theme.spacing.rem[300]};
`;

interface Construction3DProps {
  todo?: any;
}

const Construction3D = (props: Construction3DProps): JSX.Element => {
  const coneMaterial = useLoader(MTLLoader, '3d/cone/materials.mtl');
  const cone = useLoader(OBJLoader, '3d/cone/model.obj', (loader) => {
    coneMaterial.preload();
    loader.setMaterials(coneMaterial);
  });
  const coneCollisions = useMemo(
    () =>
      [
        // https://stackoverflow.com/a/21630178/17954209
        toConvexProps(
          new THREE.CylinderGeometry(0.1, 0.33, 1.2, 12, 1),
          [0, 0.3, 0]
        ),
        toConvexProps(
          new THREE.CylinderGeometry(0.53, 0.53, 0.1, 12, 1),
          [0, -0.3, 0]
        ),
      ] as const,
    []
  );
  const cone2 = useMemo(() => cone.clone(), []);
  const cone3 = useMemo(() => cone.clone(), []);

  return (
    <>
      <CanvasSection>
        <Suspense>
          <Canvas
            camera={{ position: [-5, 2, -5] }}
            gl={{ preserveDrawingBuffer: true }}
          >
            <Theatre sheetName={'underConstruction'}>
              <ambientLight />
              <e.pointLight
                theatreKey="pointLight1"
                intensity={10}
                position={[-1, 10, 2.5]}
              />
              <OrbitControls
                enablePan={false}
                enableZoom={false}
                enabled={false}
                // minPolarAngle={Math.PI / 2.2}
                // maxPolarAngle={Math.PI / 2.2}
              />
              {/* <e.mesh
          theatreKey="floor"
          position={[0, -0.5, 0]}
          rotation={[-1.57079632679, 0, 0]}
        >
          <circleGeometry args={[50, 32]} />
          <meshStandardMaterial color={'white'} />
        </e.mesh> */}
              <Physics size={10} allowSleep>
                <DebugDev color="black" scale={1.1}>
                  <Plane />
                  <Cone
                    cone={cone}
                    coneCollisions={coneCollisions}
                    primitiveProps={{
                      rotation: [0.36, 0.12, 0.24],
                    }}
                  />
                  <Cone
                    cone={cone2}
                    coneCollisions={coneCollisions}
                    primitiveProps={{
                      position: [0.15, 7, 1],
                      rotation: [0.9, 3, 0.75],
                    }}
                  />
                  <Cone
                    cone={cone3}
                    coneCollisions={coneCollisions}
                    primitiveProps={{
                      position: [1, 7, 0],
                      rotation: [0.4, 0.7, 1.8],
                    }}
                  />
                </DebugDev>
              </Physics>
            </Theatre>
          </Canvas>
        </Suspense>
      </CanvasSection>
      <UnderConstructionSection>
        <Typography.Heading.H2>
          This page is under construction
        </Typography.Heading.H2>
        <Typography.Paragraph.P2>
          Please come back later
        </Typography.Paragraph.P2>
      </UnderConstructionSection>
    </>
  );
};

export default Construction3D;
