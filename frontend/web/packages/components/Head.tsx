import { useHead } from 'packages/app/contexts/HeadContext';

interface HeadProps {
  title: string;
  statusCode?: number;
  description?: string;
  override?: boolean;
  favicon?: string;
}

const Head = (props: HeadProps): null => {
  const { title, description = "Cody Duong's personal website", override = false, favicon, statusCode = 200 } = props;
  const newTitle = title === '' ? 'Not Found | Cody Duong' : title + (override ? '' : ' | Cody Duong');

  const newTitleInUnicode = newTitle.replace(/\\u([\w\d]{4,5})/gu, (_, p1) => {
    return String.fromCodePoint(parseInt(p1, 16));
  });

  const { updateTitle, updateDescription, updateFavicon, updateStatus } = useHead();

  if (import.meta.env.SSR) {
    updateTitle(newTitleInUnicode);
    updateDescription(description);
    updateStatus(statusCode);
    if (favicon) updateFavicon(favicon);
  }

  if (!import.meta.env.SSR) {
    document.title = newTitleInUnicode;
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
