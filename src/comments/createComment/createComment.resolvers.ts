import { Resolvers } from "../../types";
import { protectedResolver } from "../../user.util";
import { OutPut } from "../../Interfaces";

const resolver: Resolvers = {
  Mutation: {
    createComment: protectedResolver(
      async (
        _,
        { photoId, payload },
        { client, loggedInUser }
      ): Promise<OutPut> => {
        console.log(payload);

        const photo = await client.photo.findUnique({
          where: { id: photoId },
          select: { id: true },
        });
        if (!photo) {
          return {
            ok: false,
            error: "picture not found",
          };
        }
        await client.comment.create({
          data: {
            payload,
            user: { connect: { id: loggedInUser.id } },
            photo: { connect: { id: photoId } },
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
