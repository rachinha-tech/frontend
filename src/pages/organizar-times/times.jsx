import { Badge, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Input, InputGroup, InputRightElement, Stack, StackDivider, Text, VStack } from "@chakra-ui/react";
import Layout from "../../components/Layout";
import { MdOutlineClose, MdOutlinePersonAdd, MdOutlineSettings, MdSettings } from "react-icons/md";
import { useState } from "react";
import { sortTeams } from "../../utils/sortitionTeams";
import { useRouter } from "next/router";
import { api } from "../../services/api";

function Times() {
  const [credentials, setCrendentials] = useState({})
  const [persons, setPersons] = useState([])
  const [sorted, setSorted] = useState([])

  const handleCrendentials = ({ target }) => {
    const { name, value } = target;

    setCrendentials({
      ...credentials,
      [name]: value
    })
  }

  const sortedTeams = async () => {
    try {
      const data = await api.post('/teams-draw', {

      })
    } catch (error) {

    }
  }

  const addPerson = () => {
    setPersons([...persons, credentials])

    setCrendentials({})
  }

  const delPerson = (indexPerson) => {
    const newPersons = persons.filter((_, index) => index !== indexPerson)

    setPersons([...newPersons])
  }

  const { query } = useRouter();

  const modalidade = JSON.parse(query.modalidade)

  if (sorted.length) {
    return (
      <Card w="full" variant="outline">
        <CardHeader>
          <Heading size='md'>Times</Heading>
        </CardHeader>

        <CardBody>
          {
            sorted.map((teams, index) =>
              <Flex flexDirection="column" gap="2" mb="10">
                <Text fontSize="18px" fontWeight="bold">Time {index + 1}</Text>
                <Stack divider={<StackDivider marginY="8px !important" />} spacing='4'>
                  {
                    teams.map((person, index) =>
                      <Flex key={index} alignItems="center" justifyContent="space-between">
                        <Heading size='xs' textTransform='uppercase'>
                          {person.name}
                        </Heading>
                      </Flex>
                    )
                  }
                </Stack>
              </Flex>
            )
          }
        </CardBody>

        <CardFooter>
          <Button w="full" colorScheme="red" onClick={() => setSorted([])}>
            Voltar
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <VStack mt="9" spacing="4">
      <Flex justifyContent="space-between" alignItems="center" w="full">
        <Badge variant="outline">{modalidade.name} - {modalidade.quantity_players} pessoas</Badge>
        <IconButton variant="ghost" icon={<MdOutlineSettings size="24px" />} />
      </Flex>
      <InputGroup size='md'>
        <Input
          placeholder='Pessoa'
          bgColor="white"
          name="name"
          onChange={handleCrendentials}
          value={credentials.name ?? ""}
        />
        <InputRightElement width='3.5rem'>
          <IconButton
            h='1.75rem'
            size='sm'
            onClick={addPerson}
            icon={<MdOutlinePersonAdd size="24px" />}
          />
        </InputRightElement>
      </InputGroup>

      <Card w="full" variant="outline">
        <CardHeader>
          <Heading size='md'>Jogadores</Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider marginY="5px !important" />} spacing='4'>
            {
              persons.map((person, index) =>
                <Flex key={index} alignItems="center" justifyContent="space-between">
                  <Heading size='xs' textTransform='uppercase'>
                    {person.name}
                  </Heading>
                  <IconButton size="sm" icon={<MdOutlineClose size="24px" />} onClick={() => delPerson(index)} />
                </Flex>
              )
            }
          </Stack>
        </CardBody>

        <CardFooter>
          <Button w="full" colorScheme="blue" onClick={() => setSorted(sortTeams(2, persons))}>
            Sortear times
          </Button>
        </CardFooter>
      </Card>
    </VStack>
  );
}

Times.layout = (page) => (
  <Layout>{page}</Layout>
);

export default Times;