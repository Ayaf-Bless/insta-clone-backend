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
  type LoginResponse {
    ok: Boolean!
    error: String
    token: String
  }
  type Mutation {
    createAccount(input: UserAccount): User
    login(userName: String!, password: String!): LoginResponse!
  }
  input UserAccount {
    firstName: String!
    lastName: String
    userName: String!
    email: String!
    password: String!
  }
  type Query {
    seeProfile(username: String!): User
  }
`;