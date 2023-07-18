import { Button } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function NavButton({
  title,
  icon,
  disabled = null,
  color = "blue.900",
  href,
}) {
  return (
    <Link href={href} passHref>
      <Button
        bgColor={color}
        color="white"
        size="lg"
        w="full"
        leftIcon={icon}
        isDisabled={disabled}
        _hover={{ opacity: "0.8" }}
      >
        {title}
      </Button>
    </Link>
  );
}
