import { Resolvers } from "../../users/types";

const resolver: Resolvers = {
  Query: {
    seePhoto: (_, { id }, { client }) =>
      client.photo.findUnique({ where: { id } }),
  },
};

export default resolver;
