import { Photo } from "@prisma/client";
import { protectedResolver } from "../../user.util";
import { Resolvers } from "../../users/types";

const resolver: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (
        _,
        { file, caption },
        { client, loggedInUser }
      ): Promise<Photo> => {
        let hashtagObjs: any[] = [];
        if (caption) {
          const hashtags: string[] = caption.match(/#[\w]+/g);
          hashtagObjs = hashtags.map((hashtag) => ({
            where: { hashtag },
            create: { hashtag },
          }));
        }
        return client.photo.create({
          data: {
            file,
            caption,
            ...(hashtagObjs.length > 0 && {
              hashtags: { connectOrCreate: hashtagObjs },
            }),
            user: {
              connect: {
                id: loggedInUser.id,
              },
            },
          },
        });
      }
    ),
  },
};

export default resolver;
