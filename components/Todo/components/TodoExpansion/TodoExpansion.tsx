import { IconButton } from '@chakra-ui/button';
import { Box, VStack } from '@chakra-ui/layout';
import { Progress } from '@chakra-ui/progress';
import { Collapse } from '@chakra-ui/transition';
import React from 'react';

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
      <Box w='100%' mt={4}>
        <VStack alignItems='flex-start' w='80%' spacing={1}>
          <IconButton
            size='lg'
            px={4}
            variant='ghost'
            aria-label='increase-progress'
            onClick={handleIncreaseProgress}
            onBlur={(e) => isOpen && handleExpand(e)}
            icon={
              <Box px={3} pointerEvents='none'>
                {currentProgress}%
              </Box>
            }
          />
          <Progress
            w='100%'
            borderRadius='md'
            value={currentProgress}
            colorScheme='green'
            size='sm'
          />
        </VStack>
      </Box>
    </Collapse>
  );
};

export default TodoExpansion;