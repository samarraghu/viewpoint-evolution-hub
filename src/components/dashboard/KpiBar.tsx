const kpis = [
  { label: "Incremental sales lift", value: "$42.3M", delta: "+11.4% vs prior period", tone: "success" },
  { label: "HCPs reached (unique)", value: "68,410", delta: "+8.2% vs prior period", tone: "success" },
  { label: "NBA Acceptance", value: "73.4%", delta: "+5.1pp vs prior period", tone: "success" },
  { label: "NBA Rejection / opt-out rate", value: "18.2%", delta: "+1.3pp vs prior period", tone: "warning" },
];

export function KpiBar() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-6 pt-5">
      {kpis.map((k) => (
        <div key={k.label} className="bg-card border rounded-lg p-4 shadow-sm">
          <div className="text-xs text-muted-foreground">{k.label}</div>
          <div className={`text-2xl font-semibold mt-1 ${k.tone === "warning" ? "text-destructive" : "text-success"}`}>
            {k.value}
          </div>
          <div className={`text-[11px] mt-1 ${k.tone === "warning" ? "text-destructive/80" : "text-success/90"}`}>
            {k.delta}
          </div>
        </div>
      ))}
    </div>
  );
}
