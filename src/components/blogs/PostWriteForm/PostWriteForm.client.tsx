'use client';

import React from 'react';
import classNames from 'classnames/bind';

import ServiceForm from '@/components/forms/ServiceForm';
import InputField from '@/components/formFields/InputField';
import RadioField, { RadioGroup } from '@/components/formFields/RadioField';

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
  onSubmit: (values: PostWriteFormValues) => void;
}

const PostWriteForm: React.FC<PostWriteFormProps> = ({ onSubmit }) => {
  return (
    <ServiceForm onSubmit={onSubmit} className={cx('PostWriteForm')} externalValues={{ category: PostCategory.Dev }}>
      <RadioGroup>
        <RadioField name="category" value={PostCategory.Dev} displayText="Development" defaultValue={'development'} />
        <RadioField name="category" value={PostCategory.Diary} displayText="Diary" />
      </RadioGroup>
      <InputField name="title" placeholder="제목" className={cx('title-field')} required />
    </ServiceForm>
  );
};

export default PostWriteForm;
