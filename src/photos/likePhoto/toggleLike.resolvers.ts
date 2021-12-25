import { Resolvers } from "../../types";
import { protectedResolver } from "../../user.util";
import { OutPut } from "../../users/Interfaces";

const resolver: Resolvers = {
  Mutation: {
    toggleLike: protectedResolver(
      async (_, { id }, { client, loggedInUser }): Promise<OutPut> => {
        const photo = await client.photo.findUnique({ where: { id } });
        if (!photo) {
          return {
            ok: false,
            error: "photo not found",
          };
        }
        const like = await client.like.findUnique({
          where: {
            photoId_userId: {
              userId: loggedInUser.id,
              photoId: id,
            },
          },
        });
        if (like) {
          await client.like.delete({
            where: {
              photoId_userId: {
                userId: loggedInUser.id,
                photoId: id,
              },
            },
          });
        } else {
          await client.like.create({
            data: {
              user: {
                connect: {
                  id: loggedInUser.id,
                },
              },
              photo: {
                connect: {
                  id: photo.id,
                },
              },
            },
          });
        }
        return {
          ok: true,
        };
      }
    ),
  },
};
export default resolver;
