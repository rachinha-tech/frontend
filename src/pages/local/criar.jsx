import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import Layout from "../../components/Layout";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Input } from "../../components/Forms/Input";
import { AuthContext } from "../../contexts/AuthContex";

import * as yup from "yup";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { MdOutlineArrowBack, MdOutlineSave } from "react-icons/md";
import { api } from "../../services/api";
import { Select } from "../../components/Forms/Select";
import dayjs from "dayjs";

const LocalFormSchema = yup.object({
  modality_id: yup.number().required("Modalidade obrigatório"),
  name: yup.string().required("Nome do local obrigatório"),
  description: yup.string(),
  schedule: yup.array().of(
    yup.object({
      hours_minutes: yup.string()
    })
  ),
  value_of_hour: yup.string().required("Valor do local obrigatório"),
});

function Criar() {
  const [modalities, setModalities] = useState([]);
  const router = useRouter();

  const toast = useToast()

  const initialSchedule = {
    "hours_minutes": dayjs().format('HH:mm'),
  }

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(LocalFormSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "schedule",
  });

  const getModalities = async () => {
    try {
      const { data } = await api.get("/modalities");

      setModalities(data);
    } catch (error) {}
  };

  const handleLocalSubmit = async (dataFields) => {
    try {
      const { message } = await api.post("/locals", dataFields)

      toast({
        description: message,
        status: 'success',
      })
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

        {
            fields.map((field, index) =>
              <Box w="full" key={index}>
                  <FormControl gap={["6", "8"]}>
                    <FormLabel>Horário</FormLabel>
                    <Input type="time" {...register(`schedule[${index}].hours_minutes`)} />
                  </FormControl>

                <Flex justifyContent="start" w="full" gap={"2"}>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => remove(index)}
                  >
                    Remover
                  </Button>
                </Flex>

                <Box bg="gray.800">
                  <Divider my="2" />
                </Box>
              </Box>
            )
          }

          <Flex justifyContent="start" w="full" mb={"8"}>
            <Button colorScheme="teal" size={'sm'} onClick={() => append(initialSchedule)}>Adicionar Horário</Button>
          </Flex>

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
