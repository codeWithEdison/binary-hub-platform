
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
import AnnouncementsPage from "./pages/AnnouncementsPage";

// Admin Routes
import AdminDashboard from "./pages/admin/Dashboard";
import Overview from "./pages/admin/Overview";
import InnovatorManagement from "./pages/admin/InnovatorManagement";
import ProjectManagement from "./pages/admin/ProjectManagement";
import EventManagement from "./pages/admin/EventManagement";
import AnnouncementManagement from "./pages/admin/AnnouncementManagement";

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
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<Overview />} />
            <Route path="innovators" element={<InnovatorManagement />} />
            <Route path="projects" element={<ProjectManagement />} />
            <Route path="events" element={<EventManagement />} />
            <Route path="announcements" element={<AnnouncementManagement />} />
            {/* More admin routes can be added here */}
          </Route>
          
          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
