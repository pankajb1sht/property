
import React, { useState } from 'react';
import { Property, PropertyFeedActionType } from '@/types/property';
import PropertyCard from './PropertyCard';
import { toast } from 'sonner';
import { ChevronUp, ChevronDown } from 'lucide-react';

interface PropertyFeedProps {
  properties: Property[];
}

const PropertyFeed = ({ properties }: PropertyFeedProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [likedProperties, setLikedProperties] = useState<Set<string>>(new Set());
  const [savedProperties, setSavedProperties] = useState<Set<string>>(new Set());
  
  const handlePropertyAction = (type: PropertyFeedActionType, property: Property) => {
    switch (type) {
      case 'like':
        const newLikedProperties = new Set(likedProperties);
        if (newLikedProperties.has(property.id)) {
          newLikedProperties.delete(property.id);
          toast('Removed from favorites');
        } else {
          newLikedProperties.add(property.id);
          toast('Added to favorites');
        }
        setLikedProperties(newLikedProperties);
        break;
        
      case 'save':
        const newSavedProperties = new Set(savedProperties);
        if (newSavedProperties.has(property.id)) {
          newSavedProperties.delete(property.id);
          toast('Removed from saved properties');
        } else {
          newSavedProperties.add(property.id);
          toast('Property saved for later');
        }
        setSavedProperties(newSavedProperties);
        break;
        
      case 'share':
        toast('Share feature coming soon!');
        break;
        
      case 'details':
        toast('Property details coming soon!');
        break;

      case 'comment':
        toast('Comments feature coming soon!');
        break;

      case 'contact':
        toast('Contact agent feature coming soon!');
        break;
    }
  };
  
  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0 && activeIndex < properties.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else if (e.deltaY < 0 && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const navigateToNext = () => {
    if (activeIndex < properties.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const navigateToPrevious = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };
  
  return (
    <div 
      className="relative flex flex-col items-center justify-center w-full py-4 px-4 md:px-8 overflow-y-auto"
      onWheel={handleScroll}
    >
      {/* Navigation indicators */}
      <div className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-10 hidden md:block">
        <button 
          onClick={navigateToPrevious}
          disabled={activeIndex === 0}
          className={`p-2 rounded-full glass-effect ${
            activeIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
          }`}
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      </div>
      
      <div className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-10 hidden md:block">
        <button 
          onClick={navigateToNext}
          disabled={activeIndex === properties.length - 1}
          className={`p-2 rounded-full glass-effect ${
            activeIndex === properties.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'
          }`}
        >
          <ChevronDown className="h-5 w-5" />
        </button>
      </div>
      
      {/* Progress indicators */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-1.5 z-10">
        {properties.map((_, index) => (
          <div 
            key={index}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              index === activeIndex ? 'bg-primary scale-125' : 'bg-gray-300'
            }`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>

      <div className="max-w-3xl w-full space-y-6">
        {properties.map((property, index) => {
          // Enhance property with liked/saved state
          const enhancedProperty = {
            ...property,
            isLiked: likedProperties.has(property.id),
            isSaved: savedProperties.has(property.id)
          };
          
          return (
            <div 
              key={property.id} 
              className={`transition-all duration-500 transform ${
                index === activeIndex ? 'opacity-100' : 'opacity-40 scale-95'
              }`}
            >
              <PropertyCard 
                property={enhancedProperty}
                onAction={handlePropertyAction}
                isActive={index === activeIndex}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PropertyFeed;
