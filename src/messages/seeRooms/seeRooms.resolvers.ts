import { Resolvers } from "../../types";
import { protectedResolver } from "../../user.util";

const resolver: Resolvers = {
  Query: {
    seeRooms: protectedResolver(async (_, __, { loggedInUser, client }) => {
      return client.room.findMany({
        where: { users: { some: { id: loggedInUser.id } } },
      });
    }),
  },
};

export default resolver;
