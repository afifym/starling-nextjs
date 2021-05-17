import { createContext, SetStateAction, useContext, useState } from 'react';
import { todos } from '../../config/data/mock';
import {
  ITodo,
  IDndParam,
  IUpdates,
  ITodosState,
} from '../../config/interfaces';

interface ITodosContext {
  todos: ITodosState;
  setTodos: React.Dispatch<SetStateAction<ITodosState>>;
  reOrderTodos: (source: IDndParam, destination: IDndParam) => void;
  addEmptyTodo: (phase: number) => string;
  changeTitle: (id: string, title: string) => void;
  updateTodo: (id: string, updates: IUpdates) => void;
  getTodosByPhase: (phase: number) => ITodo[];
  getTodo: (id: string) => ITodo;
}

const initialState: ITodosState = todos;
const phases = [0, 1, 2, 3, 4];
const TodosContext = createContext<ITodosContext>(undefined as ITodosContext);

export function useTodos() {
  return useContext(TodosContext);
}

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState<ITodosState>(initialState);

  const reOrderTodos = (source: IDndParam, destination: IDndParam): void => {
    const items = [...todos[source.phase]];
    const [reorderedItem] = items.splice(source.index, 1);

    if (source.phase === destination.phase) {
      items.splice(destination.index, 0, reorderedItem);
      setTodos({
        ...todos,
        [destination.phase]: items,
      });
    } else {
      const sourceItems = [...items];
      const destinationItems = [...todos[destination.phase]];
      destinationItems.splice(destination.index, 0, reorderedItem);

      setTodos({
        ...todos,
        [source.phase]: sourceItems,
        [destination.phase]: destinationItems,
      });
    }
  };

  const addEmptyTodo = (phase: number): string => {
    const newID = Math.floor(Math.random() * 100000) + '';
    const newTodo: ITodo = {
      id: newID,
      title: '',
      accent: 0,
      tags: [],
      repeats: false,
      progress: { current: 0, goal: 1 },
    };

    setTodos({
      ...todos,
      [phase]: [...todos[phase], newTodo],
    });
    return newID;
  };

  const changeTitle = (id: string, title: string): void => {
    const todosCopy = JSON.parse(JSON.stringify(todos));
    for (let phase = 0; phase < phases.length; phase++) {
      const todo = todosCopy[phase].find((t) => t.id === id);
      if (todo) {
        todo.title = title;
        break;
      }
    }
    setTodos(todosCopy);
  };

  const updateTodo = (id: string, updates: IUpdates): void => {
    console.log('UPDATES: ', updates);
    const todosCopy = JSON.parse(JSON.stringify(todos));
    for (let phase = 0; phase < phases.length; phase++) {
      const todo: ITodo = todosCopy[phase].find((t: ITodo) => t.id === id);
      if (todo) {
        for (const prop in updates) {
          todo[prop] = updates[prop];
        }
        break;
      }
    }
    setTodos(todosCopy);
  };

  const getTodosByPhase = (phase: number): ITodo[] => {
    return todos[phase];
  };

  const getTodo = (id: string): ITodo => {
    for (let phase = 0; phase < phases.length; phase++) {
      const todo: ITodo = todos[phase].find((t: ITodo) => t.id === id);
      if (todo) return todo;
    }
  };

  const value = {
    todos,
    setTodos,
    reOrderTodos,
    addEmptyTodo,
    changeTitle,
    updateTodo,
    getTodosByPhase,
    getTodo,
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
