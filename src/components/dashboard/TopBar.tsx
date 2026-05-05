import { RefreshCw, User } from "lucide-react";

export function TopBar() {
  return (
    <header className="bg-primary text-primary-foreground px-6 py-4 flex items-center justify-between">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">Omnichannel Executive Portfolio View</h1>
        <p className="text-xs opacity-75">Dawnzera · Live Demo · FY26</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 text-xs bg-white/10 px-3 py-1.5 rounded-full">
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Refreshed: 05 May 2026, 09:12 IST</span>
        </div>
        <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
          <div className="h-7 w-7 rounded-full bg-white/20 flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
          <span className="text-sm">Hi, User</span>
        </div>
      </div>
    </header>
  );
}
