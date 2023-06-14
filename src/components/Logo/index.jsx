import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

const Logo = () => {
  return (
    <Link href={"/"} passHref>
      <Flex gap={2}>
        <Image src="/logo.png" width={156} height={36} />
      </Flex>
    </Link>
  );
};

export default memo(Logo);
