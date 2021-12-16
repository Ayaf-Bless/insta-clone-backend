import { User } from "@prisma/client";
import argon2 from "argon2";
import client from "../../client";
import { OutPut } from "../Interfaces";

export default {
  Mutation: {
    createAccount: async (_: any, { input }: any): Promise<OutPut> => {
      try {
        const { userName, email, password, lastName, firstName }: User = input;
        const user = await client.user.findFirst({
          where: { OR: [{ userName }, { email }] },
        });
        if (user) {
          throw new Error("this username/email is already taken");
        }
        const hash = await argon2.hash(password);

        const userCreated = await client.user.create({
          data: { email, password: hash, userName, lastName, firstName },
        });
        return {
          ok: true,
          user: userCreated,
        };
      } catch (e) {
        return {
          ok: false,
          error: e.message,
        };
      }
    },
  },
};
