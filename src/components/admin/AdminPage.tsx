import type { ReactNode } from "react";
import { CenteredLoadingOrb } from "@/components/LoadingOrb";
import { cn } from "@/lib/utils";
import type { OrbState } from "thinking-orbs";

type AdminPageProps = {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
};

export const AdminPage = ({ children, className, narrow = false }: AdminPageProps) => (
  <div className={cn("bh-admin-page", className)}>
    <div className={cn("bh-admin-page-inner", narrow && "is-narrow")}>{children}</div>
  </div>
);

type AdminPageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
  eyebrow?: string;
};

export const AdminPageHeader = ({
  title,
  description,
  actions,
  eyebrow = "Admin",
}: AdminPageHeaderProps) => (
  <header className="bh-admin-page-header">
    <div className="min-w-0">
      <p className="bh-admin-eyebrow">{eyebrow}</p>
      <h1 className="bh-admin-page-title">{title}</h1>
      {description ? <p className="bh-admin-page-lead">{description}</p> : null}
    </div>
    {actions ? <div className="bh-admin-page-actions">{actions}</div> : null}
  </header>
);

type AdminPanelProps = {
  children: ReactNode;
  className?: string;
};

export const AdminPanel = ({ children, className }: AdminPanelProps) => (
  <div className={cn("bh-admin-panel", className)}>{children}</div>
);

type AdminToolbarProps = {
  children: ReactNode;
  className?: string;
};

export const AdminToolbar = ({ children, className }: AdminToolbarProps) => (
  <div className={cn("bh-admin-toolbar", className)}>{children}</div>
);

type AdminLoadingProps = {
  label?: string;
  state?: OrbState;
};

export const AdminLoading = ({
  label = "Loading",
  state = "searching",
}: AdminLoadingProps) => (
  <CenteredLoadingOrb state={state} label={label} minHeightClassName="min-h-[40vh]" />
);
