'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames/bind';

import styles from './ModalContainer.module.scss';

const cx = classNames.bind(styles);

interface ModalContainerProps {
  isOpen?: boolean;
  children: React.ReactNode;
}

const ModalContainer: React.FC<ModalContainerProps> = ({ isOpen, children }) => {
  return isOpen
    ? createPortal(
        <div className={cx('ModalContainer')}>
          <div className={cx('modal')}>
            <section>{children}</section>
          </div>
        </div>,
        document.getElementById('next-portal')!
      )
    : null;
};

export default ModalContainer;
