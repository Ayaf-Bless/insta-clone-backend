require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { graphqlUploadExpress } from "graphql-upload";
import { createServer } from "http";
import logger from "morgan";
import path from "path";
import client from "./client";
import { resolvers, typeDefs } from "./schema";
import { getUser } from "./user.util";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { execute, subscribe } from "graphql";

async function startServer() {
  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const app = express();

  const httpServer = createServer(app);
  const subscriptionServer = SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: "/graphql" }
  );
  const server = new ApolloServer({
    schema,
    context: async ({ req, res }) => {
      return {
        loggedInUser: await getUser(req.headers.authorization),
        client,
      };
    },
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await server.start();

  app.use(logger("tiny"));
  app.use("/static", express.static(path.join(__dirname, "upload")));
  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress());

  server.applyMiddleware({
    app,
    cors: { credentials: true, origin: "https://studio.apollographql.com" },
  });

  httpServer.listen(4000, () => {
    console.log("server has started on 4000");
  });
}

startServer().catch((e) => {
  console.log(e);
});
