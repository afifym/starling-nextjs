import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import TodoTitleInput from './TodoTitleInput/TodoTitleInput';
import TodoSettings from './TodoSettings/TodoSettings';
import { accents } from '../../styles/theme';
import { useTodos } from '../../contexts/TodosContext';
import useForm from '@/customHooks/useForm';

const Wrapper = styled.div`
  width: 250px;
  margin: 0.3em 0;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  cursor: pointer !important;
  transition: opacity 0.1s ease, height 0.2s ease-out;
  background-color: ${({ theme }) => theme.colors.light1};
  border-left: 4px solid black;
  border-color: ${({ accent }) => accents[accent]};

  &:hover {
    opacity: 0.8;
  }

  .header {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 50px;

    h3 {
      color: ${({ theme }) => theme.colors.dark1};
      padding-left: 1em;
      font-size: 1.2rem;
      font-weight: bold;
    }
  }

  ${({ open }) =>
    open &&
    css`
      height: 200px;
    `}
`;

const Todo = ({ todo, index, adding, setAdding, open, setOpen }) => {
  const { id, title, accent, type, progress } = todo;
  const [formData, handleFormChange] = useForm({
    accent: accent,
    type: type,
    progress: progress,
  });
  const { updateTodo } = useTodos();

  const handleClick = () => {
    console.log('CLICK');
    setOpen({ id: id });
    setAdding({ id: id });
  };

  const handleUnClick = (e) => {
    if (e.currentTarget?.contains(e.relatedTarget)) return;

    setOpen(false);
    setAdding({});

    updateTodo(id, formData);
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Wrapper
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={handleClick}
          open={open.id === id}
          accent={accent || '#000000'}
          onBlur={handleUnClick}
        >
          <div className='header '>
            {adding.id === id ? (
              <TodoTitleInput
                todoTitle={title}
                todoID={id}
                setAdding={setAdding}
              />
            ) : (
              <h3>
                {title}, {progress}
              </h3>
            )}
          </div>
          {open.id === id && (
            <TodoSettings
              formData={formData}
              handleFormChange={handleFormChange}
              todo={todo}
            />
          )}
        </Wrapper>
      )}
    </Draggable>
  );
};

export default Todo;
