import { useState } from 'react';
import { Task, Settings } from '@/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2, Edit3 } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  settings: Settings;
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string, newName: string) => void;
}

export const TaskItem = ({ task, settings, onToggle, onDelete, onEdit }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.name);

  const handleSaveEdit = () => {
    if (editValue.trim()) {
      onEdit(task.id, editValue.trim());
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      setEditValue(task.name);
      setIsEditing(false);
    }
  };

  // Hide completed tasks if setting is enabled
  if (task.completed && settings.taskCompletionStyle === 'hide') {
    return null;
  }

  return (
    <div 
      className={`group flex items-center gap-3 p-3 rounded-lg bg-card/60 backdrop-blur-sm border border-border/50 transition-all duration-300 hover:bg-card/80 hover:shadow-gentle animate-fade-in ${
        task.completed ? 'opacity-75' : ''
      }`}
    >
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onToggle(task.id)}
        className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
      />
      
      {isEditing ? (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSaveEdit}
          onKeyDown={handleKeyPress}
          className="flex-1 bg-transparent border-none outline-none text-foreground"
          autoFocus
        />
      ) : (
        <span 
          className={`flex-1 text-foreground transition-all duration-200 ${
            task.completed && settings.taskCompletionStyle === 'strikethrough' 
              ? 'line-through opacity-60' 
              : ''
          }`}
          onDoubleClick={() => setIsEditing(true)}
        >
          {task.name}
        </span>
      )}

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsEditing(true)}
          className="h-8 w-8 p-0 hover:bg-primary/10"
        >
          <Edit3 className="h-3 w-3" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(task.id)}
          className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
        >
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  );
};