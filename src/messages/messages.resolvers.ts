import { Resolvers } from "../types";

const resolver: Resolvers = {
  Room: {
    users: ({ id }, _, { loggedInUser, client }) =>
      client.room.findUnique({ where: { id } }).users(),
    messages: ({ id }, _, { client }) =>
      client.message.findMany({ where: { roomId: id } }),
    unreadTotal: () => 0,
  },
};

export default resolver;
