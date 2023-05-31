import {
  Badge,
  Box,
  Flex,
  InputGroup,
  InputRightElement,
  Input,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Layout from "../../components/Layout";
import LocalCard from "../../components/LocalCard";

function OrganizarRachinha() {
  return (
    <Box>
      <Flex>
        <Badge bg="none" fontSize="sm">
          PROCURAR LOCAL
        </Badge>
      </Flex>

      <InputGroup mt={2}>
        <Input bg="white" type="tel" placeholder="Digite o local..." />
        <InputRightElement bg="#2A4359" pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputRightElement>
      </InputGroup>

      <Flex mt="8px" flexDirection="column">
        <LocalCard title="ARENA BELA VISTA"/>
      </Flex>
    </Box>
  );
}

OrganizarRachinha.layout = (page) => <Layout>{page}</Layout>;

export default OrganizarRachinha;
