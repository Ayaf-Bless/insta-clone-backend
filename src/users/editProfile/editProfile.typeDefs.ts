import { gql } from "apollo-server";

export default gql`
  input UserEdit {
    firstName: String
    lastName: String
    userName: String
    email: String
    password: String
  }
  type UserEditResponse {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(input: UserEdit): UserEditResponse
  }
`;
