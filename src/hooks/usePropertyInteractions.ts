import { useState, useCallback } from 'react';
import { toast } from 'sonner';

export const usePropertyInteractions = () => {
  const [likedProperties, setLikedProperties] = useState<Set<string>>(new Set());
  const [savedProperties, setSavedProperties] = useState<Set<string>>(new Set());

  const toggleLike = useCallback((propertyId: string) => {
    setLikedProperties(prev => {
      const newSet = new Set(prev);
      if (newSet.has(propertyId)) {
        newSet.delete(propertyId);
        toast.success('Removed from favorites');
      } else {
        newSet.add(propertyId);
        toast.success('Added to favorites');
      }
      return newSet;
    });
  }, []);

  const toggleSave = useCallback((propertyId: string) => {
    setSavedProperties(prev => {
      const newSet = new Set(prev);
      if (newSet.has(propertyId)) {
        newSet.delete(propertyId);
        toast.success('Removed from saved properties');
      } else {
        newSet.add(propertyId);
        toast.success('Property saved for later');
      }
      return newSet;
    });
  }, []);

  return {
    likedProperties,
    savedProperties,
    toggleLike,
    toggleSave,
  };
}; 