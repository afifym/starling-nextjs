import {
  useDisclosure,
  Box,
  HStack,
  VStack,
  IconButton,
  Collapse,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useTodos } from "../../logic/useTodos/useTodos";
import Todo from "../Todo/Todo";
import { Droppable } from "react-beautiful-dnd";
import { ITodo } from "../../config/interfaces";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { RiAddLine } from "react-icons/ri";

interface IProps {
  phase: number;
}

const Tray: React.FC<IProps> = ({ phase }) => {
  const { todos, addEmptyTodo } = useTodos();
  const { isOpen, onToggle } = useDisclosure();
  const [newTodoId, setNewTodoId] = useState<string>(null);

  const handleAddTodo = (): void => {
    const newID: string = addEmptyTodo(phase);
    setNewTodoId(newID);
  };

  return (
    <VStack
      position="fixed"
      zIndex={50}
      left={0}
      bottom={0}
      w="100vw"
      maxWidth="100vw"
      h="fit-content"
      m="0"
    >
      <IconButton
        variant="ghost"
        size="sm"
        w="100%"
        aria-label="toggle-tray"
        onClick={onToggle}
        icon={
          isOpen ? (
            <MdKeyboardArrowDown style={{ pointerEvents: "none" }} size={25} />
          ) : (
            <MdKeyboardArrowUp style={{ pointerEvents: "none" }} size={25} />
          )
        }
      />
      <Collapse style={{ margin: 0 }} in={isOpen} animateOpacity>
        <Droppable droppableId={`${phase}`} direction="horizontal">
          {(provided: any) => (
            <Box
              boxShadow="dark-lg"
              w="100vw"
              bg="gray.800"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <HStack
                px={3}
                spacing={5}
                w="100vw"
                h="120px"
                maxWidth="100vw"
                overflowX="auto"
                overflowY="hidden"
              >
                {todos[phase] &&
                  todos[phase]?.map((todo: ITodo, i: number) => (
                    <Todo
                      key={todo.id}
                      phaseIndex={0}
                      todo={todo}
                      index={i}
                      newTodoId={newTodoId}
                      setNewTodoId={setNewTodoId}
                    />
                  ))}
                {provided.placeholder}

                <Button
                  size="sm"
                  variant="ghost"
                  color="whiteAlpha.500"
                  justifyContent="flex-start"
                  height="50%"
                  maxWidth="220px"
                  minWidth="200px"
                  leftIcon={
                    <RiAddLine
                      fill="rgba(255, 255, 255, 0.36)"
                      style={{
                        marginBottom: "2px",
                      }}
                      size={20}
                    />
                  }
                  onClick={handleAddTodo}
                >
                  Add Todo
                </Button>
              </HStack>
            </Box>
          )}
        </Droppable>
      </Collapse>
    </VStack>
  );
};

export default Tray;
