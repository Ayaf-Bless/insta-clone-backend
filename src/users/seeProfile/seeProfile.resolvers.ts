import { OutPut } from "../Interfaces";
import { Resolvers } from "../types";

const resolver: Resolvers = {
  Query: {
    seeProfile: async (_: any, { id }, { client }): Promise<OutPut> => {
      try {
        const user = await client.user.findFirst({
          where: { id },
        });
        if (!user) {
          throw new Error("user not found");
        }
        return {
          ok: true,
          user,
        };
      } catch (error) {
        return {
          ok: false,
          error: error.message,
        };
      }
    },
  },
};

export default resolver;
