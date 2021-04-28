import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Wrapper = styled.div`
  width: 250px;
  height: 70px;
  margin: 0.3em 0;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: opacity 0.1s ease;

  background-color: ${({ theme }) => theme.colors.light1};

  &:hover {
    opacity: 0.8;
  }

  h3 {
    color: ${({ theme }) => theme.colors.dark1};
    margin-left: 1em;
  }
`;

const Todo = ({ todoId, title, index }) => {
  return (
    <Draggable draggableId={todoId} index={index}>
      {(provided) => (
        <Wrapper
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <h3>{title}</h3>
        </Wrapper>
      )}
    </Draggable>
  );
};

export default Todo;
