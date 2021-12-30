import { Resolvers } from "../../types";
import { protectedResolver } from "../../user.util";

const resolver: Resolvers = {
  Query: {
    seeRoom: protectedResolver(
      async (_, { roomId }, { client, loggedInUser }) =>
        client.room.findFirst({
          where: { id: roomId, users: { some: { id: loggedInUser.id } } },
        })
    ),
  },
};

export default resolver;
