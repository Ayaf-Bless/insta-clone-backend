import client from "../../client";

export default {
  Query: {
    searchUser: async (_, { keyword }) => {
      return client.user.findMany({
        where: { userName: { startsWith: keyword.toLowerCase() } },
        take: 5,
      });
    },
  },
};
