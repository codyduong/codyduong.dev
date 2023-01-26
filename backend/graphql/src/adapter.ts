import {
  NexusExtendTypeDef,
  NexusInputObjectTypeDef,
  NexusObjectTypeDef,
  ObjectDefinitionBlock,
} from 'nexus/dist/core';
import { shield } from 'graphql-shield';

export type SchemaType<TypeName extends string> =
  | NexusObjectTypeDef<TypeName>
  | NexusInputObjectTypeDef<TypeName>
  | NexusExtendTypeDef<TypeName>;

export type Adapter<TypeName extends string> = {
  schema: SchemaType<TypeName> | SchemaType<any>[];
  resolver: {
    Query?: (t: ObjectDefinitionBlock<'Query'>) => void;
    Mutation?: (t: ObjectDefinitionBlock<'Mutation'>) => void;
  };
  permissions: {
    Query?: Parameters<typeof shield>[0];
    Mutation?: Parameters<typeof shield>[0];
  };
};

export const Adapter = <TypeName extends string>(a: Adapter<TypeName>) => {
  return a;
};
