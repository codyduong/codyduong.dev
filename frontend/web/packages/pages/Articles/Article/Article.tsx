import { evaluate } from '@mdx-js/mdx';
import styled from 'styled-components';
import GET_ARTICLE from './GetArticle.graphql';
import UPDATE_ARTICLE from './UpdateArticle.graphql';
import { useMutation, useQuery } from '@apollo/client';
import * as runtime from 'react/jsx-runtime';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
  flex-grow: 1;

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

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const ErrorMessage = styled(T.P3)`
  color: ${({ theme }) => theme.color.destructive[300]};
`;

const Article = (): JSX.Element | null => {
  const { id } = useParams();
  const urlParams = useUrlSearchParams();
  const { data } = useQuery(GET_ARTICLE, {
    variables: { articleId: id ? Number(id) : null },
    skip: !id,
  });
  const [updateArticle] = useMutation(UPDATE_ARTICLE);
  const isEditorOpen = urlParams.has('edit');

  const article = data?.article;

  const [oldContentStr, setOldContentStr] = useState<string>();
  const [contentStr, setContentStr] = useState<string>();
  const [error, setError] = useState('');
  const [content, setContent] = useState<React.ReactNode>();

  useEffect(() => {
    setOldContentStr(article?.content ?? undefined);
    setContentStr(article?.content ?? undefined);
  }, [article]);

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

  const dirty = oldContentStr !== contentStr;

  return (
    <Content>
      <ArticleStyled>
        <ErrorBoundary
          FallbackComponent={({ error, resetErrorBoundary }): JSX.Element => {
            useEffect(() => {
              const timeout = setTimeout(() => {
                resetErrorBoundary();
              }, 5000);

              return () => {
                clearTimeout(timeout);
              };
            }, []);

            return (
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
            );
          }}
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
            <ButtonWrapper>
              <Button
                disabled={!dirty}
                onClick={() => {
                  setContentStr(oldContentStr);
                }}
              >
                Reset
              </Button>
              <Button
                disabled={!dirty || !article}
                onClick={async () => {
                  const { data } = await updateArticle({
                    variables: {
                      id: article!.id,
                      data: {
                        content: contentStr,
                      },
                    },
                  });

                  setOldContentStr(data?.updateArticle?.content ?? undefined);
                  setContentStr(data?.updateArticle?.content ?? undefined);
                }}
              >
                Submit
              </Button>
            </ButtonWrapper>
            <ErrorMessage>{error}</ErrorMessage>
          </TextEditorWrapper>
        )}
      </ArticleStyled>
    </Content>
  );
};

export default Article;
