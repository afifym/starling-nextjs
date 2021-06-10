import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { ITodo } from "../../config/interfaces";
import { Flex, HStack, Square, Text, VStack } from "@chakra-ui/layout";
import { Box } from "@chakra-ui/layout";
import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import TodoModal from "./components/TodoModal/TodoModal";
import { BsThreeDots } from "react-icons/bs";
import { colors } from "../../config/data/mock";
import { FaTrash } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import { HiDuplicate } from "react-icons/hi";
import { useTodos } from "../../logic/useTodos/useTodos";
import TodoHeader from "./components/TodoHeader/TodoHeader";
import TodoExpansion from "./components/TodoExpansion/TodoExpansion";

interface IProps {
  todo: ITodo;
  index: number;
  newTodoId: string;
  setNewTodoId: React.Dispatch<React.SetStateAction<string>>;
  phaseIndex: number;
}

const Todo: React.FC<IProps> = ({
  todo,
  index,
  phaseIndex,
  newTodoId,
  setNewTodoId,
}) => {
  const {
    reOrderTodos,
    trayLength,
    deleteTodo,
    duplicateTodo,
    changeProgress,
  } = useTodos();
  const { isOpen, onToggle } = useDisclosure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();

  const handleExpand = (e: any) => {
    if (e?.relatedTarget?.ariaLabel === "increase-progress") return;
    e.stopPropagation();
    e.target.focus();
    onToggle();
  };
  const handleIncreaseProgress = (e) => {
    e.stopPropagation();
    if (todo?.progress?.current >= 6) return;
    changeProgress(todo.id, todo?.progress?.current + 1);
  };

  const handleMoveToTray = () => {
    const source = { phase: phaseIndex, index: index };
    const destination = {
      phase: 0,
      index: trayLength + 1,
    };
    reOrderTodos(source, destination);
  };

  const handleCheckTodo = () => {
    if (todo.repeats) {
      handleMoveToTray();
      toast({
        title: "Moved to Tray!",
        description: "You've made good progress so far!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Well Done!",
        description: "You've made good progress so far!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

      deleteTodo(todo.id);
    }
  };

  const day = new Date().getDay();
  const dayNum = day === 6 ? 1 : day + 2;
  const isDoneToday = todo.progress.current === dayNum;

  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided: any) => (
        <Box
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={handleExpand}
          onBlur={(e) => isOpen && handleExpand(e)}
          position="relative"
          role="group"
          w="100%"
          maxWidth="220px"
          minWidth="200px"
          bg="gray.700"
          borderRadius="xl"
        >
          {todo.repeats && (
            <Box
              position="absolute"
              left={0}
              bottom={0}
              w="100%"
              borderRadius="xl"
              height="25px"
              overflow="hidden"
            >
              <Box
                w={(todo?.progress?.current * 100) / 6 + "%"}
                bg={!isDoneToday ? "whiteAlpha.300" : "green.500"}
                position="absolute"
                left={0}
                bottom={0}
                borderRadius="10px"
                height="4px"
                transition="all 0.2s ease"
              />
            </Box>
          )}
          {/* <Progress
            position='absolute'
            w='100%'
            borderRadius='xl'
            value={todo?.progress?.current}
            max={6}
            colorScheme='green'
            size='xs'
            bottom={0}
            left={0}
          /> */}

          <Flex
            cursor="pointer"
            direction="column"
            p={3}
            w="100%"
            position="relative"
          >
            {/* {todo.repeats && (
              <Center
                maxHeight="35px"
                minHeight="30px"
                h="40%"
                w="40px"
                right={0}
                bottom="5px"
                position="absolute"
              >
                <FiRepeat />
              </Center>
            )} */}

            {/* {isDoneToday && (
              <Center
                maxHeight='35px'
                minHeight='30px'
                h='40%'
                w='40px'
                right={0}
                bottom={0}
                position='absolute'
              >
                <FaCheck color='lightgreen' />
              </Center>
            )} */}
            <Square
              position="absolute"
              right={0}
              top={0}
              borderRadius="xl"
              w="40px"
              onClick={(e) => e.stopPropagation()}
            >
              <Menu>
                <MenuButton
                  opacity={{ base: 1, lg: 0 }}
                  _groupHover={{ opacity: 1 }}
                  maxHeight="35px"
                  borderTopRightRadius="xl"
                  borderTopLeftRadius={0}
                  borderBottomRightRadius={0}
                  w="40px"
                  minHeight="35px"
                  as={IconButton}
                  aria-label="Options"
                  icon={<BsThreeDots size={20} />}
                />
                <MenuList boxShadow="dark-lg">
                  <VStack w="100%">
                    <MenuItem onClick={() => setIsModalOpen(true)}>
                      <HStack>
                        <RiEdit2Fill size={20} />
                        <Text color="whiteAlpha.800" fontWeight={500}>
                          Edit
                        </Text>
                      </HStack>
                    </MenuItem>
                    <MenuItem onClick={() => deleteTodo(todo.id)}>
                      <HStack>
                        <FaTrash size={17} />
                        <Text color="whiteAlpha.800" fontWeight={500}>
                          Delete
                        </Text>
                      </HStack>
                    </MenuItem>
                    <MenuItem onClick={() => duplicateTodo(todo.id)}>
                      <HStack>
                        <HiDuplicate size={20} />
                        <Text color="whiteAlpha.800" fontWeight={500}>
                          Duplicate
                        </Text>
                      </HStack>
                    </MenuItem>
                    <MenuItem onClick={handleMoveToTray}>
                      <HStack>
                        <HiDuplicate size={20} />
                        <Text color="whiteAlpha.800" fontWeight={500}>
                          To Tray
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
              handleCheckTodo={handleCheckTodo}
              isOpen={isOpen}
              isRepeats={todo.repeats}
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
      position="absolute"
      left="-4px"
      zIndex={-1}
      top="50%"
      h="50%"
      w="4px"
      borderRadius="md"
      bg={`${colors[todo.accent]}.600`}
      style={{
        borderTopRightRadius: "0",
        borderBottomRightRadius: "0",
        transform: "translateY(-50%)",
      }}
    />
  );
};
