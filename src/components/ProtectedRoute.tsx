import React from "react";
import { Navigate } from "react-router-dom";
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

  console.log("ProtectedRoute Debug:", {
    user: user?.id,
    authLoading,
    profileLoading,
    profile: profile?.role,
    requireRole,
    hasUser: !!user,
    roleMatch: requireRole ? profile?.role === requireRole : true
  });

  if (authLoading || profileLoading || !profile) {
    console.log("ProtectedRoute: Still loading or no profile", { authLoading, profileLoading, hasProfile: !!profile });
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    console.log("ProtectedRoute: No user, redirecting to /auth");
    return <Navigate to="/auth" replace />;
  }

  if (requireRole && profile?.role !== requireRole) {
    console.log("ProtectedRoute: Role mismatch", { profileRole: profile?.role, requireRole });
    return <Navigate to="/" replace />;
  }

  console.log("ProtectedRoute: Access granted");
  return <>{children}</>;
};