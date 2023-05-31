import { Box, Flex } from "@chakra-ui/react";
import NavBar from "../NavBar";

export default function Layout({ children }) {
  return (
    <Flex h="100%" flexDirection="column">
      <Flex position="fixed" zIndex="1" w="full">
        <NavBar />
      </Flex>
      <Box padding="2" mt="16">
        {children}
      </Box>
    </Flex>
  );
}
