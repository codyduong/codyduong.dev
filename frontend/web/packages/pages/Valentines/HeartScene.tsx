import * as THREE from 'three';
import { Theatre, PhysicsDebug } from 'packages/components/3D/core';
import { memo, Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import type { editable } from '@theatre/r3f';
import { Detailed, Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { Physics, usePlane } from '@react-three/cannon';
import { useUrlSearchParams } from 'packages/app/contexts/UrlSearchParamsContext';

// adapted from the r3f bananas

const Plane = ({ e }: { e: typeof editable }): React.JSX.Element => {
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
    <e.mesh ref={ref} theatreKey="floor" position={[0, -0.5, 0]} rotation={[-1.57079632679, 0, 0]}>
      <planeGeometry />
      <meshPhongMaterial transparent color="white" opacity={0} />
    </e.mesh>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Heart = memo(({ index, z, speed, e }: any) => {
  const ref = useRef<THREE.LOD<THREE.Object3DEventMap>>(null);
  const { viewport, camera } = useThree();
  const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z]);
  const { nodes, materials } = useGLTF('/3d/heart/Heart.glb');

  const [data] = useState({
    // Randomly distributing the objects along the vertical
    y: THREE.MathUtils.randFloatSpread(height * 2),
    // This gives us a random value between -1 and 1, we will multiply it with the viewport width
    x: THREE.MathUtils.randFloatSpread(2),
    // How fast objects spin, randFlost gives us a value between min and max, in this case 8 and 12
    spin: THREE.MathUtils.randFloat(8, 12),
    // Some random rotations, Math.PI represents 360 degrees in radian
    rX: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI,
  });

  // useFrame executes 60 times per second
  useFrame((state, dt) => {
    // Make the X position responsive, slowly scroll objects up at the Y, distribute it along the Z
    // dt is the delta, the time between this frame and the previous, we can use it to be independent of the screens refresh rate
    // We cap dt at 0.1 because now it can't accumulate while the user changes the tab, it will simply stop
    if (dt < 0.1) ref.current!.position.set(index === 0 ? 0 : data.x * width, (data.y += dt * speed), -z);
    // Rotate the object around
    ref.current!.rotation.set(
      (data.rX += dt / data.spin),
      Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI,
      (data.rZ += dt / data.spin),
    );
    // If they're too far up, set them back to the bottom
    if (data.y > height * (index === 0 ? 4 : 1)) data.y = -(height * (index === 0 ? 4 : 1));
  });

  // @codyduong use instanced meshes instead
  return (
    <Detailed ref={ref} distances={[0]}>
      {/* <mesh geometry={nodesB.banana_high.geometry} material={materialsB.skin} material-emissive="#ff9f00" scale={0.5} /> */}
      <e.mesh
        theatreKey={`heart_${index}`}
        geometry={nodes['Heart_Full'].geometry}
        material={materials.red}
        scale={100}
      >
        <meshStandardMaterial color="#e94c4c" />
      </e.mesh>
    </Detailed>
  );
});

interface HeartSceneProps {
  count: number;
}

const HeartScene = ({ count }: HeartSceneProps): React.JSX.Element => {
  const query = useUrlSearchParams();
  const theatre = query.has('theatrejs');
  const depth = 80;
  const speed = 1;
  const easing = (x: number) => Math.sqrt(1 - Math.pow(x - 1, 2));

  return (
    <>
      <Suspense>
        <Canvas
          camera={{ position: [0, 0, 10], zoom: 2, fov: 20, near: 0.01, far: depth + 15 }}
          gl={{ preserveDrawingBuffer: true }}
          dpr={[1, 1.5]}
          shadows={'basic'}
        >
          <color attach="background" args={['#ff9898']} />
          <Environment preset="sunset" />
          {/* broken on react 19 */}
          {/* <EffectComposer>
            <DepthOfField target={[0, 0, 60]} focalLength={0.4} bokehScale={14} height={700} />
          </EffectComposer> */}
          <Theatre
            sheetArgs={['underConstruction']}
            render={(e) => (
              <>
                {Array.from({ length: count }, (_, i) => (
                  <Heart key={i} index={i} z={Math.round(easing(i / count) * depth)} speed={speed} e={e} />
                ))}
                <ambientLight />
                <e.spotLight
                  theatreKey="spotLight_0"
                  position={[10, 20, 10]}
                  penumbra={1}
                  decay={0}
                  intensity={3}
                  color="red"
                />
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
                  </PhysicsDebug>
                </Physics>
              </>
            )}
          />
        </Canvas>
      </Suspense>
    </>
  );
};

export default HeartScene;
