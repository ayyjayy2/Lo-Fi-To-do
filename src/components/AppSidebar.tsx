
import { useState } from 'react';
import { List, ViewMode, Settings } from '@/types';
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
import { LayoutGrid, List as ListIcon, Sparkles, Grid3X3, Trash2 } from 'lucide-react';
import { EditableTitle } from './EditableTitle';
import { NewListInput } from './NewListInput';
import { KawaiiDeleteDialog } from './KawaiiDeleteDialog';

interface AppSidebarProps {
  lists: List[];
  selectedListId: string | null;
  viewMode: ViewMode;
  settings: Settings;
  onSelectList: (listId: string) => void;
  onViewAllLists: () => void;
  onAddList: (name: string) => void;
  onEditList: (listId: string, newName: string) => void;
  onDeleteList: (listId: string) => void;
}

// Map themes to their sidebar background colors
const getSidebarThemeClass = (theme: string): string => {
  const themeMap: Record<string, string> = {
    'day': 'bg-[hsl(var(--sidebar-day))] text-gray-800',
    'night': 'bg-[hsl(var(--sidebar-night))] text-gray-100',
    'raining': 'bg-[hsl(var(--sidebar-raining))] text-white',
    'cats': 'bg-[hsl(var(--sidebar-cats))] text-gray-900',
    'autumn': 'bg-[hsl(var(--sidebar-autumn))] text-gray-900',
    'autumn-cozy': 'bg-[hsl(var(--sidebar-autumn-cozy))] text-white',
    'autumn-forest': 'bg-[hsl(var(--sidebar-autumn-forest))] text-white',
    'autumn-harvest': 'bg-[hsl(var(--sidebar-autumn-harvest))] text-gray-900',
    'winter': 'bg-[hsl(var(--sidebar-winter))] text-gray-800',
    'spring': 'bg-[hsl(var(--sidebar-spring))] text-gray-800',
    'summer-beach': 'bg-[hsl(var(--sidebar-summer-beach))] text-gray-900',
    'summer-garden': 'bg-[hsl(var(--sidebar-summer-garden))] text-white',
  };
  return themeMap[theme] || 'bg-card/60 text-foreground';
};

export const AppSidebar = ({
  lists,
  selectedListId,
  viewMode,
  settings,
  onSelectList,
  onViewAllLists,
  onAddList,
  onEditList,
  onDeleteList,
}: AppSidebarProps) => {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const [deleteDialog, setDeleteDialog] = useState<{open: boolean, listId: string, listName: string}>({
    open: false,
    listId: '',
    listName: ''
  });

  const handleToggleView = () => {
    if (viewMode === 'all') {
      // Switch back to single view with first list if no list is selected
      if (selectedListId) {
        onSelectList(selectedListId);
      } else if (lists.length > 0) {
        onSelectList(lists[0].id);
      }
    } else {
      onViewAllLists();
    }
  };

  const handleDeleteList = (listId: string, listName: string) => {
    setDeleteDialog({
      open: true,
      listId,
      listName
    });
  };

  const handleConfirmDelete = () => {
    onDeleteList(deleteDialog.listId);
    setDeleteDialog({open: false, listId: '', listName: ''});
  };

  const sidebarThemeClasses = getSidebarThemeClass(settings.backgroundScene);
  
  return (
    <Sidebar className={`${collapsed ? 'w-14' : 'w-64'} ${sidebarThemeClasses} backdrop-blur-md border-border/50 transition-colors duration-500`}>
      <SidebarContent>
        {/* App branding */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            {!collapsed && (
              <span className="font-semibold">Cloudlist</span>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="opacity-70">
            {collapsed ? '' : 'Your Lists'}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {lists.map((list) => {
                const completedTasks = list.tasks.filter(task => task.completed).length;
                const totalTasks = list.tasks.length;
                const isSelected = selectedListId === list.id && viewMode === 'single';
                
                return (
                  <SidebarMenuItem key={list.id} className="group relative">
                    <SidebarMenuButton
                      onClick={() => onSelectList(list.id)}
                      className={`w-full justify-start pr-8 ${
                        isSelected 
                          ? 'bg-primary/10 text-primary border-r-2 border-primary' 
                          : 'hover:bg-muted/50'
                      }`}
                    >
                      <ListIcon className="h-4 w-4 mr-2 flex-shrink-0" />
                      {!collapsed && (
                        <div className="flex flex-col items-start flex-1 min-w-0">
                          <EditableTitle
                            title={list.name}
                            onSave={(newName) => onEditList(list.id, newName)}
                            className="truncate font-medium text-left"
                          />
                          <span className="text-xs opacity-70">
                            {settings.taskCompletionStyle === 'hide'
                              ? `${totalTasks - completedTasks}`
                              : `${completedTasks}/${totalTasks}`} 
                          </span>
                        </div>
                      )}
                    </SidebarMenuButton>
                    {!collapsed && lists.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/20 hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteList(list.id, list.name);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Add New List */}
        <div className="border-t border-border/50">
          <NewListInput 
            onAddList={onAddList} 
            collapsed={collapsed}
          />
        </div>

        {/* Toggle View Button */}
        <div className="p-4 mt-auto border-t border-border/50">
          <Button
            onClick={handleToggleView}
            variant={viewMode === 'all' ? 'default' : 'outline'}
            className={`w-full ${
              viewMode === 'all' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-card/60 border-border/50 hover:bg-card/80'
            }`}
          >
            {viewMode === 'all' ? (
              <>
                <ListIcon className="h-4 w-4 mr-2" />
                {!collapsed && 'Back to List'}
              </>
            ) : (
              <>
                <Grid3X3 className="h-4 w-4 mr-2" />
                {!collapsed && 'View All Lists'}
              </>
            )}
          </Button>
        </div>
      </SidebarContent>
      
      <KawaiiDeleteDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog(prev => ({...prev, open}))}
        onConfirm={handleConfirmDelete}
        listName={deleteDialog.listName}
      />
    </Sidebar>
  );
};
