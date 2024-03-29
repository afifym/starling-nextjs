import { createContext, SetStateAction, useContext, useState } from "react";
import {
  ITodo,
  IDndParam,
  ITodosState,
  TPriority,
  ITag,
} from "../../config/interfaces";
import { v4 as uuid } from "uuid";
import { useAuth } from "../useAuth/useAuth";
import { updateTags, updateTodos } from "../../firebase/firestore";
import { usePhases } from "../usePhases/usePhases";

interface ITodosContext {
  todos: ITodosState;
  setTodos: React.Dispatch<SetStateAction<ITodosState>>;
  reOrderTodos: (source: IDndParam, destination: IDndParam) => void;
  addEmptyTodo: (phase: number) => string;
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
  tags: ITag[];
  setTags: React.Dispatch<SetStateAction<ITag[]>>;
  changeUserTags: (tags: ITag[]) => void;
  setTrayLength: React.Dispatch<SetStateAction<number>>;
  trayLength: number;
}

const TodosContext = createContext<ITodosContext>(undefined as ITodosContext);

export function useTodos() {
  return useContext(TodosContext);
}

const emptyTodos = {
  "0": [],
  "1": [],
  "2": [],
  "3": [],
  "4": [],
  "5": [],
};

export const TodosProvider: React.FC = ({ children }) => {
  const { phases } = usePhases();
  const { currentUser } = useAuth();

  const [todos, setTodos] = useState(emptyTodos as ITodosState);
  const [tags, setTags] = useState([] as ITag[]);
  const [trayLength, setTrayLength] = useState(0);
  let [prayerTimes, setPrayerTimes] = useState({} as any);

  const changePrayerTimes = (p) => {
    prayerTimes = p;
    setPrayerTimes(p);
  };

  const reOrderTodos = (source: IDndParam, destination: IDndParam): void => {
    const items = [...todos[source.phase]];
    const [reorderedItem] = items.splice(source.index, 1);

    if (source.phase === destination.phase) {
      items.splice(destination.index, 0, reorderedItem);
      const newTodos = {
        ...todos,
        [destination.phase]: items,
      };
      currentUser && updateTodos(currentUser.uid, newTodos);
      setTodos(newTodos);
    } else {
      if (source.phase === 0) setTrayLength(trayLength - 1);
      else if (destination.phase === 0) setTrayLength(trayLength + 1);

      const sourceItems = [...items];
      const destinationItems = [...todos[destination.phase]];
      destinationItems.splice(destination.index, 0, reorderedItem);
      const newTodos = {
        ...todos,
        [source.phase]: sourceItems,
        [destination.phase]: destinationItems,
      };
      currentUser && updateTodos(currentUser.uid, newTodos);
      setTodos(newTodos);
    }
  };

  const addEmptyTodo = (phase: number): string => {
    const newID = Math.floor(Math.random() * 100000) + "";
    const newTodo: ITodo = {
      id: newID,
      title: "new todo",
      accent: "0",
      tags: [],
      repeats: false,
      progress: { current: 0, goal: 100 },
      priority: "1",
    };

    const newTodos = {
      ...todos,
      [phase]: [...todos[phase], newTodo],
    };
    currentUser && updateTodos(currentUser.uid, newTodos);
    setTodos(newTodos);
    return newID;
  };

  const changeTitle = (id: string, title: string): void => {
    const todosCopy = JSON.parse(JSON.stringify(todos));
    for (let phase = 0; phase < phases.length; phase++) {
      const todo = todosCopy[phase].find((t) => t.id === id);
      if (todo) {
        todo.title = title;
        currentUser && updateTodos(currentUser.uid, todosCopy);
        setTodos(todosCopy);
        return;
      }
    }
  };

  const changeAccent = (id: string, accent: string): void => {
    const todosCopy = JSON.parse(JSON.stringify(todos));

    for (let phase = 0; phase < phases.length; phase++) {
      const todo: ITodo = todosCopy[phase].find((t: ITodo) => t.id === id);
      if (todo) {
        todo.accent = accent;
        currentUser && updateTodos(currentUser.uid, todosCopy);
        setTodos(todosCopy);
        return;
      }
    }
  };

  const changeRepeats = (id: string, repeats: boolean): void => {
    const todosCopy = JSON.parse(JSON.stringify(todos));
    for (let phase = 0; phase < phases.length; phase++) {
      const todo: ITodo = todosCopy[phase].find((t: ITodo) => t.id === id);
      if (todo) {
        todo.repeats = repeats;
        currentUser && updateTodos(currentUser.uid, todosCopy);
        setTodos(todosCopy);
        return;
      }
    }
  };

  const changeProgress = (id: string, progress: number): void => {
    const todosCopy = JSON.parse(JSON.stringify(todos));
    for (let phase = 0; phase < phases.length; phase++) {
      const todo: ITodo = todosCopy[phase].find((t: ITodo) => t.id === id);
      if (todo) {
        todo.progress.current = progress;
        currentUser && updateTodos(currentUser.uid, todosCopy);
        setTodos(todosCopy);
        return;
      }
    }
  };

  const changePriority = (id: string, priority: TPriority): void => {
    const todosCopy = JSON.parse(JSON.stringify(todos));
    for (let phase = 0; phase < phases.length; phase++) {
      const todo: ITodo = todosCopy[phase].find((t: ITodo) => t.id === id);
      if (todo) {
        todo.priority = priority;
        currentUser && updateTodos(currentUser.uid, todosCopy);
        setTodos(todosCopy);
        return;
      }
    }
  };

  const changeTags = (id: string, tagIDs: string[]): void => {
    const todosCopy = JSON.parse(JSON.stringify(todos));
    for (let phase = 0; phase < phases.length; phase++) {
      const todo: ITodo = todosCopy[phase].find((t: ITodo) => t.id === id);
      if (todo) {
        todo.tags = [...tagIDs];
        currentUser && updateTodos(currentUser.uid, todosCopy);
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
    currentUser && updateTodos(currentUser.uid, todosCopy);
    setTodos(todosCopy);
  };

  const deleteTodo = (todoID: string): void => {
    const todosCopy = JSON.parse(JSON.stringify(todos));
    for (let phase = 0; phase < phases.length; phase++) {
      todosCopy[phase] = todosCopy[phase].filter(({ id }) => id !== todoID);
    }
    currentUser && updateTodos(currentUser.uid, todosCopy);
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
        currentUser && updateTodos(currentUser.uid, todosCopy);
        setTodos(todosCopy);
        return;
      }
    }
  };

  const changeUserTags = (tags: ITag[]): void => {
    currentUser && updateTags(currentUser.uid, tags);
    setTags(tags);
  };

  const value = {
    todos,
    setTodos,
    reOrderTodos,
    addEmptyTodo,
    changeTitle,
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
    tags,
    setTags,
    changeUserTags,
    prayerTimes,
    setPrayerTimes,
    changePrayerTimes,
    setTrayLength,
    trayLength,
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
