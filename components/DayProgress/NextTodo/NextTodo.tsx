import React from "react";
import { useTodos } from "../../../logic/useTodos/useTodos";
import { Center, Heading } from "@chakra-ui/layout";
import { usePhases } from "../../../logic/usePhases/usePhases";

interface IProps {
  phase: number;
}

const NextTodo: React.FC<IProps> = ({ phase }) => {
  const { currentPhase } = usePhases();
  const { todos } = useTodos();
  const nextTodo = todos[phase] && todos[phase][0];

  return (
    <Center
      position="absolute"
      top={{ base: "150%", lg: "50%" }}
      left="50%"
      // top={{ base: "0", lg: "50%" }}
      // left={{ base: "0", lg: "50%" }}
      style={{ transform: "translate(-50%, -50%)" }}
      w="100%"
      h="100%"
    >
      <Heading
        textAlign="center"
        w="fit-content"
        // w={{ base: "100%", lg: "fit-content" }}
        fontSize="3xl"
        bg={isNaN(currentPhase) ? "green" : "white"}
        color={isNaN(currentPhase) ? "white" : "blackAlpha.800"}
        px={7}
        py={4}
        borderRadius="48px"
        className="animation"
        position="relative"
        boxShadow="dark-lg"
        textTransform="capitalize"
      >
        {isNaN(currentPhase)
          ? currentPhase + " Prayer"
          : nextTodo?.title || "No tasks"}
      </Heading>
    </Center>
  );
};

export default NextTodo;
