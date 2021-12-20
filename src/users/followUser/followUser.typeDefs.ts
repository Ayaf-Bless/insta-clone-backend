import { gql } from "apollo-server-express";

export default gql`
  type FollowUserResponse {
    ok: Boolean!
    error: String
  }
  type Mutation {
    followUser(id: Int): FollowUserResponse
  }
`;
