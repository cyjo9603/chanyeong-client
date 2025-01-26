'use client';

import React, { useState } from 'react';
import classNames from 'classnames/bind';

import ServiceForm from '@/components/forms/ServiceForm';
import InputField from '@/components/formFields/InputField';
import RadioField, { RadioGroup } from '@/components/formFields/RadioField';
import ToastUIEditor from '@/components/blogs/ToastUIEditor';
import Button, { ButtonType } from '@/components/commons/Button';
import MultiTagInputField from '@/components/formFields/MultiTagInputField';
import ImagesSelectField from '@/components/formFields/ImagesSelectField';

import { PostCategory } from '@/types/apollo';

import styles from './PostWriteForm.module.scss';

const cx = classNames.bind(styles);

export interface PostWriteFormValues {
  title: string;
  category: PostCategory;
  thumbnail: string;
  content: string;
  tags: string[];
}

interface PostWriteFormProps {
  defaultValues?: PostWriteFormValues;
  defaultImages?: string[];
  onSubmit: (values: PostWriteFormValues) => void;
}

const PostWriteForm: React.FC<PostWriteFormProps> = ({ defaultValues, defaultImages, onSubmit }) => {
  const [uploadedImages, setUploadedImages] = useState<string[]>(defaultImages ?? []);

  const handleAddImage = (imageUrl: string) => {
    setUploadedImages((prev) => [...prev, imageUrl]);
  };

  return (
    <ServiceForm
      onSubmit={onSubmit}
      className={cx('PostWriteForm')}
      externalValues={{ category: PostCategory.Dev, ...defaultValues }}
    >
      <RadioGroup>
        <RadioField name="category" value={PostCategory.Dev} displayText="Development" defaultValue={'development'} />
        <RadioField name="category" value={PostCategory.Diary} displayText="Diary" />
      </RadioGroup>
      <InputField name="title" placeholder="제목" className={cx('title-field')} required />
      <ToastUIEditor name="content" required onImageUpload={handleAddImage} />
      <MultiTagInputField name="tags" placeholder="Tags" />
      <ImagesSelectField name="thumbnail" images={uploadedImages} />
      <Button type={ButtonType.PRIMARY} htmlType="submit" className={cx('submit')}>
        Save
      </Button>
    </ServiceForm>
  );
};

export default PostWriteForm;
