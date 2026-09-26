import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { CenteredLoadingOrb, LoadingOrb } from "@/components/LoadingOrb";

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
      <CenteredLoadingOrb
        state="connecting"
        label="Checking access"
        minHeightClassName="min-h-screen"
      />
    );
  }

  if (!user) {
    console.log("ProtectedRoute: No user, redirecting to /auth");
    const destination = `${location.pathname}${location.search}`;
    const isApplicationRoute = destination.startsWith("/applications");
    return (
      <Navigate
        to="/auth"
        replace
        state={{
          from: destination,
          message: isApplicationRoute
            ? "Log in to complete your application."
            : "Please log in or create an account to continue.",
        }}
      />
    );
  }

  if (!profile) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <LoadingOrb state="weaving" size={64} label="Preparing account" />
        <p className="text-sm text-muted-foreground">Preparing your account...</p>
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
