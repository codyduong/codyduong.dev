import { makeSchema, asNexusMethod, enumType } from 'nexus';
import { DateTimeResolver } from 'graphql-scalars';
import { generateSchemaTypesFromAdapters } from './utils';
import { applyMiddleware } from 'graphql-middleware';

export const DateTime = asNexusMethod(DateTimeResolver, 'date');

export const SortOrder = enumType({
  name: 'SortOrder',
  members: ['asc', 'desc'],
});

export const schema = async () => {
  const { types, permissions } = await generateSchemaTypesFromAdapters();

  return applyMiddleware(
    makeSchema({
      types: [SortOrder, DateTime, ...types],
      outputs: {
        schema: __dirname + '/../schema.graphql',
        typegen: __dirname + '/generated/nexus.ts',
      },
      sourceTypes: {
        modules: [
          {
            module: '@prisma/client',
            alias: 'prisma',
          },
        ],
      },
    }),
    permissions
  );
};
