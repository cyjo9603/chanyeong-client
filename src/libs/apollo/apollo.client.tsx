'use client';

import React from 'react';
import { ApolloLink, concat, fromPromise, gql } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

import { ClientRefreshMutation } from '@/types/apollo';

let apolloClient: ApolloClient<unknown>;

const isSSR = typeof window === 'undefined';

const EXPIRES_MESSAGE = 'jwt expired';

const localQuery = gql`
  mutation ClientRefresh {
    refresh {
      _id
    }
  }
`;

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (!apolloClient) {
    return;
  }

  const isExpired = graphQLErrors?.some((error) => error.message === EXPIRES_MESSAGE);

  if (isExpired) {
    const refresh = fromPromise(
      apolloClient.mutate<ClientRefreshMutation>({ mutation: localQuery }).then(({ data }) => data?.refresh._id)
    );

    return refresh.flatMap(() => forward(operation));
  }
});

export const generateApolloClient = (cookie?: string) => () => {
  if (!apolloClient) {
    const link = createUploadLink({
      uri: `${process.env.NEXT_PUBLIC_APP_URL}/graphql`,
      headers: {
        cookie: cookie || '',
        'Apollo-Require-Preflight': 'true',
      },
      fetchOptions: { cache: 'no-store' },
    });

    apolloClient = new ApolloClient({
      cache: new InMemoryCache(),
      link: isSSR ? ApolloLink.from([new SSRMultipartLink({ stripDefer: true }), link]) : concat(errorLink, link),
    });
  }

  return apolloClient;
};

export const ApolloNextProvider = ({ cookie, children }: React.PropsWithChildren & { cookie?: string }) => {
  return <ApolloNextAppProvider makeClient={generateApolloClient(cookie)}>{children}</ApolloNextAppProvider>;
};
