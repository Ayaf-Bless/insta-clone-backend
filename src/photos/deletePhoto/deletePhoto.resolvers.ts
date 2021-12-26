import { Resolvers } from "src/types";
import { OutPut } from "src/users/Interfaces";
import { protectedResolver } from "../../user.util";

const resolver: Resolvers = {
  Mutation: {
    DeletePhotoResponse: protectedResolver(
      async (_, { id }, { client, loggedInUser }): Promise<OutPut> => {
        const photo = await client.photo.findUnique({
          where: { id },
          select: { userId: true },
        });
        if (!photo) {
          return {
            ok: false,
            error: "photo not found",
          };
        } else if (photo.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "you can't perform that action",
          };
        }
        await client.photo.delete({ where: { id } });
        return {
          ok: true,
        };
      }
    ),
  },
};
