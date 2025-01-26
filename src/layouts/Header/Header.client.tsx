'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames/bind';
import { useAtom } from 'jotai';
import { useMutation, gql } from '@apollo/client';

import { Darkmode } from '@/constants/cookie.constant';
import { LogoIcon, LogoTitleIcon, GithubIcon, DarkmodeIcon, LightmodeIcon } from '@/assets';
import { useDarkmode } from '@/hooks/useDarkmode';
import LoginModal from '@/components/modals/LoginModal';
import { userAtom } from '@/atoms/user.atom';
import { LogoutMutation } from '@/types/apollo';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const navs = [{ name: 'Blog', path: '/blog' }];

interface HeaderProps {
  darkmodeCookie: Darkmode;
}

const Header: React.FC<HeaderProps> = ({ darkmodeCookie }) => {
  const pathname = usePathname();
  const [isDarkmode, changeDarkmode] = useDarkmode({ darkmodeCookie });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [user, setUser] = useAtom(userAtom);

  const [logoutMutation] = useMutation<LogoutMutation>(localMutation, {
    onCompleted: ({ logout }) => {
      if (logout._id) {
        setUser(null);
      }
    },
    fetchPolicy: 'no-cache',
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    logoutMutation();
  };

  return (
    <header className={cx('Header', isDarkmode && 'bottom-line')}>
      <div className={cx('inner')}>
        <div className={cx('main')}>
          <Link href="/" className={cx('vertical-center', 'icon')}>
            <LogoIcon />
            <LogoTitleIcon className={cx('logo-title')} />
          </Link>
          <nav className={cx('nav')}>
            {navs.map(({ name, path }) => (
              <Link href={path} aria-selected={pathname.startsWith(path)} className={cx('vertical-center')} key={path}>
                {name}
              </Link>
            ))}
          </nav>
        </div>
        <div className={cx('sub')}>
          {user ? (
            <button className={cx('login')} onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className={cx('login')} onClick={handleOpenModal}>
              Login
            </button>
          )}
          <div className={cx('division')} />
          <a href={process.env.NEXT_PUBLIC_CY_GITHUB_URL} className={cx('vertical-center', 'icon')}>
            <GithubIcon />
          </a>
          <div className={cx('division')} />
          <button onClick={changeDarkmode} className={cx('vertical-center', 'darkmode', 'icon')}>
            {isDarkmode ? <LightmodeIcon /> : <DarkmodeIcon />}
          </button>
        </div>
      </div>
      <LoginModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </header>
  );
};

const localMutation = gql`
  mutation Logout {
    logout {
      _id
    }
  }
`;

export default Header;
