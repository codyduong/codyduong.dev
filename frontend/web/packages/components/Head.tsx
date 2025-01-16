import { useHead } from 'packages/app/contexts/HeadContext';

interface HeadProps {
  title: string;
}

const Head = (props: HeadProps): null => {
  const { title } = props;
  const newTitle = title === '' ? 'Cody Duong' : title + ' | Cody Duong';

  const { updateTitle } = useHead();

  if (import.meta.env.SSR) {
    updateTitle(newTitle);
  }

  if (!import.meta.env.SSR) {
    document.title = newTitle;
  }

  return null;
};

export default Head;
