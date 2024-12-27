'use client';

import React from 'react';
import classNames from 'classnames/bind';

import { hookFormFieldHoc, HookFormFieldCoreProps } from '../fields.hoc';

import styles from './InputField.module.scss';

const cx = classNames.bind(styles);

interface InputFieldProps extends HookFormFieldCoreProps {
  type?: 'text' | 'password';
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({ field, placeholder, className, type }) => {
  return (
    <input {...field} type={type} className={cx(className)} placeholder={placeholder} value={field?.value || ''} />
  );
};

export default hookFormFieldHoc(InputField);
