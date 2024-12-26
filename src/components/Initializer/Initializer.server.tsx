import React from 'react';
import { gql } from '@apollo/client';
import { cookies } from 'next/headers';

import { getClient } from '@/libs/apollo/apollo.server';
import { GetMeQuery } from '@/types/apollo';
import { A_TOKEN } from '@/constants/cookie.constant';

import ClientInitializer from './Initializer.client';

interface InitializerProps {
  children: React.ReactNode;
}

const Initializer: React.FC<InitializerProps> = async ({ children }) => {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get(A_TOKEN)?.value;

    if (!token) {
      return <ClientInitializer>{children}</ClientInitializer>;
    }
    const client = await getClient();
    const { data } = await client.query<GetMeQuery>({ query: localQuery });

    return <ClientInitializer user={data.me}>{children}</ClientInitializer>;
  } catch {
    return <ClientInitializer>{children}</ClientInitializer>;
  }
};

const localQuery = gql`
  query GetMe {
    me {
      _id
      role
      firstName
      lastName
      userId
    }
  }
`;

export default Initializer;
