import React from 'react';
import classNames from 'classnames/bind';

import { LogoIcon } from '@/assets';

import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

const Footer: React.FC = () => {
  return (
    <footer className={cx('Footer', true && 'top-line')}>
      <div className={cx('inner')}>
        <LogoIcon className={cx('icon')} />
        <span className={cx('copyright')}>Copyright © 2024 Chanyeong Cho. All rights reserved.</span>
      </div>
    </footer>
  );
};
export default Footer;
