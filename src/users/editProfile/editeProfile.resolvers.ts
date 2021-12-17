import argon2 from "argon2";
import client from "../../client";
import { protectedResolver } from "../../user.util";
import { OutPut } from "../Interfaces";

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (_: any, { input }: any, context: any): Promise<OutPut> => {
        try {
          const { loggedInUser, protectedResolver } = context;
          protectedResolver(context);
          const data: {
            firstName: string;
            lastName: string;
            userName: string;
            email: string;
            password: string;
          } = input;

          if (data.password) {
            data.password = await argon2.hash(data.password);
          }
          await client.user.update({
            where: { id: loggedInUser.id },
            data: { ...data },
          });
          return {
            ok: true,
          };
        } catch (error) {
          return {
            ok: false,
            error: "something went wrong",
          };
        }
      }
    ),
  },
};
