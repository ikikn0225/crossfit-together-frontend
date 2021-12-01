import React, { useEffect } from 'react';
import { LoggedOutRouter } from '../router/logged-out-router';
import { isLoggedInVar } from '../apollo';
import { useReactiveVar } from '@apollo/client';
import { LoggedInRouter } from '@/router/logged-in-router';
import { useDarkMode } from '@/hooks/useDarkMode';
import { dark, light, fontSizes, fontWeights, reactiveTheme } from "@/theme/theme";
import styled, { ThemeProvider } from 'styled-components';
import Toggle from './dark-mode-toggle';
import GlobalStyle from '@/theme/global-styles';
import Footer from './footer';

export const App = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [themeMode, toggleTheme] = useDarkMode();
  // const theme =
  //   themeMode === "light"
  //     ? { mode: light, fontSizes, fontWeights, reactiveTheme }
  //     : { mode: dark, fontSizes, fontWeights, reactiveTheme };
  const theme = { mode: dark, fontSizes, fontWeights, reactiveTheme };
console.log(theme);

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {/* <Toggle themeMode={themeMode} toggleTheme={toggleTheme} /> */}
        <CommonStyle>
          {isLoggedIn ? <LoggedInRouter themeMode={themeMode} /> : <LoggedOutRouter themeMode={themeMode} /> }
          {/* <Footer/> */}
        </CommonStyle>
      </ThemeProvider>
    </>
  )
}

const CommonStyle = styled.div`
  background-color: ${({ theme }) => theme.mode.mainBackground};
  color: ${({ theme }) => theme.mode.primaryText};
`;