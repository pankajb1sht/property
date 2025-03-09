import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Heart, Bookmark, User, MapPin, Star, 
  PlayCircle, ChevronDown, Globe, Menu, X,
  Instagram, Twitter, Facebook, ArrowRight, MessageCircle,
  Home, CheckCircle, ChevronRight, TrendingUp, Timer,
  Gavel, Users, LineChart, Shield, Building, Bell, TrendingDown
} from 'lucide-react';
import { Button } from '@/components/common/button';
import { Property } from '@/types/property';
import { featuredProperties } from '@/data/properties';

// Categories for property search
const categories = [
  { name: 'Beach front', icon: '🏖️' },
  { name: 'Luxury', icon: '✨' },
  { name: 'Modern', icon: '🏢' },
  { name: 'Countryside', icon: '🌄' },
  { name: 'Pools', icon: '🏊' },
  { name: 'Design', icon: '🎨' },
  { name: 'Trending', icon: '🔥' },
  { name: 'Views', icon: '🌇' },
];

// Cities for the trending section
const trendingCities = [
  { name: 'Mumbai', properties: 1243, image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=500&auto=format&fit=crop' },
  { name: 'Delhi', properties: 2341, image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=500&auto=format&fit=crop' },
  { name: 'Bangalore', properties: 1876, image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=500&auto=format&fit=crop' },
  { name: 'Pune', properties: 1523, image: 'https://images.unsplash.com/photo-1572445271230-a78b5944a659?w=500&auto=format&fit=crop' },
];

// Update testimonials data
const testimonials = [
  {
    id: 1,
    text: "The AI-powered market insights and secure auction platform have transformed my business. I've closed 30% more deals since joining.",
    name: "Arjun Sharma",
    location: "Mumbai",
    role: "Senior Property Broker",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    stats: {
      deals: "150+",
      value: "₹180 Cr+"
    }
  },
  {
    id: 2,
    text: "As a buyer, the auction process was transparent and efficient. The broker verification system gave me confidence in making such a significant investment.",
    name: "Priya Patel",
    location: "Delhi",
    role: "Property Investor",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    stats: {
      auctions: "5",
      invested: "₹25 Cr"
    }
  },
  {
    id: 3,
    text: "The platform's AI analytics help me provide accurate valuations. My clients appreciate the data-driven approach to property auctions.",
    name: "Rahul Verma",
    location: "Bangalore",
    role: "Luxury Property Specialist",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    rating: 5,
    stats: {
      accuracy: "92%",
      premium: "15%"
    }
  }
];

// New interfaces for TypeScript type safety
interface Broker {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  deals: number;
  image: string;
  verificationStatus: 'verified' | 'pending' | 'unverified';
}

interface LiveAuction {
  id: string;
  propertyName: string;
  location: string;
  currentBid: number;
  timeLeft: string;
  participants: number;
  image: string;
}

// Add new interface for upcoming auctions
interface UpcomingAuction {
  id: string;
  propertyName: string;
  location: string;
  startingBid: number;
  estimatedValue: number;
  auctionDate: string;
  image: string;
  broker: Broker;
  amenities: string[];
  registeredBidders: number;
}

// Add new interfaces for market metrics
interface MarketMetric {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

// Sample data for featured brokers
const featuredBrokers: Broker[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    specialization: 'Luxury Properties',
    rating: 4.9,
    deals: 150,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    verificationStatus: 'verified'
  },
  {
    id: '2',
    name: 'Priya Sharma',
    specialization: 'Commercial',
    rating: 4.8,
    deals: 120,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    verificationStatus: 'verified'
  },
  {
    id: '3',
    name: 'Amit Patel',
    specialization: 'Residential',
    rating: 4.7,
    deals: 98,
    image: 'https://randomuser.me/api/portraits/men/67.jpg',
    verificationStatus: 'verified'
  }
];

// Sample data for live auctions
const liveAuctions: LiveAuction[] = [
  {
    id: '1',
    propertyName: 'Luxury Villa in Bandra',
    location: 'Mumbai, Maharashtra',
    currentBid: 52000000,
    timeLeft: '2:15:30',
    participants: 8,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'
  },
  {
    id: '2',
    propertyName: 'Premium Apartment in Vasant Kunj',
    location: 'Delhi, India',
    currentBid: 35000000,
    timeLeft: '1:45:20',
    participants: 12,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9'
  }
];

// Sample data for upcoming auctions
const upcomingAuctions: UpcomingAuction[] = [
  {
    id: '1',
    propertyName: 'Sea View Penthouse',
    location: 'Worli, Mumbai',
    startingBid: 150000000,
    estimatedValue: 180000000,
    auctionDate: '2024-04-15T14:00:00',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
    broker: featuredBrokers[0],
    amenities: ['5 BHK', 'Private Pool', 'Sea View'],
    registeredBidders: 12
  },
  {
    id: '2',
    propertyName: 'Golf Course Villa',
    location: 'DLF Golf Links, Gurugram',
    startingBid: 85000000,
    estimatedValue: 95000000,
    auctionDate: '2024-04-18T15:00:00',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    broker: featuredBrokers[1],
    amenities: ['4 BHK', 'Golf View', 'Home Theater'],
    registeredBidders: 8
  },
  {
    id: '3',
    propertyName: 'Luxury Garden Apartment',
    location: 'Koramangala, Bangalore',
    startingBid: 45000000,
    estimatedValue: 52000000,
    auctionDate: '2024-04-20T16:00:00',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde',
    broker: featuredBrokers[2],
    amenities: ['3 BHK', 'Private Garden', 'Smart Home'],
    registeredBidders: 15
  }
];

const marketMetrics: MarketMetric[] = [
  {
    label: 'Monthly GMV',
    value: '₹450 Cr+',
    change: '+45%',
    trend: 'up'
  },
  {
    label: 'User Growth',
    value: '125K+',
    change: '+85%',
    trend: 'up'
  },
  {
    label: 'Broker Network',
    value: '2.5K+',
    change: '+120%',
    trend: 'up'
  }
];

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  
  // Video sources for the hero section
  const heroVideos = [
    "https://videos.pexels.com/video-files/3773486/3773486-hd_1920_1080_30fps.mp4",
    "https://videos.pexels.com/video-files/7578552/7578552-uhd_2560_1440_30fps.mp4",
    "https://videos.pexels.com/video-files/7578541/7578541-uhd_2560_1440_30fps.mp4"
  ];

  // Effect to handle video playback
  React.useEffect(() => {
    const playVideo = async () => {
      try {
        const currentVideo = videoRefs.current[activeVideoIndex];
        if (currentVideo) {
          await currentVideo.play();
        }
      } catch (error) {
        console.error('Error playing video:', error);
      }
    };

    playVideo();
  }, [activeVideoIndex]);

  return (
    <div className="min-h-screen bg-white">
      {/* Modern Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-sky-500 text-transparent bg-clip-text">EstateAuctions</span>
            </div>
            
            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/brokers" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors flex items-center">
                <Users className="h-4 w-4 mr-1" />
                Find Brokers
              </Link>
              <Link to="/auctions" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors flex items-center">
                <Gavel className="h-4 w-4 mr-1" />
                Live Auctions
              </Link>
              <Link to="/market-analysis" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors flex items-center">
                <LineChart className="h-4 w-4 mr-1" />
                Market Analysis
              </Link>
              <Link to="/properties" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors flex items-center">
                <Building className="h-4 w-4 mr-1" />
                Properties
              </Link>
            </div>
            
            {/* Right side navigation items */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors flex items-center">
                <Shield className="h-4 w-4 mr-1" />
                Broker Portal
              </button>
              <Button className="btn-primary">
                Start Bidding
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(true)} 
                className="rounded-full p-2 inline-flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 overflow-hidden md:hidden"
            >
              <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
              <motion.div className="absolute top-0 right-0 w-full max-w-sm h-full bg-white shadow-xl flex flex-col overflow-y-auto">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-sky-500 text-transparent bg-clip-text">EstateAuctions</span>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="rounded-full p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="pt-5 pb-6 px-5 space-y-6">
                  <div className="space-y-4">
                    <Link to="/brokers" className="flex items-center p-3 rounded-lg hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                      <Users className="h-5 w-5 text-indigo-600 mr-3" />
                      <span className="text-base font-medium text-gray-900">Find Brokers</span>
                    </Link>
                    <Link to="/auctions" className="flex items-center p-3 rounded-lg hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                      <Gavel className="h-5 w-5 text-indigo-600 mr-3" />
                      <span className="text-base font-medium text-gray-900">Live Auctions</span>
                    </Link>
                    <Link to="/market-analysis" className="flex items-center p-3 rounded-lg hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                      <LineChart className="h-5 w-5 text-indigo-600 mr-3" />
                      <span className="text-base font-medium text-gray-900">Market Analysis</span>
                    </Link>
                    <Link to="/properties" className="flex items-center p-3 rounded-lg hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                      <Building className="h-5 w-5 text-indigo-600 mr-3" />
                      <span className="text-base font-medium text-gray-900">Properties</span>
                    </Link>
                  </div>
                  <div className="pt-4 border-t border-gray-100">
                    <Button className="w-full btn-primary mb-2">
                      Start Bidding
                    </Button>
                    <Button variant="outline" className="w-full">
                      Broker Portal
                    </Button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Enhanced Hero Section */}
      <div className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
        {/* Dynamic Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white -z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-100/40 via-sky-100/40 to-transparent -z-10"></div>
        
        {/* Animated Background Elements */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -right-40 top-20 w-[600px] h-[600px] bg-indigo-100 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute -left-40 bottom-0 w-[600px] h-[600px] bg-sky-100 rounded-full blur-3xl"
        />
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              {/* AI Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-500/10 to-sky-500/10 text-indigo-800 mb-8"
              >
                <div className="flex items-center">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-600 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
                  </span>
                  Smart Property Discovery Platform
                </div>
              </motion.div>

              {/* Main Heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-8"
              >
                <h1 className="font-bold text-gray-900">
                  Revolutionizing 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500 mx-2">
                    Real Estate
                  </span>
                  Through AI Innovation
                </h1>
              </motion.div>

              {/* Value Proposition */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl mb-8 text-gray-600"
              >
                India's premier property auction platform connecting verified brokers with premium buyers. Experience the future of real estate transactions.
              </motion.p>
              
              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4 mb-10"
              >
                <Button className="btn-primary flex items-center text-base px-8 py-4 bg-gradient-to-r from-indigo-600 to-sky-600 hover:from-indigo-700 hover:to-sky-700">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" className="flex items-center text-base px-8 py-4">
                  <PlayCircle className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button>
              </motion.div>
              
              {/* Market Metrics */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-3 gap-8 py-8 border-t border-gray-100"
              >
                {marketMetrics.map((metric, index) => (
                  <div key={index}>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                    <div className="text-sm text-gray-600">{metric.label}</div>
                    <div className={`flex items-center text-sm ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'} mt-1`}>
                      {metric.trend === 'up' ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {metric.change}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center gap-6 mt-8"
              >
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <img
                      key={i}
                      src={`https://randomuser.me/api/portraits/${i % 2 ? 'women' : 'men'}/${30 + i}.jpg`}
                      alt="User"
                      className="w-8 h-8 rounded-full border-2 border-white"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Star className="h-4 w-4 text-amber-400 fill-current" />
                  <span className="font-medium">4.9/5</span>
                  <span className="mx-1">•</span>
                  <span>2000+ Verified Brokers</span>
                </div>
              </motion.div>
            </div>
            
            {/* 3D Property Showcase */}
            <div className="relative">
              <div className="relative h-[600px]">
                {/* Floating Property Cards */}
                {liveAuctions.map((auction, index) => (
                  <motion.div
                    key={auction.id}
                    initial={{ opacity: 0, y: 50, rotateY: 0 }}
                    animate={{ 
                      opacity: 1, 
                      y: index * -40,
                      rotateY: [-2, 2, -2],
                      translateZ: index * 20
                    }}
                    transition={{ 
                      duration: 5,
                      delay: index * 0.3,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                      times: [0, 0.5, 1]
                    }}
                    className="absolute top-0 left-0 w-full"
                    style={{
                      perspective: "1500px",
                      transformStyle: "preserve-3d",
                      filter: `brightness(${1 - index * 0.1})`,
                      zIndex: liveAuctions.length - index
                    }}
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-2xl transform-gpu hover:scale-[1.02] transition-transform duration-300">
                      <div className="relative">
                        <img 
                          src={auction.image} 
                          alt={auction.propertyName}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
                        
                        {/* AI Analysis Overlay */}
                        <div className="absolute top-4 right-4 bg-black/20 backdrop-blur-md rounded-lg p-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-white text-xs">Market Analysis Active</span>
                          </div>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4">
                          <h3 className="text-white font-semibold mb-1">{auction.propertyName}</h3>
                          <div className="flex items-center justify-between">
                            <p className="text-white/90 text-sm flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {auction.location}
                            </p>
                            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-2 py-1">
                              <Star className="h-3 w-3 text-yellow-400 mr-1" />
                              <span className="text-white text-xs">98% Match</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-4">
                        <div className="grid grid-cols-3 gap-2 mb-3">
                          <div className="bg-gray-50 rounded-lg p-2 text-center">
                            <p className="text-xs text-gray-500">Current Bid</p>
                            <p className="text-sm font-semibold">₹{(auction.currentBid / 10000000).toFixed(1)} Cr</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-2 text-center">
                            <p className="text-xs text-gray-500">Bidders</p>
                            <p className="text-sm font-semibold">{auction.participants}</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-2 text-center">
                            <p className="text-xs text-gray-500">Time Left</p>
                            <p className="text-sm font-semibold text-indigo-600">{auction.timeLeft}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
                              <LineChart className="h-4 w-4 text-indigo-600" />
                            </div>
                            <div>
                              <p className="text-xs text-gray-500">Market Prediction</p>
                              <p className="text-sm font-medium text-green-600">High Growth Potential</p>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="text-xs">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Floating UI Elements */}
                <motion.div
                  animate={{ 
                    y: [0, -8, 0],
                    rotate: [-1, 1, -1]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute top-20 -right-8 bg-white rounded-xl shadow-lg p-3 z-10"
                >
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">AI Match Found</p>
                      <p className="text-xs text-gray-500">98% compatibility</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ 
                    y: [0, 8, 0],
                    rotate: [1, -1, 1]
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                  className="absolute bottom-20 -left-8 bg-white rounded-xl shadow-lg p-3"
                >
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <LineChart className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Market Analysis</p>
                      <p className="text-xs text-gray-500">15% Undervalued</p>
                    </div>
                  </div>
                </motion.div>

                {/* Real-time Activity Indicator */}
                <motion.div
                  animate={{ 
                    y: [0, -4, 0],
                    opacity: [1, 0.85, 1]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                  className="absolute top-1/2 right-0 bg-white rounded-xl shadow-lg p-3"
                >
                  <div className="flex items-center space-x-2">
                    <div className="h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Live Activity</p>
                      <p className="text-xs text-gray-500">250+ users online</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Platform Statistics Section */}
      <div className="border-y border-gray-200 bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Trusted by India's Top Real Estate Professionals</h2>
            <p className="mt-4 text-lg text-gray-600">Our platform connects verified brokers with premium property buyers</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-indigo-600 mb-2">200+</div>
              <div className="text-sm text-gray-600">Verified Brokers</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-indigo-600 mb-2">₹2.5K Cr+</div>
              <div className="text-sm text-gray-600">Property Value Auctioned</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-indigo-600 mb-2">98.7%</div>
              <div className="text-sm text-gray-600">Successful Deals</div>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-sm">
              <div className="text-4xl font-bold text-indigo-600 mb-2">15K+</div>
              <div className="text-sm text-gray-600">Active Bidders</div>
            </div>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {/* Broker Success Story */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Top Broker" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h3 className="font-semibold text-gray-900">Rajesh Kumar</h3>
                  <p className="text-sm text-gray-600">Top Performing Broker</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">"The AI-powered market insights help me provide accurate valuations and attract serious buyers. My success rate has increased by 40% since joining."</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Deals Closed</span>
                <span className="font-semibold text-gray-900">150+</span>
              </div>
            </div>

            {/* Recent Auction Success */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Recent Auction Success</h3>
                <Gavel className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-medium text-gray-900">Luxury Villa in Mumbai</p>
                  <p className="text-sm text-gray-600 mb-2">Closed at ₹12.5 Cr</p>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>15% above market value</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <p className="font-medium text-gray-900">Premium Apartment in Delhi</p>
                  <p className="text-sm text-gray-600 mb-2">Closed at ₹8.2 Cr</p>
                  <div className="flex items-center text-sm text-green-600">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>12% above market value</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Market Intelligence */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Advanced Market Intelligence</h3>
                <LineChart className="h-5 w-5 text-indigo-600" />
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Market Confidence Index</p>
                  <div className="flex items-center justify-between">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">85%</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Price Prediction Accuracy</p>
                  <div className="flex items-center justify-between">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                      <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-gray-900">92%</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View Market Report
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Properties Section - Modern SaaS style */}
      <section id="featured" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <span className="text-indigo-600 font-semibold text-sm tracking-wider uppercase">Curated Selection</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">Featured Properties</h2>
              <p className="text-gray-600 mt-2 max-w-2xl">Discover our handpicked selection of extraordinary properties that represent the pinnacle of luxury and design.</p>
            </div>
            <Link to="/properties" className="mt-4 md:mt-0 text-indigo-600 hover:text-indigo-700 font-medium flex items-center group">
              <span>View all properties</span>
              <ChevronRight className="h-4 w-4 ml-1 transform transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <Link to={`/property/${property.id}`} key={property.id}>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative">
                    <div className="aspect-w-16 aspect-h-9">
                      <img src={property.image} alt={property.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute top-0 left-0 m-4">
                      {property.isPremium && (
                        <span className="bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
                          PREMIUM
                        </span>
                      )}
                    </div>
                    <div className="absolute top-0 right-0 m-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex space-x-2">
                        <button className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition">
                          <Heart className="h-4 w-4 text-gray-700 hover:text-rose-500" />
                        </button>
                        <button className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition">
                          <PlayCircle className="h-4 w-4 text-gray-700 hover:text-indigo-600" />
                        </button>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <div className="flex items-center text-white text-sm">
                        <MapPin className="h-3 w-3 mr-1" />
                        {property.location}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{property.name}</h3>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-amber-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">4.9</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{property.description}</p>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xl font-bold text-gray-900">₹{(property.price * 75).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex gap-3 text-xs text-gray-500">
                        <span className="flex items-center"><span className="w-2 h-2 bg-indigo-600 rounded-full mr-1"></span> {property.beds} beds</span>
                        <span className="flex items-center"><span className="w-2 h-2 bg-sky-500 rounded-full mr-1"></span> {property.baths} baths</span>
                      </div>
                    </div>
                    
                    <div className="mt-5">
                      <Button className="w-full btn-secondary">
                        View details
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features section - Broker and Auction focused */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-indigo-600 font-semibold text-sm tracking-wider uppercase">Platform Features</span>
            <h2 className="mt-4 mb-6">Professional Tools for Modern Real Estate</h2>
            <p className="text-lg">
              Our platform combines expert brokers, secure auctions, and AI-powered insights to deliver the best property deals.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              {/* Feature 1 - Broker Verification */}
              <div className="relative">
                <div className="relative pl-16 max-w-md">
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="mb-4">Verified Broker Network</h3>
                  <p>
                    Every broker on our platform undergoes strict verification. Access experienced professionals who understand the market and your needs.
                  </p>
                </div>
              </div>
              
              {/* Feature 2 - Live Auctions */}
              <div className="relative">
                <div className="relative pl-16 max-w-md">
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500 text-white">
                    <Gavel className="h-6 w-6" />
                  </div>
                  <h3 className="mb-4">Secure Auction Platform</h3>
                  <p>
                    Participate in transparent, secure property auctions. Real-time bidding, automated verification, and secure payment processing.
                  </p>
                </div>
              </div>
              
              {/* Feature 3 - AI Insights */}
              <div className="relative">
                <div className="relative pl-16 max-w-md">
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-xl bg-green-500 text-white">
                    <LineChart className="h-6 w-6" />
                  </div>
                  <h3 className="mb-4">Advanced Market Intelligence</h3>
                  <p>
                    Make informed decisions with data-driven market analysis. Get property valuations, market trends, and investment insights.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              {/* Mobile Device Frame */}
              <div className="relative mx-auto w-[320px]">
                {/* Phone Frame */}
                <div className="relative rounded-[3rem] bg-gray-900 p-4 shadow-2xl">
                  {/* Notch */}
                  <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-t-[3rem] flex items-center justify-center">
                    <div className="w-20 h-4 bg-gray-800 rounded-full"></div>
                  </div>
                  
                  {/* Screen Content */}
                  <div className="relative bg-white rounded-[2rem] overflow-hidden h-[600px]">
                    {/* Status Bar */}
                    <div className="h-6 bg-gray-900 flex items-center justify-between px-4">
                      <span className="text-white text-xs">9:41</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-4 h-4 flex items-center">
                          <div className="h-2 w-2 bg-white rounded-full"></div>
                        </div>
                        <div className="w-4 h-4 flex items-center">
                          <div className="h-2 w-3 bg-white rounded-sm"></div>
                        </div>
                        <div className="text-white text-xs">100%</div>
                      </div>
                    </div>

                    {/* App Content */}
                    <div className="p-4">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-lg font-semibold">Analytics</h3>
                          <p className="text-sm text-gray-500">Market Overview</p>
                        </div>
                        <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
                          <LineChart className="h-4 w-4 text-indigo-600" />
                        </div>
                      </div>

                      {/* Stats Cards */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-indigo-50 p-3 rounded-xl">
                          <p className="text-xs text-indigo-600 mb-1">Active Auctions</p>
                          <p className="text-lg font-semibold">24</p>
                          <div className="flex items-center text-xs text-green-600 mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +12%
                          </div>
                        </div>
                        <div className="bg-sky-50 p-3 rounded-xl">
                          <p className="text-xs text-sky-600 mb-1">Total Bids</p>
                          <p className="text-lg font-semibold">284</p>
                          <div className="flex items-center text-xs text-green-600 mt-1">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            +8%
                          </div>
                        </div>
                      </div>

                      {/* Market Trends */}
                      <div className="bg-gray-50 rounded-xl p-4 mb-6">
                        <h4 className="text-sm font-medium mb-3">Market Trends</h4>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-500">Property Values</span>
                              <span className="text-green-600">+8.5%</span>
                            </div>
                            <div className="h-1.5 bg-gray-200 rounded-full">
                              <div className="h-full bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-500">Buyer Interest</span>
                              <span className="text-indigo-600">High</span>
                            </div>
                            <div className="h-1.5 bg-gray-200 rounded-full">
                              <div className="h-full bg-indigo-500 rounded-full" style={{ width: '92%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Recent Activity */}
                      <div>
                        <h4 className="text-sm font-medium mb-3">Recent Activity</h4>
                        <div className="space-y-3">
                          <div className="flex items-center p-2 bg-white rounded-lg border border-gray-100">
                            <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                              <Gavel className="h-4 w-4 text-indigo-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">New Bid Placed</p>
                              <p className="text-xs text-gray-500">₹2.8 Cr on Luxury Villa</p>
                            </div>
                            <span className="text-xs text-gray-400 ml-auto">2m ago</span>
                          </div>
                          <div className="flex items-center p-2 bg-white rounded-lg border border-gray-100">
                            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">Auction Completed</p>
                              <p className="text-xs text-gray-500">Sea View Apartment</p>
                            </div>
                            <span className="text-xs text-gray-400 ml-auto">15m ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-indigo-100 rounded-full blur-2xl opacity-50"></div>
                <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-sky-100 rounded-full blur-2xl opacity-50"></div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <Link to="/broker-signup" className="inline-flex items-center btn-primary group">
              Become a Verified Broker
              <ArrowRight className="ml-2 h-5 w-5 transform transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Trending cities section - Modern grid style */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
            <div>
              <span className="text-indigo-600 font-semibold text-sm tracking-wider uppercase">Popular Locations</span>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">Trending Cities</h2>
              <p className="text-gray-600 mt-2 max-w-2xl">Explore the most sought-after urban destinations with vibrant real estate markets.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingCities.map((city, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="relative rounded-xl overflow-hidden aspect-[4/3] group"
              >
                <img src={city.image} alt={city.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent"></div>
                <div className="absolute inset-x-0 bottom-0 p-6 flex justify-between items-end">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{city.name}</h3>
                    <p className="text-white/80 text-sm">{city.properties} properties</p>
                  </div>
                  <button className="bg-white/90 backdrop-blur-sm text-gray-900 font-medium px-4 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    Explore
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials section - Success Stories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-indigo-600 font-semibold text-sm tracking-wider uppercase">Success Stories</span>
            <h2 className="mt-4 mb-6">Trusted by Top Real Estate Professionals</h2>
            <p className="text-lg">
              Hear from our verified brokers and successful buyers about their experience with our auction platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow relative"
              >
                <div className="flex items-center mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                  ))}
                </div>
                
                <div className="flex items-center mb-6">
                  <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-8 text-lg leading-relaxed">"{testimonial.text}"</p>
                
                <div className="border-t border-gray-100 pt-6 mt-auto">
                  {'deals' in testimonial.stats ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Deals Closed</p>
                        <p className="font-semibold text-gray-900">{testimonial.stats.deals}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Value</p>
                        <p className="font-semibold text-gray-900">{testimonial.stats.value}</p>
                      </div>
                    </div>
                  ) : 'auctions' in testimonial.stats ? (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Auctions Won</p>
                        <p className="font-semibold text-gray-900">{testimonial.stats.auctions}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Investment</p>
                        <p className="font-semibold text-gray-900">{testimonial.stats.invested}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Valuation Accuracy</p>
                        <p className="font-semibold text-gray-900">{testimonial.stats.accuracy}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Avg. Premium</p>
                        <p className="font-semibold text-gray-900">{testimonial.stats.premium}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="absolute top-8 right-8 text-indigo-100">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 25H7.5C6.83696 25 6.20107 24.7366 5.73223 24.2678C5.26339 23.7989 5 23.163 5 22.5L5 20C5 16.134 8.13401 13 12 13V15C9.24299 15 7 17.243 7 20V23H12.5V25ZM27.5 25H22.5C21.837 25 21.2011 24.7366 20.7322 24.2678C20.2634 23.7989 20 23.163 20 22.5L20 20C20 16.134 23.134 13 27 13V15C24.243 15 22 17.243 22 20V23H27.5V25Z" fill="currentColor"/>
                  </svg>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section - Broker and Auction focused */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 skew-y-3 -z-10 transform origin-bottom-left"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 -z-10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Transform Your Real Estate Business?</h2>
              <div className="space-y-6 text-white/90">
                <div className="flex items-start">
                  <Shield className="h-6 w-6 text-indigo-200 mt-1 mr-3" />
                  <p>Join our network of verified brokers and access premium property auctions</p>
                </div>
                <div className="flex items-start">
                  <LineChart className="h-6 w-6 text-indigo-200 mt-1 mr-3" />
                  <p>Leverage AI-powered market insights to make data-driven decisions</p>
                </div>
                <div className="flex items-start">
                  <Gavel className="h-6 w-6 text-indigo-200 mt-1 mr-3" />
                  <p>Conduct secure auctions and close deals faster</p>
                </div>
              </div>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button className="bg-white text-indigo-600 hover:bg-gray-100 text-base px-8 py-6 h-auto rounded-lg flex items-center justify-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Register as Broker
                </Button>
                <Button variant="outline" className="text-white border-white hover:bg-white/10 text-base px-8 py-6 h-auto rounded-lg flex items-center justify-center">
                  <Gavel className="h-5 w-5 mr-2" />
                  View Live Auctions
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="text-white mb-8">
                  <h3 className="text-xl font-semibold mb-2">Upcoming Auction Alert</h3>
                  <p className="text-white/80">Premium Properties Going Live Soon</p>
                </div>

                <div className="space-y-4">
                  {upcomingAuctions.slice(0, 2).map((auction) => (
                    <div key={auction.id} className="bg-white/5 backdrop-blur-sm rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-white">{auction.propertyName}</h4>
                        <span className="text-xs text-white/80">
                          {new Date(auction.auctionDate).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-white/80 mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        {auction.location}
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-white/60">Starting Bid</p>
                          <p className="text-sm font-medium text-white">₹{(auction.startingBid / 10000000).toFixed(1)} Cr</p>
                        </div>
                        <div className="flex items-center bg-white/10 rounded-full px-3 py-1">
                          <Users className="h-3 w-3 text-white mr-1" />
                          <span className="text-xs text-white">{auction.registeredBidders} registered</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white border border-white/20 flex items-center justify-center">
                  <Bell className="h-4 w-4 mr-2" />
                  Get Auction Alerts
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer - Modern style */}
      <footer className="bg-gray-900 text-gray-300 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-sky-400 text-transparent bg-clip-text">Mansio</span>
              <p className="mt-4 text-gray-400 text-sm leading-relaxed">
                Redefining real estate discovery through immersive, social-inspired experiences for property buyers worldwide.
              </p>
              <div className="flex space-x-5 mt-8">
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4 text-sm tracking-wider uppercase">Product</h3>
              <ul className="space-y-3">
                <li><Link to="/properties" className="text-gray-400 hover:text-white transition-colors">Browse Properties</Link></li>
                <li><button className="text-gray-400 hover:text-white transition-colors">Premium Listings</button></li>
                <li><button className="text-gray-400 hover:text-white transition-colors">Virtual Tours</button></li>
                <li><button className="text-gray-400 hover:text-white transition-colors">Pricing</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4 text-sm tracking-wider uppercase">Resources</h3>
              <ul className="space-y-3">
                <li><button className="text-gray-400 hover:text-white transition-colors">Help Center</button></li>
                <li><button className="text-gray-400 hover:text-white transition-colors">Market Reports</button></li>
                <li><button className="text-gray-400 hover:text-white transition-colors">Blog</button></li>
                <li><button className="text-gray-400 hover:text-white transition-colors">API</button></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-white mb-4 text-sm tracking-wider uppercase">Company</h3>
              <ul className="space-y-3">
                <li><button className="text-gray-400 hover:text-white transition-colors">About Us</button></li>
                <li><button className="text-gray-400 hover:text-white transition-colors">Careers</button></li>
                <li><button className="text-gray-400 hover:text-white transition-colors">Contact</button></li>
                <li><button className="text-gray-400 hover:text-white transition-colors">Privacy Policy</button></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Mansio. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <button className="text-gray-400 hover:text-white transition-colors text-sm">Terms</button>
              <button className="text-gray-400 hover:text-white transition-colors text-sm">Privacy</button>
              <button className="text-gray-400 hover:text-white transition-colors text-sm">Cookies</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
