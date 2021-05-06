import { createContext, useContext, useState } from 'react';
import { accents } from '../styles/theme';

const initialState = {
  0: [
    {
      id: '1',
      title: 'Reading',
      accent: 0,
      type: 'task',
      progress: 0,
    },
    {
      id: '2',
      title: 'Working',
      accent: 1,
      type: 'habit',
      progress: 0.25,
    },
    {
      id: '3',
      title: 'Eating',
      accent: 2,
      type: 'goal',
      progress: 0.5,
    },
    {
      id: '4',
      title: 'Playing',
      accent: 3,
      type: 'task',
      progress: 0.75,
    },
  ],
  1: [
    {
      id: '5',
      title: 'Reading',
      accent: 4,
      type: 'habit',
      progress: 1,
    },
    {
      id: '6',
      title: 'Working',
      accent: 3,
      type: 'goal',
      progress: 0,
    },
    {
      id: '7',
      title: 'Eating',
      accent: 0,
      type: 'task',
      progress: 0.25,
    },
    {
      id: '8',
      title: 'Playing',
      accent: 1,
      type: 'habit',
      progress: 0.5,
    },
  ],
  2: [
    {
      id: '9',
      title: 'Reading',
      accent: 2,
      type: 'goal',
      progress: 0.75,
    },
    {
      id: '10',
      title: 'Working',
      accent: 3,
      type: 'task',
      progress: 1,
    },
    {
      id: '11',
      title: 'Eating',
      accent: 4,
      type: 'habit',
      progress: 0,
    },
    {
      id: '12',
      title: 'Playing',
      accent: 3,
      type: 'goal',
      progress: 0.25,
    },
  ],
  3: [
    {
      id: '13',
      title: 'Reading',
      accent: 0,
      type: 'task',
      progress: 0.75,
    },
    {
      id: '14',
      title: 'Working',
      accent: 1,
      type: 'habit',
      progress: 1,
    },
    {
      id: '15',
      title: 'Eating',
      accent: 2,
      type: 'goal',
      progress: 0,
    },
    {
      id: '16',
      title: 'Playing',
      accent: 3,
      type: 'task',
      progress: 0.25,
    },
  ],
  4: [
    {
      id: '17',
      title: 'Reading',
      accent: 4,
      type: 'habit',
      progress: 0.5,
    },
    {
      id: '18',
      title: 'Working',
      accent: 3,
      type: 'goal',
      progress: 0.75,
    },
    {
      id: '19',
      title: 'Eating',
      accent: 0,
      type: 'task',
      progress: 1,
    },
    {
      id: '20',
      title: 'Playing',
      accent: 1,
      type: 'habit',
      progress: 0,
    },
  ],
};

const TodosContext = createContext({});

export function useTodos() {
  return useContext(TodosContext);
}

export const TodosProvider = ({ children }) => {
  const [phases, setPhases] = useState([0, 1, 2, 3, 4]);
  const [todos, setTodos] = useState(initialState);

  const reOrderTodos = (source, destination) => {
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

  const addEmptyTodo = (phase) => {
    const newID = Math.floor(Math.random() * 100000) + '';
    setTodos({
      ...todos,
      [phase]: [...todos[phase], { id: newID, accent: accents[0] }],
    });
    return newID;
  };

  const changeTitle = (id, title) => {
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

  const updateTodo = (id, updates) => {
    console.log('UPDATES: ', updates);
    const todosCopy = JSON.parse(JSON.stringify(todos));
    for (let phase = 0; phase < phases.length; phase++) {
      const todo = todosCopy[phase].find((t) => t.id === id);
      if (todo) {
        for (const prop in updates) {
          todo[prop] = updates[prop];
        }
        break;
      }
    }
    setTodos(todosCopy);
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        reOrderTodos,
        addEmptyTodo,
        changeTitle,
        updateTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
