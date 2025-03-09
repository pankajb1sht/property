import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Star, MapPin, Phone, Mail, LineChart } from 'lucide-react';
import { Button } from '@/components/common/button';

// Sample broker data
const brokers = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4.9,
    deals: 150,
    location: 'Mumbai, Maharashtra',
    specialization: 'Luxury Properties',
    experience: '12+ years',
    languages: ['English', 'Hindi', 'Marathi'],
    contact: {
      phone: '+91 98765 43210',
      email: 'rajesh.k@estateauctions.in'
    },
    stats: {
      totalValue: '₹180 Cr+',
      successRate: '95%',
      avgPremium: '12%'
    },
    verificationStatus: 'verified' as const,
    areas: ['Bandra', 'Juhu', 'Worli']
  },
  // Add more broker data here
];

const BrokersPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Verified Property Brokers
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with India's top real estate professionals. Every broker is verified and maintains high performance standards.
            </p>
          </div>
        </div>
      </div>

      {/* Brokers Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brokers.map((broker) => (
            <motion.div
              key={broker.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                {/* Broker Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center">
                    <img
                      src={broker.image}
                      alt={broker.name}
                      className="w-16 h-16 rounded-full object-cover mr-4"
                    />
                    <div>
                      <div className="flex items-center">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {broker.name}
                        </h3>
                        {broker.verificationStatus === 'verified' && (
                          <Shield className="h-4 w-4 text-indigo-600 ml-2" />
                        )}
                      </div>
                      <p className="text-gray-600">{broker.specialization}</p>
                      <div className="flex items-center mt-1">
                        <Star className="h-4 w-4 text-amber-400 fill-current" />
                        <span className="text-sm font-medium text-gray-900 ml-1">
                          {broker.rating}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">
                          • {broker.deals} deals
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Broker Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{broker.location}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Total Value</p>
                      <p className="font-medium text-gray-900">{broker.stats.totalValue}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Success Rate</p>
                      <p className="font-medium text-gray-900">{broker.stats.successRate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Avg Premium</p>
                      <p className="font-medium text-gray-900">{broker.stats.avgPremium}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Areas Covered</p>
                    <div className="flex flex-wrap gap-2">
                      {broker.areas.map((area) => (
                        <span
                          key={area}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                    Contact Broker
                  </Button>
                  <Button variant="outline" className="flex-1">
                    View Profile
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrokersPage; 