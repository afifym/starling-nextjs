import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { ITag, ITodo } from '../../config/interfaces';
import {
  Badge,
  Circle,
  Flex,
  HStack,
  Square,
  Text,
  VStack,
} from '@chakra-ui/layout';
import { Box } from '@chakra-ui/layout';
import {
  Collapse,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Progress,
  useDisclosure,
} from '@chakra-ui/react';
import TodoModal from './components/TodoModal/TodoModal';
import { BsThreeDots } from 'react-icons/bs';
import { colors, userTags } from '../../config/data/mock';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { RiEdit2Fill } from 'react-icons/ri';
import { HiDuplicate } from 'react-icons/hi';
import { useTodos } from '../../logic/useTodos/useTodos';
import TodoTitleInput from './components/TodoTitleInput/TodoTitleInput';

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
      {(provided: any, snapshot) => (
        <Box
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() => setIsModalOpen(true)}
          position='relative'
          role='group'
          w='90%'
          maxWidth='220px'
          minWidth='200px'
          bg='gray.700'
          borderRadius='xl'
        >
          <Flex
            opacity={snapshot.isDragging ? '0.5' : '1'}
            cursor='pointer'
            direction='column'
            p={3}
            w='100%'
            position='relative'
          >
            <IconButton
              opacity={0}
              _groupHover={{ opacity: 1 }}
              // minHeight='35px'
              // maxHeight='40%'
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
            <Collapse in={isOpen} animateOpacity>
              <Box w='100%' mt={4}>
                <VStack alignItems='flex-start' w='80%' spacing={1}>
                  <IconButton
                    size='lg'
                    px={4}
                    variant='ghost'
                    aria-label='increase-progress'
                    onClick={handleIncreaseProgress}
                    onBlur={(e) => isOpen && handleExpand(e)}
                    icon={
                      <Box px={3} pointerEvents='none'>
                        {todo?.progress?.current}%
                      </Box>
                    }
                  />
                  <Progress
                    w='100%'
                    borderRadius='md'
                    value={todo?.progress?.current}
                    colorScheme='green'
                    size='sm'
                  />
                </VStack>
              </Box>
            </Collapse>
          </Flex>
        </Box>
      )}
    </Draggable>
  );
};

export default Todo;

interface ITodoComponent {
  todo: ITodo;
}

interface ITodoHeader {
  isNewTodo: boolean;
  todo: ITodo;
  setNewTodoId: any;
}

const TodoHeader: React.FC<ITodoHeader> = ({
  todo,
  isNewTodo,
  setNewTodoId,
}) => {
  const p = todo.priority;
  return (
    <header>
      {/* {todo.priority !== '0' && (
        <Flex alignItems='center' h='20px'>
          {[...Array(parseInt(p)).keys()].map((_, i) => (
            <Circle
              as='span'
              size='11px'
              mr={1}
              bg='teal.500'
              borderColor='teal.800'
              borderWidth='3.5px'
              key={i}
            />
          ))}
        </Flex>
      )} */}
      <Box maxWidth='180px'>
        {isNewTodo ? (
          <TodoTitleInput
            todoID={todo.id}
            todoTitle={todo.title}
            setNewTodoId={setNewTodoId}
          />
        ) : (
          <Text fontWeight={500} py={1} fontSize='lg' isTruncated>
            {todo.title}
          </Text>
        )}
      </Box>
      {todo?.tags?.length > 0 && (
        <Box h='20px'>
          <TodoTags todo={todo} />
        </Box>
      )}
    </header>
  );
};

const TodoAccent: React.FC<ITodoComponent> = ({ todo }) => {
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
    ></Box>
  );
};

const TodoTags: React.FC<ITodoComponent> = ({ todo }) => {
  const tags: ITag[] = todo?.tags?.map((id) =>
    userTags.find((t) => t.id === id)
  );

  return (
    <HStack>
      {tags?.map((tag, i) => (
        <Badge
          key={i}
          textTransform='none'
          borderRadius='md'
          py={0.9}
          px={1.5}
          fontSize='0.7em'
          colorScheme={tag.color}
        >
          {tag.name}
        </Badge>
      ))}
    </HStack>
  );
};
