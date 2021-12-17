require("dotenv").config();
import { ApolloServer } from "apollo-server";
import schema from "./schema";
import { getUser } from "./user.util";


const server = new ApolloServer({ schema, cors: { credentials: true, origin: "https://studio.apollographql.com" }, context:async({req,res}) =>{  return {
  loggedInUser: await getUser(req.headers.authorization)
} }});

const PORT = process.env.PORT;
// server.applyMiddleware({
//   cors: { credentials: true, origin: "https://studio.apollographql.com" }
// });
server
  .listen(PORT)
  .then(() => console.log("Server has started on " + PORT + " ⚡"));
