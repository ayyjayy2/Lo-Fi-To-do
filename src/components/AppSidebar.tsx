import { List, ViewMode } from '@/types';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List as ListIcon, Sparkles } from 'lucide-react';

interface AppSidebarProps {
  lists: List[];
  selectedListId: string | null;
  viewMode: ViewMode;
  onSelectList: (listId: string) => void;
  onViewAllLists: () => void;
}

export const AppSidebar = ({
  lists,
  selectedListId,
  viewMode,
  onSelectList,
  onViewAllLists,
}: AppSidebarProps) => {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';

  return (
    <Sidebar className={`${collapsed ? 'w-14' : 'w-64'} bg-card/40 backdrop-blur-md border-border/50`}>
      <SidebarContent>
        {/* App branding */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <span className="font-semibold text-foreground">TaskFlow</span>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">
            {collapsed ? '' : 'Your Lists'}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {lists.map((list) => {
                const completedTasks = list.tasks.filter(task => task.completed).length;
                const totalTasks = list.tasks.length;
                const isSelected = selectedListId === list.id;
                
                return (
                  <SidebarMenuItem key={list.id}>
                    <SidebarMenuButton
                      onClick={() => onSelectList(list.id)}
                      className={`w-full justify-start ${
                        isSelected 
                          ? 'bg-primary/10 text-primary border-r-2 border-primary' 
                          : 'hover:bg-muted/50'
                      }`}
                    >
                      <ListIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                      {!collapsed && (
                        <div className="flex flex-col items-start flex-1 min-w-0">
                          <span className="truncate font-medium">{list.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {completedTasks}/{totalTasks} tasks
                          </span>
                        </div>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* View All Lists Button */}
        <div className="p-4 mt-auto border-t border-border/50">
          <Button
            onClick={onViewAllLists}
            variant={viewMode === 'all' ? 'default' : 'outline'}
            className={`w-full ${
              viewMode === 'all' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card/60 border-border/50 hover:bg-card/80'
            }`}
          >
            <LayoutGrid className="h-4 w-4 mr-2" />
            {!collapsed && 'View All Lists'}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};