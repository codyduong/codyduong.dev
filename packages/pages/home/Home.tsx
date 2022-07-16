import About from 'packages/pages/home/About';
import Education from 'packages/pages/home/Education';
import Experience from 'packages/pages/home/Experience';

export default function Home(): JSX.Element {
  return (
    <>
      <About />
      {/* <Education /> Roll into experience? */}
      <Experience />
    </>
  );
}
