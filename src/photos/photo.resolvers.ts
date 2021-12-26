import { PrismaPromise } from "@prisma/client";
import { Resolvers } from "../types";

const resolver: Resolvers = {
  Photo: {
    user: ({ userId }, _, { client }) => {
      return client.user.findUnique({ where: { id: userId } });
    },
    hashtags: ({ id }, _, { client }) => {
      return client.hashtag.findMany({
        where: {
          photos: {
            some: {
              id,
            },
          },
        },
      });
    },
    likes: ({ id }, _, { client }): PrismaPromise<number> => {
      return client.like.count({ where: { photoId: id } });
    },
    comments: ({ id }, _, { client }): PrismaPromise<number> => {
      return client.comment.count({ where: { photoId: id } });
    },
  },
  Hashtag: {
    totalPhoto: ({ id }, _, { client }) =>
      client.photo.count({
        where: {
          hashtags: {
            some: { id },
          },
        },
      }),
    photos: ({ id }, { page }, { client }) => {
      return client.hashtag.findUnique({ where: { id } }).photos();
    },
  },
};

export default resolver;
