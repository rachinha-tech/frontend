import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  VStack,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContex";
import Layout from "../../components/Layout";
import { Input } from "../../components/Forms/Input";
import { MdOutlineArrowBack, MdOutlineSave } from "react-icons/md";
import { CgUserList } from "react-icons/cg";
import { InputPassword } from "../../components/Forms/InputPassword";
import { useRouter } from "next/router";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const userFormSchema = yup.object({
  name: yup.string().required("Login obrigatório"),
  login: yup.string().required("Login obrigatório"),
  email: yup.string().required("Login obrigatório"),
  date_birth: yup.string().required("Login obrigatório"),
  password: yup
    .string()
    .required("Senha obrigatória")
    .min(8, "No mínimo 8 caracteres"),
  password_confirmation: yup
    .string()
    .required("Confirmação de senha obrigatória")
    .min(8, "No mínimo 8 caracteres"),
});

function Profile() {
  const { user, updateUser } = useContext(AuthContext);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(userFormSchema),
  });

  const handleProfileSubmit = (data) => {
    try {
      if (!user) return;

      return updateUser(user.id, data);
    } catch (error) {}
  };

  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user]);

  return (
    <Card>
      <CardHeader>
        <Flex fontWeight={"bold"} gap={2}>
          <CgUserList size={24} />
          Informações de usuário
        </Flex>
      </CardHeader>

      <CardBody as={"form"} onSubmit={handleSubmit(handleProfileSubmit)}>
        <VStack mb={8}>
          <Input label={"Nome"} variant="flushed" {...register("name")} />
          <Input label={"Usuário"} variant="flushed" {...register("login")} disabled />
          <Input label={"Email"} variant="flushed" {...register("email")} disabled/>
          <Input
            label={"Data de aniversário"}
            variant="flushed"
            type={"date"}
            {...register("date_birth")}
          />
          <InputPassword
            label={"Senha"}
            error={errors.message}
            {...register("password")}
            size="sm"
            variant="flushed"
          />
          <InputPassword
            label={"Confirmar senha"}
            error={errors.message}
            {...register("password_confirmation")}
            size="sm"
            variant="flushed"
          />
        </VStack>

        <Flex justifyContent={"flex-end"} gap={4}>
          <Button
            type={"submit"}
            colorScheme="blue"
            leftIcon={<MdOutlineArrowBack />}
            onClick={() => router.push("/")}
          >
            Voltar
          </Button>
          <Button
            type={"submit"}
            isLoading={isSubmitting}
            colorScheme="green"
            leftIcon={<MdOutlineSave />}
          >
            Salvar
          </Button>
        </Flex>
      </CardBody>
    </Card>
  );
}

Profile.layout = (page) => <Layout>{page}</Layout>;

export default Profile;
