import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, { id, page }, context) => {
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
        const followers = await client.user
          .findUnique({ where: { id } })
          .followers({ skip: (page - 1) * 5, take: 5 });
        const totalPages = await client.user.count({ where: { id } });
        return {
          ok: true,
          followers,
          totalPages,
        };
      } catch (error) {
        return {
          ok: false,
          error: "something went wrong",
        };
      }
    },
  },
};
