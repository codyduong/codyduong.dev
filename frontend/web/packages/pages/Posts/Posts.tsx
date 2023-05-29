import { useQuery } from '@apollo/client';
import Content from 'packages/components/Content';
import Section from 'packages/components/Section';
import T from 'packages/components/Typography';
import { Route, Routes } from 'react-router-dom';
import styled from 'packages/styled-components';
import GetPosts from './GetPosts.graphql';
import loadable, { Spinner } from 'packages/components/SpinkitLoadable';
import { Link } from 'packages/components/A';

const Post = loadable(
  () => import(/* webpackPrefetch: true */ 'packages/pages/Posts/Post')
);

const PostUl = styled.ul`
  all: unset;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.px[50]};
  user-select: none;
`;

const PostLi = styled.li`
  all: unset;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: ${({ theme }) => theme.spacing.px[50]};
  gap: ${({ theme }) => theme.spacing.px[100]};
  border-bottom: ${({ theme }) =>
    `${theme.spacing.px[12.5]} solid ${theme.color.text[600]}`};
  cursor: pointer;
`;

const Li = styled.li`
  all: unset;
`;

const StyledSpinner = styled(Spinner)`
  height: 6rem;
`;

const Posts = (): JSX.Element => {
  const { data, error, loading } = useQuery(GetPosts, {});

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Content>
            <Section>
              <T.H1>posts</T.H1>
              <T.P2>Welcome to the place I dump ideas and opinions</T.P2>
              <T.P2>This page is still under construction</T.P2>
              <PostUl aria-busy={loading}>
                {data?.posts.map((post) => {
                  return (
                    <PostLi key={post.id}>
                      <Link to={`${post.postId}`}>{post.title}</Link>
                    </PostLi>
                  );
                })}
                {loading && (
                  <Li>
                    <StyledSpinner />
                  </Li>
                )}
                {!!error && (
                  <Li>
                    <T.P2>There was an error loading the posts</T.P2>
                    <T.P2>{error.message}</T.P2>
                  </Li>
                )}
              </PostUl>
            </Section>
          </Content>
        }
      />
      <Route path="/:id" element={<Post />} />
    </Routes>
  );
};

export default Posts;
