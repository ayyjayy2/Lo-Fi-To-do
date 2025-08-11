
import { List, Task, Settings, ViewMode } from '@/types';
import { TaskList } from './TaskList';
import { ListCard } from './ListCard';
import { Button } from '@/components/ui/button';
import { Settings as SettingsIcon, SidebarOpen } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';

interface MainContentProps {
  lists: List[];
  selectedList: List | null;
  viewMode: ViewMode;
  settings: Settings;
  onSelectList: (listId: string) => void;
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (taskId: string, newName: string) => void;
  onAddTask: (taskName: string, listId: string) => void;
  onEditList: (listId: string, newName: string) => void;
  onDeleteList: (listId: string) => void;
  onOpenSettings: () => void;
  onReorderTasks: (listId: string, orderedIds: string[]) => void;
}

export const MainContent = ({
  lists,
  selectedList,
  viewMode,
  settings,
  onSelectList,
  onToggleTask,
  onDeleteTask,
  onEditTask,
  onAddTask,
  onEditList,
  onDeleteList,
  onOpenSettings,
  onReorderTasks,
}: MainContentProps) => {
  if (viewMode === 'all') {
    return (
      <div className="flex-1 p-6 relative z-10">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold text-foreground">All Lists</h1>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={onOpenSettings}
            className="bg-card/60 backdrop-blur-sm border-border/50 hover:bg-card/80"
          >
            <SettingsIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lists.map((list) => (
            <ListCard
              key={list.id}
              list={list}
              settings={settings}
              onClick={() => onSelectList(list.id)}
              onEditTitle={(newTitle) => onEditList(list.id, newTitle)}
              onDelete={() => onDeleteList(list.id)}
            />
          ))}
        </div>

        {lists.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No lists created yet</p>
            <p className="text-sm text-muted-foreground mt-2">
              Create your first list to get started!
            </p>
          </div>
        )}
      </div>
    );
  }

  if (!selectedList) {
    return (
      <div className="flex-1 p-6 relative z-10">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold text-foreground">Welcome to Cloudlist</h1>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={onOpenSettings}
            className="bg-card/60 backdrop-blur-sm border-border/50 hover:bg-card/80"
          >
            <SettingsIcon className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-4">
            Select a list from the sidebar to view your tasks
          </p>
          <p className="text-sm text-muted-foreground">
            Or click "View All Lists" to see everything at once
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 relative z-10">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <h1 className="text-2xl font-bold text-foreground">{selectedList.name}</h1>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={onOpenSettings}
          className="bg-card/60 backdrop-blur-sm border-border/50 hover:bg-card/80"
        >
          <SettingsIcon className="h-4 w-4" />
        </Button>
      </div>

      <TaskList
        tasks={selectedList.tasks}
        settings={settings}
        onToggleTask={onToggleTask}
        onDeleteTask={onDeleteTask}
        onEditTask={onEditTask}
        onAddTask={(taskName) => onAddTask(taskName, selectedList.id)}
        onReorder={(orderedIds) => onReorderTasks(selectedList.id, orderedIds)}
      />
    </div>
  );
};
