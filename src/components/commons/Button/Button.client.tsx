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
  htmlType?: 'button' | 'submit';
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type = ButtonType.DEFAULT,
  disabled,
  htmlType,
  onClick,
  className,
  children,
}) => {
  return (
    <button onClick={onClick} className={cx('Button', type, className)} type={htmlType} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
