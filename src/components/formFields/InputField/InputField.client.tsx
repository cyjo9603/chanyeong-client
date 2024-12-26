'use client';

import React, { useRef, useState } from 'react';
import classNames from 'classnames/bind';

import { hookFormFieldHoc, HookFormFieldCoreProps } from '../fields.hoc';

import styles from './InputField.module.scss';

const cx = classNames.bind(styles);

interface InputProps extends HookFormFieldCoreProps {
  label: string;
  type?: 'text' | 'password';
}

const Input: React.FC<InputProps> = ({ field, className, label, type = 'text' }) => {
  const inputWrapperRef = useRef<HTMLInputElement>(null);
  const [isFocus, setIsFocus] = useState(false);

  const inputElement = inputWrapperRef.current?.querySelector('[data-field-type="input"]') as HTMLInputElement;

  return (
    <div
      className={cx('Input', isFocus && 'focus', !!field?.value && 'has-value', className)}
      onClick={() => inputElement?.focus()}
      ref={inputWrapperRef}
    >
      <input
        {...field}
        type={type}
        data-field-type="input"
        className={cx('input')}
        onFocus={() => setIsFocus(true)}
        onBlur={() => {
          setIsFocus(false);
          field?.onBlur();
        }}
        value={field?.value || ''}
      />
      <label className={cx('label')}>{label}</label>
    </div>
  );
};

export default hookFormFieldHoc(Input);
