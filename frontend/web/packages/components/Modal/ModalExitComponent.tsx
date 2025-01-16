import styled, { useTheme } from 'styled-components';
import classnames from 'classnames';
import ClearIcon from '@mui/icons-material/Clear';

const ModalExit = styled.button`
  padding: 0;
  border: none;
  background: none;
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: ${({ theme }) => theme.spacing.px[100]};
  right: ${({ theme }) => theme.spacing.px[100]};
  width: ${({ theme }) => theme.spacing.px[200]};
  height: ${({ theme }) => theme.spacing.px[200]};
  border-radius: ${({ theme }) => theme.spacing.px[75]};
  transition: background-color ease-out 225ms;

  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.color.surface[200]};
  }
`;

export const ModalExitComponent = ({
  className,
  ...rest
}: Omit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'ref'> & {
  ref?: Parameters<typeof ModalExit>[0]['ref'];
}): JSX.Element => {
  const cs = classnames(className, 'modal-exit');
  const theme = useTheme();

  return (
    <ModalExit className={cs} aria-label="Exit Modal" {...rest}>
      <ClearIcon fill={theme.color.text[400]} />
    </ModalExit>
  );
};

export default ModalExitComponent;
