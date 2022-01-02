import { withFilter } from "graphql-subscriptions";
import { NEW_MESSAGE } from "../../Interfaces";
import pubSub from "../../pubSub";
import client from "../../client";

const resolver = {
  Subscription: {
    roomUpdates: {
      subscribe: async (parent, args, context, info) => {
        const room = await client.room.findUnique({
          where: { id: args.roomId },
          select: { id: true },
        });
        if (!room) {
          throw new Error("access refused");
        }
        return withFilter(
          () => pubSub.asyncIterator(NEW_MESSAGE),
          ({ roomUpdates }, { roomId }) => {
            return roomUpdates.roomId === roomId;
          }
        )(parent, args, context, info);
      },
    },
  },
};

export default resolver;
