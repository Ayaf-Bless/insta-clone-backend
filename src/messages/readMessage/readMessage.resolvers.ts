import { Resolvers } from "../../types";
import { protectedResolver } from "../../user.util";
import { OutPut } from "../../users/Interfaces";

const resolver: Resolvers = {
  Mutation: {
    readMessage: protectedResolver(
      async (_, { id }, { loggedInUser, client }): Promise<OutPut> => {
        const message = await client.message.findFirst({
          where: {
            id,
            user: {
              id: { not: loggedInUser.id },
            },
            room: {
              users: { some: { id: loggedInUser.id } },
            },
          },
          select: { id: true },
        });
        if (!message) {
          return {
            error: "message not found",
            ok: false,
          };
        }
        await client.message.update({ where: { id }, data: { read: true } });
        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolver;
