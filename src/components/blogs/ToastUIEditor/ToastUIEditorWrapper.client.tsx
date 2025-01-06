'use client';

import React, { useRef } from 'react';
import { gql, useMutation } from '@apollo/client';
import dynamic from 'next/dynamic';
import classNames from 'classnames/bind';
import { EditorProps } from '@toast-ui/react-editor';
import { useFormContext } from 'react-hook-form';

import { useDarkmode } from '@/hooks/useDarkmode';
import { UploadImageMutation, UploadImageMutationVariables } from '@/types/apollo';

import styles from './ToastUIEditor.module.scss';

const cx = classNames.bind(styles);

const Editor = dynamic<EditorProps>(() => import('./ToastUIEditor.client'), { ssr: false });

interface ToastUIEditorWrapperProps {
  name: string;
  required?: boolean;
  onImageUpload?: (imageUrl: string) => void;
}

const ToastUIEditorWrapper: React.FC<ToastUIEditorWrapperProps> = ({ name, required, onImageUpload }) => {
  const [isDarkmode] = useDarkmode();
  const { register, setValue, getValues } = useFormContext();
  const [uploadImageMutation] = useMutation<UploadImageMutation, UploadImageMutationVariables>(localMutation);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const editorRef = useRef<any>(null);

  const defaultValue = getValues()?.[name];

  console.log(getValues());

  const handleImageAdd = async (blob: File, callback: (url: string, filename: string) => void) => {
    try {
      const { data } = await uploadImageMutation({
        variables: {
          fileData: blob,
        },
      });

      if (data?.uploadImage) {
        onImageUpload?.(data.uploadImage);
        callback(data.uploadImage, blob.name);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = () => {
    if (editorRef.current) {
      setValue(name, editorRef.current.getInstance().getMarkdown());
    }
  };

  register(name, { required });

  return (
    <div className={cx('ToastUIEditor')}>
      <Editor
        height="100%"
        initialValue={defaultValue || ' '}
        theme={isDarkmode ? 'dark' : 'light'}
        hooks={{ addImageBlobHook: handleImageAdd }}
        onChange={handleChange}
        ref={editorRef}
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
