'use client';

import React from 'react';
import { gql, useMutation } from '@apollo/client';
import dynamic from 'next/dynamic';
import classNames from 'classnames/bind';
import { EditorProps } from '@toast-ui/react-editor';

import { useDarkmode } from '@/hooks/useDarkmode';
import { UploadImageMutation, UploadImageMutationVariables } from '@/types/apollo';

import styles from './ToastUIEditor.module.scss';

const cx = classNames.bind(styles);

const Editor = dynamic<EditorProps>(() => import('./ToastUIEditor.client'), { ssr: false });

const ToastUIEditorWrapper = () => {
  const [isDarkmode] = useDarkmode();
  const [uploadImageMutation] = useMutation<UploadImageMutation, UploadImageMutationVariables>(localMutation);

  const handleImageAdd = async (blob: File, callback: (url: string, filename: string) => void) => {
    try {
      const { data } = await uploadImageMutation({
        variables: {
          fileData: blob,
        },
      });

      if (data?.uploadImage) {
        callback(data.uploadImage, blob.name);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={cx('ToastUIEditor')}>
      <Editor
        height="100%"
        previewStyle="vertical"
        initialValue=" "
        theme={isDarkmode ? 'dark' : 'light'}
        hooks={{ addImageBlobHook: handleImageAdd }}
      />
    </div>
  );
};

const localMutation = gql`
  mutation UploadImage($fileData: Upload!) {
    uploadImage(fileData: $fileData)
  }
`;

export default ToastUIEditorWrapper;
