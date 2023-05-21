import { Box, Flex } from "@chakra-ui/react";
import NavBar from "../NavBar";

export default function Layout({ children }) {
  return (
    <Flex h="100%" flexDirection="column">
      <NavBar />
      <Box padding="2" mt={9}>
        {children}
      </Box>
    </Flex>
  );
}