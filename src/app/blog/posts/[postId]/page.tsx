import React from 'react';
import { NextPage } from 'next';
import classNames from 'classnames/bind';

import { GetPostQuery, GetPostQueryVariables } from '@/types/apollo';
import { getClient } from '@/libs/apollo/apollo.server';
import Tag from '@/components/commons/Tag';
import { BLOG_CONTENT_ELEMENT_ID } from '@/constants/element.constant';
import { dateFommater } from '@/utils/date';
import MarkdownViewer from '@/components/blogs/MarkdownViewer';
import Toc from '@/components/blogs/Toc';
import PostViewCountIncreaser from '@/components/blogs/PostViewCountIncreaser';
import PostStatus from '@/components/blogs/PostStatus';
import PostEditButton from '@/components/blogs/PostEditButton';
import { getPostQuery } from '@/queries/post.query';

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
    query: getPostQuery,
    variables: { id: postId },
  });

  if (!data.post) {
    return;
  }

  const { post } = data;

  return (
    <div className={cx('BlogPostPage')}>
      <section className={cx('section')}>
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
          <PostStatus viewCount={post.viewCount} postId={postId} />
          <PostEditButton postId={postId} className={cx('edit')} />
        </div>
        <div id={BLOG_CONTENT_ELEMENT_ID}>
          <MarkdownViewer content={post.content} />
        </div>
      </section>
      <aside className={cx('toc')}>
        <Toc />
      </aside>
      <PostViewCountIncreaser postId={post._id} />
    </div>
  );
};

export default BlogPostPage;
