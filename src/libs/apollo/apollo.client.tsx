'use client';

import React from 'react';
import { ApolloLink } from '@apollo/client';
import {
  ApolloNextAppProvider,
  ApolloClient,
  InMemoryCache,
  SSRMultipartLink,
} from '@apollo/experimental-nextjs-app-support';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

const isSSR = typeof window === 'undefined';

export const generateApolloClient = (cookie?: string) => () => {
  const link = createUploadLink({
    uri: `${process.env.NEXT_PUBLIC_APP_URL}/graphql`,
    headers: {
      cookie: cookie || '',
      'Apollo-Require-Preflight': 'true',
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
