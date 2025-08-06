import { useState } from 'react';
import { Task, Settings } from '@/types';
import { TaskItem } from './TaskItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  settings: Settings;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (taskId: string, newName: string) => void;
  onAddTask: (taskName: string) => void;
}

export const TaskList = ({
  tasks,
  settings,
  onToggleTask,
  onDeleteTask,
  onEditTask,
  onAddTask,
}: TaskListProps) => {
  const [newTaskName, setNewTaskName] = useState('');

  const handleAddTask = () => {
    if (newTaskName.trim()) {
      onAddTask(newTaskName.trim());
      setNewTaskName('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const visibleTasks = settings.taskCompletionStyle === 'hide' 
    ? tasks.filter(task => !task.completed)
    : tasks;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        {visibleTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            settings={settings}
            onToggle={onToggleTask}
            onDelete={onDeleteTask}
            onEdit={onEditTask}
          />
        ))}
        
        {visibleTasks.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-lg">No tasks yet</p>
            <p className="text-sm">Add your first task below</p>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="Add a new task..."
          value={newTaskName}
          onChange={(e) => setNewTaskName(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 bg-card/60 backdrop-blur-sm border-border/50"
        />
        <Button 
          onClick={handleAddTask}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};