
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import About from "./pages/About";
import InnovatorsDirectory from "./pages/InnovatorsDirectory";
import InnovationShowcase from "./pages/InnovationShowcase";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Partners from "./pages/Partners";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import ProjectDetail from "./pages/ProjectDetail";
import InnovatorDetail from "./pages/InnovatorDetail";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import AnnouncementDetail from "./pages/AnnouncementDetail";
import Login from "./pages/Login";

// Admin Routes
import AdminDashboard from "./pages/admin/Dashboard";
import Overview from "./pages/admin/Overview";
import InnovatorManagement from "./pages/admin/InnovatorManagement";
import ProjectManagement from "./pages/admin/ProjectManagement";
import EventManagement from "./pages/admin/EventManagement";
import AnnouncementManagement from "./pages/admin/AnnouncementManagement";
import InnovatorForm from "./pages/admin/InnovatorForm";
import ProjectForm from "./pages/admin/ProjectForm";
import EventForm from "./pages/admin/EventForm";
import AnnouncementForm from "./pages/admin/AnnouncementForm";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />

          {/* Public Routes with Navbar */}
          <Route path="/" element={<><Navbar /><Index /></>} />
          <Route path="/about" element={<><Navbar /><About /></>} />
          <Route path="/innovators" element={<><Navbar /><InnovatorsDirectory /></>} />
          <Route path="/innovators/:innovatorId" element={<><Navbar /><InnovatorDetail /></>} />
          <Route path="/innovations" element={<><Navbar /><InnovationShowcase /></>} />
          <Route path="/projects/:projectId" element={<><Navbar /><ProjectDetail /></>} />
          <Route path="/events" element={<><Navbar /><Events /></>} />
          <Route path="/events/:eventId" element={<><Navbar /><EventDetail /></>} />
          <Route path="/announcements" element={<><Navbar /><AnnouncementsPage /></>} />
          <Route path="/announcements/:announcementId" element={<><Navbar /><AnnouncementDetail /></>} />
          <Route path="/partners" element={<><Navbar /><Partners /></>} />
          <Route path="/contact" element={<><Navbar /><Contact /></>} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<Overview />} />
            <Route path="innovators" element={<InnovatorManagement />} />
            <Route path="innovators/new" element={<InnovatorForm />} />
            <Route path="innovators/edit/:id" element={<InnovatorForm />} />
            <Route path="projects" element={<ProjectManagement />} />
            <Route path="projects/new" element={<ProjectForm />} />
            <Route path="projects/edit/:id" element={<ProjectForm />} />
            <Route path="events" element={<EventManagement />} />
            <Route path="events/new" element={<EventForm />} />
            <Route path="events/edit/:id" element={<EventForm />} />
            <Route path="announcements" element={<AnnouncementManagement />} />
            <Route path="announcements/new" element={<AnnouncementForm />} />
            <Route path="announcements/edit/:id" element={<AnnouncementForm />} />
          </Route>

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
