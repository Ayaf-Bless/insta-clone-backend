import { gql } from "apollo-server-express";

export default gql`
  type UnfollowUserResponse {
    ok: Boolean!
    error: String
  }
  type Mutation {
    unfollowUser(id: Int!): UnfollowUserResponse
  }
`;
