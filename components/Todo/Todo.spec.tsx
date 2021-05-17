import React from 'react';
import { ITodo } from '../../config/interfaces';
import { render } from '../../config/test/test-utils';
import Todo from './Todo';

it('collabsed by default', () => {
  const props = {
    todo: {
      id: '1234567',
      accent: 0,
      progress: 0.5,
      title: 'Todo',
      type: 'task',
    },

    index: 0,
    adding: { id: '' },
    setAdding: jest.fn(),
    open: { id: '' },
    setOpen: jest.fn(),
  };

  const { queryByTestId } = render(<Todo {...props} />, {});

  expect(queryByTestId('todo-settings')).toBeNull();
});
