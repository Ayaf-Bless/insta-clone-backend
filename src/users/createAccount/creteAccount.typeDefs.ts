import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    userName: String!
    email: String!
    createdAt: String
    updatedAt: String
    bio: String
    avatar: String
  }
  type CreateAccountOutput {
    ok: Boolean
    error: String
    user: User
  }
  input CreateAccountInput {
    firstName: String!
    lastName: String
    userName: String!
    email: String!
    password: String!
  }
  type Mutation {
    createAccount(input: CreateAccountInput): CreateAccountOutput!
  }
`;
