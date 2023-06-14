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
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";
import Logo from "../../components/Logo";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContex";
import withModalLogin from "../Modal/Login";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiUserCircle } from "react-icons/bi";
import { BsDoorOpen } from "react-icons/bs";
import { MdLocalBar, MdOutlineCalendarMonth } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import ModalDonate from "../Modal/ModalDonate";

function NavBar({ onOpenLogin, onOpenDonate }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, isAuthenticated, signOut } = useContext(AuthContext);
  const router = useRouter();

  return (
    <>
      {/* <ModalDonate isOpen={isOpen} onClose={onClose} /> */}

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
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <Button size={"xs"} colorScheme="pink" onClick={onOpenDonate}>
            Donate
          </Button>
        </Flex>

        <Flex justify={{ base: "center", md: "start" }}>
          <Logo />
        </Flex>

        {
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            {isAuthenticated ? (
              <Menu>
                <MenuButton>
                  <Avatar size="sm" name={user?.name} />
                </MenuButton>
                <MenuList>
                  <Link href="/perfil" passHref>
                    <MenuItem gap={2}>
                      <BiUserCircle size={24} />
                      Perfil
                    </MenuItem>
                  </Link>
                  {user.level === "owner" && (
                    <>
                      <Link href="/local" passHref>
                        <MenuItem gap={2}>
                          <SlLocationPin size={20} />
                          Meu local
                        </MenuItem>
                      </Link>
                      {/* <Link href="/comodidades" passHref>
                        <MenuItem gap={2}>
                          <MdLocalBar size={20} />
                          Comodidades
                        </MenuItem>
                      </Link>
                      <Link href="/agenda" passHref>
                        <MenuItem gap={2}>
                          <MdOutlineCalendarMonth size={20} />
                          Agenda
                        </MenuItem>
                      </Link> */}
                    </>
                  )}
                  <MenuDivider />
                  <MenuItem
                    onClick={() => {
                      signOut();
                      router.push("/");
                    }}
                    gap={2}
                  >
                    <BsDoorOpen size={20} />
                    Sair
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Button
                as={"a"}
                fontSize={"sm"}
                fontWeight={400}
                variant={"link"}
                onClick={onOpenLogin}
              >
                Acessar
              </Button>
            )}
          </Stack>
        }
      </Flex>

      {/* <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse> */}
    </>
  );
}

// const MobileNav = () => {
//   return (
//     <Stack
//       bg={useColorModeValue("white", "gray.800")}
//       p={4}
//       display={{ md: "none" }}
//     >
//       {NAV_ITEMS.map((navItem) => (
//         <MobileNavItem key={navItem.label} {...navItem} />
//       ))}
//     </Stack>
//   );
// };

// const MobileNavItem = ({ label, children, href }) => {
//   const { isOpen, onToggle } = useDisclosure();

//   return (
//     <Stack spacing={4} onClick={children && onToggle}>
//       <Flex
//         py={2}
//         // as={Link}
//         // href={href ?? "#"}
//         justify={"space-between"}
//         align={"center"}
//         _hover={{
//           textDecoration: "none",
//         }}
//       >
//         <Text
//           fontWeight={600}
//           color={useColorModeValue("gray.600", "gray.200")}
//         >
//           {label}
//         </Text>
//         {children && (
//           <Icon
//             as={ChevronDownIcon}
//             transition={"all .25s ease-in-out"}
//             transform={isOpen ? "rotate(180deg)" : ""}
//             w={6}
//             h={6}
//           />
//         )}
//       </Flex>

//       <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
//         <Stack
//           mt={2}
//           pl={4}
//           borderLeft={1}
//           borderStyle={"solid"}
//           borderColor={useColorModeValue("gray.200", "gray.700")}
//           align={"start"}
//         >
//           {children &&
//             children.map((child) => (
//               <Link key={child.label} py={2} href={child.href}>
//                 {child.label}
//               </Link>
//             ))}
//         </Stack>
//       </Collapse>
//     </Stack>
//   );
// };

// const NAV_ITEMS = [
//   {
//     label: "Inspiration",
//     children: [
//       {
//         label: "Explore Design Work",
//         subLabel: "Trending Design to inspire you",
//         href: "#",
//       },
//       {
//         label: "New & Noteworthy",
//         subLabel: "Up-and-coming Designers",
//         href: "#",
//       },
//     ],
//   },
//   {
//     label: "Find Work",
//     children: [
//       {
//         label: "Job Board",
//         subLabel: "Find your dream design job",
//         href: "#",
//       },
//       {
//         label: "Freelance Projects",
//         subLabel: "An exclusive list for contract work",
//         href: "#",
//       },
//     ],
//   },
//   {
//     label: "Learn Design",
//     href: "#",
//   },
//   {
//     label: "Hire Designers",
//     href: "#",
//   },
// ];

export default withModalLogin(ModalDonate(NavBar));
