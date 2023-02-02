import { evaluate } from '@mdx-js/mdx';
import styled from 'styled-components';
import GET_ARTICLE from './GetArticle.graphql';
import UPDATE_ARTICLE from './UpdateArticle.graphql';
import IS_AUTHENTICATED from './IsAuthenticated.graphql';
import LOGIN_USER from './LoginUser.graphql';
import { useMutation, useQuery } from '@apollo/client';
import * as runtime from 'react/jsx-runtime';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { useUrlSearchParams } from 'packages/mono-app/UrlSearchParamsContext';
import T from 'packages/components/Typography';
import Content from 'packages/components/Content';
import Section from 'packages/components/Section';
import { ErrorBoundary } from 'react-error-boundary';
import Button from 'packages/components/Button';
import Link from 'packages/components/A';
import { GetArticleQuery } from 'graphql-gen/types';

interface ArticleEditorProps {
  contentStr: string | undefined;
  setContentStr: React.Dispatch<React.SetStateAction<string | undefined>>;
  oldContentStr: string | undefined;
  setOldContentStr: React.Dispatch<React.SetStateAction<string | undefined>>;
  dirty: boolean;
  error: string;
  article: GetArticleQuery['article'];
}

const ArticleEditor = ({
  contentStr,
  setContentStr,
  dirty,
  oldContentStr,
  setOldContentStr,
  error,
  article,
}: ArticleEditorProps): JSX.Element => {
  const [updateArticle] = useMutation(UPDATE_ARTICLE);
  const {
    client,
    data: auth,
    loading,
    refetch,
  } = useQuery(IS_AUTHENTICATED, {
    fetchPolicy: 'network-only',
  });
  const [loginUser] = useMutation(LOGIN_USER);

  const isAuthenticated = auth?.isAuthenticated?.isAuthenticated;
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoginable = email && password;

  console.log(isAuthenticated);

  return (
    <TextEditorWrapper>
      {!isAuthenticated && (
        <>
          <label>Email</label>
          <input
            onChange={(v) => {
              setEmail(v.currentTarget.value);
            }}
          />
          <label>Password</label>
          <input
            type="password"
            onChange={(v) => {
              setPassword(v.currentTarget.value);
            }}
          />
          <Button
            disabled={!isLoginable}
            onClick={async () => {
              setIsLoggingIn(true);

              const { data } = await loginUser({
                variables: {
                  email: email,
                  password: password,
                },
              });

              localStorage.setItem(
                'token',
                data?.loginUser?.token ? `Bearer ${data.loginUser.token}` : ''
              );

              client.resetStore();

              refetch();
              setIsLoggingIn(false);
            }}
          >
            Login
          </Button>
        </>
      )}
      <TextEditor
        value={contentStr}
        onChange={(v) => {
          setContentStr(v.currentTarget.value);
        }}
      />
      <ButtonWrapper>
        <Button
          disabled={loading || isLoggingIn || !isAuthenticated || !dirty}
          onClick={() => {
            setContentStr(oldContentStr);
          }}
        >
          Reset
        </Button>
        <Button
          disabled={
            loading || isLoggingIn || !isAuthenticated || !dirty || !article
          }
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
  );
};

const COMPONENTS = {
  a: Link.Styled,
} as const;

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
  const isEditorOpen = urlParams.has('edit');

  const article = data?.article;

  const [oldContentStr, setOldContentStr] = useState<string>();
  const [contentStr, setContentStr] = useState<string>();
  const [error, setError] = useState('');
  const [content, setContent] = useState<React.ReactNode>();

  const evaluatePromise = useMemo(
    async () =>
      contentStr
        ? await evaluate(contentStr, {
            Fragment: undefined,
            ...runtime,
            format: 'mdx',
          })
        : { default: undefined },
    [contentStr]
  );

  useEffect(() => {
    setOldContentStr(article?.content ?? undefined);
    setContentStr(article?.content ?? undefined);
  }, [article]);

  useEffect(() => {
    if (contentStr) {
      (async () => {
        try {
          const { default: MDXContent } = await evaluatePromise;

          setContent(MDXContent?.({ components: COMPONENTS }));
          setError('');
        } catch (e) {
          setError(`${e as any}`);
        }
      })();
    }
  }, [evaluatePromise]);

  const dirty = oldContentStr !== contentStr;

  return (
    <Content>
      <ArticleStyled>
        <>
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
            <ArticleEditor
              contentStr={contentStr}
              setContentStr={setContentStr}
              oldContentStr={oldContentStr}
              setOldContentStr={setOldContentStr}
              dirty={dirty}
              error={error}
              article={article}
            />
          )}
        </>
      </ArticleStyled>
    </Content>
  );
};

export default Article;
