import getScrollPosition from 'packages/hooks/getScrollPosition';
import { breakpoints } from 'packages/style';
import styled from 'styled-components';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';

const AboutRoles = styled.div`
  display: flex;
  flex-flow: row wrap;
  gap: 20px;
  margin-left: 0rem;
  transition: all 0.5s ease-in-out;
  justify-content: center;

  @media only screen and (min-width: ${breakpoints.xs}) {
    margin-left: 5rem;
    font-size: 1rem;
  }

  @media only screen and (min-width: ${breakpoints.md}) {
    margin-left: 8rem;
    font-size: 1.0625rem;
  }
`;

const AboutDiv = styled.div`
  margin-bottom: 200px;
`;

export const AboutSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding-top: 20px;
  min-height: calc(100vh - 72px - 1rem);
  gap: 10px;

  @media only screen and (min-width: ${breakpoints.md}) {
    padding-left: 0px;
  }
`;

const AboutTitle = styled.h1`
  color: ${(props) => props.theme.contentEmphasized};
  text-align: center;
  margin-bottom: 3rem;
  transition: all 0.5s ease-in-out;

  @media only screen and (min-width: ${breakpoints.xs}) {
    margin-bottom: 1.5rem;
    text-align: left;
  }

  @media only screen and (min-width: ${breakpoints.md}) {
    font-size: 2rem;
  }
`;

const ROLES = [
  'Digital Artist',
  '3D Printing Enthusiast',
  'Accessibility Advocate',
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
    const percentageDiv = (i * 100) / divisions - 100 / divisions;
    str += `${percentageDiv}% {
      transform: translateY(calc(${-100 + percentageDiv}% + ${offset}%))
    }`;
  }
  return str;
};

const ScrollingWrapper = styled.div`
  display: flex;
  flex-flow: column-reverse;
  animation: ${2.5 * ROLES.length + 1}s translater;
  animation-delay: 1.5s;
  animation-fill-mode: forwards;
  transform: translateY(
    calc(
      ${-100 + 100 / ROLES.length - 100 / ROLES.length}% +
        ${100 / ROLES.length}%
    )
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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 32px;
  animation: bounce 2.5s ease-in-out;
  animation-delay: 5s;
  animation-iteration-count: infinite;

  @keyframes bounce {
    0% {
      transform: translateY(0);
    }
    25% {
      transform: translateY(-12px);
    }
    50% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(0);
    }
  }

  @media only screen and (max-height: ${breakpoints.md}) {
    bottom: 1rem;
    font-size: 0.9125rem;
  }

  @media only screen and (max-height: ${breakpoints.sm}) {
    display: none;
  }
`;

const AboutDownArrow = styled.div`
  background-color: ${(props) => props.theme.bgDark};
  color: ${(props) => props.theme.contentEmphasized};
  aspect-ratio: 1;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-in-out;

  > svg {
    font-size: 2rem;
  }

  @media only screen and (max-height: ${breakpoints.md}) {
    width: 32px;
    height: 32px;

    > svg {
      font-size: 1.625rem;
    }
  }
`;

const AboutDownText = styled.p`
  text-align: center;
  color: ${(props) => props.theme.contentEmphasized};
`;

export default function About(): JSX.Element {
  const scrollPosition = getScrollPosition();

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
        <AboutDownText>Scroll</AboutDownText>
        <AboutDownArrow>
          <KeyboardDoubleArrowDownIcon />
        </AboutDownArrow>
      </AboutDownArrowWrapper>
    </AboutSection>
  );
}
