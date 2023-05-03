import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    // purple: '#7a21ff',
    // pink: '#f73eb9',
    // turquoise: '#4d8bec',
  },
  components: {
    Alert: {
      baseStyle: {
        container: {
          rounded: "md",
        },
      },
    },
  },
  styles: {
    global: () => ({
      body: {
        bg: "#DFE9F2",
      },
    }),
  },
});
