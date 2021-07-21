import React, { useEffect } from 'react';
import { LoggedOutRouter } from '../router/logged-out-router';
import { isLoggedInVar } from '../apollo';
import { useReactiveVar } from '@apollo/client';
import Footer from './footer';
import { LoggedInRouter } from '@/router/logged-in-router';
import { useDarkMode } from '@/hooks/useDarkMode';
import { dark, light, fontSizes, fontWeights } from "@/theme/theme";
import styled, { ThemeProvider } from 'styled-components';
import Toggle from './dark-mode-toggle';
import GlobalStyle from '@/theme/global-styles';


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
  const [themeMode, toggleTheme] = useDarkMode();
  const theme =
    themeMode === "light"
      ? { mode: light, fontSizes, fontWeights }
      : { mode: dark, fontSizes, fontWeights };

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Toggle themeMode={themeMode} toggleTheme={toggleTheme} />
        <CommonStyle>
          {isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter themeMode={themeMode} /> }
          <Footer/>
        </CommonStyle>
      </ThemeProvider>
    </>
  )

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

const CommonStyle = styled.div`
  background-color: ${({ theme }) => theme.mode.mainBackground};
  color: ${({ theme }) => theme.mode.primaryText};
`;