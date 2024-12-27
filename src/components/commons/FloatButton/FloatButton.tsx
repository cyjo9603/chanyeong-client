import React from 'react';
import classNames from 'classnames/bind';

import styles from './FloatButton.module.scss';

const cx = classNames.bind(styles);

interface FloatButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children: React.ReactNode;
}

const FloatButton: React.FC<FloatButtonProps> = ({ onClick, className, children }) => {
  return (
    <button className={cx('FloatButton', className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default FloatButton;
