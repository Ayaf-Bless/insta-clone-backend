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
    likes: Int!
    comments: Int!
    isMine: Boolean!
  }
  type Hashtag {
    id: Int!
    photos(page: Int!): [Photo]
    hashtag: String!
    totalPhoto: Int!
    createdAt: String!
    updatedAt: String!
  }
  type Like {
    id: Int!
    photo: Photo!
    createdAt: String!
    updatedAt: String!
  }
`;
