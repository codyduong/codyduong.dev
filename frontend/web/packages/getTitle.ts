import { matchPath } from 'react-router-dom';
import { ROUTES_MINIFIED } from './app/RoutesHelper';

const getTitle = (reqpath: string, base: string = ''): string => {
  // matcher fails on empty
  if (reqpath === '' || reqpath === '/') {
    return 'Cody Duong';
  }

  const partial = ROUTES_MINIFIED.find((r) => {
    const fixedPath = base + reqpath.replace(/\/+$/, '');
    // console.log(fixedPath);
    return matchPath(r.path, fixedPath) !== null;
  })?.title;

  if (partial === '') {
    return 'Cody Duong';
  }

  return (partial ?? 'Not Found') + ' | Cody Duong';
};

export default getTitle;
