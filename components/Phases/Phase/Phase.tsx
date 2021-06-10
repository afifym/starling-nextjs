import React, { useState } from "react";
import Todo from "../../Todo/Todo";
import { Droppable } from "react-beautiful-dnd";
import { useTodos } from "../../../logic/useTodos/useTodos";
import { ITodo } from "../../../config/interfaces";
import { Button } from "@chakra-ui/button";
import { RiAddLine } from "react-icons/ri";
import { VStack } from "@chakra-ui/layout";
import { usePhases } from "../../../logic/usePhases/usePhases";
interface IProps {
  phase: number;
}

const Phase: React.FC<IProps> = ({ phase }) => {
  const { todos, addEmptyTodo } = useTodos();
  const [newTodoId, setNewTodoId] = useState<string>(null);
  const { currentPhase } = usePhases();

  const handleAddTodo = (): void => {
    const newID: string = addEmptyTodo(phase);
    setNewTodoId(newID);
  };

  return (
    <Droppable droppableId={`${phase}`}>
      {(provided: any) => (
        <VStack
          bg={currentPhase === phase ? "blackAlpha.300" : ""}
          borderRadius={currentPhase === phase ? "lg" : ""}
          pt={4}
          borderRight={
            !(phase % 2) ? { lg: "1px solid hsl(217, 15%, 28%)" } : ""
          }
          borderLeft={
            !(phase % 2) ? { lg: "1px solid hsl(217, 15%, 28%)" } : ""
          }
          borderBottom={{ base: "1px solid hsl(217, 15%, 28%)", lg: "none" }}
          w={{ base: "100%", md: "20%" }}
          minHeight="200px"
          mb={3}
          pb={3}
          px={9}
          h="100%"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {todos &&
            todos[phase]?.map((todo: ITodo, i: number) => (
              <Todo
                phaseIndex={phase}
                key={todo.id}
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
            w="100%"
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
        </VStack>
      )}
    </Droppable>
  );
};

export default Phase;
