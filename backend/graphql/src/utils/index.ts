import { extendType } from 'nexus';
import { Adapter, SchemaType } from '../adapter';
import g from 'glob';
import { join } from 'path';
import { promisify } from 'util';

const glob = promisify(g);

const processAdapter = <TypeName extends string>(
  adapter: Adapter<TypeName>
): SchemaType<TypeName>[] => {
  const resolvers = [
    extendType({
      type: 'Query',
      definition: (t) => adapter.resolver.Query?.(t),
    }),
    extendType({
      type: 'Mutation',
      definition: (t) => adapter.resolver.Mutation?.(t),
    }),
  ];

  if (Array.isArray(adapter.schema)) {
    return [...adapter.schema, ...resolvers];
  } else {
    return [adapter.schema, ...resolvers];
  }
};

export const generateSchemaTypesFromAdapters = async (): Promise<
  SchemaType<any>[]
> => {
  const schemaTypes: SchemaType<any>[] = [];

  const files = await glob('src/adapters/**/*.ts', { nodir: true });
  await Promise.all(
    files.map(async (file) => {
      try {
        const p = join(__dirname, '../..', file);
        const adapter = (await import(p)).default;
        schemaTypes.push(...processAdapter(adapter));
      } catch (e) {
        console.warn(e);
      }
    })
  );

  return schemaTypes;
};
