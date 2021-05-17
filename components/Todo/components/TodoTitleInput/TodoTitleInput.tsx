import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useTodos } from '../../../../logic/useTodos/useTodos';

interface IProps {
  todoID: string;
  todoTitle: string;
  setNewTodo: React.Dispatch<React.SetStateAction<string>>;
  hasTags: boolean;
}

const TodoTitleInput: React.FC<IProps> = ({
  todoID,
  todoTitle,
  setNewTodo,
}) => {
  const inputRef: any = useRef();
  const [title, setTitle] = useState(todoTitle);
  const { changeTitle } = useTodos();

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleBlur = () => {
    changeTitle(todoID, title);
    setNewTodo(null);
  };

  return (
    <Wrapper className=''>
      <input
        ref={inputRef}
        type='text'
        placeholder='new todo'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={handleBlur}
      />
    </Wrapper>
  );
};

export default TodoTitleInput;

// #####################
// Styling
// #####################

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding-left: 1em;
  padding-top: 0.9em;

  input {
    outline: none;
    border: none;
    background: none;
    max-width: 90%;
    border-bottom: 1px solid ${({ theme }) => theme.colors.main1};
    color: ${({ theme }) => theme.colors.light1};
    font-size: 1.1rem;
    font-weight: 600;
  }
`;
