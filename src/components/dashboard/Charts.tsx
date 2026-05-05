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
  c1: "hsl(330 65% 35%)",
  c2: "hsl(345 75% 50%)",
  c3: "hsl(20 85% 55%)",
  c4: "hsl(40 90% 60%)",
};

export function ReachChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={reachData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis dataKey="month" tick={{ fontSize: 11 }} />
        <YAxis tick={{ fontSize: 11 }} />
        <Tooltip contentStyle={{ fontSize: 12 }} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
        <Line type="monotone" dataKey="uniqueReach" name="Unique reach" stroke={colors.c1} strokeWidth={2} dot={{ r: 2 }} />
        <Line type="monotone" dataKey="uniqueTargetReach" name="Unique target reach" stroke={colors.c2} strokeWidth={2} dot={{ r: 2 }} />
        <Line type="monotone" dataKey="nbaCompletion" name="NBA completion rate %" stroke={colors.c3} strokeWidth={2} strokeDasharray="4 3" dot={{ r: 2 }} />
        <Line type="monotone" dataKey="nbaRejection" name="NBA rejection rate %" stroke={colors.c4} strokeWidth={2} strokeDasharray="4 3" dot={{ r: 2 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

const adoptionData = ["Q1","Q2","Q3","Q4"].map((q, i) => ({
  q, adoption: 64 + i * 3, rejection: 36 - i * 3,
}));
export function AdoptionStack() {
  return (
    <ResponsiveContainer width="100%" height={260}>
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
        <Bar dataKey="Q1" fill="hsl(330 60% 30%)" />
        <Bar dataKey="Q2" fill="hsl(345 70% 45%)" />
        <Bar dataKey="Q3" fill="hsl(15 80% 55%)" />
        <Bar dataKey="Q4" fill="hsl(40 90% 65%)" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function RepDonut() {
  const data = [
    { name: "Adopted", value: 1246, color: colors.c3 },
    { name: "Not adopted", value: 321, color: colors.c4 },
    { name: "Partial", value: 112, color: "hsl(45 90% 55%)" },
  ];
  return (
    <div className="flex items-center gap-4">
      <ResponsiveContainer width="55%" height={180}>
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
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={journeyData} layout="vertical" margin={{ top: 5, right: 15, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
        <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={(v) => `${v}%`} />
        <YAxis type="category" dataKey="stage" tick={{ fontSize: 10 }} width={140} />
        <Tooltip />
        <Legend wrapperStyle={{ fontSize: 10 }} />
        {segments.map((s, i) => (
          <Bar key={s} dataKey={s.replace(" ", "")} name={s} fill={[colors.c1, colors.c2, colors.c3, "hsl(45 85% 55%)"][i]} />
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
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} dataKey="value" innerRadius={55} outerRadius={90} paddingAngle={2}>
            {data.map((d) => <Cell key={d.name} fill={d.color} />)}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 gap-3 mt-2">
        {data.map((d) => (
          <div key={d.name} className="bg-muted/40 rounded-md px-3 py-2">
            <div className="text-[11px] text-muted-foreground">{d.name}</div>
            <div className="text-xl font-semibold" style={{ color: d.color }}>{d.value}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
