import {
  Input as ChakraInput,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import { forwardRef } from "react";

function InputBase(
  { name, label, icon = null, error = null, size, type = "text", ...rest },
  ref
) {
  return (
    <FormControl>
      <FormLabel htmlFor={name}>
        <Flex gap={1}>
          {icon}
          {label}
        </Flex>
      </FormLabel>
      <ChakraInput type={type} name={name} ref={ref} size={size} {...rest} />
      <FormHelperText>{error}</FormHelperText>
    </FormControl>
  );
}

export const Input = forwardRef(InputBase);
