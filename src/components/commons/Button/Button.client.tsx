'use client';

import React from 'react';
import classNames from 'classnames/bind';

import styles from './Button.module.scss';

const cx = classNames.bind(styles);

export enum ButtonType {
  PRIMARY = 'primary',
  DEFAULT = 'default',
}

interface ButtonProps {
  type?: ButtonType;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ type = ButtonType.DEFAULT, onClick, className, children }) => {
  return (
    <button onClick={onClick} className={cx('Button', type, className)}>
      {children}
    </button>
  );
};

export default Button;
