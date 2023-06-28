import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  useColorModeValue,
  useDisclosure,
  Avatar,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  MenuDivider,
  HStack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import Logo from "../../components/Logo";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContex";
import withModalSignIn from "../Modal/ModalSignIn";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiUserCircle } from "react-icons/bi";
import { BsDoorOpen } from "react-icons/bs";
import { MdLocalBar, MdOutlineCalendarMonth } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import ModalDonate from "../Modal/ModalDonate";
import withModalSignUp from "../Modal/ModalSiginUp";
import Sidebar from "../Drawer/Sidebar";

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
