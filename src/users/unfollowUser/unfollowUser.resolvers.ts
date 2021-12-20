import client from "../../client";
import { protectedResolver } from "../../user.util";
import { OutPut } from "../Interfaces";

export default {
  Mutation: {
    unfollowUser: protectedResolver(
      async (_, { id }, context): Promise<OutPut> => {
        const { loggedInUser } = context;
        const ok = await client.user.findUnique({ where: { id } });
        if (!ok) {
          return {
            ok: false,
            error: "user you are trying to follow does not exist",
          };
        }
        await client.user.update({
          where: { id: loggedInUser.id },
          data: {
            following: {
              disconnect: {
                id,
              },
            },
          },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};
