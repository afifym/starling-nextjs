import '../styles/globals.css';
import Layout from '../components/Layout';
import theme from '../styles/theme';
import { ThemeProvider, createGlobalStyle } from 'styled-components';

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

    body{
      background-color: ${({ theme }) => theme.colors.dark1};
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

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default MyApp;
