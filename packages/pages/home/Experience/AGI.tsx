import styled from 'styled-components';
import { breakpoints } from 'packages/style';
import AGI from './agi.svg';

const AGI_COLORS = {
  darker3: '#004629',
  darker2: '#005432',
  darker1: '#00623B',
  color: '#006f44',
  lighter1: '#22844B',
  lighter2: '#449856',
  lightest: '#66AC67',
  text: '#fff',
};

const AGIDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 50vh;
  width: 100vw;
  background: linear-gradient(
    0deg,
    ${AGI_COLORS.darker3} 0%,
    ${AGI_COLORS.color} 50%,
    ${AGI_COLORS.lighter2} 100%
  );
  margin-bottom: 10rem;
  border-radius: 0;
`;

const AGIDivHeader = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  row-gap: 0.5rem;
  padding: 0 0;
  width: 100%;
  background-color: ${(props) => props.theme.content.l400};
  //color: ${AGI_COLORS.text};

  @media only screen and (min-width: ${breakpoints.lg}) {
    padding: 0 10rem;
    width: auto;
    background: linear-gradient(
      90deg,
      rgba(0, 70, 41, 0) 0%,
      ${(props) => props.theme.content.l400} 10%,
      ${(props) => props.theme.content.l400} 90%,
      rgba(68, 152, 86, 0) 100%
    );
  }

  @media only screen and (min-width: ${breakpoints.xxl}) {
    column-gap: 400px;
  }
`;

const AGILogo = styled(AGI)`
  width: 300px;

  @media only screen and (min-width: ${breakpoints.sm}) {
    width: 310px;
  }

  @media only screen and (min-width: ${breakpoints.md}) {
    width: 320px;
  }
`;

const AGIDivBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  padding-bottom: 10rem;

  @media only screen and (min-width: ${breakpoints.md}) {
    padding: 1rem 2.5rem 10rem;
  }

  @media only screen and (min-width: ${breakpoints.lg}) {
    padding: 1rem 5rem 10rem;
  }

  @media only screen and (min-width: ${breakpoints.xxl}) {
    padding: 1rem 7.5rem 10rem;
  }
`;

const JobWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: right;
  padding: 0 2rem 1rem;
  > p {
    margin: 0;
  }
  @media only screen and (min-width: ${breakpoints.md}) {
    padding-top: 0.5rem;
  }
`;

const JobTitle = styled.p`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${(props) => props.theme.secondary.l200};
`;

const JobTime = styled.p`
  color: ${(props) => props.theme.secondary.l200};
`;

export default function ExperienceAGI(): JSX.Element {
  return (
    <AGIDiv>
      <AGIDivHeader>
        <AGILogo />
        <JobWrapper>
          <JobTitle>Fullstack Software Engineer</JobTitle>
          <JobTime>July 2021 - Present</JobTime>
        </JobWrapper>
      </AGIDivHeader>
      <AGIDivBody>
        <span>CI/CD Pipeline Improvements</span>
        <span>CI/CD Pipeline Improvements</span>
        <span>CI/CD Pipeline Improvements</span>
        <span>CI/CD Pipeline Improvements</span>
        <span>More</span>
      </AGIDivBody>
    </AGIDiv>
  );
}
