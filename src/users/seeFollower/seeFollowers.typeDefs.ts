import { gql } from "apollo-server-express";

export default gql`
  type seeFollwerRespond {
    ok: Boolean!
    error: String
    followers: [User]
    totalPages: Int
  }
  type Query {
    seeFollowers(id: Int!, page: Int!): seeFollwerRespond!
  }
`;
