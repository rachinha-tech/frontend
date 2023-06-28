import {
  Button,
  Flex,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContex";
import { InputPassword } from "../Forms/InputPassword";
import { Input } from "../Forms/Input";
import { BsBoxArrowInRight } from "react-icons/bs";

const signUpFormSchema = yup.object().shape({
  name: yup.string().required("Nome obrigatório"),
  login: yup.string().required("Login obrigatório"),
  email: yup.string().required("E-mail obrigatório"),
  date_birth: yup.string().required("Data Nascimento obrigatório"),
  level: yup.string().required("Tipo obrigatório"),
  password: yup.string().required("Senha obrigatório"),
  password_confirmation: yup
    .string()
    .required("Confirmação de senha obrigatório"),
});

function SignUp({ isOpen, onClose }) {
  const { signUp } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signUpFormSchema),
  });

  const handleRegister = async (data) => {
    try {
      await signUp(data);

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
          <ModalHeader>Registrar-se</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <SimpleGrid
              columns={[1]}
              gap={9}
              as="form"
              onSubmit={handleSubmit(handleRegister)}
            >
              <Input
                label="Nome"
                {...register("name")}
                size="sm"
                variant="flushed"
                error={errors.message}
              />

              <Input
                label="E-mail"
                {...register("email")}
                size="sm"
                variant="flushed"
                error={errors.message}
              />

              <Input
                label="Data nascimento"
                {...register("date_birth")}
                size="sm"
                variant="flushed"
                error={errors.message}
              />

              <RadioGroup gap={4}>
                <FormLabel>Eu sou</FormLabel>
                <Stack direction="row">
                  <Radio value="client" {...register("level")}>
                    Jogador
                  </Radio>
                  <Radio value="owner" {...register("level")}>
                    Dono de local
                  </Radio>
                </Stack>
              </RadioGroup>

              <Input
                label="Login"
                {...register("login")}
                size="sm"
                variant="flushed"
                error={errors.message}
              />

              <InputPassword
                label={"Senha"}
                {...register("password")}
                size="sm"
                variant="flushed"
                error={errors.message}
              />

              <InputPassword
                label={"Confirmar Senha"}
                {...register("password_confirmation")}
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
                  Registrar
                </Button>
              </Flex>
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

const withModalSignUp = (Component) => (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <SignUp isOpen={isOpen} onClose={onClose} />
      <Component onOpenSignUp={onOpen} {...props} />
    </>
  );
};

export default withModalSignUp;
