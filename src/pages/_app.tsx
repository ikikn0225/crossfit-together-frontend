
import { ApolloClient, InMemoryCache } from "@apollo/client";
import App from "next/app";
import { AppProps } from "next/dist/next-server/lib/router/router";
import React from "react";
import { ApolloProvider } from "react-apollo";

function MyApp ({ Component, pageProps }: AppProps) {
  return (
      <Component {...pageProps} />
  );
}

export default MyApp;