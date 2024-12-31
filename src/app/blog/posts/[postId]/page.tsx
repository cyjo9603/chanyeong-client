import React from 'react';
import { NextPage } from 'next';
import { gql } from '@apollo/client';
import classNames from 'classnames/bind';

import { GetPostQuery, GetPostQueryVariables } from '@/types/apollo';
import { getClient } from '@/libs/apollo/apollo.server';
import Tag from '@/components/commons/Tag';

import { dateFommater } from '@/utils/date';

import MarkdownViewer from '@/components/blogs/MarkdownViewer';

import styles from './page.module.scss';

const cx = classNames.bind(styles);

interface BlogPostPageProps {
  params: Promise<{
    postId: string;
  }>;
}

const BlogPostPage: NextPage<BlogPostPageProps> = async ({ params }) => {
  const { postId } = await params;
  const apolloClient = await getClient();

  const { data } = await apolloClient.query<GetPostQuery, GetPostQueryVariables>({
    query: localQuery,
    variables: { id: postId },
  });

  if (!data.post) {
    return;
  }

  const { post } = data;

  return (
    <div className={cx('BlogPostPage')}>
      <section className={cx('section')}>
        <div className={cx('content')}>
          <div className={cx('tag-container')}>
            {post.tags?.map((tag) => (
              <Tag key={tag} name={tag} />
            ))}
          </div>
          <h1 className={cx('title')}>{post.title}</h1>
          <div className={cx('info')}>
            <span className={cx('name')}>
              {post.user.firstName} {post.user.lastName}
            </span>
            <span className={cx('date')}>{dateFommater(post.createdAt)}</span>
          </div>
          <MarkdownViewer content={post.content} />
        </div>
        <div className={cx('toc')}></div>
      </section>
    </div>
  );
};

const localQuery = gql`
  query GetPost($id: ObjectId!) {
    post(id: $id) {
      _id
      category
      title
      content
      thumbnail
      tags
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

export default BlogPostPage;
