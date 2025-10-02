
import { useState, useEffect } from 'react';
import { List, Task, Settings, ViewMode } from '@/types';
import { mockLists, mockTasks } from '@/data/mockData';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { AppSidebar } from '@/components/AppSidebar';
import { MainContent } from '@/components/MainContent';
import { SettingsDialog } from '@/components/SettingsDialog';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const { toast } = useToast();
  
  // State management
  const [lists, setLists] = useLocalStorage<List[]>('cloudlist-lists', mockLists);
  const [allTasks, setAllTasks] = useLocalStorage<Task[]>('cloudlist-tasks', mockTasks);
  const [selectedListId, setSelectedListId] = useState<string | null>(lists[0]?.id || null);
  const [viewMode, setViewMode] = useState<ViewMode>('single');
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  const [settings, setSettings] = useLocalStorage<Settings>('cloudlist-settings', {
    backgroundScene: 'day',
    taskCompletionStyle: 'strikethrough',
    animationsEnabled: true,
  });

  // Update lists with current tasks
  const listsWithTasks = lists.map(list => {
    const tasksForList = allTasks.filter(task => task.listId === list.id);
    const sortedTasks = [...tasksForList].sort((a, b) => {
      const ao = a.order;
      const bo = b.order;
      if (ao != null && bo != null) return ao - bo;
      if (ao != null) return -1;
      if (bo != null) return 1;
      return allTasks.indexOf(a) - allTasks.indexOf(b);
    });
    return {
      ...list,
      tasks: sortedTasks,
    };
  });

  const selectedList = listsWithTasks.find(list => list.id === selectedListId) || null;

  // Event handlers
  const handleSelectList = (listId: string) => {
    setSelectedListId(listId);
    setViewMode('single');
  };

  const handleViewAllLists = () => {
    setViewMode('all');
    setSelectedListId(null);
  };

  const handleAddList = (name: string) => {
    const newList: List = {
      id: Date.now().toString(),
      name,
      createdDate: new Date(),
      tasks: [],
    };
    
    setLists(prevLists => [...prevLists, newList]);
    setSelectedListId(newList.id);
    setViewMode('single');
    
    toast({
      title: "List created! 🎉",
      description: name,
      duration: 2000,
    });
  };

  const handleEditList = (listId: string, newName: string) => {
    setLists(prevLists =>
      prevLists.map(list =>
        list.id === listId ? { ...list, name: newName } : list
      )
    );
    
    toast({
      title: "List updated",
      description: "Your changes have been saved",
      duration: 2000,
    });
  };

  const handleDeleteList = (listId: string) => {
    const listToDelete = lists.find(list => list.id === listId);
    
    if (!listToDelete) return;
    
    // Remove the list
    setLists(prevLists => prevLists.filter(list => list.id !== listId));
    
    // Remove all tasks associated with this list
    setAllTasks(prevTasks => prevTasks.filter(task => task.listId !== listId));
    
    // Handle list selection after deletion
    if (selectedListId === listId) {
      const remainingLists = lists.filter(list => list.id !== listId);
      if (remainingLists.length > 0) {
        setSelectedListId(remainingLists[0].id);
        setViewMode('single');
      } else {
        setSelectedListId(null);
        setViewMode('single');
      }
    }
    
    toast({
      title: "List deleted",
      description: listToDelete.name,
      duration: 2000,
    });
  };

  const handleToggleTask = (taskId: string) => {
    setAllTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed }
          : task
      )
    );
    
    const task = allTasks.find(t => t.id === taskId);
    if (task) {
      toast({
        title: task.completed ? "Task marked as incomplete" : "Task completed! ✨",
        description: task.name,
        duration: 2000,
      });
    }
  };

  const handleDeleteTask = (taskId: string) => {
    const task = allTasks.find(t => t.id === taskId);
    setAllTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
    
    if (task) {
      toast({
        title: "Task deleted",
        description: task.name,
        duration: 2000,
      });
    }
  };

  const handleEditTask = (taskId: string, newName: string) => {
    setAllTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, name: newName } : task
      )
    );
    
    toast({
      title: "Task updated",
      description: "Your changes have been saved",
      duration: 2000,
    });
  };

  const handleAddTask = (taskName: string, listId: string) => {
    const listTasks = allTasks.filter(t => t.listId === listId);
    
    // Get the maximum order value, ensuring we handle undefined orders correctly
    let maxOrder = -1;
    if (listTasks.length > 0) {
      const orders = listTasks.map(t => t.order ?? -1).filter(o => o >= 0);
      maxOrder = orders.length > 0 ? Math.max(...orders) : listTasks.length - 1;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      name: taskName,
      completed: false,
      listId,
      order: maxOrder + 1,
    };
    
    setAllTasks(prevTasks => [...prevTasks, newTask]);
    
    toast({
      title: "Task added! 🎉",
      description: taskName,
      duration: 2000,
    });
  };

  const handleReorderTasks = (listId: string, orderedIds: string[]) => {
    setAllTasks(prev =>
      prev.map(task => {
        if (task.listId !== listId) return task;
        const newIndex = orderedIds.indexOf(task.id);
        if (newIndex !== -1) {
          return { ...task, order: newIndex };
        }
        // Fallback: push any missing items to the end preserving rough relative order
        return { ...task, order: orderedIds.length + (task.order ?? 0) };
      })
    );
  };

  // PWA Service Worker Registration
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`)
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      <AnimatedBackground 
        scene={settings.backgroundScene}
        animationsEnabled={settings.animationsEnabled}
      />
      
      <SidebarProvider defaultOpen={true}>
        <div className="flex min-h-screen w-full relative z-10">
          <AppSidebar
            lists={listsWithTasks}
            selectedListId={selectedListId}
            viewMode={viewMode}
            settings={settings}
            onSelectList={handleSelectList}
            onViewAllLists={handleViewAllLists}
            onAddList={handleAddList}
            onEditList={handleEditList}
            onDeleteList={handleDeleteList}
          />
          
          <MainContent
            lists={listsWithTasks}
            selectedList={selectedList}
            viewMode={viewMode}
            settings={settings}
            onSelectList={handleSelectList}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
            onEditTask={handleEditTask}
            onAddTask={handleAddTask}
            onEditList={handleEditList}
            onDeleteList={handleDeleteList}
            onOpenSettings={() => setSettingsOpen(true)}
            onReorderTasks={handleReorderTasks}
          />
        </div>
      </SidebarProvider>

      <SettingsDialog
        open={settingsOpen}
        onOpenChange={setSettingsOpen}
        settings={settings}
        onSettingsChange={setSettings}
      />

      <Toaster />
    </div>
  );
};

export default Index;
