import { IconButton } from "@chakra-ui/button";
import { Box, Text } from "@chakra-ui/layout";
import { HStack } from "@chakra-ui/react";
import { Collapse } from "@chakra-ui/transition";
import React from "react";
import { FaCheck } from "react-icons/fa";

interface IProps {
  isOpen: boolean;
  handleExpand: any;
  handleIncreaseProgress: any;
  currentProgress: number;
  handleCheckTodo: any;
  isRepeats: boolean;
}

const TodoExpansion: React.FC<IProps> = ({
  isOpen,
  isRepeats,
  handleIncreaseProgress,
  handleCheckTodo,
  handleExpand,
  currentProgress,
}) => {
  return (
    <Collapse in={isOpen} animateOpacity>
      <Box w="100%" mt={4}>
        <HStack
          alignItems="flex-start"
          justifyContent="space-between"
          w="100%"
          spacing={1}
        >
          {isRepeats ? (
            <IconButton
              size="lg"
              px={4}
              variant="ghost"
              aria-label="increase-progress"
              onClick={handleIncreaseProgress}
              onBlur={(e) => isOpen && handleExpand(e)}
              icon={
                <Box px={3} pointerEvents="none">
                  <Text fontSize="1.2rem" color="green.400">
                    {currentProgress}
                    <span style={{ fontSize: "0.8rem", color: "white" }}>
                      /6
                    </span>
                  </Text>
                </Box>
              }
            />
          ) : (
            <span />
          )}
          <IconButton
            size="lg"
            color="green.400"
            px={4}
            variant="ghost"
            aria-label="check-todo"
            onClick={handleCheckTodo}
            onBlur={(e) => isOpen && handleExpand(e)}
            icon={<FaCheck />}
          />
        </HStack>
      </Box>
    </Collapse>
  );
};

export default TodoExpansion;
