import pubSub from "../../pubSub";
import { Resolvers } from "../../types";
import { protectedResolver } from "../../user.util";
import { NEW_MESSAGE, OutPut } from "../../Interfaces";

const resolver: Resolvers = {
  Mutation: {
    sendMessage: protectedResolver(
      async (
        _,
        { payload, roomId, userId },
        { loggedInUser, client }
      ): Promise<OutPut> => {
        let room;
        if (userId) {
          const user = await client.user.findUnique({
            where: { id: userId },
            select: { id: true },
          });
          if (!user) {
            return {
              ok: false,
              error: "the user you are trying to text does not exist",
            };
          }
          room = await client.room.create({
            data: {
              users: { connect: [{ id: user.id }, { id: loggedInUser.id }] },
            },
          });
        } else if (roomId) {
          room = await client.room.findUnique({
            where: { id: roomId },
            select: { id: true },
          });

          if (!room) {
            return {
              ok: false,
              error: "the room with that Id is not found",
            };
          }
        }
        const message = await client.message.create({
          data: {
            payload,
            room: { connect: { id: room.id } },
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
          },
        });

        await pubSub.publish(NEW_MESSAGE, { roomUpdates: { ...message } });
        return {
          ok: true,
        };
      }
    ),
  },
};

export default resolver;
