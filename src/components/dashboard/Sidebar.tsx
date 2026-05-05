import { LayoutDashboard, Map, Compass, Lightbulb, Radio } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/ionis-logo.png";

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
    <aside className="w-64 shrink-0 bg-sidebar text-sidebar-foreground flex flex-col min-h-screen border-r border-sidebar-border">
      <div className="px-5 py-6 flex items-center justify-center border-b border-sidebar-border bg-white">
        <img src={logo} alt="Ionis — A Genetic Medicines Company" className="h-14 w-auto object-contain" />
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
                  ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm"
                  : "hover:bg-sidebar-accent/10 text-sidebar-foreground/80"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{it.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="p-4 text-[11px] text-sidebar-foreground/50 border-t border-sidebar-border">
        v2.4 · © 2026 Ionis Pharmaceuticals
      </div>
    </aside>
  );
}
