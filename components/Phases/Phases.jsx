import React, { useState } from 'react';
import styled from 'styled-components';
import Phase from './Phase/Phase';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';

const Wrapper = styled.div`
  width: 90%;
  height: 90vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const todosData = [
  {
    id: 1,
    title: 'Reading',
    index: 0,
  },
  {
    id: 2,
    title: 'Working',
    index: 1,
  },
  {
    id: 3,
    title: 'Eating',
    index: 2,
  },
  {
    id: 4,
    title: 'Playing',
    index: 3,
  },
];

const Phases = () => {
  const todos = useSelector((state) => state.todos);
  // const [todos, setTodos] = useState(todosData);

  const handleDragEnd = (result) => {
    const items = [...todos];
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodos(items);
  };

  return (
    <Wrapper>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Phase todos={todos} phase={0} />
      </DragDropContext>
    </Wrapper>
  );
};

export default Phases;
