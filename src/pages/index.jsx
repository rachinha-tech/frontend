import React, { useContext } from "react";
import Layout from "../components/Layout";
import { VStack } from "@chakra-ui/react";

import {
  MdOutlineTimer,
  MdOutlinePinDrop,
  MdOutlineBuild,
  MdOutlineGroup,
} from "react-icons/md";

import NavButton from "../components/NavButton";

function index() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <VStack spacing="4" mx={6}>
      <NavButton
        title="Sorteio de Times"
        icon={<MdOutlineGroup />}
        href="/sorteio-times"
      />

      <NavButton
        title="Temporizador"
        icon={<MdOutlineTimer />}
        href="/temporizador"
      />

      <NavButton
        title="Organizar Racha"
        icon={<MdOutlineBuild />}
        href="/organizar-racha"
      />

      <NavButton
        title="Pesquisar Racha"
        icon={<MdOutlinePinDrop />}
        href="/pesquisar-racha"
      />
    </VStack>
  );
}

index.layout = (page) => <Layout>{page}</Layout>;

export default index;
