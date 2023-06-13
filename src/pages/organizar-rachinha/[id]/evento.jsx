import React, { useEffect } from "react";
import {
  Box, Button, Card, CardBody, CardFooter, CardHeader, Checkbox, FormControl, FormLabel, Heading, Input, Select, SimpleGrid, Textarea, useToast,
} from "@chakra-ui/react";
import Layout from "../../../components/Layout";
import { useRouter } from "next/router";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { api } from "../../../services/api";

const scheme = yup.object().shape({
  name: yup.string().required(),
  type: yup.string().required(),
  local_id: yup.number().required(),
  schedule_id: yup.number().required(),
  description: yup.string().required(),
});

function EventoRachinha() {
  const router = useRouter();
  const { horarios, id, modality_id } = router.query;

  const toast = useToast()

  const { register, setValue, handleSubmit, formState: { isSubmitting, errors } } = useForm({
    resolver: yupResolver(scheme),
  });

  const handleSubmitEvento = async (dataFilds) => {
    try {
      const { message } = await api.post('/events', dataFilds)

      toast({
        description: message,
        status: 'success',
      })

      const modalidade_id = JSON.parse(modality_id)

      await router.push({
        pathname: `/sortear-times/${modalidade_id}/sortear`
      })
    } catch (error) {
      
    }
  }

  useEffect(() => {
    if (horarios && id) {
      const hours = JSON.parse(horarios)
      
      setValue('local_id', id)
      setValue('schedule_id', hours[0])
    }
  }, [router])

  return (
    <Box mt="9" as="form" onSubmit={handleSubmit(handleSubmitEvento)}>
      <Card w="full" variant="outline">
        <CardHeader>
          <Heading size="md">Evento</Heading>
        </CardHeader>

        <CardBody>
          <SimpleGrid columns={[1]} gap="2">
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input {...register('name')} />
            </FormControl>
            <FormControl>
              <FormLabel>Como sortear</FormLabel>
              <Select defaultValue='rachinha' {...register('type')}>
                <option value="amistoso">Amistoso</option>
                <option value="rachinha">Rachinha</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>Descrição</FormLabel>
              <Textarea {...register('description')} minH="200px" />
            </FormControl>
          </SimpleGrid>
        </CardBody>

        <CardFooter>
          <Button
            w="full"
            colorScheme="blue"
            type="submit"
            isLoading={isSubmitting}
          >
            Salvar
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
}

EventoRachinha.layout = (page) => <Layout>{page}</Layout>;

export default EventoRachinha;