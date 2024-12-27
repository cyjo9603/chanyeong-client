'use client';

import React from 'react';
import { gql, useSuspenseQuery } from '@apollo/client';
import classNames from 'classnames/bind';

import { GetPostsQuery, GetPostsQueryVariables } from '@/types/apollo';
import PostCard from '@/components/blogs/PostCard';

import styles from './PostCardList.module.scss';

const cx = classNames.bind(styles);

const PostCardList: React.FC = () => {
  const { data } = useSuspenseQuery<GetPostsQuery, GetPostsQueryVariables>(localQuery, {
    variables: { limit: 10 },
  });

  return (
    <div className={cx('PostCardList')}>
      {data.posts.nodes?.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
};

const localQuery = gql`
  query GetPosts($filter: [InputFilter!], $skip: Int, $limit: Int, $sort: [InputSort!]) {
    posts(filter: $filter, skip: $skip, limit: $limit, sort: $sort) {
      pageInfo {
        hasNext
      }
      totalCount
      nodes {
        _id
        category
        title
        content
        thumbnail
        tags
        createdAt
        updatedAt
        deletedAt
      }
    }
  }
`;

export default PostCardList;
