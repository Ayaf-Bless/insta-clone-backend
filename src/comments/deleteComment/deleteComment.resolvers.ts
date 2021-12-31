import { Resolvers } from "src/types";
import { OutPut } from "src/Interfaces";
import { protectedResolver } from "../../user.util";

const resolver: Resolvers = {
  Mutation: {
    deleteComment: protectedResolver(
      async (_, { id }, { client, loggedInUser }): Promise<OutPut> => {
        const comment = await client.comment.findUnique({
          where: { id },
          select: {
            userId: true,
          },
        });
        if (!comment) {
          return {
            ok: false,
            error: "comment no found",
          };
        } else if (comment.userId !== loggedInUser.id) {
          return {
            ok: false,
            error: "you can't perform that action",
          };
        }
        await client.comment.delete({ where: { id } });
        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolver;
