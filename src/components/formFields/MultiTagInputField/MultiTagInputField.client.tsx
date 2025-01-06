'use client';

import React, { useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import classNames from 'classnames/bind';

import { MiniCloseIcon } from '@/assets';

import styles from './MultiTagInputField.module.scss';

const cx = classNames.bind(styles);

interface MultiTagInputFieldProps {
  name: string;
  required?: boolean;
  placeholder?: string;
}

const MultiTagInputField: React.FC<MultiTagInputFieldProps> = ({ name, required, placeholder }) => {
  const { register, setValue } = useFormContext();
  const [text, setText] = useState('');
  const tags: string[] = useWatch({ name });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const addTag = () => {
    if (text && !tags.includes(text)) {
      setValue(`${name}.[${tags.length}]`, text);
    }
    setText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const handleDeleteTag = (_tag: string) => {
    const updatedTags = tags.filter((tag) => tag !== _tag);
    setValue(name, updatedTags);
  };

  register(name, { value: tags || [], required });

  return (
    <div className={cx('MultiTagInputField')}>
      <span className={cx('tags')}>
        {tags?.map((tag) => (
          <span key={tag} className={cx('tag')}>
            <span className={cx('tag-text')}>{tag}</span>
            <button onClick={() => handleDeleteTag(tag)} className={cx('delete')}>
              <MiniCloseIcon />
            </button>
          </span>
        ))}
      </span>
      <span className={cx('input-wrapper')}>
        <span className={cx('hash')}>{'#'}</span>
        <input
          type="text"
          value={text}
          onChange={handleChange}
          className={cx('input')}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          onBlur={addTag}
        />
      </span>
    </div>
  );
};

export default MultiTagInputField;
