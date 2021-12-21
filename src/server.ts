require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { graphqlUploadExpress } from "graphql-upload";
import logger from "morgan";
import path from "path";
import client from "./client";
import { resolvers, typeDefs } from "./schema";
import { getUser } from "./user.util";

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, res }) => {
      return {
        loggedInUser: await getUser(req.headers.authorization),
        client,
      };
    },
  });
  await server.start();

  const app = express();
  app.use(logger("tiny"));
  app.use("/static", express.static(path.join(__dirname, "upload")));
  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress());

  server.applyMiddleware({
    app,
    cors: { credentials: true, origin: "https://studio.apollographql.com" },
  });

  app.listen(4000, () => {
    console.log("server has started on 4000");
  });
}

startServer().catch((e) => {
  console.log(e);
});
;