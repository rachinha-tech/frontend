import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  SimpleGrid,
  Stack,
  StackDivider,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import Layout from "../../../components/Layout";
import {
  MdOutlineClose,
  MdOutlinePersonAdd,
} from "react-icons/md";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { api } from "../../../services/api";
import TeamsSorted from "../../../components/Modal/TeamsSorted";

import * as yup from "yup";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const scheme = yup.object({
  players: yup.array().of(yup.string().transform(value => {
    if (value) {
      return value.name
    }

    return value
  })),
  quantity_players: yup.number(),
  quantity_teams: yup.number(),
});

function Times() {
  const [credentials, setCrendentials] = useState({});
  const [modalidade, setModalidade] = useState({});
  const [teams, setTeams] = useState([])

  const { isOpen: isOpenSorted, onOpen: onOpenSorted, onClose: onCloseSorted } = useDisclosure();

  const { register, watch, handleSubmit, control, formState: { isSubmitting, errors } } = useForm({
    resolver: yupResolver(scheme),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "players",
  });

  const handleCrendentials = ({ target }) => {
    const { name, value } = target;

    setCrendentials({
      ...credentials,
      [name]: value,
    });
  };

  const addPerson = () => {
    append(credentials)
    setCrendentials({});
  };

  const delPerson = (index) => {
    remove(index)
  };

  const router = useRouter();
  const { id } = router.query;

  const getModality = async () => {
    try {
      const { data } = await api.get(`modalities/${id}`)
      setModalidade(data)
    } catch (error) {

    }
  }

  const handleSubmitSorted = async (dataFilds) => {
    try {
      console.log(dataFilds);
      const { data } = await api.post("/teams-draw", dataFilds);
      await setTeams(data)
      onOpenSorted()
    } catch (error) { }
  }

  useEffect(() => {
    if (id) {
      getModality()
    }
  }, [id]);

  return (
    <VStack mt="9" spacing="4" as="form" onSubmit={handleSubmit(handleSubmitSorted)}>
      <TeamsSorted
        isOpen={isOpenSorted}
        onClose={onCloseSorted}
        teams={teams}
      />

      <Flex justifyContent="space-between" alignItems="center" w="full">
        <Badge variant="outline">
          {modalidade.name} - {modalidade.quantity_players} pessoas por time
        </Badge>
      </Flex>
      <InputGroup size="md">
        <Input
          placeholder="Pessoa"
          bgColor="white"
          name="name"
          onChange={handleCrendentials}
          value={credentials.name ?? ""}
        />
        <InputRightElement width="3.5rem">
          <IconButton
            h="1.75rem"
            size="sm"
            onClick={addPerson}
            colorScheme="blue"
            icon={<MdOutlinePersonAdd size="24px" />}
          />
        </InputRightElement>
      </InputGroup>

      <SimpleGrid columns={[2]} w='full' gap="2">
        <FormControl>
          <FormLabel mb="0">
            Qtd Times
          </FormLabel>
          <Select
            {...register('quantity_teams')}
            defaultChecked={[0]}
            bgColor="white"
          >
            {
              Array.from({ length: 99 }).map((_, index) =>
                <option key={index} value={index + 1}>{index + 1}</option>
              )
            }
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel mb="0">
            Qtd Jogadores
          </FormLabel>
          <Select
            {...register('quantity_players')}
            defaultChecked={[0]}
            bgColor="white"
          >
            {
              Array.from({ length: 99 }).map((_, index) =>
                <option key={index} value={index + 1}>{index + 1}</option>
              )
            }
          </Select>
        </FormControl>
      </SimpleGrid>

      <Card w="full" variant="outline">
        <CardHeader>
          <Heading size="md">Jogadores</Heading>
        </CardHeader>

        <CardBody>
          <Stack
            divider={<StackDivider marginY="5px !important" />}
            spacing="4"
          >
            {fields.map((person, index) => (
              <Flex
                key={index}
                alignItems="center"
                justifyContent="space-between"
              >
                <Heading size="xs" textTransform="uppercase">
                  {person.name}
                </Heading>
                <IconButton
                  size="sm"
                  colorScheme="red"
                  icon={<MdOutlineClose size="24px" />}
                  onClick={() => delPerson(index)}
                />
              </Flex>
            ))}
          </Stack>
        </CardBody>

        <CardFooter>
          <Button
            w="full"
            colorScheme="blue"
            type="submit"
            isLoading={isSubmitting}
          >
            Sortear times
          </Button>
        </CardFooter>
      </Card>
    </VStack>
  );
}

Times.layout = (page) => <Layout>{page}</Layout>;

export default Times;
