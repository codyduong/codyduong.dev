import { makeSchema, asNexusMethod, enumType } from 'nexus';
import { DateTimeResolver } from 'graphql-scalars';
import { generateSchemaTypesFromAdapters } from './utils';

export const DateTime = asNexusMethod(DateTimeResolver, 'date');

const SortOrder = enumType({
  name: 'SortOrder',
  members: ['asc', 'desc'],
});

export const schema = async () => {
  const types = await generateSchemaTypesFromAdapters();

  return makeSchema({
    types: [SortOrder, DateTime, ...types],
    outputs: {
      schema: __dirname + '/../schema.graphql',
      typegen: __dirname + '/generated/nexus.ts',
    },
    contextType: {
      module: require.resolve('./context'),
      export: 'Context',
    },
    sourceTypes: {
      modules: [
        {
          module: '@prisma/client',
          alias: 'prisma',
        },
      ],
    },
  });
};
