import { gql } from "apollo-server-express";

export default gql`
  type LikePhotoResponse {
    ok: Boolean!
    error: String
  }
  type Mutation {
    toggleLike(id: Int!): LikePhotoResponse!
  }
`;
