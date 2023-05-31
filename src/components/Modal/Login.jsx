import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContex";

const loginFormSchema = yup.object({
  login: yup.string().required("Login obrigatório"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(8, "No mínimo 8 caracteres"),
});

function Login({ isOpen, onClose }) {
  const { signIn } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginFormSchema),
  });

  const handleLogin = async (data) => {
    try {
      await signIn({
        login: data.login,
        password: data.password,
      });

      onClose();
    } catch (error) {
      console.log(error);
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
          <ModalHeader>Acessar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid
              columns={[1]}
              gap={9}
              as="form"
              onSubmit={handleSubmit(handleLogin)}
            >
              <Input
                {...register("login")}
                size="sm"
                variant="flushed"
                placeholder="Login"
              />
              <Input
                {...register("password")}
                size="sm"
                variant="flushed"
                type="password"
                placeholder="Senha"
              />

              <Flex flexDirection="column" gap={2}>
                <Button
                  isLoading={isSubmitting}
                  size="sm"
                  colorScheme="green"
                  type="submit"
                >
                  Acessar
                </Button>
                <Button size="sm" colorScheme="blue" type="submit">
                  Realizar Cadastro
                </Button>
              </Flex>
            </SimpleGrid>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

const withModalLogin = (Component) => (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Login isOpen={isOpen} onClose={onClose} />
      <Component onOpenLogin={onOpen} {...props} />
    </>
  );
};

export default withModalLogin;
