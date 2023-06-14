import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import Layout from "../../components/Layout";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Input } from "../../components/Forms/Input";
import { AuthContext } from "../../contexts/AuthContex";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MdOutlineArrowBack, MdOutlineSave } from "react-icons/md";
import { api } from "../../services/api";
import { Select } from "../../components/Forms/Select";

const ComodidadeFormSchema = yup.object({
  local_id: yup.number().required("Local obrigatório"),
  name: yup.string().required("Nome do comodidade obrigatório"),
});

function Criar() {
  const [modalities, setModalities] = useState([]);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(ComodidadeFormSchema),
  });

  const getModalities = async () => {
    try {
      const { data } = await api.get("/modalities");

      setModalities(data);
    } catch (error) {}
  };

  const handleLocalSubmit = (data) => {
    try {
      console.log(data);
    } catch (error) {}
  };

  useEffect(() => {
    getModalities();
  }, []);

  return (
    <Card>
      <CardHeader>
        <Flex fontWeight={"bold"} gap={2}>
          <IoMdInformationCircleOutline size={24} />
          Informações do Local
        </Flex>
      </CardHeader>

      <CardBody as={"form"} onSubmit={handleSubmit(handleLocalSubmit)}>
        <VStack mb={8}>
          <Select label={"Modalidade"} variant={"flushed"}>
            {modalities.map((mod) => (
              <option key={mod.id} value={mod.id} {...register("modality_id")}>
                {mod.name}
              </option>
            ))}
          </Select>
          <Input label={"Nome"} variant="flushed" {...register("name")} />
          <Input
            label={"Valor da Hora"}
            variant="flushed"
            type={"number"}
            {...register("value_of_hour")}
          />
          <Textarea
            placeholder={"Descrição do local"}
            variant="flushed"
            {...register("description")}
          />
        </VStack>

        <Flex justifyContent={"flex-end"} gap={4}>
          <Button
            type={"submit"}
            colorScheme="blue"
            leftIcon={<MdOutlineArrowBack />}
            onClick={() => router.push("/local")}
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

Criar.layout = (page) => <Layout>{page}</Layout>;

export default Criar;
