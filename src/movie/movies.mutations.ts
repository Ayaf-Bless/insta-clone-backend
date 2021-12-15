import { Movie } from "@prisma/client";
import client from "../client";

export default {
  Mutation: {
    createMovie: (_: any, { title, year, genre }: Movie) =>
      client.movie.create({ data: { title, year, genre } }),
  },
};
