import { gql } from "apollo-server-express";

export default gql`
  type CreateCommentResponse {
    ok: Boolean!
    error: String
    # paylaod: String
  }
  type Mutation {
    createComment(photoId: Int!, payload: String!): CreateCommentResponse!
  }
`;
