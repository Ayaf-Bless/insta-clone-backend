import { gql } from "apollo-server-express";

export default gql`
  type EditCommentResponse {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editComment(commentId: Int!, payload: String!): EditCommentResponse!
  }
`;
