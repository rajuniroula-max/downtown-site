import React from "react";
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  bg?: "default" | "muted" | "brand-light" | "brand-dark";
}

export function Section({ children, className, bg = "default", ...props }: SectionProps) {
  const bgClasses = {
    default: "bg-white text-slate-900",
    muted: "bg-slate-50 text-slate-900",
    "brand-light": "bg-blue-50/50 text-slate-900",
    "brand-dark": "bg-brand-primary text-white",
  };

  return (
    <section
      className={cn("py-12 md:py-16 lg:py-24 relative overflow-hidden", bgClasses[bg], className)}
      {...props}
    >
      {children}
    </section>
  );
}

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  badge?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  theme?: "light" | "dark";
}

export function SectionHeading({
  badge,
  title,
  description,
  align = "center",
  theme = "light",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col mb-10 md:mb-12 max-w-3xl",
        align === "center" ? "mx-auto text-center items-center" : "text-left items-start",
        className
      )}
      {...props}
    >
      {badge && (
        <span className={cn(
          "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase mb-3",
          theme === "dark"
            ? "bg-brand-accent/20 text-brand-accent border border-brand-accent/30"
            : "bg-blue-50 text-brand-primary border border-blue-100"
        )}>
          {badge}
        </span>
      )}
      
      <h2 className={cn(
        "text-3xl sm:text-4xl font-bold tracking-tight mb-4",
        theme === "dark" ? "text-white" : "text-slate-900"
      )}>
        {title}
      </h2>
      
      {description && (
        <p className={cn(
          "text-base sm:text-lg leading-relaxed",
          theme === "dark" ? "text-blue-100/80" : "text-slate-600"
        )}>
          {description}
        </p>
      )}
    </div>
  );
}
