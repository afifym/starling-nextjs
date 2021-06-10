import Layout from "../components/Layout";
import theme from "../config/styles/theme";
import {
  ThemeProvider as StyledThemeProvider,
  createGlobalStyle,
} from "styled-components";
import {
  ThemeProvider as ChakraThemeProvider,
  CSSReset,
  extendTheme,
  ChakraProvider,
} from "@chakra-ui/react";

import { analytics, perf } from "../firebase/config";
import { useEffect } from "react";
import "../config/styles/styles.css";

const GlobalStyles = createGlobalStyle`
    img {
      width: 100%;
      display: block;
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
    initialColorMode: "dark",
  },
  styles: {
    global: {
      body: {
        bg: "gray.800",
        color: "black",
        fontFamily: "Montserrat, sans-serif",
        color: "white",
      },
      a: {
        color: "teal.500",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
});

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    analytics();
    perf();
  }, []);

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
