export interface ITodo {
  id: string;
  title: string;
  accent: string;
  tags: string[];
  repeats: boolean;
  priority: TPriority;
  progress: { current: number; goal: number };
}

export interface IProgress {
  current: number;
  goal: number;
}

export interface ITodosState {
  '-1': ITodo[];
  '0': ITodo[];
  '1': ITodo[];
  '2': ITodo[];
  '3': ITodo[];
  '4': ITodo[];
}

export interface IDndParam {
  phase: number;
  index: number;
}

export interface IUpdates {
  title?: string;
  accent?: string;
  tags?: string[];
  repeats: boolean;
  priority: '0' | '1' | '2' | '3';
  progress?: { current: number; goal: number };
}

export interface IUserData {
  tags: ITag[];
  darkMode: false;
}

export interface ITag {
  id: string;
  name: string;
  color: string;
}

export type TPriority = '0' | '1' | '2' | '3';
