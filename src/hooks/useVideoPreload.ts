import { useState, useCallback, useEffect } from 'react';

interface UseVideoPreloadProps {
  videos: string[];
  activeIndex: number;
  onLoadStart?: () => void;
  onLoadComplete?: () => void;
  onError?: () => void;
}

export const useVideoPreload = ({
  videos,
  activeIndex,
  onLoadStart,
  onLoadComplete,
  onError,
}: UseVideoPreloadProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState<Set<string>>(new Set());

  const preloadVideo = useCallback(async (index: number) => {
    if (index < 0 || index >= videos.length) return;
    const videoUrl = videos[index];
    
    if (loadedVideos.has(videoUrl)) return;
    
    setIsLoading(true);
    onLoadStart?.();

    try {
      const video = document.createElement('video');
      video.src = videoUrl;
      video.preload = 'auto';

      await new Promise((resolve, reject) => {
        video.onloadeddata = resolve;
        video.onerror = reject;
      });

      setLoadedVideos(prev => new Set([...prev, videoUrl]));
      onLoadComplete?.();
    } catch (error) {
      console.error('Failed to preload video:', error);
      onError?.();
    } finally {
      setIsLoading(false);
    }
  }, [videos, loadedVideos, onLoadStart, onLoadComplete, onError]);

  const handleVideoChange = useCallback((newIndex: number) => {
    // Preload current video
    preloadVideo(newIndex);
    // Preload next video
    preloadVideo(newIndex + 1);
    // Preload previous video
    preloadVideo(newIndex - 1);
  }, [preloadVideo]);

  const playCurrentVideo = useCallback(() => {
    const video = document.querySelector('video');
    if (video) {
      video.currentTime = 0;
      video.play().catch(console.error);
    }
  }, []);

  useEffect(() => {
    handleVideoChange(activeIndex);
  }, [activeIndex, handleVideoChange]);

  return {
    isLoading,
    loadedVideos,
    preloadVideo,
    handleVideoChange,
    playCurrentVideo,
  };
}; 