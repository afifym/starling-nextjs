import { IconButton } from "@chakra-ui/button";
import { Box, Text, VStack } from "@chakra-ui/layout";
import { Collapse } from "@chakra-ui/transition";
import React from "react";

interface IProps {
  isOpen: boolean;
  handleExpand: any;
  handleIncreaseProgress: any;
  currentProgress: number;
}

const TodoExpansion: React.FC<IProps> = ({
  isOpen,
  handleIncreaseProgress,
  handleExpand,
  currentProgress,
}) => {
  return (
    <Collapse in={isOpen} animateOpacity>
      <Box w="100%" mt={4}>
        <VStack alignItems="flex-start" w="80%" spacing={1}>
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
                  <span style={{ fontSize: "0.8rem", color: "white" }}>/6</span>
                </Text>
              </Box>
            }
          />
        </VStack>
      </Box>
    </Collapse>
  );
};

export default TodoExpansion;
