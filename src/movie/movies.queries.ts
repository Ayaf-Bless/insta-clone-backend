import { Movie } from "@prisma/client";
import client from "../client";
export default {
  Query: {
    movies: () => client.movie.findMany(),
    movie: (parent: any, { id }: Movie, context: any) =>
      client.movie.findUnique({ where: { id } }),
  },
};
