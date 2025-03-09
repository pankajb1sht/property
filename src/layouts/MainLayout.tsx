import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/common/toaster';
import { Toaster as Sonner } from '@/components/common/sonner';
import PropertyHeader from '@/components/PropertyHeader';
import { useAuthStore } from '@/store/useAuthStore';

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className="min-h-screen bg-background">
      <PropertyHeader className="sticky top-0" />
      
      <main className="flex-1">
        {children || <Outlet />}
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Mansio</h3>
              <p className="text-gray-400">
                Revolutionizing real estate discovery through immersive experiences.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/properties" className="hover:text-white">Properties</a></li>
                <li><a href="/auctions" className="hover:text-white">Auctions</a></li>
                <li><a href="/brokers" className="hover:text-white">Brokers</a></li>
                <li><a href="/market-analysis" className="hover:text-white">Market Analysis</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/blog" className="hover:text-white">Blog</a></li>
                <li><a href="/guides" className="hover:text-white">Guides</a></li>
                <li><a href="/faq" className="hover:text-white">FAQ</a></li>
                <li><a href="/support" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Email: contact@mansio.com</li>
                <li>Phone: (555) 123-4567</li>
                <li>Address: 123 Real Estate Ave</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Mansio. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <Toaster />
      <Sonner />
    </div>
  );
};

export default MainLayout; 