import { Component, type ErrorInfo, type ReactNode } from "react";
import { ThinkingOrb, type OrbSize, type OrbState, type OrbTheme } from "thinking-orbs";
import { cn } from "@/lib/utils";

type LoadingOrbProps = {
  state?: OrbState;
  size?: OrbSize;
  label?: string;
  className?: string;
  theme?: OrbTheme;
  /** Brand tint — UR Binary Hub blue */
  color?: string;
  speed?: number;
};

class OrbErrorBoundary extends Component<{ children: ReactNode; fallback?: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("ThinkingOrb failed to render", error, info);
  }

  render() {
    if (this.state.failed) {
      return (
        this.props.fallback ?? (
          <div
            className="h-9 w-9 animate-spin rounded-full border-2 border-[#00628b] border-t-transparent"
            aria-label="Loading"
          />
        )
      );
    }
    return this.props.children;
  }
}

/** Page / section loader — [ThinkingOrb](https://libraries.dev/orbs) at chat-avatar scale. */
export function LoadingOrb({
  state = "searching",
  size = 64,
  label = "Loading",
  className,
  theme = "auto",
  color = "#00628B",
  speed,
}: LoadingOrbProps) {
  return (
    <div
      className={cn("inline-flex items-center justify-center", className)}
      role="status"
      aria-live="polite"
      aria-label={label}
    >
      <OrbErrorBoundary>
        <ThinkingOrb state={state} size={size} theme={theme} color={color} speed={speed} />
      </OrbErrorBoundary>
      <span className="sr-only">{label}</span>
    </div>
  );
}

/** Full-bleed centered loader for route transitions and empty pages. */
export function CenteredLoadingOrb({
  state = "connecting",
  label = "Loading",
  className,
  minHeightClassName = "min-h-[50vh]",
}: {
  state?: OrbState;
  label?: string;
  className?: string;
  minHeightClassName?: string;
}) {
  return (
    <div className={cn("flex w-full items-center justify-center", minHeightClassName, className)}>
      <LoadingOrb state={state} size={64} label={label} />
    </div>
  );
}

/** Inline button / text-scale loader. */
export function InlineLoadingOrb({
  state = "working",
  label = "Working",
  className,
}: {
  state?: OrbState;
  label?: string;
  className?: string;
}) {
  return <LoadingOrb state={state} size={20} label={label} className={className} />;
}
