import { Resolvers } from "../../types";
import { protectedResolver } from "../../user.util";
import { OutPut } from "../../Interfaces";
import { processHashtag } from "../photo.util";

const resolver: Resolvers = {
  Mutation: {
    editPhoto: protectedResolver(
      async (_, { id, caption }, { client, loggedInUser }): Promise<OutPut> => {
        const oldPhoto = await client.photo.findFirst({
          where: { id, userId: loggedInUser.id },
          include: {
            hashtags: {
              select: { hashtag: true },
            },
          },
        });

        if (!oldPhoto) {
          return {
            ok: false,
            error: "could not perform that action",
          };
        }
        await client.photo.update({
          where: { id },
          data: {
            caption,
            hashtags: {
              disconnect: oldPhoto.hashtags,
              connectOrCreate: processHashtag(caption),
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

export default resolver;
