import { createFileRoute } from "@tanstack/react-router";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { Filters } from "@/components/dashboard/Filters";
import { KpiBar } from "@/components/dashboard/KpiBar";
import { Card } from "@/components/dashboard/Card";
import {
  ReachChart, RepDonut, JourneyChart, ExposureDonut, MultiChannelReach,
} from "@/components/dashboard/Charts";
import { RegionalHeatmap } from "@/components/dashboard/RegionalHeatmap";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

const dismissed = [
  { reason: "Suggestion not relevant", pct: "78%" },
  { reason: "No access to HCP", pct: "62%" },
  { reason: "Content not relevant", pct: "49%" },
  { reason: "HCP on vacation", pct: "37%" },
  { reason: "Reached HCP recently", pct: "24%" },
];

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <Filters />
        <main className="flex-1 px-6 pb-6 space-y-3">
          <KpiBar />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mt-1">
            <Card title="Reach & NBA Trends — Monthly">
              <ReachChart />
            </Card>
            <Card title="Multi-Channel Reach Distribution">
              <MultiChannelReach />
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <Card title="Rep Omnichannel Adoption">
              <RepDonut />
            </Card>
            <Card title="Top 5 Dismissed Recommendation Reasons">
              <ul className="divide-y">
                {dismissed.map((d) => (
                  <li key={d.reason} className="flex justify-between py-2.5 text-sm">
                    <span>{d.reason}</span>
                    <span className="font-semibold text-muted-foreground">{d.pct}</span>
                  </li>
                ))}
              </ul>
            </Card>
            <Card title="Journey Progression by HCP Segment">
              <JourneyChart />
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <div className="lg:col-span-2">
              <Card title="US Regional Omnichannel Adoption — Territory Heatmap">
                <RegionalHeatmap />
              </Card>
            </div>
            <Card title="Organic vs Orchestrated Exposure">
              <ExposureDonut />
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
