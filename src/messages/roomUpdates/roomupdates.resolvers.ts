import { NEW_MESSAGE } from "../../Interfaces";
import pubSub from "../../pubSub";
import { Resolvers } from "../../types";

const resolver = {
  Subscription: {
    roomUpdates: {
      subscribe: () => pubSub.asyncIterator(NEW_MESSAGE),
    },
  },
};

export default resolver;
