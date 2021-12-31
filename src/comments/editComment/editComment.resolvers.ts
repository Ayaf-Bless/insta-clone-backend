import { Resolvers } from "src/types";
import { OutPut } from "src/Interfaces";
import { protectedResolver } from "../../user.util";

const resolver: Resolvers = {
  Mutation: {
    editComment: protectedResolver(
      async (
        _,
        { commentId, payload },
        { client, loggedInUser }
      ): Promise<OutPut> => {
        const comment = await client.comment.findUnique({
          where: { id: commentId },
          select: { userId: true },
        });
        if (!comment) {
          return {
            ok: false,
            error: "no comments found",
          };
        } else if (comment.userId !== loggedInUser.id) {
          return {
            ok: true,
            error: "you can't perform that command",
          };
        }
        await client.comment.update({
          where: { id: commentId },
          data: { payload },
        });
        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolver;
