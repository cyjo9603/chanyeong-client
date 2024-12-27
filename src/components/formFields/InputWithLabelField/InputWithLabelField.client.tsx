'use client';

import React, { useRef, useState } from 'react';
import classNames from 'classnames/bind';

import { hookFormFieldHoc, HookFormFieldCoreProps } from '../fields.hoc';

import styles from './InputWithLabelField.module.scss';

const cx = classNames.bind(styles);

interface InputWithLabelFieldProps extends HookFormFieldCoreProps {
  label: string;
  type?: 'text' | 'password';
}

const InputWithLabelField: React.FC<InputWithLabelFieldProps> = ({ field, className, label, type = 'text' }) => {
  const inputWrapperRef = useRef<HTMLInputElement>(null);
  const [isFocus, setIsFocus] = useState(false);

  const inputElement = inputWrapperRef.current?.querySelector('[data-field-type="input"]') as HTMLInputElement;

  return (
    <div
      className={cx('InputWithLabelField', isFocus && 'focus', !!field?.value && 'has-value', className)}
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

export default hookFormFieldHoc(InputWithLabelField);
