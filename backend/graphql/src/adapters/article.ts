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

export default Adapter<'article'>({
  schema: [
    objectType({
      name: 'article',
      definition(t) {
        t.nonNull.string('id');
        t.nonNull.int('articleId');
        t.nonNull.field('createdAt', { type: 'DateTime' });
        t.nonNull.field('updatedAt', { type: 'DateTime' });
        t.nonNull.string('title');
        t.string('content');
      },
    }),
    inputObjectType({
      name: 'ArticleSortOrder',
      definition(t) {
        t.nonNull.field('updatedAt', { type: 'SortOrder' });
      },
    }),
    inputObjectType({
      name: 'ArticleCreateInput',
      definition(t) {
        t.nonNull.string('title');
        t.string('content');
      },
    }),
  ],
  resolver: {
    Query: (t) => {
      t.nullable.field('article', {
        type: 'article',
        args: {
          id: stringArg(),
          articleId: intArg(),
        },
        resolve: (_parent, { id, articleId }, context: Context) => {
          return context.prisma.article.findUnique({
            where: {
              id: id ?? undefined,
              articleId: articleId ?? undefined,
            },
          });
        },
      });
      t.nonNull.list.nonNull.field('articles', {
        type: 'article',
        args: {
          searchString: stringArg(),
          skip: intArg(),
          take: intArg(),
          orderBy: arg({
            type: 'ArticleSortOrder',
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

          return context.prisma.article.findMany({
            where: {
              ...or,
            },
            take: args.take || undefined,
            skip: args.skip || undefined,
            orderBy: args.orderBy || undefined,
          });
        },
      });
    },
    Mutation: (t) => {
      t.field('createArticle', {
        type: 'article',
        args: {
          data: nonNull(
            arg({
              type: 'ArticleCreateInput',
            })
          ),
          // authorEmail: nonNull(stringArg()),
        },
        resolve: (_, args, context: Context) => {
          return context.prisma.article.create({
            data: {
              // auto-increment is handled by a mongoDB trigger
              articleId: null!,
              title: args.data.title,
              content: args.data.content ?? '',
            },
          });
        },
      });
      // t.field('togglePublishPost', {
      //   type: 'Post',
      //   args: {
      //     id: nonNull(stringArg()),
      //   },
      //   resolve: async (_, args, context: Context) => {
      //     try {
      //       const post = await context.prisma.post.findUnique({
      //         where: { id: args.id || undefined },
      //         select: {
      //           published: true,
      //         },
      //       })
      //       return context.prisma.post.update({
      //         where: { id: args.id || undefined },
      //         data: { published: !post?.published },
      //       })
      //     } catch (e) {
      //       throw new Error(
      //         `Post with ID ${args.id} does not exist in the database.`,
      //       )
      //     }
      //   },
      // })

      // t.field('incrementPostViewCount', {
      //   type: 'Post',
      //   args: {
      //     id: nonNull(stringArg()),
      //   },
      //   resolve: (_, args, context: Context) => {
      //     return context.prisma.post.update({
      //       where: { id: args.id || undefined },
      //       data: {
      //         viewCount: {
      //           increment: 1,
      //         },
      //       },
      //     })
      //   },
      // })

      t.field('deleteArticle', {
        type: 'article',
        args: {
          id: nonNull(stringArg()),
        },
        resolve: (_, args, context: Context) => {
          return context.prisma.article.delete({
            where: { id: args.id },
          });
        },
      });
    },
  },
  permissions: {
    Query: {},
    Mutation: {
      createArticle: rules.isAdmin,
      deleteArticle: rules.isAdmin,
    },
  },
});
