import {
  arg,
  inputObjectType,
  intArg,
  nonNull,
  objectType,
  stringArg,
} from 'nexus';
import { Context } from '../context';
import { Adapter } from '../adapter';
import { rules } from '../rules';

export default Adapter<'post'>({
  schema: [
    objectType({
      name: 'post',
      definition(t) {
        t.nonNull.string('id');
        t.nonNull.int('postId');
        t.nonNull.field('createdAt', { type: 'DateTime' });
        t.nonNull.field('updatedAt', { type: 'DateTime' });
        t.nonNull.string('title');
        t.string('content');
      },
    }),
    inputObjectType({
      name: 'PostSortOrder',
      definition(t) {
        t.nonNull.field('updatedAt', { type: 'SortOrder' });
      },
    }),
    inputObjectType({
      name: 'PostCreateInput',
      definition(t) {
        t.nonNull.string('title');
        t.string('content');
      },
    }),
    inputObjectType({
      name: 'PostUpdateInput',
      definition(t) {
        t.string('title');
        t.string('content');
      },
    }),
  ],
  resolver: {
    Query: (t) => {
      t.nullable.field('post', {
        type: 'post',
        args: {
          id: stringArg(),
          postId: intArg(),
        },
        resolve: (_parent, { id, postId }, context: Context) => {
          return context.prisma.post.findUnique({
            where: {
              id: id ?? undefined,
              postId: postId ?? undefined,
            },
          });
        },
      });
      t.nonNull.list.nonNull.field('posts', {
        type: 'post',
        args: {
          searchString: stringArg(),
          skip: intArg(),
          take: intArg(),
          orderBy: arg({
            type: 'PostSortOrder',
          }),
        },
        resolve: (_parent, args, context: Context) => {
          const or = args.searchString
            ? {
                OR: [
                  { title: { contains: args.searchString } },
                  { content: { contains: args.searchString } },
                ],
              }
            : {};

          return context.prisma.post.findMany({
            where: {
              ...or,
            },
            take: args.take ?? undefined,
            skip: args.skip ?? undefined,
            orderBy: args.orderBy ?? undefined,
          });
        },
      });
    },
    Mutation: (t) => {
      t.field('createPost', {
        type: 'post',
        args: {
          data: nonNull(
            arg({
              type: 'PostCreateInput',
            })
          ),
          // authorEmail: nonNull(stringArg()),
        },
        resolve: (_, args, context: Context) => {
          return context.prisma.post.create({
            data: {
              // auto-increment is handled by a mongoDB trigger
              postId: null!,
              title: args.data.title,
              content: args.data.content ?? '',
            },
          });
        },
      });
      t.field('updatePost', {
        type: 'post',
        args: {
          id: nonNull(stringArg()),
          data: nonNull(
            arg({
              type: 'PostUpdateInput',
            })
          ),
        },
        resolve: async (_, { id, data }, context: Context) => {
          try {
            const post = await context.prisma.post.findUnique({
              where: { id: id ?? undefined },
            });

            const newData = {
              ...(post ?? {}),
              ...{
                title: data.title ?? undefined,
                content: data.content ?? undefined,
              },
            };
            delete newData['id'];

            return context.prisma.post.update({
              where: { id: id ?? undefined },
              data: newData,
            });
          } catch (e) {
            throw new Error(
              `Post with ID ${id} does not exist in the database.`
            );
          }
        },
      });
      t.field('deletePost', {
        type: 'post',
        args: {
          id: nonNull(stringArg()),
        },
        resolve: (_, args, context: Context) => {
          return context.prisma.post.delete({
            where: { id: args.id },
          });
        },
      });
    },
  },
  permissions: {
    Query: {},
    Mutation: {
      createPost: rules.isAdmin,
      updatePost: rules.isAdmin,
      deletePost: rules.isAdmin,
    },
  },
});
