import { User } from "@prisma/client";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import client from "../client";

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
    login: async (
      _: any,
      { userName, password }: { userName: string; password: string }
    ): Promise<{ ok: boolean; token?: string; error?: string }> => {
      try {
        const user = await client.user.findFirst({
          where: {
            userName,
          },
        });
        if (!user) {
          return {
            ok: false,
            error: "user not found",
          };
        }

        const checkPassword = await argon2.verify(user.password, password);

        if (!checkPassword) {
          return {
            ok: false,
            error: "Check your crediatials and try again",
          };
        }
        const token = await jwt.sign(
          { id: user.id },
          process.env.JWT_SECRET || "VFaI/_QXzM.xDf:ew~r]"
        );
        return {
          ok: true,
          token,
        };
      } catch (error) {
        return {
          ok: false,
          error: "something went wrong",
        };
      }
    },
  },
};
