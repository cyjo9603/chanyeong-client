'use client';

import { useCookies } from 'react-cookie';

import { DARKMODE_COOKIE, Darkmode } from '@/constants/cookie.constant';

interface UseDarkmodeOptions {
  darkmodeCookie: Darkmode;
}

export const useDarkmode = ({ darkmodeCookie }: UseDarkmodeOptions) => {
  const [cookies, setCookies] = useCookies([DARKMODE_COOKIE]);

  const isDarkmode = (cookies[DARKMODE_COOKIE] || darkmodeCookie) === Darkmode.DARK;
  const darkmode = isDarkmode ? Darkmode.LIGHT : Darkmode.DARK;

  const changeDarkmode = () => {
    setCookies(DARKMODE_COOKIE, darkmode);
    document.documentElement.setAttribute('data-theme', darkmode);
  };

  return [isDarkmode, changeDarkmode] as const;
};
