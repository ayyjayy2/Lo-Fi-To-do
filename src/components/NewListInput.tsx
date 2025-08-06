
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Check, X } from 'lucide-react';

interface NewListInputProps {
  onAddList: (name: string) => void;
  collapsed?: boolean;
}

export const NewListInput = ({ onAddList, collapsed }: NewListInputProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [listName, setListName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAdding && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAdding]);

  const handleSubmit = () => {
    if (listName.trim()) {
      onAddList(listName.trim());
      setListName('');
      setIsAdding(false);
    }
  };

  const handleCancel = () => {
    setListName('');
    setIsAdding(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (collapsed) {
    return (
      <Button
        onClick={() => setIsAdding(true)}
        variant="ghost"
        size="icon"
        className="w-full h-10 text-muted-foreground hover:text-foreground hover:bg-muted/50"
      >
        <Plus className="h-4 w-4" />
      </Button>
    );
  }

  if (isAdding) {
    return (
      <div className="px-4 py-2 space-y-2">
        <Input
          ref={inputRef}
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter list name..."
          className="bg-background/60 backdrop-blur-sm border-border/50"
        />
        <div className="flex gap-2">
          <Button
            onClick={handleSubmit}
            size="sm"
            variant="default"
            className="flex-1"
            disabled={!listName.trim()}
          >
            <Check className="h-3 w-3 mr-1" />
            Add
          </Button>
          <Button
            onClick={handleCancel}
            size="sm"
            variant="outline"
            className="flex-1"
          >
            <X className="h-3 w-3 mr-1" />
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4">
      <Button
        onClick={() => setIsAdding(true)}
        variant="ghost"
        className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted/50"
      >
        <Plus className="h-4 w-4 mr-2" />
        New List
      </Button>
    </div>
  );
};
