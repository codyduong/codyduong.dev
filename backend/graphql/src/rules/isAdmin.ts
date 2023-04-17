import { rule } from 'graphql-shield';
import { verify } from 'jsonwebtoken';
import { Context } from '../context';
import { APP_SECRET } from '../utils';

export type Token = {
  id: string;
};

const isAdmin = async (context: Context): Promise<boolean> => {
  try {
    const authHeader = context.req.get('Authorization');
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const verifiedToken = verify(token, APP_SECRET) as Token;
      const user = await context.prisma.user.findUnique({
        where: {
          id: verifiedToken.id,
        },
      });
      if (!user) {
        throw new Error(`No user found for token id: ${verifiedToken.id}`);
      }
      return user.role === 'admin';
    }
  } catch (e) {
    console.warn(e);
  }
  return false;
};

export default rule()(async (_parent, _args, context: Context) => {
  return Boolean(await isAdmin(context));
});
