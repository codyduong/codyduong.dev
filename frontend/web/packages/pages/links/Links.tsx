import styled from 'styled-components';
import breakpoints from 'packages/style/breakpoints';
import A from 'packages/components/A';

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import StackOverflow from './StackOverflow.svg';

const LinksSection = styled.section`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;

const LinksHeader = styled.h1`
  font-size: 2rem;

  @media only screen and (min-width: ${breakpoints.md}) {
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
      fill: ${(props) => props.hoverColor};
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
  // {
  //   label: 'GitHub4',
  //   to: 'https://github.com/codyduong',
  //   icon: GitHubIcon,
  // },
  // {
  //   label: 'GitHub5',
  //   to: 'https://github.com/codyduong',
  //   icon: GitHubIcon,
  // },
] as const;

const GenerateLinks = (): React.ReactNode => {
  return LINKS.map((L) => {
    return (
      <LinksLink
        key={`${L.label} ${L.to}`}
        href={L.to}
        target={'_blank'}
        hoverColor={L.hoverColor}
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
