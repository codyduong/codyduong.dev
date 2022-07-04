import getScrollPosition from 'packages/hooks/getScrollPosition';
import { breakpoints } from 'packages/style';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

const AboutRoles = styled.div`
  display: inline-flex;
  gap: 20px;
`;

const AboutDiv = styled.div`
  padding-left: 10px;
  padding-bottom: 200px;
`;

export const AboutSection = styled.section`
  flex-direction: column;
  display: flex;
  padding-top: 20px;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 72px - 1rem);
  gap: 10px;

  ${AboutRoles} {
    margin-left: 4.8rem;
  }

  @media only screen and (min-width: ${breakpoints.md}) {
    padding-left: 0px;
    flex-direction: row;
    align-items: none;
    justify-content: center;
  }
`;

const AboutTitle = styled.h1``;

const ROLES = [
  'Digital Artist',
  '3D Printing Enthusiast',
  'Typescript Wizard',
  'Software Engineer',
] as const;

const ScrollingDiv = styled.div``;

const createScrollingWrapperKeyframes = (): string => {
  const divisions = ROLES.length;
  let str = `100% {
      transform: translateY(0%)
    }`;
  const offset = 100 / ROLES.length;
  for (let i = divisions; i > 0; i--) {
    const percentageDiv = (i * 100) / divisions - 25;
    str += `${percentageDiv}% {
      transform: translateY(calc(${-100 + percentageDiv}% + ${offset}%))
    }`;
  }
  return str;
};

const ScrollingWrapper = styled.div`
  display: flex;
  flex-flow: column-reverse;
  animation: ${3.5 * ROLES.length}s translater;
  animation-delay: 1.5s;
  animation-fill-mode: forwards;
  transform: translateY(
    calc(${-100 + 100 / ROLES.length - 25}% + ${100 / ROLES.length}%)
  );
  @keyframes translater {
    ${createScrollingWrapperKeyframes()}
  }
`;

const ScrollingText = styled.p<{ index: number }>`
  color: ${(props) => props.theme.contentEmphasized};
  animation: 1s fadeIn;
  animation-delay: ${({ index }) => `${index * 2.5 + 1}s`};
  animation-fill-mode: forwards;
  opacity: 0;

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const ScrollTextAccessible = styled.p`
  width: 0;
  height: 0;
  overflow: hidden;
`;

function ScrollingRoles(): JSX.Element {
  console.log(createScrollingWrapperKeyframes());

  return (
    <ScrollingDiv aria-hidden>
      <ScrollingWrapper>
        {ROLES.map((role, index) => (
          <ScrollingText key={role} index={index}>
            {role}
          </ScrollingText>
        ))}
      </ScrollingWrapper>
    </ScrollingDiv>
  );
}

const AboutDownArrowWrapper = styled.div`
  pointer-events: none;
  display: flex;
  justify-content: center;
`;

const AboutDownArrow = styled.div`
  position: absolute;
  bottom: 32px;
  background-color: ${(props) => props.theme.bgDark};
  color: ${(props) => props.theme.contentEmphasized};
  aspect-ratio: 1;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function About(): JSX.Element {
  const scrollPosition = getScrollPosition();
  console.log(scrollPosition);

  return (
    <AboutSection>
      <AboutDiv>
        <AboutTitle>Cody Duong</AboutTitle>
        <AboutRoles>
          <p>Hi, I'm a </p>
          <ScrollingRoles />
          <ScrollTextAccessible>{ROLES.join(', ')}</ScrollTextAccessible>
        </AboutRoles>
      </AboutDiv>
      <AboutDownArrowWrapper aria-hidden>
        <AboutDownArrow>
          <KeyboardDoubleArrowDownIcon fontSize={'large'} />
        </AboutDownArrow>
      </AboutDownArrowWrapper>
    </AboutSection>
  );
}
