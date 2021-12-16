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
    password: String!
  }
  input CreateAccountInput {
    firstName: String!
    lastName: String
    userName: String!
    email: String!
    password: String!
  }
  type Mutation {
    createAccount(input: CreateAccountInput): User
  }
`;
