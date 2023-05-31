import { Badge, Box, Flex } from "@chakra-ui/react";

export default function LocalCard({ title }) {
  return (
    <Box>
      <Flex p="0.5rem" flexDir="column" alignItems="flex-start">
        <Badge h="4rem" variant="outline" fontSize="sm" colorScheme="black">
          {title}
        </Badge>

        <Badge variant="outline" fontSize="sm" colorScheme="green">
          HORÁRIOS DISPONÍVEIS
        </Badge>
      </Flex>
    </Box>
  );
}
