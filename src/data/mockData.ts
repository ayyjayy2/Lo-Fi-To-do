import { List, Task } from '@/types';

export const mockTasks: Task[] = [
  {
    id: '1',
    name: 'Morning meditation',
    completed: false,
    listId: '1',
  },
  {
    id: '2',
    name: 'Read 20 pages of current book',
    completed: true,
    listId: '1',
  },
  {
    id: '3',
    name: 'Drink 8 glasses of water',
    completed: false,
    listId: '1',
  },
  {
    id: '4',
    name: 'Review weekly goals',
    completed: false,
    listId: '2',
  },
  {
    id: '5',
    name: 'Plan next week\'s meals',
    completed: false,
    listId: '2',
  },
  {
    id: '6',
    name: 'Update project timeline',
    completed: true,
    listId: '2',
  },
  {
    id: '7',
    name: 'Call mom',
    completed: false,
    listId: '3',
  },
  {
    id: '8',
    name: 'Clean kitchen',
    completed: false,
    listId: '3',
  },
  {
    id: '9',
    name: 'Water plants',
    completed: true,
    listId: '3',
  },
  {
    id: '10',
    name: 'Learn new recipe',
    completed: false,
    listId: '4',
  },
  {
    id: '11',
    name: 'Try yoga class',
    completed: false,
    listId: '4',
  },
  {
    id: '12',
    name: 'Visit local art gallery',
    completed: false,
    listId: '4',
  },
];

export const mockLists: List[] = [
  {
    id: '1',
    name: 'Daily Habits',
    createdDate: new Date('2024-01-15'),
    tasks: mockTasks.filter(task => task.listId === '1'),
  },
  {
    id: '2',
    name: 'Work Goals',
    createdDate: new Date('2024-01-16'),
    tasks: mockTasks.filter(task => task.listId === '2'),
  },
  {
    id: '3',
    name: 'Home & Family',
    createdDate: new Date('2024-01-17'),
    tasks: mockTasks.filter(task => task.listId === '3'),
  },
  {
    id: '4',
    name: 'Personal Growth',
    createdDate: new Date('2024-01-18'),
    tasks: mockTasks.filter(task => task.listId === '4'),
  },
];