export const WEBSITE_NAME = 'Cody Duong';

const defaultPathToTitle = (path: string[], _?: unknown): string => {
  let prefix = path[path.length - 1] ?? '';
  prefix = prefix.replace(/(^\w|-\w)/g, (v) =>
    v.replace(/-/, ' ').toUpperCase()
  );
  return prefix;
};

const BASE = {
  '': 'Home',
  posts: (path: string[], state?: Record<string, any>): string => {
    if (path.length === 2) {
      const postId = parseInt(path[1]);
      let postTitle = 'Loading';
      if (state) {
        for (const [key, value] of Object.entries(state)) {
          if (!key.includes('post')) {
            continue;
          }
          if (value.postId === postId) {
            postTitle = value.title ?? 'Unknown';
          }
        }
      }
      return postTitle;
    } else {
      return 'Posts';
    }
  },
  work: (path: string[], _?: unknown): string => {
    let prefix = defaultPathToTitle(path);
    if (prefix === 'Agi') {
      prefix = 'AGI';
    }
    return prefix;
  },
  '404': 'Not Found',
} as const;

const generateTitleTag = (
  path: string,
  state?: Record<string, any>
): string => {
  const splitPath = path
    .split('/')
    .filter((v) => v)
    .filter((v) => v !== '/');

  let prefix = '';
  if (splitPath[0] in BASE) {
    const funcOrString = BASE[splitPath[0] as keyof typeof BASE];
    prefix =
      typeof funcOrString === 'function'
        ? funcOrString(splitPath, state)
        : funcOrString;
  } else if (splitPath.length === 0) {
    prefix = BASE[''];
  } else {
    prefix = defaultPathToTitle(splitPath);
  }

  return prefix + `${prefix.length > 0 ? ' - ' : ''}` + WEBSITE_NAME;
};

export default generateTitleTag;
