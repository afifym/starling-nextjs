import { Text } from '@chakra-ui/layout';
import React, { useEffect, useRef, useState } from 'react';
import { useTodos } from '../../../../logic/useTodos/useTodos';

interface IProps {
  todoID: string;
  todoTitle: string;
  setNewTodoId: React.Dispatch<React.SetStateAction<string>>;
}

const TodoTitleInput: React.FC<IProps> = ({
  todoID,
  todoTitle,
  setNewTodoId,
}) => {
  const inputRef: any = useRef();
  const [title, setTitle] = useState(todoTitle);
  const { changeTitle } = useTodos();

  useEffect(() => {
    inputRef.current.focus();
  });

  const handleBlur = () => {
    changeTitle(todoID, title);
    setNewTodoId(null);
  };

  return (
    <Text py={1} fontSize='lg' isTruncated>
      <input
        style={{
          border: 'none',
          background: 'none',
          outline: 'none',
          borderBottom: '2px solid teal',
          fontWeight: 500,
        }}
        ref={inputRef}
        placeholder='new todo'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={handleBlur}
        onFocus={(e) => e.target.select()}
      />
    </Text>
  );
};

export default TodoTitleInput;
