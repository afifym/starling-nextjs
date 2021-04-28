import React from 'react';
import styled, { css } from 'styled-components';
import Todo from '../../Todo/Todo';
import { Droppable } from 'react-beautiful-dnd';

const Wrapper = styled.div`
  width: 300px;
  height: auto;

  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ phase }) => {
    if (phase % 2) {
      return css`
        border: 1px solid ${({ theme }) => theme.colors.dark2};
        border-top: none;
        border-bottom: none;
      `;
    }
  }}
`;

const Phase = ({ phase, todos }) => {
  return (
    <Droppable droppableId={`phase-${phase}`}>
      {(provided) => (
        <Wrapper
          phase={phase}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {todos.map((item, i) => (
            <Todo
              key={item.id}
              todoId={item.id + ''}
              title={item.title}
              index={i}
            />
          ))}

          {provided.placeholder}
        </Wrapper>
      )}
    </Droppable>
  );
};

export default Phase;
