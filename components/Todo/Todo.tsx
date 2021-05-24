import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ITodo } from '../../config/interfaces';
import { Flex, HStack, Square, Text, VStack } from '@chakra-ui/layout';
import { Box } from '@chakra-ui/layout';
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from '@chakra-ui/react';
import TodoModal from './components/TodoModal/TodoModal';
import { BsThreeDots } from 'react-icons/bs';
import { colors } from '../../config/data/mock';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { RiEdit2Fill } from 'react-icons/ri';
import { HiDuplicate } from 'react-icons/hi';
import { useTodos } from '../../logic/useTodos/useTodos';
import TodoHeader from './components/TodoHeader/TodoHeader';
import TodoExpansion from './components/TodoExpansion/TodoExpansion';

interface IProps {
  todo: ITodo;
  index: number;
  newTodoId: string;
  setNewTodoId: React.Dispatch<React.SetStateAction<string>>;
}

const Todo: React.FC<IProps> = ({ todo, index, newTodoId, setNewTodoId }) => {
  const { deleteTodo, duplicateTodo, changeProgress } = useTodos();
  const { isOpen, onToggle } = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExpand = (e) => {
    if (e?.relatedTarget?.ariaLabel === 'increase-progress') return;
    e.stopPropagation();
    onToggle();
  };
  const handleIncreaseProgress = (e) => {
    e.stopPropagation();
    if (todo?.progress?.current >= 100) return;
    changeProgress(todo.id, todo?.progress?.current + 10);
  };

  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided: any) => (
        <Box
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() => setIsModalOpen(true)}
          position='relative'
          role='group'
          w='100%'
          maxWidth='220px'
          minWidth='200px'
          bg='gray.700'
          borderRadius='xl'
        >
          <Flex
            cursor='pointer'
            direction='column'
            p={3}
            w='100%'
            position='relative'
          >
            <IconButton
              opacity={0}
              _groupHover={{ opacity: 1 }}
              maxHeight='35px'
              h='40%'
              variant='ghost'
              _focus={{ boxShadow: 'none' }}
              w='40px'
              right={0}
              bottom={0}
              onClick={handleExpand}
              onBlur={(e) => isOpen && handleExpand(e)}
              position='absolute'
              aria-label='expand'
              borderRadius='xl'
              icon={
                isOpen ? (
                  <MdKeyboardArrowUp
                    style={{ pointerEvents: 'none' }}
                    size={20}
                  />
                ) : (
                  <MdKeyboardArrowDown
                    style={{ pointerEvents: 'none' }}
                    size={20}
                  />
                )
              }
            />

            <Square
              position='absolute'
              right={0}
              top={0}
              borderRadius='xl'
              w='40px'
              onClick={(e) => e.stopPropagation()}
            >
              <Menu>
                <MenuButton
                  maxHeight='35px'
                  opacity={0}
                  borderRadius='xl'
                  _groupHover={{ opacity: 1 }}
                  variant='ghost'
                  w='40px'
                  minHeight='35px'
                  as={IconButton}
                  bg='gray.700'
                  aria-label='Options'
                  icon={<BsThreeDots size={20} />}
                />
                <MenuList boxShadow='dark-lg'>
                  <VStack w='100%'>
                    <MenuItem onClick={() => setIsModalOpen(true)}>
                      <HStack>
                        <RiEdit2Fill size={20} />
                        <Text color='whiteAlpha.800' fontWeight={500}>
                          Edit
                        </Text>
                      </HStack>
                    </MenuItem>
                    <MenuItem onClick={() => deleteTodo(todo.id)}>
                      <HStack>
                        <FaTrash size={17} />
                        <Text color='whiteAlpha.800' fontWeight={500}>
                          Delete
                        </Text>
                      </HStack>
                    </MenuItem>
                    <MenuItem onClick={() => duplicateTodo(todo.id)}>
                      <HStack>
                        <HiDuplicate size={20} />
                        <Text color='whiteAlpha.800' fontWeight={500}>
                          Duplicate
                        </Text>
                      </HStack>
                    </MenuItem>
                  </VStack>
                </MenuList>
              </Menu>
            </Square>

            <TodoModal
              todo={todo}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
            <TodoHeader
              setNewTodoId={setNewTodoId}
              isNewTodo={newTodoId === todo.id}
              todo={todo}
            />
            <TodoAccent todo={todo} />
            <TodoExpansion
              isOpen={isOpen}
              currentProgress={todo?.progress?.current}
              handleIncreaseProgress={handleIncreaseProgress}
              handleExpand={handleExpand}
            />
          </Flex>
        </Box>
      )}
    </Draggable>
  );
};

export default Todo;

const TodoAccent: React.FC<{ todo: ITodo }> = ({ todo }) => {
  return (
    <Box
      position='absolute'
      left='-4px'
      zIndex={-1}
      top='50%'
      h='50%'
      w='4px'
      borderRadius='md'
      bg={`${colors[todo.accent]}.600`}
      style={{
        borderTopRightRadius: '0',
        borderBottomRightRadius: '0',
        transform: 'translateY(-50%)',
      }}
    />
  );
};
