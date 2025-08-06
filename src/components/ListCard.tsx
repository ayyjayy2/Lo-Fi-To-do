import { List } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle } from 'lucide-react';

interface ListCardProps {
  list: List;
  onClick: () => void;
}

export const ListCard = ({ list, onClick }: ListCardProps) => {
  const completedTasks = list.tasks.filter(task => task.completed).length;
  const totalTasks = list.tasks.length;
  const completionPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <Card 
      className="cursor-pointer bg-card/60 backdrop-blur-sm border-border/50 hover:bg-card/80 hover:shadow-soft transition-all duration-300 hover:scale-105 animate-fade-in group"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium text-foreground flex items-center justify-between">
          {list.name}
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