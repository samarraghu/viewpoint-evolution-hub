import type { ReactNode } from "react";

export function Card({ title, children, className = "" }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`bg-card border rounded-lg shadow-sm p-4 ${className}`}>
      <h3 className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase mb-3">{title}</h3>
      {children}
    </div>
  );
}
