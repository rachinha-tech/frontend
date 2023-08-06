import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";

import { AuthProvider } from "../contexts/AuthContex";

function MyApp({ Component, pageProps }) {
  const CustomLayout = Component.layout || ((page) => page);

  const Components = () => CustomLayout(<Component {...pageProps} />);

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Components />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
