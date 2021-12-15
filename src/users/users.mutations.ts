import { User } from "@prisma/client";
import client from "../client";

export default {
  Mutation: {
    createAccount: async (_: any, { userName, email, firstName }: User) => {
      const user = await client.user.findFirst({
        where: { OR: [{ userName }, { email }] },
      });
      console.log(user);
    },
  },
};
