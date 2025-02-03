import { useHead } from 'packages/app/contexts/HeadContext';

interface HeadProps {
  title: string;
  description?: string;
  override?: boolean;
  favicon?: string;
}

const Head = (props: HeadProps): null => {
  const { title, description = "Cody Duong's personal website", override = false, favicon } = props;
  const newTitle = title === '' ? 'Not Found | Cody Duong' : title + (override ? '' : ' | Cody Duong');

  const { updateTitle, updateDescription, updateFavicon } = useHead();

  if (import.meta.env.SSR) {
    updateTitle(newTitle);
    updateDescription(description);
    if (favicon) updateFavicon(favicon);
  }

  if (!import.meta.env.SSR) {
    document.title = newTitle;
    for (const meta of document.head.getElementsByTagName('meta')) {
      // do we need to set og? w/e
      if (meta.name === 'description' || meta.name === 'og:description') {
        meta.content = description;
        continue;
      }
      if (meta.name === 'og:title') {
        meta.title = title || 'Not Found';
      }
    }
  }

  return null;
};

export default Head;
