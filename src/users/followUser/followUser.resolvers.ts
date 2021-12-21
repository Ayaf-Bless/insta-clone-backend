import { protectedResolver } from "../../user.util";
import { OutPut } from "../Interfaces";
import { Resolvers } from "../types";
const resolver: Resolvers = {
  Mutation: {
    followUser: protectedResolver(
      async (_, { id }, { client, loggedInUser }): Promise<OutPut> => {
        try {
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
                connect: {
                  id,
                },
              },
            },
          });

          return {
            ok: true,
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
          };
        }
      }
    ),
  },
};

export default resolver;
