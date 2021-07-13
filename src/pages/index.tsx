import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { GetServerSideProps } from 'next'
import { client } from './api/apolloClient'
import { LoggedOutRouter } from '../routers/logged-out-router'
import styled from '@emotion/styled'
import { css, Global, keyframes, jsx } from '@emotion/react'

const bodyFillColor = `black`;

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh; 
`

const DivStyle = styled.div`
  display: inline-block;
  // font-size: 24px;
  color:white;
  border-radius: 4px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
  // &:hover {
  //   color: white;
  // }
`

const Home = () => { 
  return ( 
    <ApolloProvider client={client}>
      <Container>
        <DivStyle>
          여기에 이미지
        </DivStyle>

      <Global
      styles={css`
            body {
              background: ${bodyFillColor};
              position: absolute;
              width: 100vw;
              height: 100vh; 
              margin: 0;
              padding: 0;
              text-align: center;
            }
          `}
        />        
        <Global
          styles={{
            'body.noScroll': {
                // Prevent scrolling; conditionally activate this
                // in subcomponents when necessary ...
                overflow: 'hidden',
            },
          }}
        />
        </Container>
    </ApolloProvider>
  ) 
}

export default Home