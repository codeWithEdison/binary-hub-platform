import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, signIn } = useAuth();
  const { profile } = useProfile();
  const navigate = useNavigate();
  const location = useLocation();
  const authState = location.state as { from?: string; message?: string } | null;

  useEffect(() => {
    if (user && profile) {
      const storedDestination = sessionStorage.getItem("postAuthRedirect");
      const requestedDestination = authState?.from || storedDestination;
      const destination = requestedDestination?.startsWith("/")
        ? requestedDestination
        : null;

      if (profile.role === "admin") {
        sessionStorage.removeItem("postAuthRedirect");
        navigate("/admin", { replace: true });
      } else if (destination) {
        sessionStorage.removeItem("postAuthRedirect");
        navigate(destination, { replace: true });
      } else {
        navigate("/");
      }
    }
  }, [user, profile, navigate, authState?.from]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signIn(email, password);
    setLoading(false);
  };

  return (
    <div className="bh-auth-page">
      <div className="bh-auth-atmosphere" aria-hidden="true" />

      <div className="bh-auth-shell">
        <aside className="bh-auth-brand-panel">
          <Link to="/" className="bh-auth-brand-link">
            <img src="/img/logo.png" alt="" className="bh-auth-logo" />
            <div>
              <p className="bh-auth-brand-name">UR Binary Hub</p>
              <p className="bh-auth-brand-tag">The Power of United Minds</p>
            </div>
          </Link>

          <div className="bh-auth-brand-copy">
            <h1>
              A space for <span>innovators</span>
            </h1>
            <p>
              Sign in to access your portal, applications, and the Binary Hub
              community.
            </p>
          </div>

          <p className="bh-auth-brand-foot">
            University of Rwanda · School of ICT
          </p>
        </aside>

        <main className="bh-auth-panel">
          <div className="bh-auth-panel-inner">
            <div className="bh-auth-mobile-brand">
              <Link to="/" className="bh-auth-brand-link">
                <img src="/img/logo.png" alt="" className="bh-auth-logo" />
                <span className="bh-auth-brand-name">UR Binary Hub</span>
              </Link>
            </div>

            <h2 className="bh-auth-title">Welcome back</h2>
            <p className="bh-auth-subtitle">Sign in with your email to continue.</p>

            {authState?.message && (
              <div className="bh-auth-banner">{authState.message}</div>
            )}

            <form onSubmit={handleSignIn} className="bh-auth-form">
              <div className="bh-auth-field">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bh-auth-input"
                />
              </div>

              <div className="bh-auth-field">
                <Label htmlFor="password">Password</Label>
                <div className="bh-auth-password">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bh-auth-input"
                  />
                  <button
                    type="button"
                    className="bh-auth-eye"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button type="submit" className="bh-auth-submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in…
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            <p className="bh-auth-footer">
              <Link to="/">← Back to homepage</Link>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Auth;
