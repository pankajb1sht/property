import { useEffect } from 'react';

interface UseVideoAnalyticsProps {
  propertyId: string;
  videoUrl: string;
  isPlaying: boolean;
  isMuted: boolean;
}

export const useVideoAnalytics = ({
  propertyId,
  videoUrl,
  isPlaying,
  isMuted,
}: UseVideoAnalyticsProps) => {
  useEffect(() => {
    // Track video start
    if (isPlaying) {
      logVideoEvent('video_start', {
        property_id: propertyId,
        video_url: videoUrl,
        is_muted: isMuted,
      });
    }
  }, [propertyId, videoUrl, isPlaying, isMuted]);

  useEffect(() => {
    // Track mute state changes
    logVideoEvent('mute_state_change', {
      property_id: propertyId,
      video_url: videoUrl,
      is_muted: isMuted,
    });
  }, [propertyId, videoUrl, isMuted]);

  return null;
};

// Helper function to log video events
// In a real application, this would send data to an analytics service
const logVideoEvent = (eventName: string, data: Record<string, any>) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Video Analytics] ${eventName}:`, data);
  } else {
    // Send to analytics service
    // analytics.track(eventName, data);
  }
}; 