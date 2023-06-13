import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";

function TeamsSorted({ isOpen, onClose, teams }) {
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
          <ModalHeader>Times sorteados</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

            <Card w="full" variant="outline">
              <CardBody>
                {teams?.map((teams, index) => (
                  <Flex key={index} flexDirection="column" gap="2" mb="10">
                    <Text fontSize="18px" fontWeight="bold">
                      Time {index + 1}
                    </Text>
                    <Stack
                      divider={<StackDivider marginY="8px !important" />}
                      spacing="4"
                    >
                      {teams.map((person, index) => (
                        <Flex
                          key={index}
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Heading size="xs" textTransform="uppercase">
                            {person}
                          </Heading>
                        </Flex>
                      ))}
                    </Stack>
                  </Flex>
                ))}
              </CardBody>
            </Card>

          </ModalBody>
          <ModalFooter>
            <Button w="full" colorScheme="red" onClick={onClose}>
              Voltar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default TeamsSorted;
