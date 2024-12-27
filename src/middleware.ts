import { NextRequest, NextResponse } from 'next/server';
import { gql } from '@apollo/client';

import { A_TOKEN, R_TOKEN } from '@/constants/cookie.constant';
import { getClient } from '@/libs/apollo/apollo.server';
import { ServerRefreshMutation } from '@/types/apollo';

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const accessToken = request.cookies.get(A_TOKEN);
  const refreshToken = request.cookies.get(R_TOKEN);

  const response = NextResponse.next();
  try {
    if (accessToken?.value && refreshToken?.value) {
      const apolloClient = await getClient();
      const { data } = await apolloClient.mutate<ServerRefreshMutation>({ mutation: refreshMutation });

      const { accessToken, refreshToken } = data?._refresh || {};

      if (accessToken && refreshToken) {
        response.cookies.set(A_TOKEN, accessToken);
        response.cookies.set(R_TOKEN, refreshToken);
      }
    }
  } finally {
    return response;
  }
}

const refreshMutation = gql`
  mutation ServerRefresh {
    _refresh {
      accessToken
      refreshToken
    }
  }
`;
