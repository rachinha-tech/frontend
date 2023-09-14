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
  useDisclosure,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { BiUserCircle } from "react-icons/bi";
import { BsDoorOpen } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineGroup, MdOutlineTimer } from "react-icons/md";
import { SlLocationPin } from "react-icons/sl";
import { AuthContext } from "../../contexts/AuthContex";
import withModalSignUp from "../Modal/ModalSiginUp";
import withModalSignIn from "../Modal/ModalSignIn";
import NavLink from "../NavLink";

function Sidebar({ onOpenSignIn, onOpenSignUp }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, isAuthenticated, signOut } = useContext(AuthContext);
  const router = useRouter();

  return (
    <Flex alignItems={"center"}>
      <IconButton
        onClick={onOpen}
        icon={<GiHamburgerMenu color="black" size={24} />}
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
            <VStack align={"flex-start"} spacing={4}>
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
