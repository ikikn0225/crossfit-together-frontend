import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { LoggedOutRouter } from '../routers/logged-out-router'

export const Home = () => { 
  return ( 
        <LoggedOutRouter /> 
  ) 
}

export default Home