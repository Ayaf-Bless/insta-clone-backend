require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./schema";
import { getUser, protectedResolver } from "./user.util";

const server = new ApolloServer({
  schema,
  cors: { credentials: true, origin: "https://studio.apollographql.com" },
  context: async ({ req, res }) => {
    return {
      loggedInUser: await getUser(req.headers.authorization),
      protectedResolver,
    };
  },
});

const PORT = process.env.PORT;
// server.applyMiddleware({
//   cors: { credentials: true, origin: "https://studio.apollographql.com" }
// });
server
  .listen(PORT)
  .then(() => console.log("Server has started on " + PORT + " ⚡"));
