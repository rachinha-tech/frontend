import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";

import Router from "next/router";
import NProgress from "nprogress";

NProgress.configure({ showSpinner: false });

import "nprogress/nprogress.css";
import "../styles/nprogress.css";

import { useEffect } from "react";
import { AuthProvider } from "../contexts/AuthContex";

function MyApp({ Component, pageProps }) {
  const CustomLayout = Component.layout || ((page) => page);

  const Components = () => CustomLayout(<Component {...pageProps} />);

  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();

    Router.events.on("routeChangeStart", handleRouteStart);
    Router.events.on("routeChangeComplete", handleRouteDone);
    Router.events.on("routeChangeError", handleRouteDone);

    return () => {
      Router.events.off("routeChangeStart", handleRouteStart);
      Router.events.off("routeChangeComplete", handleRouteDone);
      Router.events.off("routeChangeError", handleRouteDone);
    };
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Components />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
