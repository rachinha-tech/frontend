import React from "react";
import Layout from "../components/Layout";
import { Box, Button, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { MdOutlineGroups2, MdOutlineLocationOn, MdOutlineSearch } from "react-icons/md";

function index() {
  return (
    <Box mt="9">
      <VStack spacing="4">
        <Link href="/organizar-rachinha">
          <Button bgColor="#2A4359" color="white" leftIcon={<MdOutlineLocationOn size="24px" />} size="lg" w="full">
            Organizar rachinha
          </Button>
        </Link>
        <Link href="/organizar-times">
          <Button bgColor="#2A4359" color="white" leftIcon={<MdOutlineGroups2 size="24px" />} size="lg" w="full">
            Organizar times
          </Button>
        </Link>
        <Link href="/buscar-rachinha">
          <Button bgColor="#2A4359" color="white" leftIcon={<MdOutlineSearch size="24px" />} size="lg" w="full">
            Buscar rachinha
          </Button>
        </Link>
      </VStack>
    </Box>
  );
}

index.layout = (page) => (
  <Layout>{page}</Layout>
);

export default index;