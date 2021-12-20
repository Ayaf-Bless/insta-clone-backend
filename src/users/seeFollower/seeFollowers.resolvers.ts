import client from "../../client";

export default {
  Query: {
    seeFollowers: async (_, { id, page }, context) => {
      const followers = await client.user
        .findUnique({ where: { id } })
        .followers({ skip: (page - 1) * 5, take: 5 });
      return {
        ok: true,
        followers,
      };
    },
  },
};
