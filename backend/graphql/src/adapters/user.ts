import { nonNull, objectType, stringArg } from 'nexus';
import { Adapter } from '../adapter';
import { Context } from '../context';
import { sign, verify } from 'jsonwebtoken';
import { compare, hash } from 'bcryptjs';
import { allow, deny } from 'graphql-shield';
import { APP_SECRET, Token } from '../utils';

export default Adapter<'user'>({
  schema: [
    objectType({
      name: 'user',
      definition(t) {
        t.nonNull.string('id');
        t.nonNull.string('email');
        t.string('role');
      },
    }),
    objectType({
      name: 'UserAuthPayload',
      definition(t) {
        t.string('token');
        t.field('user', { type: 'user' });
      },
    }),
    objectType({
      name: 'UserAuthenticated',
      definition(t) {
        t.boolean('isAuthenticated'), t.field('user', { type: 'user' });
      },
    }),
  ],
  resolver: {
    Query: (t) => {
      t.field('isAuthenticated', {
        type: 'UserAuthenticated',
        args: null,
        resolve: async (_parent, _args, context: Context) => {
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
                throw new Error(
                  `No user found for token id: ${verifiedToken.id}`
                );
              }
              return {
                isAuthenticated: user.role === 'admin',
                user: user,
              };
            }
          } catch (e) {
            console.warn(e);
          }
          return {
            isAuthenticated: false,
            user: null,
          };
        },
      });
    },
    Mutation: (t) => {
      t.field('createUser', {
        type: 'UserAuthPayload',
        args: {
          email: nonNull(stringArg()),
          password: nonNull(stringArg()),
        },
        resolve: async (_parent, { email, password }, context: Context) => {
          const hashedPassword = await hash(password, 10);
          const user = await context.prisma.user.create({
            data: {
              email: email,
              password: hashedPassword,
            },
          });
          return {
            token: sign({ id: user.id }, APP_SECRET),
            user,
          };
        },
      });
      t.field('loginUser', {
        type: 'UserAuthPayload',
        args: {
          email: nonNull(stringArg()),
          password: nonNull(stringArg()),
        },
        resolve: async (_parent, { email, password }, context: Context) => {
          const user = await context.prisma.user.findUnique({
            where: {
              email,
            },
          });
          if (!user) {
            throw new Error(`No user found for email: ${email}`);
          }
          const passwordValid = await compare(password, user.password);
          if (!passwordValid) {
            throw new Error('Invalid password');
          }
          return {
            token: sign({ id: user.id }, APP_SECRET),
            user,
          };
        },
      });
    },
  },
  permissions: {
    Query: {
      isAuthenticated: allow,
    },
    Mutation: {
      // disable creating any new users
      createUser: deny,
      loginUser: allow,
    },
  },
});
