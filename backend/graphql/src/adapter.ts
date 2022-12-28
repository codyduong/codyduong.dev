import {
  NexusExtendTypeDef,
  NexusInputObjectTypeDef,
  NexusObjectTypeDef,
  ObjectDefinitionBlock,
} from 'nexus/dist/core';

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
};
