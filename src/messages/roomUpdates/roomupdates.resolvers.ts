import { withFilter } from "graphql-subscriptions";
import { NEW_MESSAGE } from "../../Interfaces";
import pubSub from "../../pubSub";

const resolver = {
  Subscription: {
    roomUpdates: {
      subscribe: withFilter(
        () => pubSub.asyncIterator(NEW_MESSAGE),
        ({ roomUpdates }, { roomId }) => {
          return roomUpdates.roomId === roomId;
        }
      ),
    },
  },
};

export default resolver;
