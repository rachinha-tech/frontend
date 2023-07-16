import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContex";
import { InputPassword } from "../Forms/InputPassword";
import { Input } from "../Forms/Input";
import { GiPadlock } from "react-icons/gi";
import { BiUserCircle } from "react-icons/bi";
import { BsBoxArrowInRight } from "react-icons/bs";
import { useToastCustom } from "../../hooks/useToastCustom";

const signInFormSchema = yup.object().shape({
  login: yup.string().required("Login obrigatório"),
  password: yup.string().required("Senha obrigatório"),
});

function SignIn({ isOpen, onClose }) {
  const { signIn } = useContext(AuthContext);
  const {toast, toastWithError } = useToastCustom()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
  });

  const handleSignIn = async (data) => {
    try {
      const {message} = await signIn({
        login: data.login,
        password: data.password,
      });

      await onClose();
      toast({title: message, status: "success"})
    } catch (error) {
      toastWithError(error);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="full"
        closeOnOverlayClick={false}
        scrollBehavior="inside"
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <SimpleGrid
              columns={[1]}
              gap={9}
              as="form"
              onSubmit={handleSubmit(handleSignIn)}
            >
              <Input
                label="Login"
                {...register("login")}
                icon={<BiUserCircle size={22} />}
                size="sm"
                variant="flushed"
                error={errors.message}
              />

              <InputPassword
                label={"Senha"}
                {...register("password")}
                icon={<GiPadlock size={22} />}
                size="sm"
                variant="flushed"
                error={errors.message}
              />

              <Flex flexDirection="column" gap={2}>
                <Button
                  isLoading={isSubmitting}
                  size="sm"
                  colorScheme="green"
                  type="submit"
                  leftIcon={<BsBoxArrowInRight size={22} />}
                >
                  Acessar
                </Button>
              </Flex>
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

// eslint-disable-next-line react/display-name
const withModalSignIn = (Component) => (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <SignIn isOpen={isOpen} onClose={onClose} />
      <Component onOpenSignIn={onOpen} {...props} />
    </>
  );
};

export default withModalSignIn;
