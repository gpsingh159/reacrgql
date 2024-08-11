import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { startStandaloneServer } from '@apollo/server/standalone';

import mongoose from 'mongoose';
// import { JWT_SECRET, MONGO_URI } from "./config.js";
import typeDefs from "./schemaGql.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express, { response } from 'express';
import http from 'http';
import cors from 'cors';




if(process.env.NODE_ENV !== "production"){
    dotenv.config();
}

// mongoose.connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
mongoose.connect(process.env.MONGO_URI, {
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
import path from 'path';

const port = process.env.PORT || 4000

// this is middleware 
const context =  async ({ req, res }) => {
    const { authorization } = req.headers
    if (authorization) {
        const { userId } = jwt.verify(authorization, process.env.JWT_SECRET)
        return { userId }
    }
}

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

// if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/dist"))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname__,'client','dist','index.html'))
    })
// }


app.use(
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server, {
        context,
    }),
);
await new Promise((resolve) => httpServer.listen({ port }, resolve));
console.log(`🚀 Server ready at http://localhost:4000--${server}`);

// const server = new ApolloServer({ typeDefs, resolvers,
//     plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
//  });
//  await server.start();

 
// const { url } = await startStandaloneServer(server, {context,
//     listen: { port: 4000 },
// });
// console.log(`🚀  Server ready at ${url}`);

//