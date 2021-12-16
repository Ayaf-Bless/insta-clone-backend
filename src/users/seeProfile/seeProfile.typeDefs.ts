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
  type SeeUserOutput {
    ok: Boolean!
    error: String
    user: User
  }
  type Query {
    seeProfile(userName: String!): SeeUserOutput
  }
`;
