import { ClientOnly } from 'packages/components/ClientOnly';
import Head from 'packages/components/Head';
import { useState } from 'react';
import styled from 'styled-components';

const Main = styled.div`
  font-family:
    Sora,
    -apple-system,
    BlinkMacSystemFont,
    Segoe UI,
    Roboto,
    Oxygen,
    Ubuntu,
    Cantarell,
    Fira Sans,
    Droid Sans,
    Helvetica Neue,
    sans-serif;
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  align-items: center;
  background-color: transparent;
`;

const H1 = styled.h1`
  color: #ff4040;
`;

const Section = styled.div`
  margin-top: 10rem;
  display: flex;
  flex-flow: column nowrap;
  gap: 1rem;
  background-color: #ffffff;
  padding: 2rem;
  border-radius: 1rem;
`;

const Button = styled.button`
  font-family: inherit;
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border: solid ${({ theme }) => `${theme.spacing.px[12.5]} ${theme.color.surface[500]}`};
  border-radius: 1rem;
  user-select: none;
  &:focus-within {
    border: #eb3a3a 2px solid;
    color: #eb3a3a;
    outline: none;
  }
`;

const Scene = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: block;
  height: 100%;
  width: 100%;
  z-index: -50;
`;

const Valentines = (): JSX.Element => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Head title="Valentine" override favicon="/heart.ico" />
      <Main>
        <Section>
          <H1>Valentine ❤️</H1>
          <Button
            onClick={() => {
              setCount((prev) => prev + 1);
            }}
          >
            Add a Heart
          </Button>
          {count} Hearts
        </Section>
      </Main>
      <Scene>
        <ClientOnly component={() => import('./HeartScene')} count={count} />
      </Scene>
    </>
  );
};

export default Valentines;
