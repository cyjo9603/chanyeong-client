'use client';

import React from 'react';
import { gql, useQuery } from '@apollo/client';
import classNames from 'classnames/bind';

import { EyeIcon } from '@/assets';
import { GetPostViewCountQuery, GetPostViewCountQueryVariables } from '@/types/apollo';

import styles from './PostStatus.module.scss';

const cx = classNames.bind(styles);

interface PostStatusProps {
  viewCount: number;
  postId: string;
}

const PostStatus: React.FC<PostStatusProps> = ({ viewCount, postId }) => {
  const { data } = useQuery<GetPostViewCountQuery, GetPostViewCountQueryVariables>(localQuery, {
    variables: { id: postId },
    fetchPolicy: 'cache-only',
  });

  return (
    <div className={cx('PostStatus')}>
      <span className={cx('status')}>
        <EyeIcon />
        <span className={cx('status-count')}>{data?.post.viewCount || viewCount}</span>
      </span>
      {/* <button className={cx('status', 'favorite')}>
        <FavoriteIcon />
        <span className={cx('status-count')}>10</span>
      </button> */}
    </div>
  );
};

const localQuery = gql`
  query GetPostViewCount($id: ObjectId!) {
    post(id: $id) {
      _id
      viewCount
    }
  }
`;

export default PostStatus;
