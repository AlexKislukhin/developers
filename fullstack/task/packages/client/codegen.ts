import { CodegenConfig } from '@graphql-codegen/cli';
import 'dotenv/config';

const config: CodegenConfig = {
    schema: `${process.env.VITE_SERVER_URL}/graphql`,
    documents: ['src/**/*.gql'],
    generates: {
        './src/__generated__/graphql.tsx': {
            plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
            config: {
                withHooks: true,
            },
        },
    },
    ignoreNoDocuments: true,
};

export default config;
