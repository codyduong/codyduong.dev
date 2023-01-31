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
    inputObjectType({
      name: 'ArticleUpdateInput',
      definition(t) {
        t.string('title');
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
            take: args.take ?? undefined,
            skip: args.skip ?? undefined,
            orderBy: args.orderBy ?? undefined,
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
      t.field('updateArticle', {
        type: 'article',
        args: {
          id: nonNull(stringArg()),
          data: nonNull(
            arg({
              type: 'ArticleUpdateInput',
            })
          ),
        },
        resolve: async (_, { id, data }, context: Context) => {
          try {
            const article = await context.prisma.article.findUnique({
              where: { id: id ?? undefined },
            });

            const newData = {
              ...(article ?? {}),
              ...{
                title: data.title ?? undefined,
                content: data.content ?? undefined,
              },
            };
            delete newData['id'];

            return context.prisma.article.update({
              where: { id: id ?? undefined },
              data: newData,
            });
          } catch (e) {
            throw new Error(
              `Article with ID ${id} does not exist in the database.`
            );
          }
        },
      });
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
      updateArticle: rules.isAdmin,
      deleteArticle: rules.isAdmin,
    },
  },
});
