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
