const slicers = [
  { label: "Brand", value: "Dawnzera" },
  { label: "Period", value: "FY26 Q2" },
  { label: "Region", value: "All Regions" },
  { label: "Territory", value: "All Territories" },
  { label: "Channel", value: "All Channels" },
  { label: "HCP Segment", value: "All Segments" },
];

const periodOptions = ["FY26 Q2", "FY26 Q1", "FY25 Q4", "FY25 Q3"];
const brandOptions = ["Dawnzera", "All Brands"];

export function Filters() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 px-6 py-4 bg-card border-b">
      {slicers.map((s) => {
        const opts = s.label === "Brand" ? brandOptions : s.label === "Period" ? periodOptions : [s.value];
        return (
          <label key={s.label} className="flex flex-col gap-1">
            <span className="text-[11px] uppercase tracking-wide text-muted-foreground">{s.label}</span>
            <select
              defaultValue={s.value}
              className="bg-background border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {opts.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>
        );
      })}
    </div>
  );
}
