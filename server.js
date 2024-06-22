import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { startStandaloneServer } from '@apollo/server/standalone';

import mongoose from 'mongoose';
import { JWT_SECRET, MONGO_URI } from "./config.js";
import typeDefs from "./schemaGql.js";
import jwt from 'jsonwebtoken'

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on("connected", () => {
    console.log("connected to mongodb");
})

mongoose.connection.on("error", (err) => {
    console.log("err connecting", err);
})

// imports model here
import './model/User.js'
import './model/Quote.js'

import resolvers from "./resolvers.js";

 // this is middleware 
 const context =  async ({ req, res }) => {
    const { authorization } = req.headers
    if (authorization) {
        const { userId } = jwt.verify(authorization, JWT_SECRET)
        return { userId }
    }
}
const server = new ApolloServer({ typeDefs, resolvers });

const { url } = await startStandaloneServer(server, {context,
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at ${url}`);