import Layout from '../components/Layout';
import theme from '../config/styles/theme';
import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle,
} from 'styled-components';
import {
  ThemeProvider as ChakraThemeProvider,
  CSSReset,
  extendTheme,
  ChakraProvider,
} from '@chakra-ui/react';

const GlobalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600;700;800;900&display=swap');

    * {
      padding: 0;
      margin: 0;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color:${({ theme }) => theme.colors.light1};
      font-family: 'Montserrat', sans-serif;
    }


  button{
    cursor:pointer;
    outline:none;
    border:none;
  }

    img {
      width: 100%;
      display: block;
    }

    a {
      text-decoration: none;
    }

    li {
      list-style: none;
    }

    .debug {
      border: 1px solid red !important;
    }

    .debug > * {
      border: 1px solid blue !important;
    }
`;

const chakraTheme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.800',
        color: 'black',
      },
      a: {
        color: 'teal.500',
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider init theme={chakraTheme}>
      <CSSReset />
      <StyledThemeProvider theme={theme}>
        <GlobalStyles />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StyledThemeProvider>
    </ChakraProvider>
  );
}

export default MyApp;
