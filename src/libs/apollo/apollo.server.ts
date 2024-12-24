import { registerApolloClient } from '@apollo/experimental-nextjs-app-support';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { headers as getNextHeaders } from 'next/headers';

export const generateApolloClient = async () => {
  const nextHeaders = await getNextHeaders();

  const link = createHttpLink({
    uri: `${process.env.NEXT_PUBLIC_APP_URL}/graphql`,
    headers: {
      cookie: nextHeaders.get('cookie') || '',
    },
    fetchOptions: { cache: 'no-store' },
  });

  return new ApolloClient({
    cache: new InMemoryCache({}),
    link,
  });
};

export const { getClient } = registerApolloClient(() => generateApolloClient());
