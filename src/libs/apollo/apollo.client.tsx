'use client';

import React from 'react';
import { ApolloLink, createHttpLink } from '@apollo/client';
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support';

const isSSR = typeof window === 'undefined';

export const generateApolloClient = (cookie?: string) => () => {
  const link = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_APP_URL}/graphql`,
    headers: {
      cookie: cookie || '',
    },
    fetchOptions: { cache: 'no-store' },
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    link: isSSR ? ApolloLink.from([new SSRMultipartLink({ stripDefer: true }), link]) : link,
  });
};

export const ApolloNextProvider = ({ cookie, children }: React.PropsWithChildren & { cookie?: string }) => {
  return <ApolloNextAppProvider makeClient={generateApolloClient(cookie)}>{children}</ApolloNextAppProvider>;
};
