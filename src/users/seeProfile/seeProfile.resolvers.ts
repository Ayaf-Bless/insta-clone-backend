import { User } from "@prisma/client";
import client from "../../client";

export default {
  Query: {
    seeProfile: async (
      _: any,
      { userName }: { userName: string }
    ): Promise<User | null> => {
      return client.user.findFirst({ where: { userName } });
    },
  },
};
