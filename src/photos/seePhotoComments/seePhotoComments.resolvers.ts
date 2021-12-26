import { Resolvers } from "src/types";

const resolver: Resolvers = {
  Query: {
    seePhotoComments: (_, { photoId }, { client }) => {
      return client.photo.findUnique({ where: { id: photoId } }).Comment();
    },
  },
};

export default resolver;
