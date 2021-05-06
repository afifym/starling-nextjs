import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import Todo from '../../Todo/Todo';
import { Droppable } from 'react-beautiful-dnd';
import { useTodos } from '../../../contexts/TodosContext';

const Wrapper = styled.div`
  width: 300px;
  min-height: 200px;
  height: 100%;
  /* height: auto; */

  display: flex;
  flex-direction: column;
  align-items: center;

  border: 2px solid blue;

  /* ${({ phase }) => {
    if (phase % 2) {
      return css`
        border: 1px solid ${({ theme }) => theme.colors.dark2};
        border-top: none;
        border-bottom: none;
      `;
    }
  }} */

  button {
    width: 100%;
    border: 1px solid white;
    color: white;
    background: none;
    height: 30px;
    cursor: pointer;
  }
`;

const Phase = ({ phase }) => {
  const { todos, addEmptyTodo } = useTodos();
  const [adding, setAdding] = useState({});
  const [open, setOpen] = useState({});
  const currentTodos = todos[phase];

  const handleAddTodo = () => {
    const newID = addEmptyTodo(phase);
    setAdding({ id: newID });
  };

  return (
    <Droppable droppableId={`${phase}`}>
      {(provided) => (
        <Wrapper
          phase={phase}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {currentTodos.map((todo, i) => (
            <Todo
              key={todo.id}
              todo={todo}
              index={i}
              adding={adding}
              setAdding={setAdding}
              open={open}
              setOpen={setOpen}
            />
          ))}

          {provided.placeholder}
          <button onClick={handleAddTodo}>Add Task</button>
        </Wrapper>
      )}
    </Droppable>
  );
};

export default Phase;
