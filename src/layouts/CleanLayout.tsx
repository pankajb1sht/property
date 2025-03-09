import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from '@/components/common/toaster';
import { Toaster as Sonner } from '@/components/common/sonner';

interface CleanLayoutProps {
  children?: React.ReactNode;
}

const CleanLayout: React.FC<CleanLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1">
        {children || <Outlet />}
      </main>

      <Toaster />
      <Sonner />
    </div>
  );
};

export default CleanLayout; 