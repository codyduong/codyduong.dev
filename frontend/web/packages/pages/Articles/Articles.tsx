import { useQuery } from '@apollo/client';
import Content from 'packages/components/Content';
import Section from 'packages/components/Section';
import T from 'packages/components/Typography';
import styled from 'styled-components';
import GetArticle from './GetArticles.graphql';

const ArticleLi = styled.li``;

const Articles = (): JSX.Element => {
  const { data } = useQuery(GetArticle, {});

  return (
    <Content>
      <Section>
        <T.H1>articles</T.H1>
        <T.P2>Welcome to the place I dump ideas and opinions</T.P2>
        <T.P2>This page is still under construction</T.P2>
        <ul>
          {data?.articles.map((article) => {
            return <ArticleLi key={article.id}>{article.title}</ArticleLi>;
          })}
        </ul>
      </Section>
    </Content>
  );
};

export default Articles;
