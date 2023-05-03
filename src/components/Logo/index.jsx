import { Flex, Text } from "@chakra-ui/react";
import Image from "next/image"
import { memo } from "react";

const Logo = ({ label = false }) => {
  return (
    <Flex gap={2}>
      <Image
        src='/logo.png'
        width={36}
        height={36}
      />
      <Flex>
        <Text color="#1A4B86" fontWeight="semibold" fontSize={25}>RACHI</Text>
        <Text color="#5FA0FF" fontWeight="semibold" fontSize={25}>NHA</Text>
      </Flex>
    </Flex>
  )
}

export default memo(Logo);