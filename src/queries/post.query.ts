import { gql } from '@apollo/client';

export const getPostQuery = gql`
  query GetPost($id: ObjectId!) {
    post(id: $id) {
      _id
      category
      title
      content
      thumbnail
      tags
      viewCount
      createdAt
      updatedAt
      deletedAt
      user {
        _id
        firstName
        lastName
        userId
      }
    }
  }
`;
