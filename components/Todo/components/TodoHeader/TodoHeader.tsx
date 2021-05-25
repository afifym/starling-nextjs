import { Badge, Box, Circle, Flex, HStack, Text } from '@chakra-ui/layout';
import React from 'react';
import { ITag, ITodo } from '../../../../config/interfaces';
import { useTodos } from '../../../../logic/useTodos/useTodos';
import TodoTitleInput from '../TodoTitleInput/TodoTitleInput';

interface IProps {
  isNewTodo: boolean;
  todo: ITodo;
  setNewTodoId: any;
}

const TodoHeader: React.FC<IProps> = ({ todo, isNewTodo, setNewTodoId }) => {
  return (
    <header>
      <TodoPriority priority={todo.priority} />
      <Box maxWidth='180px'>
        {isNewTodo ? (
          <TodoTitleInput
            todoID={todo.id}
            todoTitle={todo.title}
            setNewTodoId={setNewTodoId}
          />
        ) : (
          <Text fontWeight={500} pb={1} fontSize='lg' isTruncated>
            {todo.title}
          </Text>
        )}
      </Box>
      <TodoTags todoTags={todo?.tags} />
    </header>
  );
};

export default TodoHeader;

const TodoPriority: React.FC<{ priority: string }> = ({ priority }) => {
  return (
    <>
      {priority && priority !== '0' && (
        <Flex mb={1} alignItems='center' h='20px'>
          {[...Array(parseInt(priority)).keys()].map((_, i) => (
            <Circle
              as='span'
              size='11px'
              mr={1}
              bg='teal.400'
              borderColor='teal.800'
              borderWidth='3.5px'
              key={i}
            />
          ))}
        </Flex>
      )}
    </>
  );
};

const TodoTags: React.FC<{ todoTags: string[] }> = ({ todoTags }) => {
  if (!todoTags || todoTags.length <= 0) return <></>;

  const { tags } = useTodos();
  const tagsInfo: ITag[] = todoTags?.map((id) => tags.find((t) => t.id === id));

  return (
    <HStack>
      {tagsInfo?.map((tag, i) => (
        <Badge
          key={i}
          textTransform='none'
          borderRadius='md'
          py={0.9}
          px={1.5}
          fontSize='0.7em'
          colorScheme={tag?.color}
        >
          {tag?.name}
        </Badge>
      ))}
    </HStack>
  );
};
