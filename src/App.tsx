import { lazy, Suspense, type ComponentType } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import PageLoader from "./components/PageLoader";
import { AdminOverviewSkeleton } from "./components/admin/AdminSkeletons";
import { ProtectedRoute } from "./components/ProtectedRoute";

const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const InnovatorsDirectory = lazy(() => import("./pages/InnovatorsDirectory"));
const InnovationShowcase = lazy(() => import("./pages/InnovationShowcase"));
const Events = lazy(() => import("./pages/Events"));
const EventDetail = lazy(() => import("./pages/EventDetail"));
const Partners = lazy(() => import("./pages/Partners"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const InnovatorDetail = lazy(() => import("./pages/InnovatorDetail"));
const AnnouncementsPage = lazy(() => import("./pages/AnnouncementsPage"));
const AnnouncementDetail = lazy(() => import("./pages/AnnouncementDetail"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Auth = lazy(() => import("./pages/Auth"));
const Login = lazy(() => import("./pages/Login"));
const ApplicationFormRedesigned = lazy(() => import("./pages/ApplicationFormRedesigned"));

const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const Overview = lazy(() => import("./pages/admin/Overview"));
const Members = lazy(() => import("./pages/admin/Members"));
const ProjectManagement = lazy(() => import("./pages/admin/ProjectManagement"));
const EventManagement = lazy(() => import("./pages/admin/EventManagement"));
const AnnouncementManagement = lazy(() => import("./pages/admin/AnnouncementManagement"));
const ApplicantManagement = lazy(() => import("./pages/admin/ApplicantManagement"));
const ApplicationSetup = lazy(() => import("./pages/admin/ApplicationSetup"));
const InnovatorForm = lazy(() => import("./pages/admin/InnovatorForm"));
const ProjectForm = lazy(() => import("./pages/admin/ProjectForm"));
const EventForm = lazy(() => import("./pages/admin/EventForm"));
const AnnouncementForm = lazy(() => import("./pages/admin/AnnouncementForm"));
const StakeholderManagement = lazy(() =>
  import("./pages/admin/StakeholderManagement").then((module) => ({
    default: module.StakeholderManagement,
  }))
);
const BlogManagement = lazy(() => import("./pages/admin/BlogManagement"));
const BlogForm = lazy(() => import("./pages/admin/BlogForm"));
const HeroSlidesManagement = lazy(() => import("./pages/admin/HeroSlidesManagement"));
const HeroSlideForm = lazy(() => import("./pages/admin/HeroSlideForm"));
const Inquiries = lazy(() => import("./pages/admin/Inquiries"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const withNavbar = (Page: ComponentType) => (
  <>
    <Navbar />
    <Suspense fallback={<PageLoader />}>
      <Page />
    </Suspense>
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/login" element={<Login />} />

            <Route path="/" element={withNavbar(Index)} />
            <Route path="/about" element={withNavbar(About)} />
            <Route path="/innovators" element={withNavbar(InnovatorsDirectory)} />
            <Route path="/innovators/:innovatorId" element={withNavbar(InnovatorDetail)} />
            <Route path="/innovations" element={withNavbar(InnovationShowcase)} />
            <Route path="/projects" element={withNavbar(InnovationShowcase)} />
            <Route path="/projects/:projectId" element={withNavbar(ProjectDetail)} />
            <Route path="/events" element={withNavbar(Events)} />
            <Route path="/events/:eventId" element={withNavbar(EventDetail)} />
            <Route path="/announcements" element={withNavbar(AnnouncementsPage)} />
            <Route path="/announcements/:announcementId" element={withNavbar(AnnouncementDetail)} />
            <Route path="/blog" element={withNavbar(Blog)} />
            <Route path="/blog/:slug" element={withNavbar(BlogDetail)} />
            <Route path="/partners" element={withNavbar(Partners)} />
            <Route path="/contact" element={withNavbar(Contact)} />

            <Route path="/applications/form" element={withNavbar(ApplicationFormRedesigned)} />
            <Route path="/applications/profile" element={<Navigate to="/applications/form" replace />} />

            <Route
              path="/inquiries"
              element={
                <ProtectedRoute requireRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<Inquiries />} />
            </Route>
            <Route
              path="/members"
              element={
                <ProtectedRoute requireRole="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<Members />} />
            </Route>

            <Route
              path="/admin"
              element={
                <ProtectedRoute requireRole="admin">
                  <Suspense fallback={<AdminOverviewSkeleton />}>
                    <AdminDashboard />
                  </Suspense>
                </ProtectedRoute>
              }
            >
              <Route index element={<Overview />} />
              <Route path="innovators" element={<Navigate to="/admin/members" replace />} />
              <Route path="members" element={<Members />} />
              <Route path="innovators/new" element={<Navigate to="/admin/members/new" replace />} />
              <Route path="members/new" element={<InnovatorForm />} />
              <Route path="members/edit/:id" element={<InnovatorForm />} />
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
              <Route path="blog" element={<BlogManagement />} />
              <Route path="blog/new" element={<BlogForm />} />
              <Route path="blog/edit/:id" element={<BlogForm />} />
              <Route path="hero-slides" element={<HeroSlidesManagement />} />
              <Route path="hero-slides/new" element={<HeroSlideForm />} />
              <Route path="hero-slides/edit/:id" element={<HeroSlideForm />} />
              <Route path="stakeholders" element={<StakeholderManagement />} />
              <Route path="applicants" element={<ApplicantManagement />} />
              <Route path="inquiries" element={<Inquiries />} />
              <Route path="application-setup" element={<ApplicationSetup />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
