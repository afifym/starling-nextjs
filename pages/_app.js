import Layout from "../components/Layout";

import {
  ThemeProvider as ChakraThemeProvider,
  CSSReset,
  extendTheme,
  ChakraProvider,
} from "@chakra-ui/react";

import { analytics, perf } from "../firebase/config";
import { useEffect } from "react";
import "../config/styles/styles.css";

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
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

export default MyApp;
