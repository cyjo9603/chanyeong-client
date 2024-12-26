'use client';

import React, { useRef, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Input.module.scss';

const cx = classNames.bind(styles);

interface InputProps {
  className?: string;
  label: string;
  type?: 'text' | 'password';
}

const Input: React.FC<InputProps> = ({ className, label, type = 'text' }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState('');

  return (
    <div
      className={cx('Input', isFocus && 'focus', !!value && 'has-value', className)}
      onClick={() => inputRef.current?.focus()}
    >
      <input
        type={type}
        className={cx('input')}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <label className={cx('label')}>{label}</label>
    </div>
  );
};

export default Input;
