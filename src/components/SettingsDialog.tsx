
import React from 'react';
import { Settings } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent } from '@/components/ui/card';
import { Palette, Eye, EyeOff, Play, Pause } from 'lucide-react';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
}

export const SettingsDialog = ({
  open,
  onOpenChange,
  settings,
  onSettingsChange,
}: SettingsDialogProps) => {
  const [showMoreThemes, setShowMoreThemes] = React.useState(false);
  
  const backgroundOptions = [
    { id: 'day', name: 'Sunny Day', preview: '☀️' },
    { id: 'night', name: 'Starry Night', preview: '🌙' },
    { id: 'raining', name: 'Gentle Rain', preview: '🌧️' },
    { id: 'cats', name: 'Kawaii Cats', preview: '🐱' },
  ];

  const seasonalOptions = [
    { id: 'autumn', name: 'Autumn Leaves', preview: '🍂' },
    { id: 'autumn-cozy', name: 'Autumn Cozy', preview: '🎃' },
    { id: 'winter', name: 'Winter Snow', preview: '❄️' },
    { id: 'spring', name: 'Spring Bloom', preview: '🌸' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-md border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Settings
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Background Scene */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Background Scene</Label>
            <div className="grid grid-cols-2 gap-2">
              {backgroundOptions.map((option) => (
                <Card
                  key={option.id}
                  className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                    settings.backgroundScene === option.id
                      ? 'ring-2 ring-primary bg-primary/5'
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() =>
                    onSettingsChange({ ...settings, backgroundScene: option.id })
                  }
                >
                  <CardContent className="p-3 text-center">
                    <div className="text-2xl mb-1">{option.preview}</div>
                    <div className="text-xs font-medium">{option.name}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* More themes toggle */}
            <button
              onClick={() => setShowMoreThemes(!showMoreThemes)}
              className="text-sm text-primary hover:underline cursor-pointer mt-2"
            >
              {showMoreThemes ? '- Show less themes' : '+ More themes'}
            </button>
            
            {/* Seasonal themes */}
            {showMoreThemes && (
              <div className="grid grid-cols-2 gap-2 mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                {seasonalOptions.map((option) => (
                  <Card
                    key={option.id}
                    className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                      settings.backgroundScene === option.id
                        ? 'ring-2 ring-primary bg-primary/5'
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() =>
                      onSettingsChange({ ...settings, backgroundScene: option.id })
                    }
                  >
                    <CardContent className="p-3 text-center">
                      <div className="text-2xl mb-1">{option.preview}</div>
                      <div className="text-xs font-medium">{option.name}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Task Completion Style */}
          <div className="space-y-3">
            <Label className="text-base font-medium">When tasks are completed</Label>
            <div className="space-y-2">
              <Button
                variant={settings.taskCompletionStyle === 'strikethrough' ? 'default' : 'outline'}
                className="w-full justify-start"
                onClick={() =>
                  onSettingsChange({ ...settings, taskCompletionStyle: 'strikethrough' })
                }
              >
                <Eye className="h-4 w-4 mr-2" />
                Strike through (keep visible)
              </Button>
              <Button
                variant={settings.taskCompletionStyle === 'hide' ? 'default' : 'outline'}
                className="w-full justify-start"
                onClick={() =>
                  onSettingsChange({ ...settings, taskCompletionStyle: 'hide' })
                }
              >
                <EyeOff className="h-4 w-4 mr-2" />
                Hide from view
              </Button>
            </div>
          </div>

          {/* Animations */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium">Animations</Label>
              <p className="text-sm text-muted-foreground">
                Floating elements and transitions
              </p>
            </div>
            <div className="flex items-center gap-2">
              {settings.animationsEnabled ? (
                <Play className="h-4 w-4 text-primary" />
              ) : (
                <Pause className="h-4 w-4 text-muted-foreground" />
              )}
              <Switch
                checked={settings.animationsEnabled}
                onCheckedChange={(checked) =>
                  onSettingsChange({ ...settings, animationsEnabled: checked })
                }
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
