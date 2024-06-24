import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    // uri: 'http://localhost:4000/',
    uri: '/graphql',
    cache: new InMemoryCache(),
    headers:{
        authorization:localStorage.getItem('token') ||""
    }
  });
  client.clearStore();
//   console.log("client",client)

