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
import { AuthContext } from "../contexts/AuthContex";

function index() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <VStack spacing="4" mx={6}>
      <NavButton
        title="Sortear de Times"
        icon={<MdOutlineGroup />}
        href="/sortear-times"
      />

      <NavButton
        title="Temporizador"
        icon={<MdOutlineTimer />}
        href="/temporizador"
      />

      <NavButton
        title="Organizar Rachinha"
        icon={<MdOutlineBuild />}
        href="/organizar-rachinha"
        disabled={isAuthenticated ? false : true}
      />

      {/* <NavButton
        title="Pesquisar Racha"
        icon={<MdOutlinePinDrop />}
        href="/pesquisar-racha"
        disabled={isAuthenticated ? false : true}
      /> */}
    </VStack>
  );
}

index.layout = (page) => <Layout>{page}</Layout>;

export default index;
