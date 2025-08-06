
import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';

interface EditableTitleProps {
  title: string;
  onSave: (newTitle: string) => void;
  className?: string;
}

export const EditableTitle = ({ title, onSave, className = '' }: EditableTitleProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmedValue = editValue.trim();
    if (trimmedValue && trimmedValue !== title) {
      onSave(trimmedValue);
    }
    setIsEditing(false);
    setEditValue(title);
  };

  const handleCancel = () => {
    setEditValue(title);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (isEditing) {
    return (
      <Input
        ref={inputRef}
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyPress}
        className={`bg-transparent border-none shadow-none focus-visible:ring-1 focus-visible:ring-primary p-0 h-auto ${className}`}
      />
    );
  }

  return (
    <span
      onClick={() => setIsEditing(true)}
      className={`cursor-pointer hover:text-primary transition-colors ${className}`}
      title="Click to edit"
    >
      {title}
    </span>
  );
};
