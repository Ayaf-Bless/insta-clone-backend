import { gql } from "apollo-server-express";

export default gql`
  type CreateAccountOutput {
    ok: Boolean
    error: String
    # user: User
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
