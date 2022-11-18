import * as THREE from 'three';
import { useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { editable as e, SheetProvider } from '@theatre/r3f';
import { OrbitControls, useTexture } from '@react-three/drei';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { Theatre } from './util';

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
      <Theatre sheetName="home3D">
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
      </Theatre>
    </Canvas>
  );
};

export default Home3D;
