export interface ITodo {
  id: string;
  title: string;
  accent: number;
  tags: string[];
  repeats: boolean;
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
  accent?: number;
  tags?: string[];
  repeats: boolean;
  progress?: { current: number; goal: number };
}

export interface IUserData {
  tags: ITag[];
  darkMode: false;
}

export interface ITag {
  id: string;
  name: string;
  color: number;
}