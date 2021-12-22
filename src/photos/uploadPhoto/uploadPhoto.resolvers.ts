import { protectedResolver } from "../../user.util";
import { Resolvers } from "../../users/types";

const resolver: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (_, { file, caption }, { client, loggedInUser }) => {
        if (caption) {
          const hashtag = caption.match(/#[\w]+/g);
          console.log(hashtag);
          return { caption };
        }
        client.photo.create({
          data: {
            file,
            caption,
            hashtags: {
              connectOrCreate: [
                {
                  where: { hashtag: "#food" },
                  create: { hashtag: "#food" },
                },
              ],
            },
            userId: loggedInUser.id,
          },
        });
        return false;
      }
    ),
  },
};

export default resolver;
