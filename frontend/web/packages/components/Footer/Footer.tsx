import A from 'packages/components/A';
import { cssWidth } from 'packages/components/Section';
import { LINKS } from 'packages/pages/links/Links';
import styled, { useTheme } from 'styled-components';
import T from 'packages/components/Typography';
import FooterLink from 'packages/components/Footer/FooterLink';
import FooterLinkExpansion from 'packages/components/Footer/FooterLinkExpansion';
import GET_POSTS from 'packages/pages/Posts/GetPosts.graphql';
import { useLazyQuery } from '@apollo/client';

const FooterStyled = styled.footer`
  // background-color: ${({ theme }) => theme.color.surface[350]};
  background-color: #2c2c2c;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const FooterTop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding: ${({ theme }) =>
    `${theme.spacing.px[200]} ${theme.spacing.px[150]} ${theme.spacing.px[300]}`};
`;

const FooterWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.px[200]};

  ${cssWidth};
`;

const LinksWrapper = styled.section`
  display: flex;
  flex-flow: row nowrap;
  color: ${({ theme }) => theme.color.text[100]};
  gap: 8px;
  margin-right: ${({ theme }) => theme.spacing.px[500]};
`;

const LinkSVG = styled(A)<{ hovercolor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  aspect-ratio: 1;

  svg {
    width: 24px;
    height: 24px;
    padding: 2px;
    fill: currentColor;
    transform-origin: center left;
  }

  &:hover {
    svg {
      fill: ${(props) => props.hovercolor};
    }
  }
`;

const FooterGroupWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.px[200]};
`;

const FooterGroup = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.px[50]};
  flex: 1 1 0;
  min-width: ${({ theme }) => theme.spacing.px(1250)};
`;

const FooterHeader = styled.h4`
  ${T.P2.bold.css}
  color: ${({ theme }) => theme.color.text[100]};
  margin: 0 0 0.5rem;
`;

const Copyright = styled.section`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.px[200]};
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.color.surface[400]};
  display: flex;
  flex-direction: row wrap;
  justify-content: center;
  align-items: center;
`;

const CopyrightText = styled.span`
  ${T.P4.css}
  text-align: center;
  white-space: pre-wrap;
  color: ${({ theme }) => theme.color.surface[100]};
`;

const Footer = (): JSX.Element => {
  const theme = useTheme();
  const [getPosts, { loading, error, data: posts }] = useLazyQuery(
    GET_POSTS,
    {}
  );

  const loadPosts = (): void => {
    if (!posts) {
      getPosts({});
    }
  };

  return (
    <FooterStyled tabIndex={-1}>
      <FooterTop>
        <FooterWrapper>
          <LinksWrapper tabIndex={-1}>
            {LINKS.map((L) => (
              <LinkSVG
                key={L['aria-label']}
                aria-label={`${L['aria-label']}`}
                hovercolor={
                  typeof L.hoverColor === 'function'
                    ? L.hoverColor(theme)
                    : L.hoverColor
                }
                href={L.to}
              >
                <L.icon aria-label={`${L['aria-label']}`} />
              </LinkSVG>
            ))}
          </LinksWrapper>
          <FooterGroupWrapper>
            <FooterGroup tabIndex={-1}>
              <FooterHeader>Navigate</FooterHeader>
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/work">Work</FooterLink>
              <FooterLink to="/playground">Playground</FooterLink>
              <FooterLinkExpansion
                title="Posts"
                elements={
                  posts
                    ? [
                        ...posts.posts.map((post) => ({
                          key: post.id,
                          props: {
                            to: `/posts/${post.postId}`,
                            children: post.title as React.ReactNode,
                          },
                        })),
                        {
                          key: 'post-expansion',
                          props: {
                            to: '/posts',
                            children: (
                              <>
                                <span>
                                  <span aria-hidden> . . . </span>
                                  view all posts
                                </span>
                              </>
                            ),
                          },
                        },
                      ]
                    : loading
                    ? 'Loading Posts'
                    : error?.message
                }
                onClick={() => {
                  loadPosts();
                }}
                onMouseEnter={() => {
                  loadPosts();
                }}
              />
              {/* <FooterLink to="/contact">
                Contact
              </FooterLink> */}
            </FooterGroup>
            <FooterGroup tabIndex={-1}>
              <FooterHeader>Links</FooterHeader>
              <FooterLink to="/settings">Manage Settings</FooterLink>
              <FooterLink to="/web-accessibility-statement">
                Accessibility Statement
              </FooterLink>
              <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
            </FooterGroup>
          </FooterGroupWrapper>
        </FooterWrapper>
      </FooterTop>
      <Copyright>
        <CopyrightText>
          © 2023{'    '}|{'    '}Cody Duong{'    '}|{'    '}All Rights Reserved
        </CopyrightText>
      </Copyright>
    </FooterStyled>
  );
};

export default Footer;
