import argon2 from "argon2";
import jwt from "jsonwebtoken";
import client from "../../client";

export default {
  Mutation: {
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
