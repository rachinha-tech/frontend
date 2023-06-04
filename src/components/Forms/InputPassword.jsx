import {
  Button,
  Input as ChakraInput,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { RxEyeClosed } from "react-icons/rx";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { forwardRef } from "react";

function InputBase(
  { label, name, size = "sm", icon = null, error = null, ...rest },
  ref
) {
  const [show, setShow] = useState(false);
  return (
    <FormControl>
      <FormLabel htmlFor={name}>
        <Flex gap={1}>
          {icon}
          {label}
        </Flex>
      </FormLabel>
      <InputGroup size="md">
        <ChakraInput
          pr="4.5rem"
          type={show ? "text" : "password"}
          name={name}
          size={size}
          ref={ref}
          {...rest}
        />
        <InputRightElement width="3.5rem">
          <Button
            h="1.5rem"
            size="sm"
            mb={4}
            colorScheme="blue"
            onClick={() => setShow(!show)}
          >
            {show ? (
              <MdOutlineRemoveRedEye size={22} />
            ) : (
              <RxEyeClosed size={22} />
            )}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
}

export const InputPassword = forwardRef(InputBase);
