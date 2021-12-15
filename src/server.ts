import { ApolloServer, gql } from "apollo-server";
 
const movies = [
  { id: 1, title: "titanic", year: 1998 },
  { id: 2, title: "moscow again", year: 2000 },
];
 
const typeDefs = gql`
  type Movie {
    title: String
    year: Int
    id: Int
  }
  type Query {
    movies: [Movie]
    movie(id: Int): Movie
  }
`;

const resolvers = {
  Query: {
    movies: () => movies,
    movie: (parent: any, args: any, context: any) => {
      return movies.find((movie) => movie.id === args.id);
    },
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
 
server.listen().then(() => console.log("Server has started on 4000"));
 