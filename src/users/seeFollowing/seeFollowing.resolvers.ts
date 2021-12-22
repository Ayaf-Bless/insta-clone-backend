import { Resolvers } from "../../types";

const resolver: Resolvers = {
  Query: {
    seeFollowings: async (_, { id, cursor }, { client }) => {
      try {
        const user = await client.user.findUnique({
          where: { id },
          select: { id: true },
        });
        if (!user) {
          return {
            ok: false,
            error: "no user found",
          };
        }

        const followings = await client.user
          .findUnique({ where: { id } })
          .following({
            skip: cursor ? 1 : 0,
            take: 5,
            ...(cursor && { cursor: { id: cursor } }),
          });

        const totalPages = await client.user.count({ where: { id } });
        return {
          ok: true,
          followings,
          totalPages,
        };
      } catch {
        return {
          ok: false,
          error: "something went wrong",
        };
      }
    },
  },
};

export default resolver;
