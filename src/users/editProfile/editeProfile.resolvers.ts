import argon2 from "argon2";
import client from "../../client";
import { OutPut } from "../Interfaces";

export default {
  Mutation: {
    editProfile: async (_: any, { input }: any): Promise<OutPut> => {
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
      await client.user.update({ where: { id: 1 }, data: { ...data } });
      try {
        return {
          ok: true,
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
