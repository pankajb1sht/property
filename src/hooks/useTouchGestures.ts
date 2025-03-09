import { useCallback, useRef } from 'react';

interface UseTouchGesturesProps {
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  onDoubleTap?: () => void;
  swipeThreshold?: number;
  doubleTapDelay?: number;
}

export const useTouchGestures = ({
  onSwipeUp,
  onSwipeDown,
  onDoubleTap,
  swipeThreshold = 50,
  doubleTapDelay = 300,
}: UseTouchGesturesProps) => {
  const touchStartY = useRef<number | null>(null);
  const lastTapTime = useRef<number>(0);

  const handleTouchStart = useCallback((event: React.TouchEvent) => {
    touchStartY.current = event.touches[0].clientY;

    const now = Date.now();
    const timeSinceLastTap = now - lastTapTime.current;

    if (timeSinceLastTap < doubleTapDelay) {
      onDoubleTap?.();
      lastTapTime.current = 0; // Reset to prevent triple tap
    } else {
      lastTapTime.current = now;
    }
  }, [onDoubleTap, doubleTapDelay]);

  const handleTouchEnd = useCallback((event: React.TouchEvent) => {
    if (touchStartY.current === null) return;

    const touchEndY = event.changedTouches[0].clientY;
    const deltaY = touchEndY - touchStartY.current;

    if (Math.abs(deltaY) > swipeThreshold) {
      if (deltaY > 0) {
        onSwipeDown?.();
      } else {
        onSwipeUp?.();
      }
    }

    touchStartY.current = null;
  }, [onSwipeUp, onSwipeDown, swipeThreshold]);

  return {
    handleTouchStart,
    handleTouchEnd,
  };
}; 