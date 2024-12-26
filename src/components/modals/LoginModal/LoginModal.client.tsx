'use client';

import React from 'react';
import classNames from 'classnames/bind';

import ModalContainer from '@/components/modals/ModalContainer';
import Input from '@/components/commons/Input';
import Button, { ButtonType } from '@/components/commons/Button';
import { LogoIcon, LogoTitleIcon } from '@/assets';

import styles from './LoginModal.module.scss';

const cx = classNames.bind(styles);

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  return (
    <ModalContainer isOpen={isOpen}>
      <div className={cx('LoginModal')}>
        <header className={cx('header')}>
          <LogoIcon />
          <LogoTitleIcon className={cx('logo-title')} />
        </header>
        <form className={cx('form')}>
          <Input label="ID" className={cx('id')} />
          <Input label="Password" className={cx('pw')} />
        </form>
        <div className={cx('button-wrapper')}>
          <Button type={ButtonType.PRIMARY}>Login</Button>
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default LoginModal;
