import { gql } from "apollo-server-express";

export default gql`
  scalar Upload

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  input UserEdit {
    firstName: String
    lastName: String
    userName: String
    email: String
    password: String
    bio: String
    avatar: Upload
  }
  type MutationResponse {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(input: UserEdit): MutationResponse
  }
`;
