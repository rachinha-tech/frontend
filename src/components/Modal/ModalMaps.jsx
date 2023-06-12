import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

import Map from "../Maps";
import { Input } from "../Forms/Input";
import { useState } from "react";
import axios from "axios";

function ModalMaps({ isOpen, onClose }) {
  const [coordenadas, setCoordenadas] = useState({ latitude: 0, longitude: 0 });
  const [search, setSearch] = useState("");

  const handleSearchLocal = async () => {
    const { data } = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
        search
      )}&key=3f6c4809b288410c96c79a98f4afcdf9`
    );

    const coord = data?.results[0].geometry;

    setCoordenadas({
      latitude: coord.lat,
      longitude: coord.lng,
    });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        scrollBehavior="inside"
        size={"full"}
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Informações de Endereço</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Flex flexDirection={"column"}>
              <Input
                label={"Nome do Local"}
                onChange={({ target }) => setSearch(target.value)}
              />
              <Button
                size={"xs"}
                colorScheme={"blue"}
                onClick={handleSearchLocal}
              >
                Buscar
              </Button>
            </Flex>

            <Flex w={"full"} h={500}>
              <Map
                latitude={coordenadas.latitude}
                longitude={coordenadas.longitude}
              />
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              size="sm"
              colorScheme="green"
            >
              Salvar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalMaps;
