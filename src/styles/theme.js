import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    // purple: '#7a21ff',
    // pink: '#f73eb9',
    // turquoise: '#4d8bec',
    blue: {
      900: "#2A4359"
    }
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
