import {
  Card,
  CardBody,
  CardHeader,
  ListItem,
  Text,
  UnorderedList,
  VStack,
  Flex,
} from "@chakra-ui/react";
import React from "react";

import Layout from "../components/Layout";

function index() {
  return (
    <VStack w={"full"} spacing="4">
      <Card bgColor={"blue.100"}>
        <CardHeader fontWeight={"bold"} fontSize={18} color={"blue.900"}>
          Sobre a Aplicação
        </CardHeader>

        <CardBody>
          <Text>
            Somos uma plataforma dedicada a facilitar a organização de
            &quot;amistosos&quot; e tornar a experiência de encontrar jogos e
            montar times mais simples e divertida. Combinamos funcionalidades
            únicas e intuitivas para ajudar você a aproveitar ao máximo seus
            momentos esportivos.
          </Text>
        </CardBody>
      </Card>

      <Card bgColor={"blue.100"}>
        <CardHeader fontWeight={"bold"} fontSize={18} color={"blue.900"}>
          Beneficios do app
        </CardHeader>

        <CardBody>
          <UnorderedList>
            <ListItem>
              Encontre e participe de jogos amistosos com equipes da sua região
            </ListItem>
            <ListItem>
              Organize seu próprio rachinha e convide seus amigos
            </ListItem>
            <ListItem>
              Simplifique o sorteio de times com a nossa funcionalidade
              exclusiva de sorteio automático
            </ListItem>
            <ListItem>
              Gerencie seu tempo de jogo com um temporizador integrado
            </ListItem>
          </UnorderedList>
        </CardBody>
      </Card>

      <Card bgColor={"blue.100"}>
        <CardHeader fontWeight={"bold"} fontSize={18} color={"blue.900"}>
          Quem Somos
        </CardHeader>

        <CardBody>
          <Text>
            Nossa equipe é formada por entusiastas do esporte e tecnologia,
            apaixonados por criar soluções inovadoras para o mundo esportivo.
            Estamos comprometidos em oferecer a melhor experiência possível para
            você e sua equipe, garantindo que cada partida seja memorável.
          </Text>
        </CardBody>
      </Card>

      <Flex as={"footer"} justify={"center"} padding={2}>
        <Text fontSize={"xs"} fontWeight={"semibold"} color={"blue.800"}>
          &copy; Desenvolvido por Rachinha Tech | 2023
        </Text>
      </Flex>
    </VStack>
  );
}

index.layout = (page) => <Layout>{page}</Layout>;

export default index;
