
import { List } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle } from 'lucide-react';
import { EditableTitle } from './EditableTitle';

interface ListCardProps {
  list: List;
  onClick: () => void;
  onEditTitle: (newTitle: string) => void;
}

export const ListCard = ({ list, onClick, onEditTitle }: ListCardProps) => {
  const completedTasks = list.tasks.filter(task => task.completed).length;
  const totalTasks = list.tasks.length;
  const completionPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger onClick if clicking on the editable title
    if ((e.target as HTMLElement).closest('.editable-title')) {
      return;
    }
    onClick();
  };

  return (
    <Card 
      className="cursor-pointer bg-card/60 backdrop-blur-sm border-border/50 hover:bg-card/80 hover:shadow-soft transition-all duration-300 hover:scale-105 animate-fade-in group"
      onClick={handleCardClick}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium text-foreground flex items-center justify-between">
          <div className="editable-title flex-1 mr-2">
            <EditableTitle
              title={list.name}
              onSave={onEditTitle}
              className="text-lg font-medium"
            />
          </div>
          <Badge variant="secondary" className="text-xs">
            {completedTasks}/{totalTasks}
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
    </Card>
  );
};
