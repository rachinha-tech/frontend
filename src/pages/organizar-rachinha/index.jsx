import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardBody,
  Divider,
  Flex,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import {
  MdOutlineGroups2,
  MdOutlineSearch,
  MdOutlineSportsSoccer,
} from "react-icons/md";
import Layout from "../../components/Layout";
import { api } from "../../services/api";

function OrganizarRachinha() {
  const [locals, setLocals] = useState([]);
  const [credentials, setCrendentials] = useState({});

  const handleCrendentials = ({ target }) => {
    const { name, value } = target;

    setCrendentials({
      ...credentials,
      [name]: value,
    });
  };

  const getLocals = async () => {
    try {
      const { data } = await api.get("/locals");

      setLocals(data);
    } catch (error) {}
  };

  useEffect(() => {
    getLocals();
  }, []);

  return (
    <Box mt="9">
      <InputGroup size="md" mb="2">
        <Input
          placeholder="Local"
          bgColor="white"
          name="local"
          onChange={handleCrendentials}
          value={credentials.local ?? ""}
        />
        <InputRightElement width="3.5rem">
          <IconButton
            h="1.75rem"
            size="sm"
            icon={<MdOutlineSearch size="24px" />}
          />
        </InputRightElement>
      </InputGroup>
      <Box bgColor="gray" mb="2">
        <Divider />
      </Box>
      <SimpleGrid columns={[1]} gap={2}>
        {locals.map((local) => (
          <Link
            href={`/organizar-rachinha/${local.id}/agenda`}
            key={local.id}
          >
            <Card w="full">
              <CardBody>
                <Stack spacing="4">
                  <Box>
                    <Heading size="sm">{local.name}</Heading>
                    <Text>{local.description}</Text>
                  </Box>
                  <Flex gap="4" alignItems="center">
                    <Flex gap="1" alignItems="center">
                      <MdOutlineSportsSoccer />
                      <Text fontSize="sm">{local.modality.name}</Text>
                    </Flex>
                    <Flex gap="1" alignItems="center">
                      <MdOutlineGroups2 />
                      <Text fontSize="sm">
                        {local.modality.quantity_players}
                      </Text>
                    </Flex>
                  </Flex>
                </Stack>
              </CardBody>
            </Card>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
}

OrganizarRachinha.layout = (page) => <Layout>{page}</Layout>;

export default OrganizarRachinha;
