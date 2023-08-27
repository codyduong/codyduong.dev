import { Theatre } from './core';
import { useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

const Home3D = (): JSX.Element => {
  const discMaterial = useLoader(MTLLoader, '3d/cd/cd.mtl');
  const disc = useLoader(OBJLoader, '3d/cd/cd.obj', (loader) => {
    discMaterial.preload();
    loader.setMaterials(discMaterial);
  });

  return (
    <Canvas
      camera={{ position: [5, 5, -5] }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Theatre
        sheetArgs={['home3D']}
        render={(e) => (
          <>
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
          </>
        )}
      />
    </Canvas>
  );
};

export default Home3D;
