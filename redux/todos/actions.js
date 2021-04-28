export const add_todo = () => {
  return { type: 'ADD_TODO' };
};

export const remove_todo = (id) => {
  return { type: 'REMOVE_TODO', payload: id };
};
