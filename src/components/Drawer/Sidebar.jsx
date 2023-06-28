import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Stack,
  VStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { BiUserCircle } from "react-icons/bi";
import { BsDoorOpen } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import withModalSignIn from "../Modal/ModalSignIn";
import withModalSignUp from "../Modal/ModalSiginUp";
import { AuthContext } from "../../contexts/AuthContex";
import { useContext } from "react";
import {
  MdOutlineBuild,
  MdOutlineGroup,
  MdOutlinePersonPinCircle,
  MdOutlineTimer,
  MdOutlineSearch
} from "react-icons/md";
import NavLink from "../NavLink";
import { SlLocationPin } from "react-icons/sl";

function Sidebar({ onOpenSignIn, onOpenSignUp }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, isAuthenticated, signOut } = useContext(AuthContext);
  const router = useRouter();

  return (
    <Flex
      minH={"60px"}
      py={{ base: 2 }}
      bg={useColorModeValue("#DFE9F2", "gray.800")}
      color={useColorModeValue("gray.600", "#DFE9F2")}
    >
      <IconButton
        colorScheme="transparent"
        onClick={onOpen}
        icon={<GiHamburgerMenu color="black" size={22} />}
      />

      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerHeader borderBottomWidth="1px">
            {
              <Stack
                flex={{ base: 1, md: 0 }}
                justify={"center"}
                direction={"row"}
                spacing={6}
              >
                {isAuthenticated ? (
                  <VStack justify={"flex-start"}>
                    <Avatar size="lg" name={user?.name} />
                    <>Olá, {user?.name}</>
                  </VStack>
                ) : (
                  <HStack align={"center"}>
                    <Button
                      fontSize={"xs"}
                      size={"xs"}
                      p={3}
                      fontWeight={400}
                      colorScheme="blue"
                      variant={"outline"}
                      onClick={onOpenSignIn}
                    >
                      Acessar
                    </Button>

                    <Button
                      fontSize={"xs"}
                      size={"xs"}
                      p={3}
                      fontWeight={400}
                      colorScheme="blue"
                      onClick={onOpenSignUp}
                    >
                      Registrar-se
                    </Button>
                  </HStack>
                )}
              </Stack>
            }
          </DrawerHeader>

          <DrawerBody>
            <VStack align={"flex-start"}>
              {isAuthenticated && (
                <>
                  <NavLink
                    title="Perfil"
                    icon={<BiUserCircle size={24} />}
                    href="/perfil"
                    disabled={isAuthenticated ? false : true}
                  />

                  {user.level === "owner" && (
                    <>
                      <NavLink
                        title="Meu local"
                        href="/local"
                        passHref
                        icon={<SlLocationPin size={24} />}
                        disabled={isAuthenticated ? false : true}
                      />
                    </>
                  )}
                </>
              )}

              <NavLink
                title="Sortear de Times"
                icon={<MdOutlineGroup size={24} />}
                href="/sortear-times"
              />

              <NavLink
                title="Temporizador"
                icon={<MdOutlineTimer size={24} />}
                href="/temporizador"
              />

              <NavLink
                title="Organizar Rachinha"
                icon={<MdOutlineBuild size={24} />}
                href="/organizar-rachinha"
                disabled={isAuthenticated ? false : true}
              />

              <NavLink
                title="Buscar Rachinha"
                icon={<MdOutlineSearch size={24} />}
                href="/organizar-rachinha"
                disabled={isAuthenticated ? false : true}
              />

              <NavLink
                title="Buscar Jogador"
                icon={<MdOutlinePersonPinCircle size={24} />}
                href="/organizar-rachinha"
                disabled={isAuthenticated ? false : true}
              />
            </VStack>
          </DrawerBody>

          {isAuthenticated && (
            <Button
              onClick={() => {
                signOut();
                router.push("/");
              }}
              rounded={0}
              leftIcon={<BsDoorOpen size={20} />}
              colorScheme="red"
            >
              Sair
            </Button>
          )}
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default withModalSignIn(withModalSignUp(Sidebar));
