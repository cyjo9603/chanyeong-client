'use client';

import React from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import classNames from 'classnames/bind';

import { HookFormFieldCoreProps } from '../fields.hoc';

import styles from './RadioField.module.scss';

const cx = classNames.bind(styles);

interface RadioFieldProps extends HookFormFieldCoreProps {
  value: string;
  displayText?: string;
}

const RadioField: React.FC<RadioFieldProps> = ({ name, value, displayText }) => {
  const { register, setValue } = useFormContext();
  const fieldValue = useWatch({ name });

  const handleClick = () => {
    setValue(name, value);
  };

  return (
    <label className={cx('RadioField')} onClick={handleClick} htmlFor={name} data-checked={value === fieldValue}>
      <span>
        <input {...register(name)} type="radio" value={value} className={cx('input')} />
      </span>
      <span className={cx('text')}>{displayText || value}</span>
    </label>
  );
};

export default RadioField;
