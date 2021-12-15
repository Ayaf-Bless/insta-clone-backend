import { gql } from "apollo-server";

export default gql`
  type Movie {
    title: String
    year: Int
    id: Int
    genre: String
    createAt: String
    updatedAt: String
  }
  type Query {
    movies: [Movie]
    movie(id: Int): Movie
  }
  type Mutation {
    createMovie(title: String!, year: Int!, genre: String): Movie
  }
`;
