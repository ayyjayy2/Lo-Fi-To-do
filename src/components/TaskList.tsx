import { useState } from 'react';
import { Task, Settings } from '@/types';
import { TaskItem } from './TaskItem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, KeyboardSensor } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface TaskListProps {
  tasks: Task[];
  settings: Settings;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (taskId: string, newName: string) => void;
  onAddTask: (taskName: string) => void;
  onReorder: (orderedIds: string[]) => void;
}

// Move SortableTask outside to prevent recreation on each render
const SortableTask = ({ 
  task, 
  settings, 
  onToggleTask, 
  onDeleteTask, 
  onEditTask 
}: { 
  task: Task; 
  settings: Settings; 
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (taskId: string, newName: string) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: task.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  } as React.CSSProperties;

  return (
    <div ref={setNodeRef} style={style}>
      <TaskItem
        task={task}
        settings={settings}
        onToggle={onToggleTask}
        onDelete={onDeleteTask}
        onEdit={onEditTask}
        dragHandle={{ attributes, listeners }}
      />
    </div>
  );
};

export const TaskList = ({
  tasks,
  settings,
  onToggleTask,
  onDeleteTask,
  onEditTask,
  onAddTask,
  onReorder,
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

  // DnD setup
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = visibleTasks.findIndex((t) => t.id === active.id);
    const newIndex = visibleTasks.findIndex((t) => t.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    const newOrder = arrayMove(visibleTasks.map((t) => t.id), oldIndex, newIndex);
    onReorder(newOrder);
  };

  return (
    <div className="space-y-4">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={visibleTasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {visibleTasks.map((task) => (
              <SortableTask 
                key={task.id} 
                task={task}
                settings={settings}
                onToggleTask={onToggleTask}
                onDeleteTask={onDeleteTask}
                onEditTask={onEditTask}
              />
            ))}

            {visibleTasks.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-lg">No tasks yet</p>
                <p className="text-sm">Add your first task below</p>
              </div>
            )}
          </div>
        </SortableContext>
      </DndContext>

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