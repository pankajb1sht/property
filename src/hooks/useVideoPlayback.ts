import { useState, useCallback, useRef, useEffect } from 'react';
import { playVideo, pauseVideo, toggleVideoPlayback, toggleVideoMute } from '@/utils/video';

interface UseVideoPlaybackOptions {
  onPlaybackChange?: (isPlaying: boolean) => void;
  onMuteChange?: (isMuted: boolean) => void;
  onError?: () => void;
}

export const useVideoPlayback = ({
  onPlaybackChange,
  onMuteChange,
  onError
}: UseVideoPlaybackOptions = {}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const setVideoRef = useCallback((element: HTMLVideoElement | null) => {
    videoRef.current = element;
  }, []);

  const play = useCallback(async () => {
    try {
      await playVideo(videoRef.current);
      setIsPlaying(true);
      onPlaybackChange?.(true);
    } catch (error) {
      console.error('Error playing video:', error);
      onError?.();
    }
  }, [onPlaybackChange, onError]);

  const pause = useCallback(() => {
    pauseVideo(videoRef.current);
    setIsPlaying(false);
    onPlaybackChange?.(false);
  }, [onPlaybackChange]);

  const togglePlay = useCallback(async () => {
    try {
      const isNowPlaying = await toggleVideoPlayback(videoRef.current);
      setIsPlaying(isNowPlaying);
      onPlaybackChange?.(isNowPlaying);
    } catch (error) {
      console.error('Error toggling video playback:', error);
      onError?.();
    }
  }, [onPlaybackChange, onError]);

  const toggleMute = useCallback(() => {
    const isNowMuted = toggleVideoMute(videoRef.current);
    setIsMuted(isNowMuted);
    onMuteChange?.(isNowMuted);
  }, [onMuteChange]);

  // Auto-pause when component unmounts
  useEffect(() => {
    return () => {
      if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
      }
    };
  }, []);

  return {
    isPlaying,
    isMuted,
    videoRef: setVideoRef,
    play,
    pause,
    togglePlay,
    toggleMute
  };
}; 