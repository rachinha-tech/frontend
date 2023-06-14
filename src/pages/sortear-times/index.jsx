import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardBody,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { MdOutlineGroups2 } from "react-icons/md";
import Layout from "../../components/Layout";
import { api } from "../../services/api";

function OrganizarTimes() {
  const [modalities, setModalities] = useState([]);

  const getModalities = async () => {
    try {
      const { data } = await api.get("modalities");

      setModalities(data);
    } catch (error) {}
  };

  useEffect(() => {
    getModalities();
  }, []);

  return (
    <Box mt="9">
      <SimpleGrid columns={[2]} gap={4}>
        {modalities.map((modality) => (
          <Link
            href={`/sortear-times/${modality.id}/sortear`}
            key={modality.id}
          >
            <Card maxW="sm">
              <CardBody>
                <Image
                  src={modality.url_image}
                  objectFit="cover"
                  borderRadius="lg"
                  maxH="70px"
                  w="full"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="sm">{modality.name}</Heading>
                  <Flex gap="2" alignItems="center">
                    <MdOutlineGroups2 size="24px" />
                    <Text>{modality.quantity_players}</Text>
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

OrganizarTimes.layout = (page) => <Layout>{page}</Layout>;

export default OrganizarTimes;
