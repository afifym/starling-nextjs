import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Todo from '../../Todo/Todo';
import { Droppable } from 'react-beautiful-dnd';
import { useTodos } from '../../../logic/useTodos/useTodos';
import { ITodo } from '../../../config/interfaces';
import { GrFormAdd } from 'react-icons/gr';

interface IProps {
  phase: number;
}

const Phase: React.FC<IProps> = ({ phase }) => {
  const { todos, addEmptyTodo } = useTodos();
  const [newTodo, setNewTodo] = useState<string>(null);
  const [expandedTodo, setExpandedTodo] = useState<string>(null);

  const handleAddTodo = (): void => {
    const newID: string = addEmptyTodo(phase);
    setNewTodo(newID);
  };

  return (
    <Droppable droppableId={`${phase}`}>
      {(provided: any) => (
        <Wrapper
          phase={phase}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {todos[phase].map((todo: ITodo, i: number) => (
            <Todo
              key={todo.id}
              todo={todo}
              index={i}
              newTodo={newTodo}
              setNewTodo={setNewTodo}
              expandedTodo={expandedTodo}
              setExpandedTodo={setExpandedTodo}
            />
          ))}

          {provided.placeholder}
          <button className='add-btn' onClick={handleAddTodo}>
            <GrFormAdd size={20} /> Add Todo
          </button>
        </Wrapper>
      )}
    </Droppable>
  );
};

export default Phase;

const Wrapper = styled.div<{ phase: number }>`
  width: 300px;
  min-height: 200px;
  height: 100%;
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

  .add-btn {
    width: 85%;
    color: white;
    background: none;
    height: 35px;
    cursor: pointer;
    text-align: left;
    border-radius: ${({ theme }) => theme.borderRadiuses.borderRadius1};
    font-weight: 600;
    opacity: 0.6;

    transition: all 0.1s ease;

    display: flex;
    align-items: center;

    svg {
      margin: 0 0.5em;

      path {
        stroke: ${({ theme }) => theme.colors.light1};
      }
    }
    &:hover {
      background-color: ${({ theme }) => theme.colors.dark3};
      opacity: 0.9;
    }
  }
`;
