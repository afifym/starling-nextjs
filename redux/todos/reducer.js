const initialState = {
  todos: [
    {
      id: 1,
      title: 'Reading',
      index: 0,
    },
    {
      id: 2,
      title: 'Working',
      index: 1,
    },
    {
      id: 3,
      title: 'Eating',
      index: 2,
    },
    {
      id: 4,
      title: 'Playing',
      index: 3,
    },
  ],
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, { id: Math.random() * 100000 }],
      };
  }
};

export default todosReducer;
