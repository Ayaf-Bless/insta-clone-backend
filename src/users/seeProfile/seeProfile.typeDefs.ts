import { gql } from "apollo-server";

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
