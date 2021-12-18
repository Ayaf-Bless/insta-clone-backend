import argon2 from "argon2";
import fs from "fs";
import { GraphQLUpload } from "graphql-upload";
import path from "path";
import client from "../../client";
import { protectedResolver } from "../../user.util";
import { OutPut } from "../Interfaces";

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (_: any, { input }: any, context: any): Promise<OutPut> => {
        try {
          const { loggedInUser } = context;
          const data: {
            firstName: string;
            lastName: string;
            userName: string;
            email: string;
            password: string;
            bio: string;
            avatar;
          } = input;

          if (data.password) {
            data.password = await argon2.hash(data.password);
          }
          if (data.avatar) {
            const { filename, createReadStream } = await data.avatar;
            const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}`;
            const readStream = createReadStream();
            const writeStream = fs.createWriteStream(
              `${path.join(__dirname, "../../")}upload/${newFilename}`
            );
            readStream.pipe(writeStream);
            data.avatar = `http://localhost:4000/static/${newFilename}`;
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
  Upload: GraphQLUpload,
};
