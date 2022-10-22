import * as THREE from 'three';
import { useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { getProject } from '@theatre/core';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

import studio from '@theatre/studio';
import extension from '@theatre/r3f/dist/extension';
import { editable as e, SheetProvider } from '@theatre/r3f';
import { OrbitControls, useTexture } from '@react-three/drei';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

if (process.env.NODE_ENV === 'development') {
  studio.initialize();
  studio.extend(extension);
}

const demoSheet = getProject('Demo Project').sheet('Demo Sheet');

const Home3D = (): JSX.Element => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      const studioRoot = document.getElementById('theatrejs-studio-root');
      if (studioRoot) {
        // @ts-expect-error: w/e
        studioRoot.style.zIndex = 1100;
      }
    }
  }, []);

  const discMaterial = useLoader(MTLLoader, 'cd/cd.mtl');
  const disc = useLoader(OBJLoader, 'cd/cd.obj', (loader) => {
    discMaterial.preload();
    loader.setMaterials(discMaterial);
  });

  return (
    <Canvas
      camera={{ position: [5, 5, -5] }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <SheetProvider sheet={demoSheet}>
        <ambientLight />
        <e.pointLight theatreKey="pointLight1" position={[10, 10, 10]} />
        {/* <e.mesh theatreKey="Cube">
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="orange" />
        </e.mesh> */}
        <e.primitive
          theatreKey="disc"
          editableType="mesh"
          object={disc}
          rotation={[0, 180, 180]}
          scale={[5, 1, 5]}
        />
        {/* <e.primitive
          theatreKey="disc"
          editableType="mesh"
          object={disc}
        ></e.primitive> */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          // minPolarAngle={Math.PI / 2.2}
          // maxPolarAngle={Math.PI / 2.2}
        />
      </SheetProvider>
    </Canvas>
  );
};

export default Home3D;
