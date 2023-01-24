import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: ['http://localhost:3002'],
  documents: './**/*.graphql',
  generates: {
    './graphql-gen/globals.d.ts': {
      plugins: ['scripts/declare-graphql'],
    },
    './graphql-gen/types.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
    },
  },
};
export default config;
