import { useQuery } from '@apollo/client';
import Content from 'packages/components/Content';
import Section from 'packages/components/Section';
import T from 'packages/components/Typography';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import GetArticle from './GetArticles.graphql';
import loadable from 'packages/components/SpinkitLoadable';
import Redirect from 'packages/http/Redirect';

const Article = loadable(
  () => import(/* webpackPrefetch: true */ 'packages/pages/Articles/Article')
);

const ArticleUl = styled.ul`
  all: unset;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.px[50]};
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
  const { data } = useQuery(GetArticle, {});

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
                    <ArticleLi key={article.id}>[] {article.title}</ArticleLi>
                  );
                })}
              </ArticleUl>
            </Section>
          </Content>
        }
      />
      <Route path="/:title" element={<Article />} />
      <Route path="*" element={<Redirect to={'/404/'} />} />
    </Routes>
  );
};

export default Articles;
