import { gql } from "apollo-server-express";

export default gql`
  type SeeFollowingsResponse {
    ok: Boolean!
    error: String
    followings: [User]
    totalPages: Int
  }
  type Query {
    seeFollowings(id: Int!, cursor: Int): SeeFollowingsResponse
  }
`;
