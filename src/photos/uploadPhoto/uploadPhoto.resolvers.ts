import { Photo } from "@prisma/client";
import { Resolvers } from "../../types";
import { protectedResolver } from "../../user.util";
import { processHashtag } from "../photo.util";

const resolver: Resolvers = {
  Mutation: {
    uploadPhoto: protectedResolver(
      async (
        _,
        { file, caption },
        { client, loggedInUser }
      ): Promise<Photo> => {
        let hashtagObjs;
        if (caption) {
          hashtagObjs = processHashtag(caption);
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
