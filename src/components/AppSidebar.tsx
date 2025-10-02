
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

// Map themes to their sidebar background and text colors
const getSidebarThemeStyles = (theme: string): { bg: string; text: string } => {
  const themeMap: Record<string, { bg: string; text: string }> = {
    'day': { bg: 'hsl(200, 60%, 75%)', text: 'rgb(31, 41, 55)' },
    'night': { bg: 'hsl(250, 50%, 15%)', text: 'rgb(243, 244, 246)' },
    'raining': { bg: 'hsl(210, 40%, 50%)', text: 'rgb(255, 255, 255)' },
    'cats': { bg: 'hsl(280, 25%, 70%)', text: 'rgb(17, 24, 39)' },
    'autumn': { bg: 'hsl(30, 50%, 60%)', text: 'rgb(17, 24, 39)' },
    'autumn-cozy': { bg: 'hsl(25, 55%, 55%)', text: 'rgb(255, 255, 255)' },
    'autumn-forest': { bg: 'hsl(35, 45%, 50%)', text: 'rgb(255, 255, 255)' },
    'autumn-harvest': { bg: 'hsl(35, 45%, 60%)', text: 'rgb(17, 24, 39)' },
    'winter': { bg: 'hsl(200, 40%, 80%)', text: 'rgb(31, 41, 55)' },
    'spring': { bg: 'hsl(160, 40%, 70%)', text: 'rgb(31, 41, 55)' },
    'summer-beach': { bg: 'hsl(190, 50%, 65%)', text: 'rgb(17, 24, 39)' },
    'summer-garden': { bg: 'hsl(140, 45%, 55%)', text: 'rgb(255, 255, 255)' },
  };
  return themeMap[theme] || { bg: 'hsl(0, 0%, 98%)', text: 'hsl(0, 0%, 31%)' };
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

  const themeStyles = getSidebarThemeStyles(settings.backgroundScene);
  
  return (
    <Sidebar 
      className={`${collapsed ? 'w-14' : 'w-64'} border-border/50 transition-all duration-500 [&_[data-sidebar="sidebar"]]:!bg-transparent [&_[data-sidebar="sidebar"]]:backdrop-blur-md`}
      style={{ 
        '--sidebar-bg': themeStyles.bg,
        '--sidebar-text': themeStyles.text,
      } as React.CSSProperties}
    >
      <SidebarContent 
        className="transition-colors duration-500"
        style={{
          backgroundColor: themeStyles.bg,
          color: themeStyles.text,
        }}
      >
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
