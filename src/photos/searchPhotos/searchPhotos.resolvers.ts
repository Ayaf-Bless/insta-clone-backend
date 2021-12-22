import { Resolvers } from "../../types";

const resolver: Resolvers = {
  Query: {
    searchPhotos: (_, { keyword }, { client }) => {
      return client.photo.findMany({
        where: { caption: { startsWith: keyword.toLowerCase() } },
      });
    },
  },
};

export default resolver;
