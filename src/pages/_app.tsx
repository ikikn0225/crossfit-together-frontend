
import { ApolloClient, InMemoryCache } from "@apollo/client";
import App from "next/app";
import { AppProps } from "next/dist/next-server/lib/router/router";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./api/apolloClient";
import styled from '@emotion/styled'
import Header from "../components/header";

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh; 
`

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Container>
        <Header />
        <Component {...pageProps} />
      </Container>
    </ApolloProvider>
  );
}

export default MyApp;