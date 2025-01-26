'use client';

import React, { useMemo, forwardRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import removeMd from 'remove-markdown';
import classNames from 'classnames/bind';

import { Post } from '@/types/apollo';
import Tag from '@/components/commons/Tag';
import { dateFommater } from '@/utils/date';
import PostStatus from '@/components/blogs/PostStatus';

import styles from './PostCard.module.scss';

const cx = classNames.bind(styles);

const POST_CONTENT_LIMIT = 500;

interface PostCardProps {
  post: Omit<Post, 'numId' | 'user'>;
}

const PostCard = forwardRef<HTMLAnchorElement, PostCardProps>(({ post }, ref) => {
  const postContent = useMemo(
    () => removeMd(post.content, { useImgAltText: false }).slice(0, POST_CONTENT_LIMIT),
    [post.content]
  );

  return (
    <Link href={`/blog/posts/${post._id}`} className={cx('PostCard')} prefetch={false} ref={ref}>
      {post.thumbnail && (
        <div className={cx('img-container')}>
          <Image src={post.thumbnail!} alt={post.title} className={cx('img')} fill />
        </div>
      )}
      <div className={cx('content-container')}>
        <div className={cx('content')}>
          <div className={cx('title')}>{post.title}</div>
          <div className={cx('description')}>{postContent}</div>
        </div>
        <div className={cx('info')}>
          <div className={cx('date')}>{dateFommater(post.createdAt)}</div>
          <PostStatus viewCount={post.viewCount} postId={post._id} />
        </div>
      </div>
      <div className={cx('tag-container')}>
        {post.tags?.map((tag) => (
          <Tag key={tag} name={tag} />
        ))}
      </div>
    </Link>
  );
});

PostCard.displayName = 'PostCard';

export const PostCardLoading: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cx('PostCard', 'loading', className)}>
      <div className={cx('img-container')}></div>
      <div className={cx('content-container')}></div>
      <div className={cx('tag-container')}></div>
    </div>
  );
};

export default PostCard;
