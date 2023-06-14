import React, { useEffect, useState } from "react";
import {
  Box, Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Heading, SimpleGrid,
} from "@chakra-ui/react";
import Layout from "../../../components/Layout";
import { api } from "../../../services/api";
import { useRouter } from "next/router";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray } from "react-hook-form";

const scheme = yup.object().shape({
  hours: yup.array().of(yup.object({
    hours_minutes: yup.string(),
    active: yup.boolean(),
  })),
});

function AgendaRachinha() {
  const router = useRouter();
  const { id } = router.query;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(scheme),
  });

  const { fields } = useFieldArray({
    control,
    name: "hours",
  });

  const getAgendas = async () => {
    try {
      const { data } = await api.get(`/locals/${id}`)

      reset({
        hours: data.schedule,
        modality_id: data.modality_id
      })
    } catch (error) { }
  };

  const handleSubmitHours = async (dataFilds) => {
    try {
      const hours = dataFilds.hours.filter(hour => hour.active).map(hour => hour.id)
      
      await router.push({
        pathname: `/organizar-rachinha/${id}/evento`,
        query: {
          horarios: JSON.stringify(hours),
          modality_id: dataFilds.modality_id,
        }
      })
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (id) {
      getAgendas();
    }
  }, [id]);

  return (
    <Box mt="9">
      <Card w="full" variant="outline" as="form" onSubmit={handleSubmit(handleSubmitHours)}>
        <CardHeader>
          <Heading size="md">Horários</Heading>
        </CardHeader>

        <CardBody>
          <SimpleGrid columns={[2]}>
            {
              fields.map((horario, index) =>
                <Checkbox key={index} {...register(`hours[${index}].active`)} borderColor="blue.500">{horario.hours_minutes}</Checkbox>
              )
            }
          </SimpleGrid>
        </CardBody>

        <CardFooter>
          <Button
            w="full"
            colorScheme="blue"
            type="submit"
          >
            Avançar
          </Button>
        </CardFooter>
      </Card>

    </Box>
  );
}

AgendaRachinha.layout = (page) => <Layout>{page}</Layout>;

export default AgendaRachinha;