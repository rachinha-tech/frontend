import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
} from "@chakra-ui/react";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../services/api";

const quantityFormSchema = yup.object({
  quantity_players: yup.number(),
});

function UpdateModality({ isOpen, onClose, modalityId }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(quantityFormSchema),
  });

  const handleUpdateModality = async (data) => {
    try {
      await api.patch("modalities", {
        modality_id: modalityId,
        quantity_players: data.quantity_players,
      });

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        scrollBehavior="inside"
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Alterar quantidade</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid
              columns={[1]}
              gap={9}
              as="form"
              onSubmit={handleSubmit(handleUpdateModality)}
            >
              <Input
                {...register("quantity_players")}
                size="sm"
                variant="flushed"
                placeholder="Jogador por time"
              />

              <Flex flexDirection="column" gap={2}>
                <Button
                  isLoading={isSubmitting}
                  size="sm"
                  colorScheme="green"
                  type="submit"
                >
                  Alterar
                </Button>
              </Flex>
            </SimpleGrid>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default UpdateModality;
