import { evaluate, compile, run } from '@mdx-js/mdx';
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
import { useTitle } from 'packages/mono-app/context/TitleContext';
import PostNotFound from 'packages/pages/Posts/Post/PostNotFound';

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
          <label>
            Email
            <input
              onChange={(v) => {
                setEmail(v.currentTarget.value);
              }}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              onChange={(v) => {
                setPassword(v.currentTarget.value);
              }}
            />
          </label>

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
  h1: T.H1,
  h2: T.H2,
  h3: T.H3,
  h4: T.H4,
  h5: T.H5,
  Link: Link.Link.Styled,
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
    variables: isNaN(Number(id))
      ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion,
        { title: decodeURIComponent(id!) }
      : { postId: Number(id) },
    skip: id === undefined,
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
        ? document
          ? await evaluate(contentStr, {
              Fragment: undefined,
              ...runtime,
              format: 'mdx',
            })
          : await compile(contentStr, {
              format: 'mdx',
            })
        : { default: undefined },
    [contentStr]
  );

  useEffect(() => {
    setOldContentStr(post?.content ?? undefined);
    setContentStr(post?.content ?? undefined);
    setPrefixOverride(post?.title ?? 'Not Found');
    return () => {
      setPrefixOverride(undefined);
    };
  }, [post]);

  useEffect(() => {
    if (contentStr) {
      (async () => {
        try {
          const result = await evaluatePromise;

          if ('default' in result) {
            // client-only
            const { default: MDXContent } = result;

            setContent(MDXContent?.({ components: COMPONENTS }));
            setError('');
          } else {
            // server->client
            const { default: MDXContent } = await run(result, runtime);

            setContent(MDXContent?.({ components: COMPONENTS }));
            setError('');
          }
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
            {loading ? (
              <Section aria-busy={loading}>
                <Spinner />
              </Section>
            ) : post ? (
              <Section>{content}</Section>
            ) : (
              <PostNotFound />
            )}
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
