import { gql } from "apollo-server-express";

export default gql`
  type SeeUserOutput {
    ok: Boolean!
    error: String
    user: User
  }
  type Query {
    seeProfile(id: Int!): SeeUserOutput
  }
`;
