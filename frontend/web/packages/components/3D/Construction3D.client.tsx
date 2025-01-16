import * as THREE from 'three';
import { Theatre, PhysicsDebug } from './core';
import { toConvexPolyhedronShapes } from './util';
import { Suspense, useMemo } from 'react';
import { Canvas, PrimitiveProps, useLoader } from '@react-three/fiber';
import type { editable } from '@theatre/r3f';
import { OrbitControls } from '@react-three/drei';
import { Physics, usePlane, useCompoundBody, CompoundBodyProps } from '@react-three/cannon';
import { A11yAnnouncer, A11ySection } from '@react-three/a11y';
import { MTLLoader, OBJLoader } from 'three/examples/jsm/Addons.js';
import { useUrlSearchParams } from 'packages/app/contexts/UrlSearchParamsContext';

const Plane = ({ e }: { e: typeof editable }): JSX.Element => {
  const [rotation, position]: [[number, number, number], [number, number, number]] = [
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
      <meshPhongMaterial transparent color="white" opacity={0} />
    </e.mesh>
  );
};

interface ConeProps {
  cone: THREE.Group;
  shapes: CompoundBodyProps['shapes'];
  primitiveProps?: Omit<PrimitiveProps, 'object'>;
}

const Cone = ({ cone, shapes, primitiveProps }: ConeProps): JSX.Element => {
  const [ref] = useCompoundBody(() => ({
    ...{
      shapes: shapes,
      linearDamping: 0.2,
      mass: 5,
    },
    ...primitiveProps,
  }));

  return <primitive ref={ref} editableType="mesh" object={cone} scale={[5, 5, 5]} castShadow receieveShadow />;
};

const Construction3DClient = (): JSX.Element => {
  const query = useUrlSearchParams();
  const theatre = query.has('theatrejs');

  const coneMaterial = useLoader(MTLLoader, '/3d/cone/materials.mtl');
  const cone = useLoader(OBJLoader, '/3d/cone/model.obj', (loader) => {
    coneMaterial.preload();
    loader.setMaterials(coneMaterial);
  });
  const coneShapes = useMemo(
    () =>
      toConvexPolyhedronShapes(
        [
          new THREE.CylinderGeometry(0.095, 0.36, 1.28, 12, 1),
          { position: [0, 0.36, 0], rotation: [0, Math.PI / 6, 0] },
        ],
        [new THREE.CylinderGeometry(0.6, 0.6, 0.1, 12, 1), { position: [0, -0.325, 0] }],
      ),
    [],
  );
  const cone2 = useMemo(() => cone.clone(), [cone]);
  const cone3 = useMemo(() => cone.clone(), [cone]);

  return (
    <>
      <Suspense>
        <Canvas camera={{ position: [-4, 2, -4], zoom: 2 }} gl={{ preserveDrawingBuffer: true }} shadows={'basic'}>
          <A11ySection
            label="Page Under Construction"
            description="A physics simulation of three traffic cones falling from the top of the screen"
          >
            <Theatre
              sheetArgs={['underConstruction']}
              render={(e) => (
                <>
                  <ambientLight />
                  <e.pointLight theatreKey="pointLight1" intensity={10} position={[-1, 10, 2.5]} />
                  <OrbitControls
                    enablePan={theatre}
                    enableZoom={theatre}
                    enabled={theatre}
                    // minPolarAngle={Math.PI / 2.2}
                    maxPolarAngle={Math.PI / 2.2}
                  />
                  <Physics size={10} allowSleep>
                    <PhysicsDebug color="black">
                      <Plane e={e} />
                      <Cone
                        cone={cone}
                        shapes={coneShapes}
                        primitiveProps={{
                          position: [-0.24, 8, -0.24],
                          rotation: [-0.24, 0.12, -0.24],
                        }}
                      />
                      <Cone
                        cone={cone2}
                        shapes={coneShapes}
                        primitiveProps={{
                          position: [0.15, 7.2, 1.2],
                          rotation: [0.9, 3, 0.75],
                        }}
                      />
                      <Cone
                        cone={cone3}
                        shapes={coneShapes}
                        primitiveProps={{
                          position: [1, 7, 0],
                          rotation: [0.4, 0.7, 1.8],
                        }}
                      />
                    </PhysicsDebug>
                  </Physics>
                </>
              )}
            />
          </A11ySection>
        </Canvas>
      </Suspense>
      <A11yAnnouncer />
    </>
  );
};

export default Construction3DClient;
