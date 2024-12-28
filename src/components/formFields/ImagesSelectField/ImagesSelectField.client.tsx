'use client';

import React from 'react';
import Image from 'next/image';
import classNames from 'classnames/bind';
import { useFormContext, useWatch } from 'react-hook-form';

import styles from './ImagesSelectField.module.scss';

const cx = classNames.bind(styles);

interface ImagesSelectFieldProps {
  name: string;
  images: string[];
  required?: boolean;
}

const ImagesSelectField: React.FC<ImagesSelectFieldProps> = ({ name, images, required }) => {
  const { register, setValue } = useFormContext();
  const value: string = useWatch({ name });

  register(name, { required });

  const handleClick = (imageUrl: string) => {
    setValue(name, value !== imageUrl ? imageUrl : undefined);
  };

  return (
    <div className={cx('ImagesSelectField')}>
      {images.map((image) => (
        <button
          key={image}
          className={cx('image', value === image && 'checked')}
          onClick={() => handleClick(image)}
          type="button"
        >
          <Image src={image} width={150} height={150} alt="thumbnail" />
        </button>
      ))}
    </div>
  );
};

export default ImagesSelectField;
