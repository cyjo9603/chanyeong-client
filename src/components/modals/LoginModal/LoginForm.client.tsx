'use client';

import React from 'react';
import classNames from 'classnames/bind';

import ServiceForm from '@/components/forms/ServiceForm';
import InputField from '@/components/formFields/InputField';
import ConditionalField from '@/components/formFields/ConditionalField';
import Button, { ButtonType } from '@/components/commons/Button';

import styles from './LoginModal.module.scss';

const cx = classNames.bind(styles);

export interface LoginFormValues {
  userId: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, onClose }) => {
  return (
    <ServiceForm onSubmit={onSubmit} className={cx('LoginForm')}>
      <InputField label="ID" className={cx('id')} name="userId" required />
      <InputField label="Password" className={cx('pw')} type="password" name="password" required />
      <div className={cx('button-wrapper')}>
        <ConditionalField<[string, string]> targetFieldName={['userId', 'password']}>
          {([userId, password]) => (
            <Button type={ButtonType.PRIMARY} disabled={!userId || !password}>
              Login
            </Button>
          )}
        </ConditionalField>
        <Button onClick={onClose}>Close</Button>
      </div>
    </ServiceForm>
  );
};

export default LoginForm;
