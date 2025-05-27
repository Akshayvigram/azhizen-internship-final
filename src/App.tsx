
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import Index from "./pages/Index";
import Confirmation from "./pages/Confirmation";
import DomainDetails from "./pages/DomainDetails";
import NotFound from "./pages/NotFound";
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.min.css';
import PaymentSection from "./components/sections/PaymentSection";

// Create FontAwesome script component instead of using useEffect directly in App
const FontAwesomeScript = () => {
  useEffect(() => {
    const fontAwesomeScript = document.createElement('script');
    fontAwesomeScript.src = 'https://kit.fontawesome.com/7e40056069.js';
    fontAwesomeScript.crossOrigin = 'anonymous';
    document.head.appendChild(fontAwesomeScript);

    return () => {
      if (document.head.contains(fontAwesomeScript)) {
        document.head.removeChild(fontAwesomeScript);
      }
    };
  }, []);
  
  return null;
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <FontAwesomeScript />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/domain/:slug" element={<DomainDetails />} />
            <Route path="/confirmation" element={<Confirmation />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            {/* <Route path="/apply" element={<PaymentSection />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
