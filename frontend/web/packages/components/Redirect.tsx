import { useHead } from 'packages/app/contexts/HeadContext';
import Content from './Content';
import Section from './Section';
import T from './Typography';
import React, { useEffect, useState } from 'react';
import { Link } from './A';
import { useNavigate } from 'react-router-dom';

interface RedirectProps {
  title: string;
  /**
   * @default 307
   */
  status?: number;
  /**
   * @default '/'
   */
  redirect?: string;
}

export default function Redirect({ title, status = 307, redirect = '/' }: RedirectProps): React.JSX.Element | null {
  const { updateStatus, updateRedirect } = useHead();
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const i = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
    if (countdown <= 0) {
      clearTimeout(i);
      navigate(redirect);
    }
    return () => {
      clearTimeout(i);
    };
  }, [countdown, navigate, redirect]);

  if (import.meta.env.SSR) {
    updateRedirect(redirect);
    updateStatus(status);
    return null;
  }

  return (
    <Content>
      <Section>
        <T.H1>{title}</T.H1>
        <T.P2>
          This page is not available at the moment. Redirecting in{' '}
          <span role="timer" aria-live="polite" aria-atomic>
            {countdown}
          </span>
          <span aria-hidden>...</span>
          <br />
          <br />
          <Link.Styled to="/">Click to go home</Link.Styled>
        </T.P2>
      </Section>
    </Content>
  );
}
