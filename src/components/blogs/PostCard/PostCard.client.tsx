'use client';

import React from 'react';
import Link from 'next/link';
import classNames from 'classnames/bind';

import { Post } from '@/types/apollo';
import Tag from '@/components/commons/Tag';
import { dateFommater } from '@/utils/date';
import { EyeIcon, FavoriteIcon } from '@/assets';

import styles from './PostCard.module.scss';

const cx = classNames.bind(styles);

interface PostCardProps {
  post: Omit<Post, 'numId' | 'user'>;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Link href={`/blog/posts/${post._id}`} className={cx('PostCard')}>
      <div className={cx('img-container')}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={post.thumbnail!} alt={post.title} className={cx('img')} />
      </div>
      <div className={cx('content-container')}>
        <div className={cx('content')}>
          <div className={cx('title')}>{post.title}</div>
          <div className={cx('description')}>{post.content}</div>
        </div>
        <div className={cx('info')}>
          <div className={cx('date')}>{dateFommater(post.createdAt)}</div>
          <div className={cx('status-container')}>
            <span className={cx('status')}>
              <EyeIcon />
              {/* TODO: 추후 기능 추가 */}
              <span>10</span>
            </span>
            <button className={cx('status', 'favorite')}>
              <FavoriteIcon />
              <span>10</span>
            </button>
          </div>
        </div>
      </div>
      <div className={cx('tag-container')}>
        {post.tags?.map((tag) => (
          <Tag key={tag} name={tag} />
        ))}
      </div>
    </Link>
  );
};

export default PostCard;
