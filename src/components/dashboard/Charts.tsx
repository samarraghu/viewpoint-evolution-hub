import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const reachData = months.map((m, i) => ({
  month: m,
  uniqueReach: 28 + i * 2.2 + (i % 3),
  uniqueTargetReach: 22 + i * 1.8,
  nbaCompletion: 60 + i * 1.4,
  nbaRejection: 22 - i * 0.4,
}));

const colors = {
  c1: "hsl(327 65% 28%)",
  c2: "hsl(327 60% 42%)",
  c3: "hsl(327 55% 58%)",
  c4: "hsl(327 50% 75%)",
};

export function ReachChart() {
  return (
    <ResponsiveContainer width="100%" height={210}>
      <LineChart data={reachData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis dataKey="month" tick={{ fontSize: 11 }} />
        <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
        <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
        <Tooltip contentStyle={{ fontSize: 12 }} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Line yAxisId="left" type="monotone" dataKey="uniqueReach" name="Unique reach" stroke={colors.c1} strokeWidth={2} dot={{ r: 2 }} />
        <Line yAxisId="left" type="monotone" dataKey="uniqueTargetReach" name="Unique target reach" stroke={colors.c2} strokeWidth={2} dot={{ r: 2 }} />
        <Line yAxisId="right" type="monotone" dataKey="nbaCompletion" name="NBA completion rate %" stroke={colors.c3} strokeWidth={2} strokeDasharray="4 3" dot={{ r: 2 }} />
        <Line yAxisId="right" type="monotone" dataKey="nbaRejection" name="NBA rejection rate %" stroke={colors.c4} strokeWidth={2} strokeDasharray="4 3" dot={{ r: 2 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

const adoptionData = ["Q1","Q2","Q3","Q4"].map((q, i) => ({
  q, adoption: 64 + i * 3, rejection: 36 - i * 3,
}));
const channelReachData = [
  { label: "1 channel only", value: 26000, pct: 38.0, color: colors.c1 },
  { label: "2 channels", value: 19100, pct: 27.9, color: colors.c2 },
  { label: "3 channels", value: 14370, pct: 21.0, color: colors.c3 },
  { label: "4+ channels", value: 8940, pct: 13.1, color: colors.c4 },
];
const totalHcps = channelReachData.reduce((s, d) => s + d.value, 0);
const maxChannelValue = Math.max(...channelReachData.map((d) => d.value));

export function MultiChannelReach() {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
        <span>% HCPs by number of channels touched</span>
        <span className="px-2 py-0.5 rounded-md bg-muted font-medium text-foreground">
          {totalHcps.toLocaleString()} total HCPs
        </span>
      </div>
      <div className="space-y-2">
        {channelReachData.map((d) => (
          <div key={d.label} className="grid grid-cols-[90px_1fr_44px] items-center gap-2 text-xs">
            <span className="text-muted-foreground">{d.label}</span>
            <div className="relative h-6 rounded-md bg-muted/60 overflow-hidden">
              <div
                className="h-full rounded-md flex items-center px-2 text-[11px] font-semibold text-white transition-all"
                style={{ width: `${(d.value / maxChannelValue) * 100}%`, background: d.color }}
              >
                {d.value.toLocaleString()}
              </div>
            </div>
            <span className="text-right font-medium text-muted-foreground">{d.pct}%</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2 pt-2 border-t">
        <div>
          <div className="text-[10px] text-muted-foreground">Avg channels / HCP</div>
          <div className="text-base font-semibold">2.1</div>
        </div>
        <div>
          <div className="text-[10px] text-muted-foreground">Target (≥3 channels)</div>
          <div className="text-base font-semibold" style={{ color: colors.c2 }}>34.1%</div>
        </div>
        <div>
          <div className="text-[10px] text-muted-foreground">Prior period ≥3</div>
          <div className="text-base font-semibold text-muted-foreground">27.9%</div>
        </div>
      </div>
    </div>
  );
}

export function AdoptionStack() {
  return (
    <ResponsiveContainer width="100%" height={210}>
      <BarChart data={adoptionData} stackOffset="expand" margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis dataKey="q" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `${Math.round(v * 100)}%`} />
        <Tooltip />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Bar dataKey="adoption" name="Adoption %" stackId="a" fill={colors.c3} />
        <Bar dataKey="rejection" name="Rejection %" stackId="a" fill={colors.c4} />
      </BarChart>
    </ResponsiveContainer>
  );
}

const channels = ["In Person Call","Remote E-Detailing","RTEs","SFMC Emails","Digital Banners","Other Digitals"];
const channelData = channels.map((c, i) => ({
  channel: c,
  Q1: 2 + i * 0.4 + (i === 0 ? 6 : 0),
  Q2: 2.5 + i * 0.5 + (i === 0 ? 7 : 0),
  Q3: 3 + i * 0.6 + (i === 0 ? 7.5 : 0),
  Q4: 3.5 + i * 0.7 + (i === 0 ? 8.2 : 0),
}));
export function ChannelChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={channelData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis dataKey="channel" tick={{ fontSize: 10 }} interval={0} />
        <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `$${v}M`} />
        <Tooltip formatter={(v: number) => `$${v.toFixed(1)}M`} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Bar dataKey="Q1" fill="hsl(327 70% 22%)" />
        <Bar dataKey="Q2" fill="hsl(327 62% 38%)" />
        <Bar dataKey="Q3" fill="hsl(327 55% 55%)" />
        <Bar dataKey="Q4" fill="hsl(327 48% 72%)" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function RepDonut() {
  const data = [
    { name: "High adoption", value: 1246, color: colors.c1 },
    { name: "Medium adoption", value: 112, color: "hsl(45 90% 55%)" },
    { name: "Low adoption", value: 321, color: colors.c4 },
  ];
  return (
    <div className="flex items-center gap-4">
      <ResponsiveContainer width="55%" height={150}>
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={45} outerRadius={70} paddingAngle={2}>
            {data.map((d) => <Cell key={d.name} fill={d.color} />)}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="text-xs space-y-1.5">
        <div className="text-2xl font-semibold text-foreground">73.4%</div>
        <div className="text-muted-foreground mb-2">Reps actively using NBA</div>
        {data.map((d) => (
          <div key={d.name} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: d.color }} />
            <span>{d.value} reps {d.name.toLowerCase()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const segments = ["Segment 1","Segment 2","Segment 3","Segment 4"];
const journeyData = ["Awareness → Interest","Interest → Consideration","Consideration → Intent","Intent → Rx"].map((s, i) => ({
  stage: s,
  Segment1: 78 - i * 12,
  Segment2: 70 - i * 13,
  Segment3: 58 - i * 12,
  Segment4: 42 - i * 10,
}));
export function JourneyChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={journeyData} layout="vertical" margin={{ top: 5, right: 15, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
        <YAxis type="category" dataKey="stage" tick={{ fontSize: 10 }} width={140} />
        <Tooltip />
        <Legend wrapperStyle={{ fontSize: 10 }} />
        {segments.map((s, i) => (
          <Bar key={s} dataKey={s.replace(" ", "")} name={s} fill={[colors.c1, colors.c2, colors.c3, colors.c4][i]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ExposureDonut() {
  const data = [
    { name: "Orchestrated", value: 58, color: colors.c1 },
    { name: "Organic", value: 42, color: colors.c3 },
  ];
  return (
    <div>
      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={40} outerRadius={65} paddingAngle={2}>
            {data.map((d) => <Cell key={d.name} fill={d.color} />)}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 gap-2 mt-1">
        {data.map((d) => (
          <div key={d.name} className="bg-muted/40 rounded-md px-2 py-1.5">
            <div className="text-[10px] text-muted-foreground">{d.name}</div>
            <div className="text-lg font-semibold" style={{ color: d.color }}>{d.value}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
