import { createContext, SetStateAction, useContext, useState } from 'react';
import { todos } from '../../config/data/mock';
import {
  ITodo,
  IDndParam,
  IUpdates,
  ITodosState,
  TPriority,
  ITag,
} from '../../config/interfaces';
import { v4 as uuid } from 'uuid';

interface ITodosContext {
  todos: ITodosState;
  setTodos: React.Dispatch<SetStateAction<ITodosState>>;
  reOrderTodos: (source: IDndParam, destination: IDndParam) => void;
  addEmptyTodo: (phase: number) => string;
  updateTodo: (id: string, updates: IUpdates) => void;
  getTodosByPhase: (phase: number) => ITodo[];
  getTodo: (id: string) => ITodo;
  changeAccent: (id: string, accent: string) => void;
  changeRepeats: (id: string, repeats: boolean) => void;
  changeProgress: (id: string, progress: number) => void;
  changeTitle: (id: string, title: string) => void;
  changePriority: (id: string, priority: TPriority) => void;
  changeTags: (id: string, tagIDs: string[]) => void;
  removeTag: (id: string) => void;
  deleteTodo: (todoID: string) => void;
  duplicateTodo: (todoID: string) => void;
  phase: number;
  setPhase: React.Dispatch<SetStateAction<number>>;
}

const initialState: ITodosState = todos;
const phases = [0, 1, 2, 3, 4, 5];
const TodosContext = createContext<ITodosContext>(undefined as ITodosContext);

export function useTodos() {
  return useContext(TodosContext);
}

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState<ITodosState>(initialState);
  const [tags, setTags] = useState([] as ITag[]);
  const [phase, setPhase] = useState(0);

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
      title: 'new todo',
      accent: '0',
      tags: [],
      repeats: false,
      progress: { current: 10, goal: 100 },
      priority: '1',
    };

    setTodos({
      ...todos,
      [phase]: [...todos[phase], newTodo],
    });
    return newID;
  };

  const changeTitle = (id: string, title: string): void => {
    console.log('change title: ', id, title);
    const todosCopy = JSON.parse(JSON.stringify(todos));
    for (let phase = 0; phase < phases.length; phase++) {
      const todo = todosCopy[phase].find((t) => t.id === id);
      if (todo) {
        todo.title = title;
        setTodos(todosCopy);
        return;
      }
    }
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

  const changeAccent = (id: string, accent: string): void => {
    console.log('change accent: ', id, accent);
    const todosCopy = JSON.parse(JSON.stringify(todos));

    for (let phase = 0; phase < phases.length; phase++) {
      const todo: ITodo = todosCopy[phase].find((t: ITodo) => t.id === id);
      if (todo) {
        todo.accent = accent;
        setTodos(todosCopy);
        return;
      }
    }
  };

  const changeRepeats = (id: string, repeats: boolean): void => {
    console.log('change repeats: ', id, repeats);
    const todosCopy = JSON.parse(JSON.stringify(todos));
    for (let phase = 0; phase < phases.length; phase++) {
      const todo: ITodo = todosCopy[phase].find((t: ITodo) => t.id === id);
      if (todo) {
        todo.repeats = repeats;
        setTodos(todosCopy);
        return;
      }
    }
  };

  const changeProgress = (id: string, progress: number): void => {
    console.log('change progress: ', id, progress);
    const todosCopy = JSON.parse(JSON.stringify(todos));
    for (let phase = 0; phase < phases.length; phase++) {
      const todo: ITodo = todosCopy[phase].find((t: ITodo) => t.id === id);
      if (todo) {
        todo.progress.current = progress;
        setTodos(todosCopy);
        return;
      }
    }
  };

  const changePriority = (id: string, priority: TPriority): void => {
    console.log('change priority: ', id, priority);
    const todosCopy = JSON.parse(JSON.stringify(todos));
    for (let phase = 0; phase < phases.length; phase++) {
      const todo: ITodo = todosCopy[phase].find((t: ITodo) => t.id === id);
      if (todo) {
        todo.priority = priority;
        setTodos(todosCopy);
        return;
      }
    }
  };

  const changeTags = (id: string, tagIDs: string[]): void => {
    console.log('change tagIDs: ', id, tagIDs);
    const todosCopy = JSON.parse(JSON.stringify(todos));
    for (let phase = 0; phase < phases.length; phase++) {
      const todo: ITodo = todosCopy[phase].find((t: ITodo) => t.id === id);
      if (todo) {
        todo.tags = [...tagIDs];
        setTodos(todosCopy);
        return;
      }
    }
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

  const removeTag = (tagID: string) => {
    const todosCopy = JSON.parse(JSON.stringify(todos));
    for (let phase = 0; phase < phases.length; phase++) {
      todosCopy[phase] = todosCopy[phase].map((todo) => ({
        ...todo,
        tags: [...todo.tags.filter((id) => id !== tagID)],
      }));
    }
    setTodos(todosCopy);
  };

  const deleteTodo = (todoID: string): void => {
    const todosCopy = JSON.parse(JSON.stringify(todos));
    for (let phase = 0; phase < phases.length; phase++) {
      todosCopy[phase] = todosCopy[phase].filter(({ id }) => id !== todoID);
    }
    setTodos(todosCopy);
  };

  const duplicateTodo = (todoID: string): void => {
    const todosCopy = JSON.parse(JSON.stringify(todos));
    for (let phase = 0; phase < phases.length; phase++) {
      const todo = todosCopy[phase].find(({ id }) => id === todoID);
      if (todo) {
        const newTodo: ITodo = { ...todo };
        newTodo.id = uuid();
        todosCopy[phase] = [...todosCopy[phase], newTodo];
        setTodos(todosCopy);
        return;
      }
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
    changeAccent,
    changeRepeats,
    changeProgress,
    changePriority,
    changeTags,
    removeTag,
    deleteTodo,
    duplicateTodo,
    phase,
    setPhase,
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
