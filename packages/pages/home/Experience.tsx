import styled from 'styled-components';
import AGI from './agi.svg';

const ExperienceTitle = styled.h2`
  color: ${(props) => props.theme.contentEmphasized};
`;

const ExperienceSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const AGIColors = {
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
  height: 10rem;
  background-color: ${AGIColors.color};
`;

const AGIDivInnerLeft = styled.div`
  background-color: #eeeeee;
  display: flex;
  justify-content: center;
`;

const AGILogo = styled(AGI)`
  width: 400px;
`;

export default function Experience(): JSX.Element {
  return (
    <ExperienceSection>
      <ExperienceTitle>Experience</ExperienceTitle>
      <AGIDiv>
        <AGIDivInnerLeft>
          <AGILogo />
        </AGIDivInnerLeft>
      </AGIDiv>
    </ExperienceSection>
  );
}
