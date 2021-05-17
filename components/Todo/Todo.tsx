import React from 'react';
import styled, { css } from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import TodoTitleInput from './components/TodoTitleInput/TodoTitleInput';
import TodoExpansion from './components/TodoExpansion/TodoExpansion';
import { accents } from '../../config/styles/theme';
import { useTodos } from '../../logic/useTodos/useTodos';
import useForm from '../../logic/useForm/useForm';
import { IProgress, ITodo, IUpdates } from '../../config/interfaces';
import Tags from './components/Tags/Tags';

interface IProps {
  todo: ITodo;
  index: number;
  newTodo: string;
  setNewTodo: React.Dispatch<React.SetStateAction<string>>;
  expandedTodo: string;
  setExpandedTodo: React.Dispatch<React.SetStateAction<string>>;
}

const Todo: React.FC<IProps> = ({
  todo,
  index,
  newTodo,
  setNewTodo,
  expandedTodo,
  setExpandedTodo,
}) => {
  const { formData, handleFormChange } = useForm({
    title: todo.title,
    accent: todo.accent,
    tags: todo.tags,
    repeats: todo.repeats,
    progress: todo.progress,
  } as IUpdates);
  const { updateTodo } = useTodos();
  const isExpanded = expandedTodo === todo.id;

  const handleBlur = (e) => {
    console.log('Todo BLUR');
    if (e.currentTarget?.contains(e.relatedTarget)) return;
    setExpandedTodo(null);
    setNewTodo(null);
    updateTodo(todo.id, formData);
  };

  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided: any) => (
        <Wrapper
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() => setExpandedTodo(todo.id)}
          isExpanded={isExpanded}
          accent={todo.accent ?? '#000000'}
          onBlur={handleBlur}
          progress={formData.progress}
          hasTags={todo.tags.length > 0}
        >
          <span className='progress-bar'></span>
          <header className='header'>
            {newTodo === todo.id ? (
              <TodoTitleInput
                todoTitle={todo.title}
                todoID={todo.id}
                setNewTodo={setNewTodo}
                hasTags={todo.tags.length > 0}
              />
            ) : (
              <h3 className='todo-title'>{todo.title}</h3>
            )}
            <Tags id={todo.id} isExpanded={isExpanded} />
          </header>

          {isExpanded && (
            <TodoExpansion
              formData={formData}
              handleFormChange={handleFormChange}
              data-testid='todo-settings'
            />
          )}
        </Wrapper>
      )}
    </Draggable>
  );
};

export default Todo;

// #####################
// Styling
// #####################

interface IWrapperProps {
  isExpanded: boolean;
  accent: number;
  progress: IProgress;
  hasTags: boolean;
}
const Wrapper = styled.div<IWrapperProps>`
  & {
    cursor: pointer !important;
    margin: 0.3em 0;
    width: 85%;
    min-width: 220px;
    height: ${({ hasTags }) => (hasTags ? '4em' : '3em')};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    transition: opacity 0.1s ease, height 0.2s ease-out;
    background-color: ${({ theme }) => theme.colors.dark2};

    border-left: 4px solid black;
    border-color: ${({ accent }) => accents[accent]};
    border-radius: ${({ theme }) => theme.borderRadiuses.borderRadius1};
    position: relative;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    overflow: hidden;

    &:hover {
      opacity: 0.8;
    }
  }

  .progress-bar {
    position: absolute;
    height: 100%;
    left: 0;
    top: 0;

    background-color: ${({ theme }) => theme.colors.dark3};
    transition: all 0.1s ease;

    width: ${({ progress }) => progress.current * 100}%;

    ${({ progress }) =>
      progress.current === 1 &&
      css`
        background-color: #368336;
      `};
  }

  .header {
    padding: 0 0.8em;
    padding-top: 1em;
    width: 100%;
    height: ${({ isExpanded }) => (isExpanded ? 'auto' : '100%')};
    z-index: 3;

    .todo-title {
      /* margin-top: 1em; */
      width: 100%;
      color: ${({ theme }) => theme.colors.light1};
      font-size: 1.1rem;
      font-weight: 600;
    }
  }

  ${({ isExpanded }) =>
    isExpanded &&
    css`
      height: 240px;
      cursor: auto !important;
    `}
`;
// .title-wrapper {
//   width: 100%;
//   height: ${({ isExpanded }) => (isExpanded ? 'auto' : '100%')};
//   display: flex;
// }
//   align-items: center;
