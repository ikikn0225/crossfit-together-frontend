import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { AppProps } from 'next/dist/next-server/lib/router/router'

const client = new ApolloClient({ 
  uri: 'http://localhost:3000/graphql', 
  cache: new InMemoryCache() 
}) 

export default function App({ Component, pageProps }:AppProps) {
  return (
    <ApolloProvider client={client}> 
      <Component {...pageProps} />
    </ApolloProvider>
  )
}