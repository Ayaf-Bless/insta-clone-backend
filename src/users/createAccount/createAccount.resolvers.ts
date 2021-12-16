import { User } from "@prisma/client";
import argon2 from "argon2";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async (_: any, { input }: any): Promise<User> => {
      try {
        const { userName, email, password, lastName, firstName }: User = input;
        const user = await client.user.findFirst({
          where: { OR: [{ userName }, { email }] },
        });
        if (user) {
          throw new Error("this username/email is already taken");
        }
        const hash = await argon2.hash(password);

        return client.user.create({
          data: { email, password: hash, userName, lastName, firstName },
        });
      } catch (e) {
        return e;
      }
    },
  },
};
