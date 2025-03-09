import React, { useState } from 'react';
import { Button } from '@/components/common/button';
import { Input } from '@/components/common/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/common/select';
import {
  Card,
  CardContent,
} from '@/components/common/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/common/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/common/tabs';
import {
  Search,
  Timer,
  Users,
  ArrowUpRight,
  Eye,
  EyeOff,
  Home,
  Bed,
  Bath,
  Calendar,
  MapPin,
} from 'lucide-react';
import { toast } from 'sonner';
import { mockAuctions } from '@/data/auctions';
import type { Auction } from '@/types/auction';

export default function Auctions() {
  const [selectedTab, setSelectedTab] = useState('all');
  const [bidAmount, setBidAmount] = useState<number>(0);
  const [filters, setFilters] = useState({ searchQuery: '', propertyType: null, priceRange: null });
  const [watchedAuctions, setWatchedAuctions] = useState<string[]>([]);

  const getTimeRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${days}d ${hours}h ${minutes}m remaining`;
  };

  const handlePlaceBid = async (auction: Auction) => {
    try {
      // Implement your bid logic here
      toast.success('Bid placed successfully!');
    } catch (err) {
      toast.error('Failed to place bid');
    }
  };

  const watchAuction = (auctionId: string) => {
    setWatchedAuctions(prev => [...prev, auctionId]);
    toast.success('Added to watchlist');
  };

  const unwatchAuction = (auctionId: string) => {
    setWatchedAuctions(prev => prev.filter(id => id !== auctionId));
    toast.success('Removed from watchlist');
  };

  const filteredAuctions = mockAuctions.filter(auction => {
    if (selectedTab === 'watching' && !watchedAuctions.includes(auction.id)) {
      return false;
    }
    if (selectedTab === 'live' && auction.status !== 'live') {
      return false;
    }
    if (selectedTab === 'upcoming' && auction.status !== 'upcoming') {
      return false;
    }
    if (selectedTab === 'ended' && auction.status !== 'ended') {
      return false;
    }
    return true;
  });

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Property Auctions</h1>
            <p className="text-gray-600 mt-1">Discover and bid on exclusive properties</p>
          </div>
        </div>

        <Tabs defaultValue="all" className="mb-8" onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="all">All Auctions</TabsTrigger>
            <TabsTrigger value="live">Live Now</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="ended">Ended</TabsTrigger>
            <TabsTrigger value="watching">Watching</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="col-span-1 md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search by title, location, or description..."
                    value={filters.searchQuery}
                    onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select
                value={filters.propertyType || 'all'}
                onValueChange={(value) => setFilters({ ...filters, propertyType: value === 'all' ? null : value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="land">Land</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={filters.priceRange || 'all'}
                onValueChange={(value) => setFilters({ ...filters, priceRange: value === 'all' ? null : value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-500k">Under $500k</SelectItem>
                  <SelectItem value="500k-1m">$500k - $1M</SelectItem>
                  <SelectItem value="1m-2m">$1M - $2M</SelectItem>
                  <SelectItem value="over-2m">Over $2M</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {filteredAuctions.map((auction) => (
              <Card key={auction.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={auction.image}
                    alt={auction.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <span className={`px-3 py-1 text-sm rounded-full ${
                      auction.status === 'live'
                        ? 'bg-green-100 text-green-800'
                        : auction.status === 'upcoming'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {auction.status.toUpperCase()}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white"
                      onClick={() =>
                        watchedAuctions.includes(auction.id)
                          ? unwatchAuction(auction.id)
                          : watchAuction(auction.id)
                      }
                    >
                      {watchedAuctions.includes(auction.id) ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="mb-3">
                    <h3 className="font-semibold text-lg">{auction.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {auction.location}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Current Bid</p>
                      <p className="font-semibold">${auction.currentBid.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Starting Price</p>
                      <p className="font-semibold">${auction.startPrice.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
                    <div className="flex items-center">
                      <Home className="h-4 w-4 mr-1" />
                      {auction.propertyType}
                    </div>
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      {auction.bedrooms} beds
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      {auction.bathrooms} baths
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Timer className="h-4 w-4 mr-1" />
                      {getTimeRemaining(auction.endDate)}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-1" />
                      {auction.participants} participants
                    </div>
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full" disabled={auction.status !== 'live'}>
                        {auction.status === 'live' ? (
                          <>
                            Place Bid
                            <ArrowUpRight className="ml-2 h-4 w-4" />
                          </>
                        ) : auction.status === 'upcoming' ? (
                          <>
                            Coming Soon
                            <Calendar className="ml-2 h-4 w-4" />
                          </>
                        ) : (
                          'Auction Ended'
                        )}
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Place a Bid</DialogTitle>
                        <DialogDescription>
                          Current highest bid is ${auction.currentBid.toLocaleString()}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <p className="mb-4">Minimum bid increment: $5,000</p>
                        <Input
                          type="number"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(Number(e.target.value))}
                          min={auction.currentBid + 5000}
                          step={1000}
                          className="mb-4"
                        />
                        <Button
                          onClick={() => handlePlaceBid(auction)}
                          disabled={bidAmount < auction.currentBid + 5000}
                          className="w-full"
                        >
                          Confirm Bid
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 