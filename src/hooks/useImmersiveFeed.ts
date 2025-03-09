import { useState, useCallback, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { usePropertyInteractions } from './usePropertyInteractions';
import { useVideoPreload } from './useVideoPreload';
import type { Property } from '@/types/property';

interface ImmersiveProperty extends Omit<Property, 'id'> {
  id: string;
  videoUrl?: string;
  title?: string;
  bedrooms?: number;
  bathrooms?: number;
}

export const useImmersiveFeed = (properties: ImmersiveProperty[]) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { likedProperties, savedProperties, toggleLike, toggleSave } = usePropertyInteractions();
  
  const {
    isLoading,
    loadedVideos,
    preloadVideo,
    handleVideoChange,
    playCurrentVideo
  } = useVideoPreload({
    videos: properties.map(p => p.image),
    activeIndex,
    onLoadStart: () => toast.loading('Loading next property...'),
    onLoadComplete: () => toast.dismiss(),
    onError: () => toast.error('Failed to load video')
  });

  const handleScroll = useCallback((e: WheelEvent) => {
    if (!containerRef.current) return;
    
    const delta = e.deltaY;
    const threshold = 50;
    
    if (Math.abs(delta) > threshold) {
      if (delta > 0 && activeIndex < properties.length - 1) {
        setActiveIndex(prev => prev + 1);
      } else if (delta < 0 && activeIndex > 0) {
        setActiveIndex(prev => prev - 1);
      }
    }
  }, [activeIndex, properties.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleScroll);
    return () => container.removeEventListener('wheel', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    handleVideoChange(activeIndex);
  }, [activeIndex, handleVideoChange]);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const scheduleViewing = useCallback((propertyId: string) => {
    toast.success('Viewing request sent! We will contact you shortly.');
  }, []);

  return {
    activeIndex,
    setActiveIndex,
    isPlaying,
    isMuted,
    isLoading,
    loadedVideos,
    containerRef,
    likedProperties,
    savedProperties,
    toggleLike,
    toggleSave,
    togglePlay,
    toggleMute,
    scheduleViewing,
    preloadVideo
  };
}; 