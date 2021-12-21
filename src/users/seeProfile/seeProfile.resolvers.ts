import client from "../../client";
import { OutPut } from "../Interfaces";

export default {
  Query: {
    seeProfile: async (_: any, { id }: { id: number }): Promise<OutPut> => {
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
