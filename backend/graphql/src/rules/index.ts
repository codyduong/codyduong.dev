import { rule } from 'graphql-shield';
import { getIsAdmin } from '../utils';
import type { Context } from '../context';

export const rules = {
  isAdmin: rule()(async (_parent, _args, context: Context) => {
    const userId = await getIsAdmin(context);
    return Boolean(userId);
  }),
} as const;
