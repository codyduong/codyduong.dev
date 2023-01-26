import { extendType } from 'nexus';
import { Adapter, SchemaType } from '../adapter';
import g from 'glob';
import { join } from 'path';
import { promisify } from 'util';
import { Context } from '../context';
import { verify } from 'jsonwebtoken';
import { shield } from 'graphql-shield';
import { IOptionsConstructor } from 'graphql-shield/typings/types';
import * as dotenv from 'dotenv';
dotenv.config();

const glob = promisify(g);

export const processAdapter = <TypeName extends string>(
  adapter: Adapter<TypeName>
): {
  schema: SchemaType<TypeName>[];
  permissions: Adapter<TypeName>['permissions'];
} => {
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
    return {
      schema: [...adapter.schema, ...resolvers],
      permissions: adapter.permissions,
    };
  } else {
    return {
      schema: [adapter.schema, ...resolvers],
      permissions: adapter.permissions,
    };
  }
};

const permissionsDebug: IOptionsConstructor | undefined =
  process.env.NODE_ENV === 'development'
    ? {
        debug: true,
      }
    : undefined;

export const generateSchemaTypesFromAdapters = async (): Promise<{
  types: SchemaType<any>[];
  permissions: ReturnType<typeof shield>;
}> => {
  const schemaTypes: SchemaType<any>[] = [];
  let permissionsObject: Parameters<typeof shield>[0] = {};

  const js = __filename.includes('.js') ? true : false;
  const files = await glob(
    `${js ? 'dist' : 'src'}/adapters/**/*${js ? '.js' : '.ts'}`,
    { nodir: true }
  );
  await Promise.all(
    files.map(async (file) => {
      try {
        const p = join(__dirname, '../..', file);
        const adapter = (await import(p)).default;
        const { schema, permissions: newPermissions } = processAdapter(adapter);
        schemaTypes.push(...schema);
        permissionsObject = {
          Query: {
            ...((permissionsObject as any).Query ?? {}),
            ...newPermissions.Query,
          },
          Mutation: {
            ...((permissionsObject as any).Mutation ?? {}),
            ...newPermissions.Mutation,
          },
        };
      } catch (e) {
        console.warn(e);
      }
    })
  );

  return {
    types: schemaTypes,
    permissions: shield(permissionsObject, permissionsDebug),
  };
};

export type Token = {
  id: string;
};

export const getIsAdmin = async (context: Context): Promise<boolean> => {
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

export const APP_SECRET = process.env['APP_SECRET']!;
