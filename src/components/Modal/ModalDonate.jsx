import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  useDisclosure,
} from "@chakra-ui/react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AiOutlineDollar } from "react-icons/ai";
import { BsSend } from "react-icons/bs";
import * as yup from "yup";
import { Input } from "../Forms/Input";

const donateFormSchema = yup.object({
  valor: yup.string(),
});

function ModalDonate({ isOpen, onClose }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(donateFormSchema),
  });

  const handleDonate = async (data) => {
    try {
      console.log(data);
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
        size="full"
        closeOnOverlayClick={false}
        scrollBehavior="inside"
      >
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Donate</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid
              columns={[1]}
              gap={9}
              as="form"
              onSubmit={handleSubmit(handleDonate)}
            >
              <Input
                label="Valor"
                {...register("valor")}
                icon={<AiOutlineDollar size={22} />}
                size="sm"
                variant="flushed"
                borderColor="gray"
                placeholder="R$ 0,00"
                error={errors.message}
              />

              <Flex flexDirection="column" gap={2}>
                <Button
                  isLoading={isSubmitting}
                  size="sm"
                  colorScheme="green"
                  type="submit"
                  leftIcon={<BsSend size={22} />}
                >
                  Enviar
                </Button>
              </Flex>
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

// eslint-disable-next-line react/display-name
const withModalDonate = (Component) => (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <ModalDonate isOpen={isOpen} onClose={onClose} />
      <Component onOpenDonate={onOpen} {...props} />
    </>
  );
};

export default withModalDonate;
