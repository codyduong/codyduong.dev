import { evaluate } from '@mdx-js/mdx';
import styled from 'styled-components';
import GetArticle from './GetArticle.graphql';
import { useQuery } from '@apollo/client';
import * as runtime from 'react/jsx-runtime';
import { useParams } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { useUrlSearchParams } from 'packages/mono-app/UrlSearchParamsContext';
import T from 'packages/components/Typography';
import Content from 'packages/components/Content';
import Section from 'packages/components/Section';
import { ErrorBoundary } from 'react-error-boundary';
import Button from 'packages/components/Button';

const COMPONENTS = {} as const;

const ArticleStyled = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: center;

  & > div {
    flex: 1 1 0;
  }
`;

const TextEditorWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextEditor = styled.textarea`
  flex-grow: 1;
  max-height: 600px;
`;

const ErrorMessage = styled(T.P3)`
  color: ${({ theme }) => theme.color.destructive[300]};
`;

const Article = (): JSX.Element | null => {
  const { id } = useParams();
  const urlParams = useUrlSearchParams();
  const { data } = useQuery(GetArticle, {
    variables: { articleId: id ? Number(id) : null },
    skip: !id,
  });
  const isEditorOpen = urlParams.has('edit');

  const [contentStr, setContentStr] = useState<string>();
  const [error, setError] = useState('');
  const [content, setContent] = useState<React.ReactNode>();
  useEffect(() => {
    setContentStr(data?.article?.content ?? undefined);
  }, [data]);

  useEffect(() => {
    if (contentStr) {
      (async () => {
        try {
          const { default: MDXContent } = await evaluate(contentStr, {
            Fragment: undefined,
            ...runtime,
            format: 'mdx',
          });

          setContent(MDXContent({ components: COMPONENTS }));
          setError('');
        } catch (e) {
          setError(`${e as any}`);
        }
      })();
    }
  }, [contentStr]);

  return (
    <Content>
      <ArticleStyled>
        <ErrorBoundary
          FallbackComponent={({ error, resetErrorBoundary }): JSX.Element => (
            <>
              <ErrorMessage>It blew up</ErrorMessage>
              <ErrorMessage>${error.message}</ErrorMessage>
              <ErrorMessage>${error.stack}</ErrorMessage>
              <Button
                onClick={() => {
                  resetErrorBoundary();
                }}
              >
                Reset
              </Button>
            </>
          )}
        >
          <Section>{content}</Section>
        </ErrorBoundary>
        {isEditorOpen && (
          <TextEditorWrapper>
            <TextEditor
              value={contentStr}
              onChange={(v) => {
                setContentStr(v.currentTarget.value);
              }}
            />
            <ErrorMessage>{error}</ErrorMessage>
          </TextEditorWrapper>
        )}
      </ArticleStyled>
    </Content>
  );
};

export default Article;
