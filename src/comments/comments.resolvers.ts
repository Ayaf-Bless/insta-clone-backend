import { Resolvers } from "src/types";

const resolver: Resolvers = {
  Comment: {
    isMine: ({ userId }, _, { loggedInUser }) => {
      return userId === loggedInUser.id;
    },
  },
};

export default resolver;
