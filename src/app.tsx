import React from 'react';
import './app.css';
import { Header } from './components/header'
import { Page } from './components/page'
import { CssBaseline } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useFlags } from './settings/flags-provider';
import styled from 'styled-components';

const Root = styled.div`
  display: flex;
  width: 100vw;
  & > *{
    flex: 1;
  }
`;

const PageWrapper = styled(Page)`
  height: 100vh;
`;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const App = (props: { children: React.ReactElement }) => {
  let { getFlags } = useFlags();
  
  return (
    <ThemeProvider theme={getFlags().theme === "dark" ? darkTheme :  lightTheme}>
      <Root className="App">
        <CssBaseline />
        <Header />
        <PageWrapper>
          <p>Hello, world!</p>
        </PageWrapper>
      </Root>
    </ThemeProvider>
  );
}

export default App;
