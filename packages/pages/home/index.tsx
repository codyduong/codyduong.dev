import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';

export interface HomeProps {
  fun?: any;
}

export default function Home(_props: HomeProps): JSX.Element {
  const thisRef = useRef<HTMLDivElement>(null);

  return (
    <div className="App">
      <header className="App-header">
        <div ref={thisRef}></div>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Canvas>test</Canvas>
    </div>
  );
}
