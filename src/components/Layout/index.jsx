import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../Sidebar";
import NavBar from "../NavBar";

export default function Layout({ children }) {
  return (
    <Flex display={"flex"} flexDirection={"column"} h={"100vh"}>
      <Flex padding={2}>
        <Sidebar />
        <NavBar />
      </Flex>

      <Box
        overflow={"scroll"}
        p={4}
        css={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          scrollbarWidth: "none",
        }}
      >
        {children}
      </Box>
    </Flex>
  );
}
