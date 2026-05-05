// Simplified US regional adoption heatmap — tile grid by state
const states: { code: string; row: number; col: number; adoption: number }[] = [
  { code: "WA", row: 0, col: 1, adoption: 72 },
  { code: "ME", row: 0, col: 10, adoption: 58 },
  { code: "MT", row: 1, col: 2, adoption: 49 }, { code: "ND", row: 1, col: 4, adoption: 41 },
  { code: "MN", row: 1, col: 5, adoption: 66 }, { code: "WI", row: 1, col: 6, adoption: 71 },
  { code: "MI", row: 1, col: 7, adoption: 68 }, { code: "NY", row: 1, col: 9, adoption: 84 },
  { code: "VT", row: 1, col: 9.5, adoption: 55 }, { code: "NH", row: 1, col: 10, adoption: 53 },
  { code: "OR", row: 2, col: 1, adoption: 64 }, { code: "ID", row: 2, col: 2, adoption: 38 },
  { code: "WY", row: 2, col: 3, adoption: 35 }, { code: "SD", row: 2, col: 4, adoption: 42 },
  { code: "IA", row: 2, col: 5, adoption: 59 }, { code: "IL", row: 2, col: 6, adoption: 76 },
  { code: "IN", row: 2, col: 7, adoption: 65 }, { code: "OH", row: 2, col: 8, adoption: 73 },
  { code: "PA", row: 2, col: 9, adoption: 80 }, { code: "NJ", row: 2, col: 10, adoption: 82 },
  { code: "MA", row: 2, col: 10.5, adoption: 79 },
  { code: "CA", row: 3, col: 1, adoption: 88 }, { code: "NV", row: 3, col: 2, adoption: 51 },
  { code: "UT", row: 3, col: 3, adoption: 47 }, { code: "CO", row: 3, col: 4, adoption: 69 },
  { code: "NE", row: 3, col: 5, adoption: 48 }, { code: "MO", row: 3, col: 6, adoption: 62 },
  { code: "KY", row: 3, col: 7, adoption: 56 }, { code: "WV", row: 3, col: 8, adoption: 44 },
  { code: "VA", row: 3, col: 9, adoption: 74 }, { code: "MD", row: 3, col: 10, adoption: 77 },
  { code: "DE", row: 3, col: 10.5, adoption: 60 },
  { code: "AZ", row: 4, col: 3, adoption: 63 }, { code: "NM", row: 4, col: 4, adoption: 46 },
  { code: "KS", row: 4, col: 5, adoption: 50 }, { code: "AR", row: 4, col: 6, adoption: 54 },
  { code: "TN", row: 4, col: 7, adoption: 67 }, { code: "NC", row: 4, col: 8, adoption: 75 },
  { code: "SC", row: 4, col: 9, adoption: 70 },
  { code: "OK", row: 5, col: 5, adoption: 52 }, { code: "LA", row: 5, col: 6, adoption: 57 },
  { code: "MS", row: 5, col: 7, adoption: 49 }, { code: "AL", row: 5, col: 8, adoption: 61 },
  { code: "GA", row: 5, col: 9, adoption: 78 },
  { code: "TX", row: 6, col: 5, adoption: 81 }, { code: "FL", row: 6, col: 9, adoption: 86 },
  { code: "AK", row: 6, col: 0, adoption: 30 }, { code: "HI", row: 6, col: 1, adoption: 40 },
];

function colorFor(v: number) {
  // Map 25-90 onto berry → amber gradient (theme aligned)
  const t = Math.max(0, Math.min(1, (v - 25) / 65));
  // interpolate hue 330 (berry) → 40 (amber), lightness 35 → 60
  const hue = 330 + (40 - 330) * t;
  const light = 35 + 25 * t;
  return `hsl(${hue} 75% ${light}%)`;
}

export function RegionalHeatmap() {
  const cols = 11;
  const rows = 7;
  const grid: (typeof states[number] | null)[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols + 1 }, () => null),
  );
  states.forEach((s) => {
    const c = Math.round(s.col * 2) / 2;
    const ci = Math.floor(c);
    grid[s.row][ci] = s;
  });

  return (
    <div>
      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${cols + 1}, minmax(0, 1fr))` }}>
        {grid.flatMap((row, ri) =>
          row.map((cell, ci) =>
            cell ? (
              <div
                key={`${ri}-${ci}`}
                className="aspect-square rounded text-[10px] font-semibold flex items-center justify-center text-white shadow-sm hover:scale-110 transition-transform cursor-default"
                style={{ background: colorFor(cell.adoption) }}
                title={`${cell.code}: ${cell.adoption}% adoption`}
              >
                {cell.code}
              </div>
            ) : (
              <div key={`${ri}-${ci}`} className="aspect-square" />
            ),
          ),
        )}
      </div>
      <div className="flex items-center justify-between mt-4 text-[11px] text-muted-foreground">
        <span>Low adoption</span>
        <div className="flex-1 mx-3 h-2 rounded" style={{
          background: "linear-gradient(to right, hsl(330 75% 35%), hsl(20 75% 48%), hsl(40 75% 60%))",
        }} />
        <span>High adoption</span>
      </div>
    </div>
  );
}
