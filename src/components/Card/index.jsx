import {
  Card,
  CardBody,
  Heading,
  Flex,
  Text,
  Image,
  Stack,
} from "@chakra-ui/react";

import { MdOutlineGroups2 } from "react-icons/md";

export default function BoxCard({ src, title, rule }) {
  return (
    <Card maxW="sm" _hover={{ opacity: "0.5" }}>
      <CardBody>
        <Image
          src={src}
          objectFit="cover"
          borderRadius="lg"
          maxH="70px"
          w="full"
        />
        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
          <Flex flexDirection="column" alignItems="start">
            <MdOutlineGroups2 size="24px" />
            <Text>{rule}</Text>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
}
