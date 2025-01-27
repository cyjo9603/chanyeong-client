'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames/bind';
import { useAtom } from 'jotai';
import { useMutation, gql } from '@apollo/client';
import { throttle } from 'lodash-es';

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

const HEADER_HEIGHT = 48;

const HEADER_HIDDEN_ACTION_PATHS = ['/blog/posts'];

const Header: React.FC<HeaderProps> = ({ darkmodeCookie }) => {
  const pathname = usePathname();
  const [isDarkmode, changeDarkmode] = useDarkmode({ darkmodeCookie });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isVisibleHeader, setIsVisibleHeader] = useState(true);

  const [user, setUser] = useAtom(userAtom);

  const headerRef = useRef<HTMLHeadElement>(null);

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

  useEffect(() => {
    if (HEADER_HIDDEN_ACTION_PATHS.every((path) => !pathname.startsWith(path))) {
      return;
    }
    const clickEventHandler = (e: MouseEvent) => {
      if (headerRef.current?.contains(e.target as Node)) {
        return;
      }

      const scrollTop = document.documentElement.scrollTop;

      setIsVisibleHeader((prev) => {
        if (scrollTop < HEADER_HEIGHT && prev) {
          return prev;
        }
        return !prev;
      });
    };
    const scrollHandler = throttle(() => {
      const scrollTop = document.documentElement.scrollTop;

      if (scrollTop < HEADER_HEIGHT) {
        setIsVisibleHeader(true);
      }
    }, 200);

    document.addEventListener('click', clickEventHandler, { capture: true });
    document.addEventListener('scroll', scrollHandler);

    return () => {
      document.removeEventListener('click', clickEventHandler, { capture: true });
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [pathname]);

  return (
    <header className={cx('Header', isDarkmode && 'bottom-line', !isVisibleHeader && 'visible')} ref={headerRef}>
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
          <a
            href={process.env.NEXT_PUBLIC_CY_GITHUB_URL}
            className={cx('vertical-center', 'icon')}
            target="_blank"
            rel="noreferrer"
          >
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
