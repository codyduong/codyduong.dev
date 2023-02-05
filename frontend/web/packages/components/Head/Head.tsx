import { useEffect } from 'react';

interface HeadProps {
  title: string | undefined | null;
}

const Head = ({ title }: HeadProps): null => {
  useEffect(() => {
    if (document && title) {
      document.title = title;
    }
  }, []);
  return null;
};

export default Head;
