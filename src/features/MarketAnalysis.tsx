import React from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, TrendingUp, TrendingDown, Building,
  MapPin, Users, ArrowRight, Download, Filter
} from 'lucide-react';
import { Button } from '@/components/common/button';

// Sample market data
const marketTrends = [
  {
    area: 'Bandra West',
    priceChange: '+12.5%',
    trend: 'up',
    avgPrice: '₹45,000/sqft',
    inventory: '125 properties',
    demand: 'High'
  },
  {
    area: 'Worli',
    priceChange: '+8.2%',
    trend: 'up',
    avgPrice: '₹65,000/sqft',
    inventory: '85 properties',
    demand: 'Very High'
  },
  // Add more areas
];

const MarketAnalysisPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              AI-Powered Market Intelligence
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Make data-driven decisions with our comprehensive market analysis and real-time property insights.
            </p>
          </div>
        </div>
      </div>

      {/* Market Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Market Stats */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Market Overview</h2>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
              
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Average Price Growth</p>
                  <div className="flex items-center mt-1">
                    <p className="text-2xl font-bold text-gray-900">+15.2%</p>
                    <TrendingUp className="h-4 w-4 text-green-500 ml-2" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">vs last quarter</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Market Liquidity</p>
                  <p className="text-2xl font-bold text-gray-900">85%</p>
                  <p className="text-xs text-gray-500 mt-1">High demand</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-500">Avg. Days to Sell</p>
                  <p className="text-2xl font-bold text-gray-900">45</p>
                  <p className="text-xs text-gray-500 mt-1">-12 days vs 2023</p>
                </div>
              </div>
            </div>

            {/* Area Trends */}
            <div className="bg-white rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Area Trends</h2>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
              
              <div className="space-y-4">
                {marketTrends.map((area, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-gray-50 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{area.area}</h3>
                        <div className="flex items-center mt-1">
                          <span className={`text-sm ${area.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                            {area.priceChange}
                          </span>
                          {area.trend === 'up' ? (
                            <TrendingUp className="h-4 w-4 text-green-600 ml-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-600 ml-1" />
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">{area.avgPrice}</p>
                        <p className="text-xs text-gray-500">{area.inventory}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* AI Insights */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">AI Market Insights</h2>
              <div className="space-y-4">
                <div className="bg-indigo-50 rounded-lg p-4">
                  <div className="flex items-center text-indigo-600 mb-2">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    <h3 className="font-medium">Growth Prediction</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Property values in Bandra West are predicted to increase by 15-18% in the next 12 months.
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center text-green-600 mb-2">
                    <Users className="h-5 w-5 mr-2" />
                    <h3 className="font-medium">Buyer Interest</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Strong buyer interest in 3-4 BHK properties, particularly in gated communities.
                  </p>
                </div>
                <div className="bg-amber-50 rounded-lg p-4">
                  <div className="flex items-center text-amber-600 mb-2">
                    <Building className="h-5 w-5 mr-2" />
                    <h3 className="font-medium">Investment Opportunity</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Emerging micro-markets in suburban areas show potential for high returns.
                  </p>
                </div>
              </div>
              <Button className="w-full mt-6">
                Get Detailed Analysis
              </Button>
            </div>

            {/* Market Alerts */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
              <h2 className="text-xl font-semibold mb-4">Market Alerts</h2>
              <p className="text-white/90 text-sm mb-6">
                Get real-time alerts for price changes, new listings, and market opportunities.
              </p>
              <Button variant="outline" className="w-full bg-white/10 text-white border-white/20 hover:bg-white/20">
                Set Up Alerts
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalysisPage; 