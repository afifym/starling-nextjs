import axios from 'axios';

const api = 'https://starling-b131b-default-rtdb.firebaseio.com';

export const fetchTodos = async () => {
  const endpoint = `${api}/Todos.json`;
  const response = await axios.get(endpoint);
  const data = response.data;
  return data;
};

export const addTodo = async (data) => {
  const endpoint = `${api}/Todos.json`;
  const response = await axios.post(endpoint, data);
  return response;
};

export const updateTodo = async (id, data) => {
  const endpoint = `${api}/Todos/${id}.json`;
  const response = await axios.put(endpoint, data);
  return response;
};

export const deleteTodo = async (id) => {
  const endpoint = `${api}/Todos/${id}.json`;
  const response = await axios.delete(endpoint);
  return response;
};
