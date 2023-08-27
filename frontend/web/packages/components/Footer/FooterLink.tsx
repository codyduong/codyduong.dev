import styled from 'packages/styled-components';
import { Link } from 'packages/components/A';
// import T from 'packages/components/Typography';

export const StyledFooterLink = styled(Link)`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.color.text[100]};
  align-self: center;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.px[100]};
  border-bottom: 1px solid ${({ theme }) => theme.color.text[200]};
  width: 100%;

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.color.base[100]};
  }
`;

type FooterLinkProps = Parameters<typeof StyledFooterLink>[0] & {
  to: string;
  children?: React.ReactNode;
};

const FooterLink = ({
  to,
  children,
  ...rest
}: FooterLinkProps): JSX.Element => {
  return (
    <StyledFooterLink to={to} {...rest}>
      <span>{children}</span>
      <span aria-hidden>{'>'}</span>
    </StyledFooterLink>
  );
};

export default FooterLink;
