require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { graphqlUploadExpress } from "graphql-upload";
import { resolvers, typeDefs } from "./schema";
import { getUser, protectedResolver } from "./user.util";

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, res }) => {
      return {
        loggedInUser: await getUser(req.headers.authorization),
        protectedResolver,
      };
    },
  });
  await server.start();

  const app = express();

  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress());

  server.applyMiddleware({
    app,
    cors: { credentials: true, origin: "https://studio.apollographql.com" },
  });

  await new Promise<void>(r => app.listen({ port: 4000 }, r));

  console.log(`🚀 Server ready at http://localhost:4000/graphql`)
}

startServer().catch((e) => {
  console.log(e);
});
;