import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Text,
  Textarea,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Layout from "../../components/Layout";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Alert } from "../../components/Alert";
import { api } from "../../services/api";
import Link from "next/link";
import { BiTrash } from "react-icons/bi";
import { Input } from "../../components/Forms/Input";
import { Select } from "../../components/Forms/Select";
import { MdOutlinePinDrop, MdOutlineSave } from "react-icons/md";

import * as yup from "yup";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ModalMaps from "../../components/Modal/ModalMaps";

const LocalFormSchema = yup.object({
  modality_id: yup.number().required("Modalidade obrigatório"),
  name: yup.string().required("Nome do local obrigatório"),
  description: yup.string(),
  value_of_hour: yup.string().required("Valor do local obrigatório"),
});

function MyLocal() {
  const [local, setLocal] = useState({});
  const [schedule, setSchedule] = useState([]);
  const [selectedLocalDelete, setSelectedLocalDelete] = useState([]);
  const [editable, setEditable] = useState(true);
  const [modalities, setModalities] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const toast = useToast()

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(LocalFormSchema),
  });

  const dataAlert = {
    title: "Quer apagar o local?",
    description:
      "Tem certeza que deseja apagar? Essa ação não pode ser revetida!",
    labelButtonConfirmation: "Sim, apagar",
    labelButtonCancel: "Não",
  };

  const getLocal = async () => {
    try {
      const { data } = await api.get("/locals/my");

      setLocal(data);
      setSchedule(data.schedule);
      console.log(data.schedule);
      reset(data);
    } catch (error) {}
  };

  const getModalities = async () => {
    try {
      const { data } = await api.get("/modalities");

      setModalities(data);
    } catch (error) {}
  };

  const handleUpdateLocal = async (data) => {
    try {
      const { message } = await api.put(`/locals/${local.id}`, data);
      await getLocal();

      toast({
        description: message,
        status: 'success',
      })
      
      router.push("/");
    } catch (error) {}
  };

  const handleClickOpenAlert = async ({ id }) => {
    onOpen();
    setSelectedLocalDelete(id);
  };

  const handleClickDelete = async () => {
    try {
      const { message } = await api.delete(`/locals/${selectedLocalDelete}`);
      await getLocal();
      onClose();
      router.push("/");
    } catch (error) {}
  };

  // const handleClickMaps = () => {
  //   onOpen();
  // };

  useEffect(() => {
    getLocal();
    getModalities();
  }, []);

  return (
    <Card>
      <Alert
        isOpen={isOpen}
        onClose={onClose}
        onClick={handleClickDelete}
        data={dataAlert}
      />

      {/* <ModalMaps isOpen={isOpen} onClose={onClose} /> */}

      <CardHeader>
        <Flex justify={"space-between"} align={"center"}>
          <Flex gap={2} fontWeight={"bold"}>
            <IoMdInformationCircleOutline size={24} />
            Informações do Local
          </Flex>

          <Flex gap={2}>
            {!Object.keys(local).length && (
              <Link href={"/local/criar"}>
                <Button size={"xs"} colorScheme="blue">
                  Criar
                </Button>
              </Link>
            )}

            <Button
              size={"xs"}
              colorScheme={editable ? "orange" : "teal"}
              isDisabled={!editable}
              display={Object.keys(local).length ? "block" : "none"}
              onClick={() => setEditable(false)}
            >
              {editable ? "Editar" : "Editando"}
            </Button>
          </Flex>
        </Flex>
      </CardHeader>

      <CardBody as={"form"} onSubmit={handleSubmit(handleUpdateLocal)}>
        <Flex flexWrap={"wrap"} gap={4}>
          <Input
            label={"Nome"}
            isDisabled={editable}
            variant="flushed"
            {...register("name")}
          />
          <Input
            label={"Valor"}
            isDisabled={editable}
            variant="flushed"
            type={"number"}
            {...register("value_of_hour")}
          />
          <Select
            label={"Modalidade"}
            isDisabled={editable}
            {...register("modality_id")}
          >
            {modalities.map((mod) => (
              <option key={mod.id} value={mod.id}>
                {mod.name}
              </option>
            ))}
          </Select>
          {/* <Input label={"Comodidades"} isDisabled={true} variant="flushed" /> */}
          {/* <Flex align={'center'}>
            <Input
              label={"Latitude"}
              isDisabled={true}
              variant="flushed"
              type={"number"}
              {...register("latitude")}
            />
            <Input
              label={"Longitude"}
              isDisabled={true}
              variant="flushed"
              type={"number"}
              {...register("longitude")}
            />
            <Button
              type="submit"
              isLoading={isSubmitting}
              isDisabled={editable}
              colorScheme="teal"
              h={"full"}
              size={"xs"}
              onClick={handleClickMaps}
            >
              <MdOutlinePinDrop size={52}/>
            </Button>
          </Flex> */}
          <Textarea
            my={4}
            placeholder={"Descrição do local"}
            isDisabled={editable}
            variant="flushed"
            {...register("description")}
          />

          <Text w={"full"}>Agenda</Text>

          {schedule.map((el) => (
            <Badge key={el.id} colorScheme="teal" w={"full"}>{el.hours_minutes}</Badge>
          ))}
        </Flex>

        {!editable && (
          <Flex justify={"flex-end"}>
            <Button
              type="submit"
              isLoading={isSubmitting}
              colorScheme="green"
              leftIcon={<MdOutlineSave />}
            >
              Salvar
            </Button>
          </Flex>
        )}
      </CardBody>

      <CardFooter align={"center"} justify={"center"}>
        <Flex
          gap={1}
          color={"red"}
          textDecoration={"underline"}
          onClick={() => handleClickOpenAlert(local)}
        >
          <BiTrash size={20} />
          Excluir local
        </Flex>
      </CardFooter>
    </Card>
  );
}

MyLocal.layout = (page) => <Layout>{page}</Layout>;

export default MyLocal;
