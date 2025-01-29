import React from 'react';
import { gql } from '@apollo/client';
import { cookies } from 'next/headers';

import { getClient } from '@/libs/apollo/apollo.server';
import { ServerRefreshMutation, ServerRefreshMutationVariables } from '@/types/apollo';
import { A_TOKEN, R_TOKEN } from '@/constants/cookie.constant';

import ClientInitializer from './Initializer.client';

interface InitializerProps {
  children: React.ReactNode;
}

const Initializer: React.FC<InitializerProps> = async ({ children }) => {
  try {
    const cookieStore = await cookies();

    const currnetAccessToken = cookieStore.get(A_TOKEN)?.value;
    const currentRefreshToken = cookieStore.get(R_TOKEN)?.value;

    if (!currnetAccessToken && !currentRefreshToken) {
      return <ClientInitializer>{children}</ClientInitializer>;
    }
    const client = await getClient();
    const { data } = await client.mutate<ServerRefreshMutation, ServerRefreshMutationVariables>({
      mutation: refreshMutation,
    });

    const { me, accessToken, refreshToken, maxAge } = data?._refresh || {};

    const tokens = { accessToken, refreshToken, maxAge };

    return (
      <ClientInitializer user={me} tokens={tokens}>
        {children}
      </ClientInitializer>
    );
  } catch {
    return <ClientInitializer>{children}</ClientInitializer>;
  }
};

const refreshMutation = gql`
  mutation ServerRefresh {
    _refresh {
      accessToken
      refreshToken
      maxAge
      me {
        _id
        role
        firstName
        lastName
        userId
      }
    }
  }
`;

export default Initializer;
