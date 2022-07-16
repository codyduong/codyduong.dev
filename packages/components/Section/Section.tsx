import SubSection, {
  SubSectionProps,
} from 'packages/components/Section/SubSection';
import styled from 'styled-components';

export const SectionStub = styled.section<{
  sectionColor?: React.CSSProperties['color'];
}>`
  display: flex;
  flex-direction: column;
  //justify-content: center;
  align-items: center;
  min-height: '100vh';
  overflow: visible;
  background-color: ${(props) =>
    props.sectionColor ?? props.theme.secondary.l100};
`;

const SectionChildWrapper = styled.div<{
  sectionColor?: React.CSSProperties['color'];
}>`
  width: 100vw;
  background-color: ${(props) =>
    props.sectionColor ?? props.theme.secondary.l100};
`;

type SectionFullProps = SubSectionProps & {
  sectionColor?: React.CSSProperties['color'];
  children: React.ReactNode;
};

export default function Section({
  sectionColor,
  children,
  ...rest
}: SectionFullProps): JSX.Element {
  return (
    <SectionStub sectionColor={sectionColor}>
      <SubSection {...rest} sectionColor={sectionColor} />
      <SectionChildWrapper sectionColor={sectionColor}>
        {children}
      </SectionChildWrapper>
    </SectionStub>
  );
}
