import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/button';
import { Heart, Share2, MapPin, Calendar, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { featuredProperties } from '@/data/properties';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative h-[500px] w-full">
      <img
        src={images[currentImageIndex]}
        alt="Property"
        className="w-full h-full object-cover"
      />
      <Button
        variant="ghost"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2"
        onClick={prevImage}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2"
        onClick={nextImage}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
        {currentImageIndex + 1} / {images.length}
      </div>
    </div>
  );
};

const PropertyDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  // Find the property based on the ID
  const property = featuredProperties.find(p => p.id === id);

  // If property not found, show error and redirect
  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Property Not Found</h1>
        <p className="text-gray-600 mb-8">The property you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/')}>
          Return to Home
        </Button>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold">{property.name}</h1>
            <div className="flex items-center gap-2 mt-2 text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>{property.location}</span>
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => setIsLiked(!isLiked)}
              className={isLiked ? 'text-red-500' : ''}
            >
              <Heart className="h-5 w-5" fill={isLiked ? 'currentColor' : 'none'} />
            </Button>
            <Button variant="outline">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Image Gallery */}
        {property.images && <ImageGallery images={property.images} />}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-4">About this property</h2>
              <p className="text-gray-600">{property.description}</p>
            </div>

            {property.features && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Features</h3>
                <div className="grid grid-cols-2 gap-4">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="h-2 w-2 bg-indigo-500 rounded-full" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 border rounded-xl p-6 space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{formatPrice(property.price)}</span>
                {property.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span>{property.rating}</span>
                    <span className="text-gray-500">({property.reviews})</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Button className="w-full" size="lg">
                    Contact Agent
                  </Button>
                </div>
                <div className="col-span-2">
                  <Button variant="outline" className="w-full" size="lg">
                    Schedule Viewing
                    <Calendar className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails; 