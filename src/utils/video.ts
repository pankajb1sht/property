export const playVideo = async (video: HTMLVideoElement | null): Promise<void> => {
  if (!video) return;

  try {
    await video.play();
  } catch (error) {
    console.error('Error playing video:', error);
    throw error;
  }
};

export const pauseVideo = (video: HTMLVideoElement | null): void => {
  if (!video) return;
  video.pause();
};

export const toggleVideoPlayback = async (video: HTMLVideoElement | null): Promise<boolean> => {
  if (!video) return false;

  try {
    if (video.paused) {
      await video.play();
      return true;
    } else {
      video.pause();
      return false;
    }
  } catch (error) {
    console.error('Error toggling video playback:', error);
    return false;
  }
};

export const toggleVideoMute = (video: HTMLVideoElement | null): boolean => {
  if (!video) return true;
  video.muted = !video.muted;
  return video.muted;
}; 