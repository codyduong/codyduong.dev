const WEBSITE_NAME = 'Cody Duong';

const PATH_TO_TITLE = {
  '': 'Home',
  home: 'Home',
  work: 'Work',
  articles: 'Articles',
  contact: 'Contact',
  links: 'Links',
  '404': 'Not Found',
} as const;

/**
 * List of special paths we want to override with a custom string
 */
const FULL_PATHS_OVERRIDE = {
  '/work/agi/': 'AGI',
  '/': 'Home',
  '': 'Home',
};

const generateTitleTag = (path: string): string => {
  const splitPath = path.split('/').filter((v) => v);

  let suffix = '';
  if (splitPath[0] in PATH_TO_TITLE) {
    suffix = PATH_TO_TITLE[splitPath[0] as keyof typeof PATH_TO_TITLE];

    // if we are in a valid descendant, ie. /work/workplace/
    if (splitPath[1]) {
      suffix = splitPath.at(-1) ?? '';
    }
  } else {
    suffix = splitPath.at(-1) ?? '';
  }
  if (path in FULL_PATHS_OVERRIDE) {
    suffix = FULL_PATHS_OVERRIDE[path as keyof typeof FULL_PATHS_OVERRIDE];
  }

  suffix = suffix.charAt(0).toUpperCase() + suffix.slice(1);

  // Return the deepest path as the name
  return WEBSITE_NAME + `${suffix.length > 0 ? ' - ' : ''}` + suffix;
};

export default generateTitleTag;
