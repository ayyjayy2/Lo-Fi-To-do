
import { useState } from 'react';
import { List, Settings } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, Circle, Trash2 } from 'lucide-react';
import { EditableTitle } from './EditableTitle';
import { KawaiiDeleteDialog } from './KawaiiDeleteDialog';

interface ListCardProps {
  list: List;
  settings: Settings;
  onClick: () => void;
  onEditTitle: (newTitle: string) => void;
  onDelete: () => void;
}

export const ListCard = ({ list, settings, onClick, onEditTitle, onDelete }: ListCardProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const completedTasks = list.tasks.filter(task => task.completed).length;
  const totalTasks = list.tasks.length;
  const completionPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger onClick if clicking on the editable title or delete button
    if ((e.target as HTMLElement).closest('.editable-title') || 
        (e.target as HTMLElement).closest('.delete-button')) {
      return;
    }
    onClick();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = () => {
    onDelete();
    setShowDeleteDialog(false);
  };

  return (
    <Card 
      className="cursor-pointer bg-card/60 backdrop-blur-sm border-border/50 hover:bg-card/80 hover:shadow-soft transition-all duration-300 hover:scale-105 animate-fade-in group relative"
      onClick={handleCardClick}
    >
      <Button
        variant="ghost"
        size="icon"
        className="delete-button absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/20 hover:text-destructive z-10"
        onClick={handleDelete}
      >
        <Trash2 className="h-3 w-3" />
      </Button>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium text-foreground flex items-center justify-between pr-8">
          <div className="editable-title flex-1 mr-2">
            <EditableTitle
              title={list.name}
              onSave={onEditTitle}
              className="text-lg font-medium"
            />
          </div>
          <Badge variant="secondary" className="text-xs">
            {settings.taskCompletionStyle === 'hide' ? `${totalTasks - completedTasks}` : `${completedTasks}/${totalTasks}`}
          </Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Progress bar */}
        <div className="w-full bg-muted rounded-full h-2 mb-3">
          <div 
            className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
        
        {/* Task preview */}
        <div className="space-y-1">
          {list.tasks.slice(0, 3).map((task) => (
            <div key={task.id} className="flex items-center gap-2 text-sm text-muted-foreground">
              {task.completed ? (
                <CheckCircle className="h-3 w-3 text-primary" />
              ) : (
                <Circle className="h-3 w-3" />
              )}
              <span className={task.completed ? 'line-through opacity-60' : ''}>
                {task.name}
              </span>
            </div>
          ))}
          
          {list.tasks.length > 3 && (
            <p className="text-xs text-muted-foreground mt-2">
              +{list.tasks.length - 3} more tasks
            </p>
          )}
          
          {list.tasks.length === 0 && (
            <p className="text-sm text-muted-foreground italic">No tasks yet</p>
          )}
        </div>
      </CardContent>
      
      <KawaiiDeleteDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleConfirmDelete}
        listName={list.name}
      />
    </Card>
  );
};
