import { withFilter } from "graphql-subscriptions";
import client from "../../client";
import { NEW_MESSAGE } from "../../Interfaces";
import pubSub from "../../pubSub";

const resolver = {
  Subscription: {
    roomUpdates: {
      subscribe: async (parent, args, context, info) => {
        const room = await client.room.findFirst({
          where: {
            id: args.roomId,
            users: { some: { id: context.loggedInUser.id } },
          },
          select: { id: true },
        });
        if (!room) {
          throw new Error("access refused");
        }
        return withFilter(
          () => pubSub.asyncIterator(NEW_MESSAGE),
          ({ roomUpdates }, { roomId }, { loggedInUser }) => {
            return roomUpdates.roomId === roomId;
          }
        )(parent, args, context, info);
      },
    },
  },
};

export default resolver;
