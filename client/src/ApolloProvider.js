import React from 'react';
import App from './App';
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from '@apollo/client';
const link = createHttpLink({
  uri: 'http://localhost:8000',
});
const cache = new InMemoryCache();
const client = new ApolloClient({
  link,
  cache,
});
export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
