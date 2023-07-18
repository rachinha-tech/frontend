import { Button, Flex, useColorModeValue } from "@chakra-ui/react";
import Logo from "../../components/Logo";
import ModalDonate from "../Modal/ModalDonate";

function NavBar({ onOpenDonate }) {
  return (
    <>
      <Flex
        w="full"
        bg={useColorModeValue("#DFE9F2", "gray.800")}
        color={useColorModeValue("gray.600", "#DFE9F2")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
        justifyContent={"space-between"}
      >
        <Logo />

        <Flex align={"center"}>
          <Button size={"xs"} colorScheme="pink" onClick={onOpenDonate}>
            Donate
          </Button>
        </Flex>
      </Flex>
    </>
  );
}

export default ModalDonate(NavBar);
