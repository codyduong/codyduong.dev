import { useRef } from 'react';
import styled from 'styled-components';

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
`;

export default function Home(): JSX.Element {
  return (
    <>
      <CenterDiv>Cody</CenterDiv>
      <CenterDiv>Cody</CenterDiv>
      <CenterDiv>Cody</CenterDiv>
      <CenterDiv>Cody</CenterDiv>
    </>
  );
}
