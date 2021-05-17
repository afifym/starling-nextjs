import React from 'react';
import styled from 'styled-components';
import Phase from './Phase/Phase';
import { DragDropContext } from 'react-beautiful-dnd';
import { useTodos } from '../../logic/useTodos/useTodos';
import Tray from '../Tray/Tray';

const Phases: React.FC = () => {
  const { reOrderTodos } = useTodos();

  const handleDragEnd = (result) => {
    let { source, destination } = result;
    source = { phase: source.droppableId, index: source.index };
    destination = {
      phase: destination.droppableId,
      index: destination.index,
    };

    reOrderTodos(source, destination);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Wrapper className=''>
        <div>
          <Phase phase={0} />
          <Phase phase={1} />
          <Phase phase={2} />
          <Phase phase={3} />
          <Phase phase={4} />
        </div>
        <div>
          <Tray />
        </div>
      </Wrapper>
    </DragDropContext>
  );
};

export default Phases;

const Wrapper = styled.div`
  width: 90%;
  height: auto;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
  }
`;
