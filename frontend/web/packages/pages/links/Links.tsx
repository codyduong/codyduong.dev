import styled from 'styled-components';
import breakpoints from 'packages/style/breakpoints';
import A from 'packages/components/A';

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import StackOverflow from './StackOverflow.svg';
import EmailIcon from '@mui/icons-material/Email';
import { Theme } from 'packages/themed/Themes';
import { useThemeBase } from 'packages/themed';
import T from 'packages/components/Typography';

const LinksSection = styled.section`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  height: 80vh;
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
    font-size: 2rem;
    padding-left: 1rem;
    fill: currentColor;
  }

  p {
    padding-right: 1rem;
  }

  &:hover {
    svg {
      fill: ${(props) => props.hovercolor};
    }
  }
`;

const LINKS = [
  {
    label: 'codyduong',
    to: 'https://github.com/codyduong',
    icon: GitHubIcon,
    hoverColor: '#333333',
  },
  {
    label: 'cody-duong',
    to: 'https://www.linkedin.com/in/cody-duong/',
    icon: LinkedInIcon,
    hoverColor: '#0072b1',
  },
  {
    label: 'cody-duong',
    to: 'https://stackoverflow.com/users/17954209/cody-duong',
    icon: StackOverflow,
    hoverColor: '#f48024',
  },
  {
    label: 'cody.qd@gmail.com',
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
  const [theme] = useThemeBase();

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
        <L.icon aria-hidden />
        <p>{L.label}</p>
      </LinksLink>
    );
  });
};

export default function Links(): JSX.Element {
  return (
    <LinksSection>
      <LinksHeader>Links</LinksHeader>
      <LinksWrapper>{GenerateLinks()}</LinksWrapper>
    </LinksSection>
  );
}
