import React, { useEffect, useState } from "react";
import { Box, Button, Card, Flex, Select, Text } from "@chakra-ui/react";
import Layout from "../../components/Layout";

function Timer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const playAlertSound = () => {
    const audio = new Audio("/sounds/acabou.mp3");
    audio.play();
  };

  useEffect(() => {
    let intervalId;

    if (isRunning) {
      intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          if (minutes > 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          } else {
            if (hours > 0) {
              setHours(hours - 1);
              setMinutes(59);
              setSeconds(59);
            } else {
              setIsRunning(false);
              playAlertSound();
            }
          }
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, hours, minutes, seconds]);

  return (
    <Box>
      <Flex>
        <Select
          value={hours}
          disabled={isRunning ? "disabled" : ""}
          onChange={(e) => setHours(parseInt(e.target.value))}
        >
          {Array.from({ length: 24 }).map((_, i) => (
            <option key={i} value={i}>{`${i} hora${
              i !== 1 ? "s" : ""
            }`}</option>
          ))}
        </Select>

        <Select
          value={minutes}
          disabled={isRunning ? "disabled" : ""}
          onChange={(e) => setMinutes(parseInt(e.target.value))}
        >
          {Array.from({ length: 60 }).map((_, i) => (
            <option key={i} value={i}>{`${i} minuto${
              i !== 1 ? "s" : ""
            }`}</option>
          ))}
        </Select>

        <Select
          value={seconds}
          disabled={isRunning ? "disabled" : ""}
          onChange={(e) => setSeconds(parseInt(e.target.value))}
        >
          {Array.from({ length: 60 }).map((_, i) => (
            <option key={i} value={i}>{`${i} segundo${
              i !== 1 ? "s" : ""
            }`}</option>
          ))}
        </Select>
      </Flex>

      <Flex alignItems={"center"} justifyContent={"center"} my={10}>
        <Card rounded={"full"} w={180} h={180} justifyContent={"center"}>
          <Text fontSize="3xl" textAlign={"center"}>
            {`${hours.toString().padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
          </Text>
        </Card>
      </Flex>

      <Flex alignItems={"center"} justifyContent={"center"}>
        <Button colorScheme="teal" onClick={() => setIsRunning(true)} mr={2}>
          Iniciar
        </Button>

        <Button colorScheme="red" onClick={() => setIsRunning(false)}>
          Parar
        </Button>
      </Flex>
    </Box>
  );
}

Timer.layout = (page) => <Layout>{page}</Layout>;

export default Timer;
