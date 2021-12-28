import { Photo } from "@prisma/client";
import fs from "fs";
import path from "path";
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

        const { filename, createReadStream } = await file;
        const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
        const readStream = createReadStream();
        const writeStream = fs.createWriteStream(
          `${path.join(__dirname, "../../")}upload/${newFilename}`
        );
        readStream.pipe(writeStream);
        file = `http://localhost:4000/static/${newFilename}`;

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
