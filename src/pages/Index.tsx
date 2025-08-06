
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
  const [lists, setLists] = useLocalStorage<List[]>('taskflow-lists', mockLists);
  const [allTasks, setAllTasks] = useLocalStorage<Task[]>('taskflow-tasks', mockTasks);
  const [selectedListId, setSelectedListId] = useState<string | null>(lists[0]?.id || null);
  const [viewMode, setViewMode] = useState<ViewMode>('single');
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  const [settings, setSettings] = useLocalStorage<Settings>('taskflow-settings', {
    backgroundScene: 'day',
    taskCompletionStyle: 'strikethrough',
    animationsEnabled: true,
  });

  // Update lists with current tasks
  const listsWithTasks = lists.map(list => ({
    ...list,
    tasks: allTasks.filter(task => task.listId === list.id),
  }));

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
    const newTask: Task = {
      id: Date.now().toString(),
      name: taskName,
      completed: false,
      listId,
    };
    
    setAllTasks(prevTasks => [...prevTasks, newTask]);
    
    toast({
      title: "Task added! 🎉",
      description: taskName,
      duration: 2000,
    });
  };

  // PWA Service Worker Registration
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
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
            onSelectList={handleSelectList}
            onViewAllLists={handleViewAllLists}
            onAddList={handleAddList}
            onEditList={handleEditList}
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
            onOpenSettings={() => setSettingsOpen(true)}
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
