import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { TooltipProvider } from "@/components/common/tooltip";
import MainLayout from "@/layouts/MainLayout";
import CleanLayout from "@/layouts/CleanLayout";
import Index from "@/features/Index";
import NotFound from "@/features/NotFound";
import HomePage from "@/features/HomePage";
import PropertyDetails from '@/features/PropertyDetails';
import Auctions from '@/features/Auctions';
import Brokers from '@/features/Brokers';
import MarketAnalysis from '@/features/MarketAnalysis';
import BrokerSignup from '@/features/BrokerSignup';
import ImmersiveFeed from '@/features/ImmersiveFeed';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Router>
        <AnimatePresence mode="wait">
          <Routes>
            {/* Clean Layout Routes */}
            <Route element={<CleanLayout />}>
              <Route path="/immersive" element={<ImmersiveFeed />} />
            </Route>

            {/* Main Layout Routes */}
            <Route element={<MainLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/properties" element={<Index />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="/auctions" element={<Auctions />} />
              <Route path="/brokers" element={<Brokers />} />
              <Route path="/market-analysis" element={<MarketAnalysis />} />
              <Route path="/broker-signup" element={<BrokerSignup />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </AnimatePresence>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
