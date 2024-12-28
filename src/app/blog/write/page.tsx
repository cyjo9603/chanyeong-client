'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { gql, useMutation } from '@apollo/client';
import classNames from 'classnames/bind';

import { authHoc } from '@/hocs/auth/auth.hoc';
import PostWriteForm, { PostWriteFormValues } from '@/components/blogs/PostWriteForm';
import { WriteBlogPostMutation, WriteBlogPostMutationVariables } from '@/types/apollo';

import styles from './page.module.scss';

const cx = classNames.bind(styles);

const BlogWritePage = () => {
  const router = useRouter();

  const [writePostMutation] = useMutation<WriteBlogPostMutation, WriteBlogPostMutationVariables>(localMutation, {
    onCompleted: ({ writePost }) => {
      if (writePost._id) {
        router.push('/blog');
      }
    },
  });

  const handleSubmit = (values: PostWriteFormValues) => {
    writePostMutation({ variables: { writePostDto: values } });
  };

  return (
    <div className={cx('BlogWritePage')}>
      <PostWriteForm onSubmit={handleSubmit} />
    </div>
  );
};

const localMutation = gql`
  mutation WriteBlogPost($writePostDto: WritePostDto!) {
    writePost(writePostDto: $writePostDto) {
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
`;

export default authHoc(BlogWritePage);
