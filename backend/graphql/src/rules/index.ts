import { rule } from 'graphql-shield';
import { getIsAdmin } from '../utils';
import type { Context } from '../context';
import { allow, deny } from 'graphql-shield';

export const rules = {
  isAdmin: rule()(async (_parent, _args, context: Context) => {
    const isAdmin = await getIsAdmin(context);
    return Boolean(isAdmin);
  }),
  allow,
  deny,
} as const;
