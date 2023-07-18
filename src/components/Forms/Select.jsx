import {
  Select as ChakraSelect,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { forwardRef } from "react";

function SelectBase({ label, name, children, ...rest }, ref) {
  return (
    <FormControl>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <ChakraSelect name={name} ref={ref} {...rest}>
        {children}
      </ChakraSelect>
    </FormControl>
  );
}

export const Select = forwardRef(SelectBase);
