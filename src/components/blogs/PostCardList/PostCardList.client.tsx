'use client';

import React, { useMemo, startTransition } from 'react';
import { gql, useSuspenseQuery } from '@apollo/client';
import { useIntersectionObserver } from 'usehooks-ts';
import classNames from 'classnames/bind';

import { suspenseWrapperHoc } from '@/hocs/suspenseWrapper';
import { GetPostsQuery, GetPostsQueryVariables, FilterOperator, SortDirection } from '@/types/apollo';
import PostCard, { PostCardLoading } from '@/components/blogs/PostCard';

import styles from './PostCardList.module.scss';

const cx = classNames.bind(styles);

interface PostCardListProps {
  tag?: string;
  category?: string;
}

const PostCardList: React.FC<PostCardListProps> = ({ tag, category }) => {
  const { postFilter, postSort } = useMemo(
    () => ({
      postFilter: [
        ...(category ? [{ name: 'category', operator: FilterOperator.Eq, value: category }] : []),
        ...(tag ? [{ name: 'tags', operator: FilterOperator.In, value: tag }] : []),
      ],
      postSort: [
        { name: 'createdAt', direction: SortDirection.Desc },
        { name: '_id', direction: SortDirection.Desc },
      ],
    }),
    [category, tag]
  );

  const { data, fetchMore } = useSuspenseQuery<GetPostsQuery, GetPostsQueryVariables>(localQuery, {
    variables: {
      limit: 10,
      filter: postFilter,
      sort: postSort,
    },
  });

  const handleFetchMore = () => {
    if (data?.posts.pageInfo.hasNext) {
      startTransition(() => {
        fetchMore({
          variables: {
            limit: 10,
            filter: postFilter,
            skip: data.posts.nodes?.length,
            sort: postSort,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult.posts) {
              return prev;
            }

            const newPostNodes = [...(prev.posts.nodes || []), ...(fetchMoreResult.posts.nodes || [])];

            return { ...fetchMoreResult, posts: { ...fetchMoreResult.posts, nodes: newPostNodes } };
          },
        });
      });
    }
  };

  const { ref } = useIntersectionObserver({
    threshold: 0.5,
    onChange: (isIntersecting) => {
      if (isIntersecting) {
        handleFetchMore();
      }
    },
  });

  const lastPostId = data?.posts.nodes?.at(-1)?._id;

  return (
    <div className={cx('PostCardList')}>
      {data.posts.nodes?.map((post) => (
        <PostCard key={post._id} post={post} ref={post._id === lastPostId ? ref : undefined} />
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
        viewCount
        createdAt
        updatedAt
        deletedAt
      }
    }
  }
`;

export default suspenseWrapperHoc(
  PostCardList,
  <div className={cx('PostCardList')}>
    <PostCardLoading />
    {/* <PostCardLoading />
    <PostCardLoading />
    <PostCardLoading /> */}
  </div>
);
