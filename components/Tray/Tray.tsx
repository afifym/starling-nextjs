import {
  useDisclosure,
  Box,
  HStack,
  VStack,
  IconButton,
  Collapse,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useTodos } from '../../logic/useTodos/useTodos';
import Todo from '../Todo/Todo';
import { Droppable } from 'react-beautiful-dnd';
import { ITodo } from '../../config/interfaces';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

interface IProps {
  phase: number;
}

const Tray: React.FC<IProps> = ({ phase }) => {
  const { todos } = useTodos();
  const { isOpen, onToggle } = useDisclosure();
  const [newTodoId, setNewTodoId] = useState<string>(null);

  return (
    <VStack
      position='fixed'
      zIndex={50}
      left={0}
      bottom={0}
      w='100vw'
      maxWidth='100vw'
      h='fit-content'
      m='0'
    >
      <IconButton
        variant='ghost'
        size='sm'
        w='100%'
        aria-label='toggle-tray'
        onClick={onToggle}
        icon={
          isOpen ? (
            <MdKeyboardArrowDown style={{ pointerEvents: 'none' }} size={25} />
          ) : (
            <MdKeyboardArrowUp style={{ pointerEvents: 'none' }} size={25} />
          )
        }
      />
      <Collapse style={{ margin: 0 }} in={isOpen} animateOpacity>
        <Droppable droppableId={`${phase}`} direction='horizontal'>
          {(provided: any) => (
            <Box
              boxShadow='dark-lg'
              px={3}
              w='100vw'
              bg='gray.800'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <HStack spacing={5} w='100%' h='120px' maxWidth='100vw'>
                {todos[phase] &&
                  todos[phase]?.map((todo: ITodo, i: number) => (
                    <Todo
                      key={todo.id}
                      todo={todo}
                      index={i}
                      newTodoId={newTodoId}
                      setNewTodoId={setNewTodoId}
                    />
                  ))}
                {provided.placeholder}
              </HStack>
            </Box>
          )}
        </Droppable>
      </Collapse>
    </VStack>
  );
};

export default Tray;
