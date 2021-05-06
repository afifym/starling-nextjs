import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useTodos } from '../../../contexts/TodosContext';

const Wrapper = styled.div`
  width: 100%;
  min-height: 50px;
  display: flex;
  align-items: center;
  overflow: hidden;

  input {
    color: ${({ theme }) => theme.colors.dark1};
    padding-left: 1em;
    outline: none;
    border: none;
    background-color: lightblue;
    font-size: 1.3rem;
    font-weight: bold;
  }
`;

const TodoTitleInput = ({ todoID, todoTitle, setAdding }) => {
  const inputRef = useRef();
  const [title, setTitle] = useState(todoTitle);
  const { changeTitle } = useTodos();

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleBlur = () => {
    changeTitle(todoID, title);
    setAdding({});
  };

  return (
    <Wrapper>
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
