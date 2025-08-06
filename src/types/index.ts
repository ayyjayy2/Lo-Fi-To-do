
export interface Task {
  id: string;
  name: string;
  completed: boolean;
  dueDate?: Date;
  listId: string;
}

export interface List {
  id: string;
  name: string;
  createdDate: Date;
  tasks: Task[];
}

export interface Settings {
  backgroundScene: string;
  taskCompletionStyle: 'strikethrough' | 'hide';
  animationsEnabled: boolean;
}

export type ViewMode = 'single' | 'all';

export interface BackgroundScene {
  id: string;
  name: string;
  preview: string;
  isDefault?: boolean;
}
