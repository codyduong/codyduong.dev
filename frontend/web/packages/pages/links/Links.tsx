import styled, { useTheme } from 'styled-components';
import breakpoints from 'packages/style/breakpoints';
import A from 'packages/components/A';
import Content from 'packages/components/Content';

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import StackOverflow from './StackOverflow.svg';
import EmailIcon from '@mui/icons-material/Email';
import { Theme } from 'packages/themed/Themes';
import T from 'packages/components/Typography';

const StyledContent = styled(Content)`
  justify-content: center;
`;

const LinksSection = styled.section`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const LinksHeader = styled(T.H2)`
  ${T.P2.bold.css}
  font-size: 2rem;
  margin-top: ${({ theme }) => theme.spacing.px[100]};
  margin-bottom: ${({ theme }) => theme.spacing.px[100]};

  @media only screen and (min-width: ${breakpoints.md}) {
    margin-top: ${({ theme }) => theme.spacing.px[50]};
    font-size: 2rem;
  }
`;

const LinksWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  max-width: ${breakpoints.sm} + 1rem;
  gap: 4rem;
  justify-content: center;
  margin-bottom: 100px;
`;

const LinksLink = styled(A)`
  text-decoration: none;
  text-align: center;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;

  svg {
    width: 2rem;
    height: 2rem;
    padding-left: 1rem;
    fill: currentColor;
  }

  span {
    padding-right: 1rem;
  }

  &:hover {
    svg {
      fill: ${(props) => props.hovercolor};
    }
  }
`;

export const LINKS = [
  {
    label: 'codyduong',
    'aria-label': 'github',
    to: 'https://github.com/codyduong',
    icon: GitHubIcon,
    hoverColor: '#333333',
  },
  {
    label: 'cody-duong',
    'aria-label': 'linkedin',
    to: 'https://www.linkedin.com/in/cody-duong/',
    icon: LinkedInIcon,
    hoverColor: '#0072b1',
  },
  {
    label: 'cody-duong',
    'aria-label': 'stackoverflow',
    to: 'https://stackoverflow.com/users/17954209/cody-duong',
    icon: StackOverflow,
    hoverColor: '#f48024',
  },
  {
    label: 'cody.qd@gmail.com',
    'aria-label': 'email',
    to: 'mailto:cody.qd@gmail.com',
    icon: EmailIcon,
    hoverColor: (theme: Theme) => theme.color.base[300],
  },
  // {
  //   label: 'GitHub5',
  //   to: 'https://github.com/codyduong',
  //   icon: GitHubIcon,
  // },
] as const;

const GenerateLinks = (): React.ReactNode => {
  const theme = useTheme();

  return LINKS.map((L) => {
    return (
      <LinksLink
        key={`${L.label} ${L.to}`}
        href={L.to}
        target={'_blank'}
        hovercolor={
          typeof L.hoverColor === 'function'
            ? L.hoverColor(theme)
            : L.hoverColor
        }
      >
        <L.icon aria-label={`${L['aria-label']}`} />
        <span>{L.label}</span>
      </LinksLink>
    );
  });
};

export default function Links(): JSX.Element {
  return (
    <StyledContent>
      <LinksSection>
        <LinksHeader>Links</LinksHeader>
        <LinksWrapper>{GenerateLinks()}</LinksWrapper>
      </LinksSection>
    </StyledContent>
  );
}
