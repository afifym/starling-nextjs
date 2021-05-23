import React from 'react';
import Phase from './Phase/Phase';
import { DragDropContext } from 'react-beautiful-dnd';
import { useTodos } from '../../logic/useTodos/useTodos';
import Tray from '../Tray/Tray';
import { Stack, VStack } from '@chakra-ui/layout';

const Phases: React.FC = () => {
  const { reOrderTodos } = useTodos();
  // const { todos, addEmptyTodo } = useTodos();
  // const [newTodo, setNewTodo] = useState<string>(null);

  // const handleAddTodo = (): void => {
  //   const newID: string = addEmptyTodo(5);
  //   setNewTodo(newID);
  // };

  const handleDragEnd = (result) => {
    let { source, destination } = result;

    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    source = { phase: source.droppableId, index: source.index };
    destination = {
      phase: destination.droppableId,
      index: destination.index,
    };

    reOrderTodos(source, destination);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <VStack w='100%' px={4} m='auto'>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          w='100%'
          alignItems={{ base: 'center', lg: 'flex-start' }}
        >
          <Phase phase={1} />
          <Phase phase={2} />
          <Phase phase={3} />
          <Phase phase={4} />
          <Phase phase={5} />
        </Stack>
        <Tray phase={0} />
      </VStack>
    </DragDropContext>
  );
};

export default Phases;
