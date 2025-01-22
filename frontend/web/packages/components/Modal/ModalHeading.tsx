import styled from 'styled-components';
import ModalExitComponent from './ModalExitComponent';
import T from 'packages/components/Typography';
import { useModal } from 'packages/components/Modal/ModalContext';

const ModalHeadingStyled = styled.h2`
  ${T.P2.bold.css}
  margin: ${({ theme }) => `${theme.spacing.px[50]} 0px ${theme.spacing.px['150']}`};
  &.uppercase {
    text-transform: uppercase;
  }
`;

type ModalHeadingProps = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
  'ref'
> & {
  exitLabel?: string;
};

const ModalHeading = ({ children, exitLabel = 'Exit Modal', ...rest }: ModalHeadingProps): React.JSX.Element => {
  const { onExit, ariaLabelledBy } = useModal();

  return (
    <ModalHeadingStyled id={ariaLabelledBy} {...rest}>
      {children}
      <ModalExitComponent onClick={onExit} aria-label={exitLabel} />
    </ModalHeadingStyled>
  );
};

export default ModalHeading;
