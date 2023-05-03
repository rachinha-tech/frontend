import React from "react";
import { Box, Button, Card, CardBody, CardFooter, Flex, Heading, Image, SimpleGrid, Stack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { MdOutlineGroups2, MdOutlineLocationOn, MdOutlineSearch } from "react-icons/md";
import Layout from "../../components/Layout";

const modalidades = [
  { id: 1, regra: '2x4', nome: 'Futsal', imagem: 'https://static.sportit.com.br/public/sportit/imagens/produtos/quadra-completa-futebol-de-salao-915.jpg' },
  { id: 2, regra: '2x5', nome: 'Futebol', imagem: 'https://multiurso.com.br/wp-content/uploads/2022/09/tamanho-campo-futebol-oficial-fifa-foto-1132x670.jpg' },
  { id: 3, regra: '2x1', nome: 'Tenis', imagem: 'https://www.ax3.com.br/imagens/pisos/quadras-tenis-01.jpg' },
]

function OrganizarRachinha() {
  return (
    <Box mt="9">
      <SimpleGrid columns={[2]} gap={4}>
        {
          modalidades.map(modalidade =>
            <Link
              href={{
                pathname: '/organizar-rachinha/times',
                query: {
                  modalidade: JSON.stringify(modalidade)
                }
              }}
              key={modalidade.id}
            >
              <Card maxW='sm'>
                <CardBody>
                  <Image
                    src={modalidade.imagem}
                    objectFit='cover'
                    borderRadius='lg'
                    maxH="70px"
                    w="full"
                  />
                  <Stack mt='6' spacing='3'>
                    <Heading size='md'>{modalidade.nome}</Heading>
                    <Flex flexDirection="column" alignItems="start">
                      <MdOutlineGroups2 size="24px" />
                      <Text>
                        {modalidade.regra}
                      </Text>
                    </Flex>
                  </Stack>
                </CardBody>
              </Card>
            </Link>
          )
        }
      </SimpleGrid>
    </Box>
  );
}

OrganizarRachinha.layout = (page) => (
  <Layout>{page}</Layout>
);

export default OrganizarRachinha;