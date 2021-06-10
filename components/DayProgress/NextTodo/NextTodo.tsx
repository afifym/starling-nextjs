import React from "react";
import { useTodos } from "../../../logic/useTodos/useTodos";
import styled from "styled-components";
import { Center, Heading } from "@chakra-ui/layout";
import { usePhases } from "../../../logic/usePhases/usePhases";

interface IProps {
  phase: number;
}

const Wrapper = styled(Center)`
  @keyframes next-btn {
    0% {
      transform: scale(1.1);
      opacity: 1;
    }

    100% {
      transform: scale(1.3);
      opacity: 0.1;
    }
  }

  .animation {
    &::before {
      content: "";
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: -1;

      border-radius: 48px;
      border: 1px solid ${({ theme }) => theme.colors.light1};
      left: 0;
      top: 0;
      animation: next-btn 1s ease infinite;
    }
  }
`;

const NextTodo: React.FC<IProps> = ({ phase }) => {
  const { currentPhase } = usePhases();
  const { todos } = useTodos();
  const nextTodo = todos[phase] && todos[phase][0];

  return (
    <Wrapper
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
        // borderTopRadius={{ base: "0", lg: "48px" }}
        className="animation"
        position="relative"
        boxShadow="dark-lg"
        textTransform="capitalize"
      >
        {isNaN(currentPhase)
          ? currentPhase + " Prayer"
          : nextTodo?.title || "No tasks"}
      </Heading>
    </Wrapper>
  );
};

export default NextTodo;
