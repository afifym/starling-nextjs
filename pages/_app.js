import '../styles/globals.css';
import Layout from '../components/Layout';
import theme from '../styles/theme';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { Provider } from 'react-redux';
import store from '../redux/store';

const GlobalStyles = createGlobalStyle`
    * {
      padding: 0;
      margin: 0;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      color:${({ theme }) => theme.colors.light1};
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
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
