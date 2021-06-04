import { ITag, ITodosState } from '../interfaces';

export const colors = ['green', 'blue', 'red', 'orange', 'purple', ''];

export const userTags: ITag[] = [
  { id: '1', name: 'goal', color: 'green' },
  { id: '2', name: 'task', color: 'blue' },
  { id: '3', name: 'habit', color: 'red' },
  { id: '4', name: 'todo', color: 'orange' },
];

export const todos: ITodosState = {
  '0': [
    {
      id: '1',
      title: 'Reading',
      accent: '0',
      tags: ['3', '4'],
      repeats: true,
      priority: '2',
      progress: { current: 30, goal: 3 },
    },
    {
      id: '2',
      title: 'Working',
      accent: '1',
      tags: [],
      repeats: true,
      priority: '3',
      progress: { current: 40, goal: 3 },
    },
  ],
  '1': [
    {
      id: '5',
      title: 'Reading',
      accent: '4',
      tags: ['1', '2'],
      repeats: true,
      priority: '0',
      progress: { current: 50, goal: 3 },
    },
    {
      id: '6',
      title: 'Working',
      accent: '3',
      tags: ['3', '4'],
      repeats: true,
      priority: '1',
      progress: { current: 60, goal: 3 },
    },
  ],
  '2': [
    {
      id: '9',
      title: 'Reading',
      accent: '2',
      tags: [],
      repeats: false,
      priority: '2',
      progress: { current: 70, goal: 3 },
    },
    {
      id: '10',
      title: 'Working',
      accent: '3',
      tags: ['1', '2'],
      repeats: false,
      priority: '3',
      progress: { current: 80, goal: 3 },
    },
  ],
  '3': [
    {
      id: '13',
      title: 'Reading',
      accent: '0',
      tags: ['3', '4'],
      repeats: false,
      priority: '0',
      progress: { current: 90, goal: 3 },
    },
    {
      id: '14',
      title: 'Working',
      accent: '1',
      tags: ['1', '2'],
      repeats: false,
      priority: '1',
      progress: { current: 100, goal: 3 },
    },
  ],
  '4': [
    {
      id: '17',
      title: 'Reading',
      accent: '4',
      tags: ['3', '4'],
      repeats: true,
      priority: '2',
      progress: { current: 0, goal: 3 },
    },
    {
      id: '18',
      title: 'Working',
      accent: '3',
      tags: ['1', '2'],
      repeats: true,
      priority: '3',
      progress: { current: 10, goal: 3 },
    },
  ],
  '5': [
    {
      id: '321',
      title: 'Reading',
      accent: '2',
      tags: ['1', '2'],
      repeats: false,
      priority: '0',
      progress: { current: 10, goal: 3 },
    },
    {
      id: '412',
      title: 'Working',
      accent: '3',
      tags: [],
      repeats: false,
      priority: '1',
      progress: { current: 20, goal: 3 },
    },
  ],
};
