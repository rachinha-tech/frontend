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
  useDisclosure,
} from "@chakra-ui/react";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContex";
import { InputPassword } from "../Forms/InputPassword";
import { Input } from "../Forms/Input";
import { GiPadlock } from "react-icons/gi";
import { BiUserCircle } from "react-icons/bi";
import { BsBoxArrowInRight } from "react-icons/bs";

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
