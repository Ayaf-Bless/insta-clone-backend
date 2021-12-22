import { gql } from "apollo-server-express";

export default gql`
  type Photo {
    id: Int!
    createdAt: String!
    updatedAt: String!
    user: User!
    file: String!
    caption: String
    hashtags: [Hashtag]
  }
  type Hashtag {
    id: Int!
    photos: [Photo]
    hashtag: String!
    createdAt: String!
    updatedAt: String!
  }
`;
