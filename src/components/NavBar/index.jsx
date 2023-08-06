import { Button, Flex } from "@chakra-ui/react";
import ModalDonate from "../Modal/ModalDonate";
import Link from "next/link";
import Image from "next/image";

function NavBar({ onOpenDonate }) {
  return (
    <Flex width="100%" justifyContent={"space-evenly"} alignItems={"center"}>
      <Link href={"/"}>
        <Image
          objectFit="cover"
          src="/logo.png"
          width={216}
          height={48}
          alt=""
        />
      </Link>

      <Button size={"xs"} colorScheme="pink" onClick={onOpenDonate}>
        Donate
      </Button>
    </Flex>
  );
}

export default ModalDonate(NavBar);
