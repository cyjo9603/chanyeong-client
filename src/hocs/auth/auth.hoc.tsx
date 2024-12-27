'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAtomValue } from 'jotai';

import { userAtom } from '@/atoms/user.atom';

export const authHoc =
  <Props extends object>(WrappedComponent: React.ComponentType<Props>) =>
  // eslint-disable-next-line react/display-name
  (props: Props) => {
    const user = useAtomValue(userAtom);
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.replace('/');
      }
    }, [user, router]);

    return user ? <WrappedComponent {...props} /> : null;
  };
