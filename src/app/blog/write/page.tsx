'use client';

import React from 'react';
import classNames from 'classnames/bind';

import { authHoc } from '@/hocs/auth/auth.hoc';
import PostWriteForm from '@/components/blogs/PostWriteForm';

import styles from './page.module.scss';

const cx = classNames.bind(styles);

const BlogWritePage = () => {
  return (
    <div className={cx('BlogWritePage')}>
      <PostWriteForm onSubmit={() => {}} />
    </div>
  );
};

export default authHoc(BlogWritePage);
