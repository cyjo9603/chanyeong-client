'use client';

import React, { useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { gql, useQuery, useMutation } from '@apollo/client';
import classNames from 'classnames/bind';
import { pick } from 'lodash-es';

import { authHoc } from '@/hocs/auth/auth.hoc';
import PostWriteForm, { PostWriteFormValues } from '@/components/blogs/PostWriteForm';
import {
  WriteBlogPostMutation,
  WriteBlogPostMutationVariables,
  EditBlogPostMutation,
  EditBlogPostMutationVariables,
} from '@/types/apollo';
import { GetPostQuery, GetPostQueryVariables } from '@/types/apollo';
import { getPostQuery } from '@/queries/post.query';
import { MD_IMG_REGEX } from '@/constants/string.constant';

import styles from './page.module.scss';

const cx = classNames.bind(styles);

const BlogWritePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const postId = searchParams.get('postId');
  const isEditPage = !!postId;

  const { data } = useQuery<GetPostQuery, GetPostQueryVariables>(getPostQuery, {
    variables: { id: postId },
    skip: !postId,
  });

  const [writePostMutation] = useMutation<WriteBlogPostMutation, WriteBlogPostMutationVariables>(
    writePostMutationQuery,
    {
      onCompleted: ({ writePost }) => {
        if (writePost._id) {
          router.push('/blog');
        }
      },
    }
  );
  const [editPostMutation] = useMutation<EditBlogPostMutation, EditBlogPostMutationVariables>(editPostMutationQuery, {
    onCompleted: ({ editPost }) => {
      if (editPost._id) {
        router.push('/blog');
      }
    },
  });

  const handleSubmit = (values: PostWriteFormValues) => {
    if (isEditPage) {
      editPostMutation({ variables: { editPostDto: { ...values, _id: postId } } });
    } else {
      writePostMutation({ variables: { writePostDto: values } });
    }
  };

  const postImages = useMemo(() => {
    return data?.post.content.match(MD_IMG_REGEX)?.map((image) => image.replace(MD_IMG_REGEX, '$1'));
  }, [data]);

  return (
    <div className={cx('BlogWritePage')}>
      {(isEditPage ? data?.post : true) && (
        <PostWriteForm
          onSubmit={handleSubmit}
          defaultValues={
            data?.post
              ? (pick(data.post, ['title', 'category', 'thumbnail', 'content', 'tags']) as PostWriteFormValues)
              : undefined
          }
          defaultImages={postImages}
        />
      )}
    </div>
  );
};

const writePostMutationQuery = gql`
  mutation WriteBlogPost($writePostDto: WritePostDto!) {
    writePost(writePostDto: $writePostDto) {
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
`;

const editPostMutationQuery = gql`
  mutation EditBlogPost($editPostDto: EditPostDto!) {
    editPost(editPostDto: $editPostDto) {
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
`;

export default authHoc(BlogWritePage);
