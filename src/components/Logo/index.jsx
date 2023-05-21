import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

// Erro de múltiplos children está sendo gerado com esse código abaixo
const Logo = () => {
  return (
    <Flex gap={2}>
      <Link href="/">
        <Image
          style={{ cursor: "pointer" }}
          src="/logo.png"
          width={156}
          height={36}
        />
      </Link>
    </Flex>
  );
};

export default memo(Logo);
