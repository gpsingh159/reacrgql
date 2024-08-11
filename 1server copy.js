import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { startStandaloneServer } from '@apollo/server/standalone';

import resolvers from "./resolvers.js";
import typeDefs from "./schemaGql.js";



const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at ${url}`);