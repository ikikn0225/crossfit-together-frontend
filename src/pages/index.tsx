import { ApolloClient, InMemoryCache, ApolloProvider, useReactiveVar } from '@apollo/client'
import { GetServerSideProps } from 'next'
import { client, isLoggedInVar } from './api/apolloClient'
import styled from '@emotion/styled'
import { css, Global, keyframes, jsx } from '@emotion/react'
import Image from "next/image";
import logo from "../images/ikikn.jpg"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/dist/client/router'
import Login from './login'

const bodyFillColor = `black`;

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh; 
`
const fadeout = keyframes`
from { opacity: 1; }
to { opacity: 0; }
`
const DivAnime = styled.div`
  animation: ${fadeout} 5s; 
  animation-fill-mode: forwards;
`

const Home = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      if(!isLoggedIn) {
        router.push('/login');
      }
    }, 4000);
  })
  return (
    <>
        <DivAnime>
          <Image src={logo} />
        </DivAnime>

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
    </>
  ) 
}

export default Home