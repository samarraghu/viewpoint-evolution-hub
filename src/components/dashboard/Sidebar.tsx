import { LayoutDashboard, Map, Compass, Lightbulb, Radio } from "lucide-react";
import { useState } from "react";

const items = [
  { id: "executive", label: "Executive Summary", icon: LayoutDashboard },
  { id: "regional", label: "Regional View", icon: Map },
  { id: "territory", label: "Territory View", icon: Compass },
  { id: "suggestion", label: "Suggestion Level Deep Dive", icon: Lightbulb },
  { id: "channel", label: "Channel Level Deep Dive", icon: Radio },
];

export function Sidebar() {
  const [active, setActive] = useState("executive");
  return (
    <aside className="w-64 shrink-0 bg-sidebar text-sidebar-foreground flex flex-col min-h-screen">
      <div className="px-5 py-5 flex items-center gap-3 border-b border-sidebar-border">
        <div className="h-9 w-9 rounded-md bg-gradient-to-br from-primary-foreground/90 to-primary-foreground/40 flex items-center justify-center text-primary font-bold">
          D
        </div>
        <div>
          <div className="text-sm font-semibold tracking-wide">DAWNZERA</div>
          <div className="text-[10px] uppercase opacity-60">Pharma Analytics</div>
        </div>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {items.map((it) => {
          const Icon = it.icon;
          const isActive = active === it.id;
          return (
            <button
              key={it.id}
              onClick={() => setActive(it.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-left transition-colors ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  : "hover:bg-sidebar-accent/50 opacity-85"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{it.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="p-4 text-[11px] opacity-60 border-t border-sidebar-border">
        v2.4 · © 2026 Dawnzera
      </div>
    </aside>
  );
}
