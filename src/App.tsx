
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import About from "./pages/About";
import InnovatorsDirectory from "./pages/InnovatorsDirectory";
import InnovationShowcase from "./pages/InnovationShowcase";
import Events from "./pages/Events";
import Partners from "./pages/Partners";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ProjectDetail from "./pages/ProjectDetail";
import InnovatorDetail from "./pages/InnovatorDetail";
import ContactPage from "./pages/Contact";

// Admin Routes
import AdminDashboard from "./pages/admin/Dashboard";
import Overview from "./pages/admin/Overview";
import InnovatorManagement from "./pages/admin/InnovatorManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/innovators" element={<InnovatorsDirectory />} />
          <Route path="/innovators/:innovatorId" element={<InnovatorDetail />} />
          <Route path="/innovations" element={<InnovationShowcase />} />
          <Route path="/projects/:projectId" element={<ProjectDetail />} />
          <Route path="/events" element={<Events />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<Overview />} />
            <Route path="innovators" element={<InnovatorManagement />} />
            {/* Add other admin routes as needed */}
          </Route>
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
