
import React, { useState } from 'react';
import { Heart, Bookmark, Share2, ChevronUp, MessageCircle, Phone, MapPin, Eye } from 'lucide-react';
import { Property, PropertyFeedActionType } from '@/types/property';
import ActionButton from './ActionButton';
import { cn } from '@/lib/utils';
import { Tooltip } from '@/components/ui/tooltip';
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface PropertyCardProps {
  property: Property;
  onAction: (type: PropertyFeedActionType, property: Property) => void;
  isActive?: boolean;
}

const PropertyCard = ({ property, onAction, isActive = false }: PropertyCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { 
    name, 
    location, 
    price, 
    beds, 
    baths, 
    sqft, 
    image, 
    isPremium, 
    isLiked, 
    isSaved, 
    isRecentlyAdded, 
    description,
    views,
    mediaCount,
    currentMediaIndex = 0
  } = property;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div 
      className={cn(
        'relative w-full rounded-property overflow-hidden shadow-md transition-all duration-500 transform',
        isActive ? 'scale-100 opacity-100' : 'scale-95 opacity-90'
      )}
    >
      {/* Card Media */}
      <div className="relative aspect-property w-full overflow-hidden">
        <div className={cn("absolute inset-0 bg-gray-200", !imageLoaded && "animate-image-shimmer")}>
          <img
            src={image}
            alt={name}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-1000",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 animate-fade-in">
          {isPremium && (
            <div className="premium-gradient rounded-full px-3 py-1 text-xs font-semibold text-white animate-fade-in">
              Premium
            </div>
          )}
          {isRecentlyAdded && (
            <div className="bg-success bg-opacity-90 rounded-full px-3 py-1 text-xs font-semibold text-white animate-fade-in">
              New
            </div>
          )}
        </div>

        {/* Media Indicators */}
        {mediaCount && mediaCount > 1 && (
          <div className="absolute top-4 right-20 bg-black bg-opacity-50 rounded-full px-2 py-1 text-xs text-white">
            {currentMediaIndex + 1}/{mediaCount}
          </div>
        )}
        
        {/* Views Counter */}
        {views !== undefined && (
          <div className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full px-2 py-1 text-xs text-white flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>{views}</span>
          </div>
        )}
        
        {/* Action Buttons */}
        <TooltipProvider>
          <div className="absolute top-16 right-4 flex flex-col gap-3 animate-fade-in">
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <ActionButton 
                    onClick={() => onAction('like', property)}
                    active={isLiked}
                    activeClassName="bg-error bg-opacity-80 !text-white animate-heart-pulse"
                    className="text-white hover:text-error"
                  >
                    <Heart className={cn("h-5 w-5", isLiked && "fill-current")} />
                  </ActionButton>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isLiked ? 'Unlike' : 'Like'} this property</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <ActionButton 
                    onClick={() => onAction('save', property)}
                    active={isSaved}
                    activeClassName="bg-secondary bg-opacity-80 !text-white animate-bookmark-bounce"
                    className="text-white hover:text-secondary"
                  >
                    <Bookmark className={cn("h-5 w-5", isSaved && "fill-current")} />
                  </ActionButton>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isSaved ? 'Remove from' : 'Save to'} favorites</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <ActionButton 
                    onClick={() => onAction('comment', property)}
                    className="text-white hover:text-primary"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </ActionButton>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Comments</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
        
        {/* Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 info-overlay p-5 transition-all duration-300">
          <div className="flex justify-between items-end">
            <div className="animate-fade-in">
              <h2 className="text-xl font-bold text-white text-shadow mb-1">{name}</h2>
              <p className="text-gray-200 text-sm mb-2 flex items-center">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                {location}
              </p>
              <p className="text-white font-semibold text-lg text-shadow">{formatPrice(price)}</p>
              
              <div className="flex mt-2 space-x-4 text-gray-200 text-sm">
                <span>{beds} Beds</span>
                <span>{baths} Baths</span>
                <span>{sqft.toLocaleString()} sq.ft</span>
              </div>

              {description && (
                <p className="text-gray-200 text-sm mt-2 line-clamp-2">{description}</p>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <ActionButton 
                        onClick={() => onAction('share', property)}
                        className="text-white hover:text-primary animate-fade-in"
                      >
                        <Share2 className="h-5 w-5" />
                      </ActionButton>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share property</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <ActionButton 
                        onClick={() => onAction('contact', property)}
                        className="text-white hover:text-success animate-fade-in"
                      >
                        <Phone className="h-5 w-5" />
                      </ActionButton>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Contact agent</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
          {/* View Details Button */}
          <button 
            onClick={() => onAction('details', property)}
            className="w-full mt-4 flex items-center justify-center gap-1 bg-primary bg-opacity-90 hover:bg-opacity-100 text-white font-medium py-2 px-4 rounded-full transition-all duration-300 animate-fade-in"
          >
            <span>View Details</span>
            <ChevronUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
