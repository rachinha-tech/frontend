import { Button, Divider } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";

export default function NavLink({ title, icon, disabled = null, href }) {
  return (
    <>
      <Link href={href} passHref>
        <Button
          color="black"
          fontWeight={'thin'}
          size="lg"
          variant={"link"}
          leftIcon={icon}
          isDisabled={disabled}
          _hover={{ opacity: "0.8" }}
        >
          {title}
        </Button>
      </Link>
      <Divider borderWidth={"0.2"} borderColor={"blue.900"} />
    </>
  );
}
