import { allow, deny } from 'graphql-shield';
import isAdmin from './isAdmin';

export const rules = {
  isAdmin,
  allow,
  deny,
} as const;
