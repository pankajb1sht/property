import { useEffect } from 'react';

interface UseKeyboardShortcutsProps {
  onSpacePress?: () => void;
  onMPress?: () => void;
  onArrowUp?: () => void;
  onArrowDown?: () => void;
  onLPress?: () => void;
  onSPress?: () => void;
}

export const useKeyboardShortcuts = ({
  onSpacePress,
  onMPress,
  onArrowUp,
  onArrowDown,
  onLPress,
  onSPress,
}: UseKeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore key events if user is typing in an input
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return;
      }

      switch (event.key.toLowerCase()) {
        case ' ':
          event.preventDefault();
          onSpacePress?.();
          break;
        case 'm':
          event.preventDefault();
          onMPress?.();
          break;
        case 'arrowup':
          event.preventDefault();
          onArrowUp?.();
          break;
        case 'arrowdown':
          event.preventDefault();
          onArrowDown?.();
          break;
        case 'l':
          event.preventDefault();
          onLPress?.();
          break;
        case 's':
          event.preventDefault();
          onSPress?.();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onSpacePress, onMPress, onArrowUp, onArrowDown, onLPress, onSPress]);
}; 