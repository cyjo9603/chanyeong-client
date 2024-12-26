'use client';

import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useSetAtom } from 'jotai';
import classNames from 'classnames/bind';

import ModalContainer from '@/components/modals/ModalContainer';
import { LogoIcon, LogoTitleIcon } from '@/assets';
import { LoginMutation, LoginMutationVariables } from '@/types/apollo';
import { userAtom } from '@/atoms/user.atom';

import LoginForm, { LoginFormValues } from './LoginForm.client';

import styles from './LoginModal.module.scss';

const cx = classNames.bind(styles);

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const setUser = useSetAtom(userAtom);

  const [loginMutation] = useMutation<LoginMutation, LoginMutationVariables>(localMutation, {
    onCompleted: ({ login }) => {
      if (login.userId) {
        setUser(login);

        onClose();
        return;
      }
    },
    fetchPolicy: 'no-cache',
  });

  const handleSubmit = (values: LoginFormValues) => {
    loginMutation({ variables: values });
  };

  return (
    <ModalContainer isOpen={isOpen}>
      <div className={cx('LoginModal')}>
        <header className={cx('header')}>
          <LogoIcon />
          <LogoTitleIcon className={cx('logo-title')} />
        </header>
        <LoginForm onSubmit={handleSubmit} onClose={onClose} />
      </div>
    </ModalContainer>
  );
};

const localMutation = gql`
  mutation Login($userId: String!, $password: String!) {
    login(userId: $userId, password: $password) {
      _id
      role
      firstName
      lastName
      userId
    }
  }
`;

export default LoginModal;
