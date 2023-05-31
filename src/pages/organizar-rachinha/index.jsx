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

function OrganizarRachinha() {
  return (
    <Box>
      <Flex>
        <Badge bg="none" fontSize="sm">
          PROCURAR LOCAL
        </Badge>
      </Flex>

      <InputGroup mt={2}>
        <Input bg="white" type="tel" placeholder="Phone number" />
        <InputRightElement bg="#2A4359" pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputRightElement>
      </InputGroup>

      <Flex flexDirection="column"></Flex>
    </Box>
  );
}

OrganizarRachinha.layout = (page) => <Layout>{page}</Layout>;

export default OrganizarRachinha;
