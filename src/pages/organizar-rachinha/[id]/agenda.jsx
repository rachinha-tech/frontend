import React, { useEffect, useState } from "react";
import {
  Box, Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Heading, SimpleGrid,
} from "@chakra-ui/react";
import Layout from "../../../components/Layout";
import { api } from "../../../services/api";
import { useRouter } from "next/router";

function AgendaRachinha() {
  const router = useRouter();
  const { id } = router.query;

  const [local, setLocal] = useState(null)

  const getAgendas = async () => {
    try {
      const { data } = await api.get(`/locals/${id}`)
      setLocal(data)
    } catch (error) { }
  };

  useEffect(() => {
    if (id) {
      getAgendas();
    }
  }, [id]);

  return (
    <Box mt="9">
      <Card w="full" variant="outline">
        <CardHeader>
          <Heading size="md">Horários</Heading>
        </CardHeader>

        <CardBody>
          <SimpleGrid columns={[2]}>
            {
              local?.schedule.map(horario =>
                <Checkbox borderColor="blue.500">{horario.hours_minutes}</Checkbox>
              )
            }
          </SimpleGrid>
        </CardBody>

        <CardFooter>
          <Button
            w="full"
            colorScheme="blue"
            type="submit"
          >
            Avançar
          </Button>
        </CardFooter>
      </Card>

    </Box>
  );
}

AgendaRachinha.layout = (page) => <Layout>{page}</Layout>;

export default AgendaRachinha;