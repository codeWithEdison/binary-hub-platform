import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useReferenceData } from "@/hooks/useReferenceData";
import { cn } from "@/lib/utils";

const Auth = () => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, signIn, signUp } = useAuth();
  const { profile } = useProfile();
  const { departments } = useReferenceData();
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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const metadata = {
      first_name: firstName,
      last_name: lastName,
      role: "innovator",
      department_id: departmentId || null,
      bio: bio || null,
    };

    await signUp(email, password, metadata);
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
              A space for{" "}
              <span>innovators</span>
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

            <h2 className="bh-auth-title">
              {mode === "signin" ? "Welcome back" : "Create your account"}
            </h2>
            <p className="bh-auth-subtitle">
              {mode === "signin"
                ? "Sign in with your email to continue."
                : "Join as an innovator and start building with the hub."}
            </p>

            {authState?.message && (
              <div className="bh-auth-banner">{authState.message}</div>
            )}

            <div className="bh-auth-tabs" role="tablist" aria-label="Auth mode">
              <button
                type="button"
                role="tab"
                aria-selected={mode === "signin"}
                className={cn("bh-auth-tab", mode === "signin" && "is-active")}
                onClick={() => setMode("signin")}
              >
                Sign in
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === "signup"}
                className={cn("bh-auth-tab", mode === "signup" && "is-active")}
                onClick={() => setMode("signup")}
              >
                Sign up
              </button>
            </div>

            {mode === "signin" ? (
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
            ) : (
              <form onSubmit={handleSignUp} className="bh-auth-form">
                <div className="bh-auth-grid-2">
                  <div className="bh-auth-field">
                    <Label htmlFor="firstName">First name</Label>
                    <Input
                      id="firstName"
                      autoComplete="given-name"
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="bh-auth-input"
                    />
                  </div>
                  <div className="bh-auth-field">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input
                      id="lastName"
                      autoComplete="family-name"
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="bh-auth-input"
                    />
                  </div>
                </div>

                <div className="bh-auth-field">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
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
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="bh-auth-password">
                    <Input
                      id="signup-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Create a password"
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

                <div className="bh-auth-field">
                  <Label htmlFor="department">Department</Label>
                  <Select value={departmentId} onValueChange={setDepartmentId}>
                    <SelectTrigger id="department" className="bh-auth-input">
                      <SelectValue placeholder="Select your department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="bh-auth-field">
                  <Label htmlFor="bio">Bio (optional)</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself…"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="bh-auth-input min-h-[5rem]"
                  />
                </div>

                <button type="submit" className="bh-auth-submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating account…
                    </>
                  ) : (
                    "Create account"
                  )}
                </button>
              </form>
            )}

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
