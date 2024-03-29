/**
 * Declares *.graphql files into `graphql-gen/globals.d.ts`
 */

/* eslint-disable @typescript-eslint/ban-ts-comment */

import type { DocumentNode, GraphQLSchema } from 'graphql';

export const plugin = (
  _schema: GraphQLSchema,
  documents: {
    loc?: string;
    location: string;
    document: DocumentNode;
    rawSDL: string;
    hash: string;
  }[],
  _config: unknown
): string => {
  const docs = documents
    .map((doc) => {
      const loc = doc.loc ?? doc.location;
      if (!loc) {
        return undefined;
      }

      const thisOperation = doc.document.definitions[0];
      // @ts-ignore;
      let operationType: string = thisOperation.operation;
      operationType =
        operationType.charAt(0).toUpperCase() + operationType.slice(1);
      // @ts-ignore;
      const operationName = thisOperation.name.value;

      return `
declare module '*${operationName}.graphql' {
  import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
  import { ${operationName}${operationType}, ${operationName}${operationType}Variables } from 'graphql-gen/types';
  const ${operationName}Document: DocumentNode<
    ${operationName}${operationType},
    ${operationName}${operationType}Variables
  >;
  export default ${operationName}Document;
}`;
    })
    .filter((i) => typeof i !== 'undefined')
    .join('\n');

  return (
    `
/**
 * THIS FILE IS AUTOGENERATED BY \`yarn generate\`
 *
 * DO NOT EDIT MANUALLY
 */
    ` + docs
  );
};
