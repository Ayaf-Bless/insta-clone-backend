import { Resolvers } from "../../types";

const resolver: Resolvers = {
  Query: {
    searchUser: (_, { keyword, page }, { client }) => {
      return client.user.findMany({
        where: { userName: { startsWith: keyword.toLowerCase() } },
        take: 5,
        skip: (page - 1) * 5,
      });
    },
  },
};

export default resolver;
