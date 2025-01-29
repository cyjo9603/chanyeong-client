'use client';

import React, { useEffect } from 'react';
import { useHydrateAtoms } from 'jotai/utils';
import Cookies from 'js-cookie';

import { UserDto } from '@/types/apollo';
import { userAtom } from '@/atoms/user.atom';
import { A_TOKEN, R_TOKEN } from '@/constants/cookie.constant';

interface ClientInitializerProps {
  user?: UserDto | null;
  tokens?: { accessToken?: string; refreshToken?: string; maxAge?: number };
  children: React.ReactNode;
}

const ClientInitializer: React.FC<ClientInitializerProps> = ({ user = null, tokens, children }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useHydrateAtoms([[userAtom, user] as any]);

  useEffect(() => {
    const maxAge = new Date(Date.now() + (tokens?.maxAge || 1_209_600_000)); // 14d;

    if (tokens?.accessToken) {
      Cookies.set(A_TOKEN, tokens.accessToken, { secure: true, expires: maxAge });
    }
    if (tokens?.refreshToken) {
      Cookies.set(R_TOKEN, tokens.refreshToken, { secure: true, expires: maxAge });
    }
  }, [tokens]);

  return <>{children}</>;
};

export default ClientInitializer;
