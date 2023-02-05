import { evaluate } from '@mdx-js/mdx';
import styled from 'styled-components';
import GET_POST from './GetPost.graphql';
import UPDATE_POST from './UpdatePost.graphql';
import IS_AUTHENTICATED from './IsAuthenticated.graphql';
import LOGIN_USER from './LoginUser.graphql';
import { useMutation, useQuery } from '@apollo/client';
import * as runtime from 'react/jsx-runtime';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { useUrlSearchParams } from 'packages/mono-app/context/UrlSearchParamsContext';
import T from 'packages/components/Typography';
import Content from 'packages/components/Content';
import Section from 'packages/components/Section';
import { ErrorBoundary } from 'react-error-boundary';
import Button from 'packages/components/Button';
import Link from 'packages/components/A';
import { GetPostQuery } from 'graphql-gen/types';
import useLocalStorage from 'packages/hooks/useLocalStorage';
import { Spinner } from 'packages/components/SpinkitLoadable';
import Head from 'packages/components/Head';
import { useTitle } from 'packages/mono-app/context/TitleContext';

interface PostEditorProps {
  contentStr: string | undefined;
  setContentStr: React.Dispatch<React.SetStateAction<string | undefined>>;
  oldContentStr: string | undefined;
  setOldContentStr: React.Dispatch<React.SetStateAction<string | undefined>>;
  dirty: boolean;
  error: string;
  post: GetPostQuery['post'];
}

const PostEditor = ({
  contentStr,
  setContentStr,
  dirty,
  oldContentStr,
  setOldContentStr,
  error,
  post,
}: PostEditorProps): JSX.Element => {
  const [updatePost] = useMutation(UPDATE_POST);
  const {
    client,
    data: auth,
    loading,
    refetch,
  } = useQuery(IS_AUTHENTICATED, {
    fetchPolicy: 'network-only',
  });
  const [_, setToken] = useLocalStorage('token');

  const [loginUser] = useMutation(LOGIN_USER);

  const isAuthenticated = auth?.isAuthenticated?.isAuthenticated;
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoginable = email && password;

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

              setToken(
                data?.loginUser?.token
                  ? `Bearer ${data.loginUser.token}`
                  : 'Bearer Unset'
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
            loading || isLoggingIn || !isAuthenticated || !dirty || !post
          }
          onClick={async () => {
            const { data } = await updatePost({
              variables: {
                id: post!.id,
                data: {
                  content: contentStr,
                },
              },
            });

            setOldContentStr(data?.updatePost?.content ?? undefined);
            setContentStr(data?.updatePost?.content ?? undefined);
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

const PostStyled = styled.div`
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

const Post = (): JSX.Element | null => {
  const { id } = useParams();
  const urlParams = useUrlSearchParams();
  const { data, loading } = useQuery(GET_POST, {
    variables: { postId: id ? Number(id) : null },
    skip: !id,
  });
  const isEditorOpen = urlParams.has('edit');

  const post = data?.post;

  const [oldContentStr, setOldContentStr] = useState<string>();
  const [contentStr, setContentStr] = useState<string>();
  const [error, setError] = useState('');
  const [content, setContent] = useState<React.ReactNode>();
  const { setPrefixOverride } = useTitle();

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
    setOldContentStr(post?.content ?? undefined);
    setContentStr(post?.content ?? undefined);
    setPrefixOverride(post?.title);
    return () => {
      setPrefixOverride(undefined);
    };
  }, [post]);

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
      <PostStyled>
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
            <Section aria-busy={loading}>
              {loading && <Spinner />}
              {content}
            </Section>
          </ErrorBoundary>
          {isEditorOpen && (
            <PostEditor
              contentStr={contentStr}
              setContentStr={setContentStr}
              oldContentStr={oldContentStr}
              setOldContentStr={setOldContentStr}
              dirty={dirty}
              error={error}
              post={post}
            />
          )}
        </>
      </PostStyled>
    </Content>
  );
};

export default Post;
