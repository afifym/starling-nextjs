import { ITag, ITodosState } from '../interfaces';

export const userTags: ITag[] = [
  { id: '1', name: 'goal', color: 0 },
  { id: '2', name: 'task', color: 1 },
  { id: '3', name: 'habit', color: 2 },
  { id: '4', name: 'todo', color: 3 },
];

export const todos: ITodosState = {
  '-1': [
    {
      id: '321',
      title: 'Reading',
      accent: 2,
      tags: ['1', '2'],
      repeats: false,
      progress: { current: 0, goal: 3 },
    },
    {
      id: '412',
      title: 'Working',
      accent: 3,
      tags: [],
      repeats: false,
      progress: { current: 0, goal: 3 },
    },
  ],
  '0': [
    {
      id: '1',
      title: 'Reading',
      accent: 0,
      tags: ['3', '4'],
      repeats: false,
      progress: { current: 0, goal: 3 },
    },
    {
      id: '2',
      title: 'Working',
      accent: 1,
      tags: [],
      repeats: false,
      progress: { current: 0, goal: 3 },
    },
  ],
  '1': [
    {
      id: '5',
      title: 'Reading',
      accent: 4,
      tags: ['1', '2'],

      repeats: false,
      progress: { current: 0, goal: 3 },
    },
    {
      id: '6',
      title: 'Working',
      accent: 3,
      tags: ['3', '4'],

      repeats: false,
      progress: { current: 0, goal: 3 },
    },
  ],
  '2': [
    {
      id: '9',
      title: 'Reading',
      accent: 2,
      tags: [],
      repeats: false,
      progress: { current: 0, goal: 3 },
    },
    {
      id: '10',
      title: 'Working',
      accent: 3,
      tags: ['1', '2'],

      repeats: false,
      progress: { current: 0, goal: 3 },
    },
  ],
  '3': [
    {
      id: '13',
      title: 'Reading',
      accent: 0,
      tags: ['3', '4'],

      repeats: false,
      progress: { current: 0, goal: 3 },
    },
    {
      id: '14',
      title: 'Working',
      accent: 1,
      tags: ['1', '2'],

      repeats: false,
      progress: { current: 0, goal: 3 },
    },
  ],
  '4': [
    {
      id: '17',
      title: 'Reading',
      accent: 4,
      tags: ['3', '4'],

      repeats: false,
      progress: { current: 0, goal: 3 },
    },
    {
      id: '18',
      title: 'Working',
      accent: 3,
      tags: ['1', '2'],

      repeats: false,
      progress: { current: 0, goal: 3 },
    },
  ],
};
