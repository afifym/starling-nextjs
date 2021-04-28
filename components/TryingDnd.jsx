import { DragDropContext } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Phase = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Todo = styled.div`
  width: 200px;
  height: 70px;
  margin: 1em 0;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TryingDnd = () => {
  return (
    <DragDropContext>
      <Droppable droppableId='0'>
        {(provided) => (
          <Phase {...provided.droppableProps} ref={provided.innerRef}>
            <Draggable key={'wwwww'} draggableId={'wwwww'} index={0}>
              {(provided) => (
                <Todo
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                >
                  <h3>Todo 0</h3>
                </Todo>
              )}
            </Draggable>
            <Draggable key={'sdawda'} draggableId={'sdawda'} index={1}>
              {(provided) => (
                <Todo
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                >
                  <h3>Todo 4</h3>
                </Todo>
              )}
            </Draggable>
            <Draggable key={'sdawdasda'} draggableId={'sdawdasda'} index={2}>
              {(provided) => (
                <Todo
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                >
                  <h3>Todo 6</h3>
                </Todo>
              )}
            </Draggable>
            {provided.placeholder}
          </Phase>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TryingDnd;
