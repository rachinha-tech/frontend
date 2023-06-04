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
import Link from "next/link";

export default function BoxCard({ src, title, rule, modality }) {
  console.log(modality);

  return (
    <Link
      href={{
        pathname: "/sorteio-times/times",
        query: {
          modalidade: JSON.stringify(modality),
        },
      }}
      key={modality.id}
    >
      <Card _hover={{ opacity: "0.6" }}>
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
    </Link>
  );
}
