import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    './src/types/apollo.ts': {
      schema: 'http://localhost:4011/graphql',
      documents: ['src/**/!(*.d).{ts,tsx,gql,graphql}'],
      plugins: ['typescript', 'typescript-operations'],
    },
  },
};

export default config;
