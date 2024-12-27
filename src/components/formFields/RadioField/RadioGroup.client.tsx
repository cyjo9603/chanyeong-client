'use client';

import React from 'react';
import classNames from 'classnames/bind';

import styles from './RadioField.module.scss';

const cx = classNames.bind(styles);

interface RadioGroupProps {
  children: React.ReactNode;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ children }) => {
  return <div className={cx('RadioGroup')}>{children}</div>;
};

export default RadioGroup;
