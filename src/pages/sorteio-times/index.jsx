import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import Link from "next/link";

import Layout from "../../components/Layout";
import BoxCard from "../../components/Card";

const modalidades = [
  {
    id: 1,
    regra: "2x4",
    nome: "Futsal",
    imagem:
      "https://static.sportit.com.br/public/sportit/imagens/produtos/quadra-completa-futebol-de-salao-915.jpg",
  },
  {
    id: 2,
    regra: "2x5",
    nome: "Futebol",
    imagem:
      "https://multiurso.com.br/wp-content/uploads/2022/09/tamanho-campo-futebol-oficial-fifa-foto-1132x670.jpg",
  },
  {
    id: 3,
    regra: "2x1",
    nome: "Tenis",
    imagem: "https://www.ax3.com.br/imagens/pisos/quadras-tenis-01.jpg",
  },
];

function OrganizarRachinha() {
  return (
    <SimpleGrid columns={[2]} gap={4}>
      {modalidades.map((modalidade) => (
        <Link
          href={{
            pathname: "/organizar-rachinha/times",
            query: {
              modalidade: JSON.stringify(modalidade),
            },
          }}
          key={modalidade.id}
        >
          <BoxCard
            title={modalidade.nome}
            src={modalidade.imagem}
            rule={modalidade.regra}
          />
        </Link>
      ))}
    </SimpleGrid>
  );
}

OrganizarRachinha.layout = (page) => <Layout>{page}</Layout>;

export default OrganizarRachinha;
