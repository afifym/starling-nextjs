import React from 'react';
import { useTodos } from '../../../logic/useTodos/useTodos';
import styled from 'styled-components';
import { Center, Heading, Text, VStack } from '@chakra-ui/layout';

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
      content: '';
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
  const { todos } = useTodos();
  const nextTodo = todos[phase] && todos[phase][0];

  return (
    <Wrapper w='100%' pb={8}>
      <VStack alignItems='flex-start'>
        <Text pl={4} fontWeight={500} fontSize='small'>
          Next Up:
        </Text>
        <Heading
          fontSize='3xl'
          bg='white'
          color='blackAlpha.800'
          px={7}
          py={4}
          w='fit-content'
          borderRadius='48px'
          className='animation'
          position='relative'
          boxShadow='dark-lg'
        >
          {nextTodo?.title || 'No tasks'}
        </Heading>
      </VStack>
    </Wrapper>
  );
};

export default NextTodo;
