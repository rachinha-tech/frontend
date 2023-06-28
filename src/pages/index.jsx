import React from "react";
import Layout from "../components/Layout";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  HStack,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
  VStack,
} from "@chakra-ui/react";

import {
  MdCall,
  MdEmail,
  MdWhatsapp,
} from "react-icons/md";


function index() {
  return (
    <VStack w={"full"} spacing="4">
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
          Sobre a Aplicação
        </CardHeader>

        <CardBody>
          <Text>
            Somos uma plataforma dedicada a facilitar a organização de
            "amistosos" e tornar a experiência de encontrar jogos e montar times
            mais simples e divertida. Combinamos funcionalidades únicas e
            intuitivas para ajudar você a aproveitar ao máximo seus momentos
            esportivos.
          </Text>
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

      <Card bgColor={"blue.100"}>
        <CardHeader fontWeight={"bold"} fontSize={18} color={"blue.900"}>
          Oferecemos diferentes planos para atender às suas necessidades
        </CardHeader>

        <CardBody>
          <OrderedList>
            <ListItem>Plano Básico (Gratuito)</ListItem>
            <UnorderedList>
              <ListItem>Sorteio manual de times</ListItem>
              <ListItem>Temporizador para o rachinha</ListItem>
              <ListItem>Acesso à buscar de rachinhas</ListItem>
            </UnorderedList>

            <ListItem>Plano Premium</ListItem>
            <UnorderedList>
              <ListItem>Cadastrar meu local</ListItem>
              <ListItem>Controle de agenda</ListItem>
              <ListItem>Financeiro do meu local</ListItem>
            </UnorderedList>
          </OrderedList>
        </CardBody>
      </Card>

      <Card bgColor={"blue.100"}>
        <CardHeader fontWeight={"bold"} fontSize={18} color={"blue.900"}>
          Ficou com alguma dúvida? Nossa equipe de suporte está pronta para
          ajudar. Entre em contato conosco através dos seguintes canais
        </CardHeader>

        <CardBody w={"full"}>
          <HStack>
            <Button
              w={"full"}
              leftIcon={<MdCall />}
              as={"a"}
              target="_blank"
              href="(88) 8888-9999"
              colorScheme="blue"
            >
              Telefone
            </Button>
            <Button
              w={"full"}
              leftIcon={<MdWhatsapp />}
              as={"a"}
              target="_blank"
              href="https://api.whatsapp.com/send/?phone=5588998899&text&type=phone_number&app_absent=0"
              colorScheme="whatsapp"
            >
              WhatsApp
            </Button>
            <Button
              w={"full"}
              leftIcon={<MdEmail />}
              as={"a"}
              target="_blank"
              href="rachinha@teste.com"
              colorScheme="orange"
            >
              E-mail
            </Button>
          </HStack>
        </CardBody>
      </Card>
    </VStack>
  );
}

index.layout = (page) => <Layout>{page}</Layout>;

export default index;
