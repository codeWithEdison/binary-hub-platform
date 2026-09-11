import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireRole?: "admin" | "innovator";
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireRole
}) => {
  const { user, loading: authLoading } = useAuth();
  const { profile, loading: profileLoading } = useProfile();
  const location = useLocation();

  console.log("ProtectedRoute Debug:", {
    user: user?.id,
    authLoading,
    profileLoading,
    profile: profile?.role,
    requireRole,
    hasUser: !!user,
    roleMatch: requireRole ? profile?.role === requireRole : true
  });

  if (authLoading || profileLoading) {
    console.log("ProtectedRoute: Still loading or no profile", { authLoading, profileLoading, hasProfile: !!profile });
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    console.log("ProtectedRoute: No user, redirecting to /auth");
    return (
      <Navigate
        to="/auth"
        replace
        state={{
          from: location.pathname,
          message: "Please log in or create an account to continue.",
        }}
      />
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-b-2 border-primary" />
          <p className="mt-4 text-sm text-muted-foreground">Preparing your account...</p>
        </div>
      </div>
    );
  }

  if (requireRole && profile?.role !== requireRole) {
    console.log("ProtectedRoute: Role mismatch", { profileRole: profile?.role, requireRole });
    return <Navigate to="/" replace />;
  }

  console.log("ProtectedRoute: Access granted");
  return <>{children}</>;
};
