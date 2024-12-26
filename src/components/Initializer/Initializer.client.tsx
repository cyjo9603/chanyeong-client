'use client';

import React from 'react';
import { useHydrateAtoms } from 'jotai/utils';

import { UserDto } from '@/types/apollo';
import { userAtom } from '@/atoms/user.atom';

interface ClientInitializerProps {
  user?: UserDto | null;
  children: React.ReactNode;
}

const ClientInitializer: React.FC<ClientInitializerProps> = ({ user = null, children }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useHydrateAtoms([[userAtom, user] as any]);

  return <>{children}</>;
};

export default ClientInitializer;
