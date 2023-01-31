import { nonNull, objectType, stringArg } from 'nexus';
import { Adapter } from '../adapter';
import { Context } from '../context';
import { sign } from 'jsonwebtoken';
import { compare, hash } from 'bcryptjs';
import { allow, deny } from 'graphql-shield';
import { APP_SECRET } from '../utils';

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
  ],
  resolver: {
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
    Mutation: {
      // disable creating any new users
      createUser: deny,
      loginUser: allow,
    },
  },
});
