'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCookies } from 'react-cookie';
import classNames from 'classnames/bind';

import { DARKMODE_COOKIE, Darkmode } from '@/constants/cookie.constant';
import { LogoIcon, LogoTitleIcon, GithubIcon, DarkmodeIcon, LightmodeIcon } from '@/assets';

import styles from './Header.module.scss';

const cx = classNames.bind(styles);

const navs = [{ name: 'Blog', path: '/blog' }];

interface HeaderProps {
  darkmodeCookie: Darkmode;
}

const Header: React.FC<HeaderProps> = ({ darkmodeCookie }) => {
  const pathname = usePathname();
  const [cookies, setCookies] = useCookies([DARKMODE_COOKIE]);

  const isDarkmode = (cookies[DARKMODE_COOKIE] || darkmodeCookie) === Darkmode.DARK;

  const handleDarkmodeClick = () => {
    const darkmode = isDarkmode ? Darkmode.LIGHT : Darkmode.DARK;

    setCookies(DARKMODE_COOKIE, darkmode);
    document.documentElement.setAttribute('data-theme', darkmode);
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
              <Link href={path} aria-selected={pathname === path} className={cx('vertical-center')} key={path}>
                {name}
              </Link>
            ))}
          </nav>
        </div>
        <div className={cx('sub')}>
          <a href={process.env.NEXT_PUBLIC_CY_GITHUB_URL} className={cx('vertical-center', 'icon')}>
            <GithubIcon />
          </a>
          <div className={cx('division')} />
          <button onClick={handleDarkmodeClick} className={cx('vertical-center', 'darkmode', 'icon')}>
            {isDarkmode ? <LightmodeIcon /> : <DarkmodeIcon />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
