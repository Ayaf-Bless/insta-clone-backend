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
  }
  type Mutation {
    createAccount(input: UserCreateAccont): User
  }
  input UserCreateAccont {
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
