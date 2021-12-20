import client from "../../client";
import { OutPut } from "../Interfaces";

export default {
  Query: {
    seeProfile: async (
      _: any,
      { userName }: { userName: string }
    ): Promise<OutPut> => {
      try {
        const user = await client.user.findFirst({
          where: { userName },
          include: { followers: true, following: true },
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
