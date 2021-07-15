import { css, Global, keyframes, jsx } from '@emotion/react';
import React, { useEffect } from 'react';
import { LoggedOutRouter } from '../router/logged-out-router';
import styled from '@emotion/styled'
import { isLoggedInVar } from '../apollo';
import { useReactiveVar } from '@apollo/client';
import { LoggedInRouter } from '../router/logged-in-router';

// const fade = keyframes`
//   0%,100% { opacity: 0 }
//   50% { opacity: 1 }
// `

// const Container = styled.div`
// display: flex;
// justify-content: center;
// align-items: center;
// height: 100vh; 
// `

// const DivAnime = styled.div`
//   animation: ${fade} 5s; 
//   animation-fill-mode: forwards;
// `

export const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return isLoggedIn ? <LoggedInRouter/> : <LoggedOutRouter/>;

    // return (
    //   <>
    //     <Global
    //       styles={{
    //         body: {
    //           background: 'black',
    //         }
    //       }}
    //     />
    //     <Container>
    //       <DivAnime>
    //         <img src="./public/images/ikikn.jpg" alt="ikikn" />
    //       </DivAnime>
    //     </Container>
    //     </>
    // );
}