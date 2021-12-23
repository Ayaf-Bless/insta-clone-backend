import { Resolvers } from "../../types";
import { protectedResolver } from "../../user.util";
import { OutPut } from "../../users/Interfaces";

const resolver: Resolvers = {
  Mutation: {
    editPhoto: protectedResolver(
      async (_, { id, caption }, { client, loggedInUser }): Promise<OutPut> => {
        const photo = await client.photo.findFirst({
          where: { id, userId: loggedInUser.id },
        });

        if (!photo) {
          return {
            ok: false,
            error: "could not perform that action",
          };
        }
        await client.photo.update({
          where: { id },
          data: { caption },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolver;
