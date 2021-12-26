import { Resolvers } from "../../types";
import { protectedResolver } from "../../user.util";

const resolver: Resolvers = {
  Query: {
    seeFeed: protectedResolver((_, __, { client, loggedInUser }) => {
      return client.photo.findMany({
        where: {
          OR: [
            {
              user: {
                followers: { some: { id: loggedInUser.id } },
              },
            },
            {
              userId: loggedInUser.id,
            },
          ],
        },
        orderBy: { createdAt: "desc" },
      });
    }),
  },
};

export default resolver;
