import client from "../../client";
import { protectedResolver } from "../../user.util";
import { OutPut } from "../Interfaces";
interface LoggedUser {
  loggedInUser: Helper;
}
interface Helper {
  id: number;
  userName: string;
}

export default {
  Mutation: {
    followUser: protectedResolver(
      async (_, { id }, context): Promise<OutPut> => {
        try {
          const { loggedInUser }: LoggedUser = context;

          await client.user.update({
            where: { id: loggedInUser.id },
            data: {
              following: {
                connect: {
                  id,
                },
              },
            },
          });

          return {
            ok: true,
          };
        } catch (error) {
          return {
            ok: false,
            error: error.message,
          };
        }
      }
    ),
  },
};
