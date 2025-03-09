import React, { useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/button';
import { Card } from '@/components/common/card';
import { Skeleton } from '@/components/common/skeleton';
import { PlayIcon, PauseIcon, SpeakerWaveIcon, SpeakerXMarkIcon, HeartIcon, BookmarkIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';
import { useImmersiveFeed } from '@/hooks/useImmersiveFeed';
import { videoTransition, propertyCard, fadeIn } from '@/constants/animations';
import { formatCurrency } from '@/utils/format';
import { toggleVideoPlayback, toggleVideoMute } from '@/utils/video';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useTouchGestures } from '@/hooks/useTouchGestures';
import { useVideoAnalytics } from '@/hooks/useVideoAnalytics';
import type { Property } from '@/types/property';

interface ImmersiveProperty extends Property {
  videoUrl?: string;
  title?: string;
  bedrooms?: number;
  bathrooms?: number;
}

const properties: ImmersiveProperty[] = [
  {
    id: '1',
    name: 'Modern Beachfront Villa',
    price: 2500000,
    location: 'Malibu, CA',
    image: 'https://videos.pexels.com/video-files/3773486/3773486-hd_1920_1080_30fps.mp4',
    beds: 4,
    baths: 3.5,
    sqft: 3200,
    isPremium: true,
    description: 'Stunning modern villa with direct beach access and panoramic ocean views.',
    views: 1234,
    rating: 4.8,
    reviews: 45,
    features: ['Beach Access', 'Ocean Views', 'Private Pool', 'Smart Home', 'Wine Cellar']
  },
  {
    id: '2',
    name: 'Luxury Penthouse',
    price: 3800000,
    location: 'Manhattan, NY',
    image: 'https://videos.pexels.com/video-files/7578552/7578552-uhd_2560_1440_30fps.mp4',
    beds: 3,
    baths: 3,
    sqft: 2800,
    isPremium: true,
    description: 'Spectacular penthouse with stunning city views and luxury amenities.',
    views: 2345,
    rating: 4.9,
    reviews: 38,
    features: ['City Views', 'Private Terrace', 'Concierge', 'Gym Access', 'Wine Room']
  },
  {
    id: '3',
    name: 'Mountain View Estate',
    price: 4200000,
    location: 'Aspen, CO',
    image: 'https://videos.pexels.com/video-files/7578541/7578541-uhd_2560_1440_30fps.mp4',
    beds: 5,
    baths: 4.5,
    sqft: 4500,
    isPremium: true,
    description: 'Luxurious mountain estate with breathtaking views and premium finishes.',
    views: 1876,
    rating: 4.7,
    reviews: 29,
    features: ['Mountain Views', 'Home Theater', 'Spa', 'Game Room', 'Heated Driveway']
  }
];

export default function ImmersiveFeed() {
  const navigate = useNavigate();
  const {
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
    togglePlay: togglePlayState,
    toggleMute: toggleMuteState,
    scheduleViewing,
    preloadVideo
  } = useImmersiveFeed(properties);

  const activeProperty = properties[activeIndex];
  const videoRef = useRef<HTMLVideoElement>(null);

  useVideoAnalytics({
    propertyId: activeProperty.id,
    videoUrl: activeProperty.image,
    isPlaying,
    isMuted
  });

  const togglePlay = useCallback(async () => {
    const isPlaying = await toggleVideoPlayback(videoRef.current);
    togglePlayState();
  }, [togglePlayState]);

  const toggleMute = useCallback(() => {
    const isMuted = toggleVideoMute(videoRef.current);
    toggleMuteState();
  }, [toggleMuteState]);

  const navigatePrev = useCallback(() => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  }, [activeIndex, setActiveIndex]);

  const navigateNext = useCallback(() => {
    if (activeIndex < properties.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  }, [activeIndex, properties.length, setActiveIndex]);

  const viewDetails = useCallback(() => {
    navigate(`/property/${activeProperty.id}`);
  }, [navigate, activeProperty.id]);

  useKeyboardShortcuts({
    onSpacePress: togglePlay,
    onMPress: toggleMute,
    onArrowUp: navigatePrev,
    onArrowDown: navigateNext,
    onLPress: () => toggleLike(activeProperty.id),
    onSPress: () => toggleSave(activeProperty.id)
  });

  const { handleTouchStart, handleTouchEnd } = useTouchGestures({
    onSwipeUp: navigateNext,
    onSwipeDown: navigatePrev,
    onDoubleTap: viewDetails
  });

  return (
    <div 
      ref={containerRef}
      className="h-screen w-full relative overflow-hidden bg-black"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProperty.id}
          variants={videoTransition}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0"
          onClick={viewDetails}
        >
          <video
            ref={videoRef}
            src={activeProperty.image}
            className="h-full w-full object-cover cursor-pointer"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onLoadStart={() => preloadVideo(activeIndex)}
          />
          
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Skeleton className="h-32 w-32 rounded-full" />
            </div>
          )}

          <div className="absolute top-4 right-4">
            <Button
              variant="outline"
              size="sm"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                viewDetails();
              }}
            >
              View Property
              <ArrowTopRightOnSquareIcon className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>

      <motion.div 
        variants={fadeIn}
        initial="initial"
        animate="animate"
        className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent"
        onClick={viewDetails}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeProperty.id}
            variants={propertyCard}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <Card className="bg-black/40 backdrop-blur-lg border-none text-white p-6 cursor-pointer hover:bg-black/50 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{activeProperty.name}</h2>
                  <p className="text-lg text-gray-300">{activeProperty.location}</p>
                  <p className="text-2xl font-bold text-primary mt-2">
                    {formatCurrency(activeProperty.price)}
                  </p>
                  {activeProperty.rating && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${
                              i < Math.floor(activeProperty.rating!) ? 'text-yellow-400' : 'text-gray-400'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-300">
                        ({activeProperty.reviews} reviews)
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(activeProperty.id);
                    }}
                  >
                    {likedProperties.has(activeProperty.id) ? (
                      <HeartIconSolid className="h-6 w-6 text-red-500" />
                    ) : (
                      <HeartIcon className="h-6 w-6" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSave(activeProperty.id);
                    }}
                  >
                    {savedProperties.has(activeProperty.id) ? (
                      <BookmarkIconSolid className="h-6 w-6 text-primary" />
                    ) : (
                      <BookmarkIcon className="h-6 w-6" />
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-gray-400">Bedrooms</p>
                  <p className="text-lg font-semibold">{activeProperty.beds}</p>
                </div>
                <div>
                  <p className="text-gray-400">Bathrooms</p>
                  <p className="text-lg font-semibold">{activeProperty.baths}</p>
                </div>
                <div>
                  <p className="text-gray-400">Square Feet</p>
                  <p className="text-lg font-semibold">{activeProperty.sqft}</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePlay();
                    }}
                  >
                    {isPlaying ? (
                      <PauseIcon className="h-6 w-6" />
                    ) : (
                      <PlayIcon className="h-6 w-6" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMute();
                    }}
                  >
                    {isMuted ? (
                      <SpeakerXMarkIcon className="h-6 w-6" />
                    ) : (
                      <SpeakerWaveIcon className="h-6 w-6" />
                    )}
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      viewDetails();
                    }}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="default"
                    onClick={(e) => {
                      e.stopPropagation();
                      scheduleViewing(activeProperty.id);
                    }}
                  >
                    Schedule Viewing
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="absolute top-1/2 right-4 -translate-y-1/2 flex flex-col gap-2">
        {properties.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className={`w-3 h-3 p-0 rounded-full ${
              index === activeIndex ? 'bg-primary' : 'bg-white/50'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
} 