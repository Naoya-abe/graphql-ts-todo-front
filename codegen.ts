import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:8080/graphql',
  documents: ['src/**/*.gql'],
  generates: {
    './src/graphql/generated/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
