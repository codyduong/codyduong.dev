import { H2 } from 'packages/components/styled/Text';
import styled from 'styled-components';

const SubSectionDiv = styled.div<{
  sectionColor?: React.CSSProperties['color'];
}>`
  width: 100vw;
  background-color: ${(props) =>
    props.sectionColor ?? props.theme.secondary.l100};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SubSectionSubtitle = styled.p`
  padding-bottom: 5rem;
`;

export interface SubSectionProps {
  title: string;
  subtitle: string;
  sectionColor?: React.CSSProperties['color'];
}

export default function SubSection(props: SubSectionProps): JSX.Element {
  return (
    <SubSectionDiv sectionColor={props.sectionColor}>
      <H2>{props.title}</H2>
      <SubSectionSubtitle>{props.subtitle}</SubSectionSubtitle>
    </SubSectionDiv>
  );
}
