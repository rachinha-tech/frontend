import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  SimpleGrid,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import Layout from "../../components/Layout";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Alert } from "../../components/Alert";

import { api } from "../../services/api";
import Link from "next/link";
import { BiTrash } from "react-icons/bi";

function MyLocal() {
  const [local, setLocal] = useState({});
  const [selectedLocalDelete, setSelectedLocalDelete] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const dataAlert = {
    title: "Quer apagar o local?",
    description:
      "Tem certeza que deseja apagar? Essa ação não pode ser revetida!",
    labelButtonConfirmation: "Sim, apagar",
    labelButtonCancel: "Não",
  };

  const getLocal = async () => {
    try {
      const { data } = await api.get("/locals/14");

      setLocal(data);
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
      console.log(message);
    } catch (error) {}
  };

  useEffect(() => {
    getLocal();
  }, []);

  return (
    <Card>
      <Alert
        isOpen={isOpen}
        onClose={onClose}
        onClick={handleClickDelete}
        data={dataAlert}
      />

      <CardHeader>
        <Flex justify={"space-between"} align={"center"}>
          <Flex gap={2} fontWeight={"bold"}>
            <IoMdInformationCircleOutline size={24} />
            Informações do Local
          </Flex>

          <Flex gap={2}>
            <Link href={"/local/criar"}>
              <Button
                size={"xs"}
                colorScheme="blue"
                isDisabled={Object.keys(local).length ? true : false}
              >
                Criar
              </Button>
            </Link>
            <Button size={"xs"} colorScheme="orange">
              Editar
            </Button>
          </Flex>
        </Flex>
      </CardHeader>

      <CardBody>
        <Flex flexWrap={"wrap"} gap={8}>
          <Box>
            <Text fontWeight={"bold"}>Nome</Text>
            {local.name}
          </Box>
          <Box>
            <Text fontWeight={"bold"}>Comodidades</Text>
            {local.name}
          </Box>
          <Box>
            <Text fontWeight={"bold"}>Modalidade</Text>
            {local.modality?.name}
          </Box>
          <Box>
            <Text fontWeight={"bold"}>Descrição do local</Text>
            {local.description}
          </Box>
        </Flex>

        <Flex
          mt={10}
          align={"center"}
          justify={"center"}
          gap={1}
          color={"red"}
          textDecoration={"underline"}
          onClick={() => handleClickOpenAlert(local)}
        >
          <BiTrash size={20} />
          Excluir local
        </Flex>
      </CardBody>
    </Card>
  );
}

MyLocal.layout = (page) => <Layout>{page}</Layout>;

export default MyLocal;
