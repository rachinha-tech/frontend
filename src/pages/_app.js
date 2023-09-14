import { ChakraProvider } from "@chakra-ui/react";

import { AuthProvider } from "../contexts/AuthContex";
import { theme } from "../styles/theme";

export default function MyApp({ Component, pageProps }) {
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
