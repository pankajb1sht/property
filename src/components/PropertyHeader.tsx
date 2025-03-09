
import React from 'react';
import { Search, User, Bell, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PropertyHeaderProps {
  className?: string;
}

const PropertyHeader = ({ className }: PropertyHeaderProps) => {
  return (
    <header className={cn(
      "w-full px-4 py-4 md:py-6 flex items-center justify-between glass-effect bg-white bg-opacity-80 backdrop-blur-md z-10",
      className
    )}>
      <div className="flex items-center">
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors lg:hidden">
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="ml-3 lg:ml-0 text-xl font-bold text-black">Mansio</h1>
      </div>
      
      <div className="hidden md:flex items-center glass-effect bg-opacity-60 rounded-full px-4 py-2 border border-gray-200 focus-within:border-primary transition-colors">
        <Search className="h-4 w-4 text-gray-500" />
        <input 
          type="text" 
          placeholder="Search properties..." 
          className="ml-2 bg-transparent outline-none text-sm w-64" 
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <button className="p-2 rounded-full text-gray-600 hover:text-primary transition-colors md:hidden">
          <Search className="h-5 w-5" />
        </button>
        <button className="p-2 rounded-full text-gray-600 hover:text-primary transition-colors">
          <Bell className="h-5 w-5" />
        </button>
        <button className="p-1 md:p-2 rounded-full text-gray-600 glass-effect border border-gray-200 hover:border-primary transition-colors">
          <User className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};

export default PropertyHeader;
