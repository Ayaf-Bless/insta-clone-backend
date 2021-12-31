import { Resolvers } from "../types";

const resolver: Resolvers = {
  Room: {
    users: ({ id }, _, { loggedInUser, client }) =>
      client.room.findUnique({ where: { id } }).users(),
    messages: ({ id }, _, { client }) =>
      client.message.findMany({ where: { roomId: id } }),
    unreadTotal: ({ id }, __, { client, loggedInUser }) => {
      if (!loggedInUser) {
        return 0;
      }
      return client.message.count({
        where: {
          read: false,
          roomId: id,
          user: { id: { not: loggedInUser.id } },
        },
      });
    },
  },
  Message: {
    user: async ({ id }, _, { client }) => {
      return client.message.findUnique({ where: { id } }).user();
    },
  },
};

export default resolver;
