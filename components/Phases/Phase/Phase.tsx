import React, { useState } from 'react';
import Todo from '../../Todo/Todo';
import { Droppable } from 'react-beautiful-dnd';
import { useTodos } from '../../../logic/useTodos/useTodos';
import { ITodo } from '../../../config/interfaces';
import { Button } from '@chakra-ui/button';
import { RiAddLine } from 'react-icons/ri';
import { VStack } from '@chakra-ui/layout';
interface IProps {
  phase: number;
}

const Phase: React.FC<IProps> = ({ phase }) => {
  const { todos, addEmptyTodo } = useTodos();
  const [newTodoId, setNewTodoId] = useState<string>(null);

  const handleAddTodo = (): void => {
    const newID: string = addEmptyTodo(phase);
    setNewTodoId(newID);
  };

  return (
    <Droppable droppableId={`${phase}`}>
      {(provided: any) => (
        <VStack
          borderRight={
            !(phase % 2) ? { lg: '1px solid hsl(217, 15%, 28%)' } : ''
          }
          borderLeft={
            !(phase % 2) ? { lg: '1px solid hsl(217, 15%, 28%)' } : ''
          }
          borderBottom={{ base: '1px solid hsl(217, 15%, 28%)', lg: 'none' }}
          w={{ base: '100%', md: '20%' }}
          minHeight='200px'
          mb={3}
          pb={3}
          px={7}
          h='100%'
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {todos &&
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
          <Button
            size='sm'
            variant='ghost'
            color='whiteAlpha.700'
            justifyContent='flex-start'
            w='90%'
            maxWidth='220px'
            minWidth='200px'
            leftIcon={
              <RiAddLine
                fill='rgba(255, 255, 255, 0.64)'
                style={{
                  marginBottom: '2px',
                }}
                size={20}
              />
            }
            onClick={handleAddTodo}
          >
            Add Todo
          </Button>
        </VStack>
      )}
    </Droppable>
  );
};

export default Phase;
