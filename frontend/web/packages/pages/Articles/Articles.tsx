import { useQuery } from '@apollo/client';
import Content from 'packages/components/Content';
import Section from 'packages/components/Section';
import T from 'packages/components/Typography';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import GetArticles from './GetArticles.graphql';
import loadable from 'packages/components/SpinkitLoadable';
import { Link } from 'packages/components/A';

const Article = loadable(
  () => import(/* webpackPrefetch: true */ 'packages/pages/Articles/Article'),
  { ssr: false }
);

const ArticleUl = styled.ul`
  all: unset;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.px[50]};
  user-select: none;
`;

const ArticleLi = styled.li`
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

const Articles = (): JSX.Element => {
  const { data, error } = useQuery(GetArticles, {});

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Content>
            <Section>
              <T.H1>articles</T.H1>
              <T.P2>Welcome to the place I dump ideas and opinions</T.P2>
              <T.P2>This page is still under construction</T.P2>
              <ArticleUl>
                {data?.articles.map((article) => {
                  return (
                    <ArticleLi key={article.id}>
                      <Link to={`${article.articleId}`}>{article.title}</Link>
                    </ArticleLi>
                  );
                })}
              </ArticleUl>
              {!!error && (
                <>
                  <T.P2>There was an error loading the articles</T.P2>
                  <T.P2>{error.message}</T.P2>
                </>
              )}
            </Section>
          </Content>
        }
      />
      <Route path="/:id" element={<Article />} />
    </Routes>
  );
};

export default Articles;
