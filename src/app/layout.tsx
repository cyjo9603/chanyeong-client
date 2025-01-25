import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import classNames from 'classnames/bind';
import { Provider as JotaiProvider } from 'jotai';

import Header from '@/layouts/Header';
import Footer from '@/layouts/Footer';
import Initializer from '@/components/Initializer/Initializer.server';
import { Darkmode, DARKMODE_COOKIE } from '@/constants/cookie.constant';
import { ApolloNextProvider } from '@/libs/apollo/apollo.client';

import styles from './layout.module.scss';

import '@/styles/normalize.scss';
import '@/styles/global.scss';

export const metadata: Metadata = {
  title: 'CHANYEONG',
  description: '개발자 조찬영의 웹 서비스',
};

const cx = classNames.bind(styles);

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const darkmode = (cookieStore.get(DARKMODE_COOKIE)?.value || Darkmode.LIGHT) as Darkmode;

  return (
    <html lang="ko" data-theme={darkmode}>
      <head>
        <link rel="stylesheet" href="https://uicdn.toast.com/tui-color-picker/latest/tui-color-picker.min.css" />
        <link rel="stylesheet" href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square.css" />
      </head>
      <body>
        <ApolloNextProvider cookie={cookieStore.toString()}>
          <JotaiProvider>
            <Initializer>
              <div id="next-section" className={cx('next-root')}>
                <Header darkmodeCookie={darkmode} />
                <main className={cx('next-content')}>{children}</main>
                <Footer />
              </div>
            </Initializer>
          </JotaiProvider>
        </ApolloNextProvider>
        <div id="next-portal"></div>
      </body>
    </html>
  );
}
