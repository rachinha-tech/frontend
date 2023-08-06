import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../Drawer/Sidebar";
import NavBar from "../NavBar";

export default function Layout({ children }) {
  return (
    <Flex display={"flex"} flexDirection={"column"} h={"100vh"}>
      <Flex>
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
