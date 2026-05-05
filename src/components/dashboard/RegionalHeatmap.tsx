import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleQuantize } from "d3-scale";

const GEO_URL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const stateAdoption: Record<string, number> = {
  Washington: 72, Oregon: 64, California: 88, Nevada: 51, Idaho: 38, Montana: 49,
  Wyoming: 35, Utah: 47, Arizona: 63, Colorado: 69, "New Mexico": 46,
  "North Dakota": 41, "South Dakota": 42, Nebraska: 48, Kansas: 50, Oklahoma: 52, Texas: 81,
  Minnesota: 66, Iowa: 59, Missouri: 62, Arkansas: 54, Louisiana: 57,
  Wisconsin: 71, Illinois: 76, Mississippi: 49, Alabama: 61, Tennessee: 67,
  Michigan: 68, Indiana: 65, Kentucky: 56, Ohio: 73, "West Virginia": 44,
  Georgia: 78, Florida: 86, "South Carolina": 70, "North Carolina": 75, Virginia: 74,
  Pennsylvania: 80, "New York": 84, Maine: 58, Vermont: 55, "New Hampshire": 53,
  Massachusetts: 79, "Rhode Island": 64, Connecticut: 72, "New Jersey": 82,
  Delaware: 60, Maryland: 77, "District of Columbia": 70, Alaska: 30, Hawaii: 40,
};

// Berry → amber gradient steps matching dashboard theme
const palette = [
  "hsl(330 60% 88%)",
  "hsl(335 65% 75%)",
  "hsl(340 70% 60%)",
  "hsl(355 75% 50%)",
  "hsl(15 80% 52%)",
  "hsl(30 85% 58%)",
  "hsl(40 90% 62%)",
];

const colorScale = scaleQuantize<string>().domain([25, 90]).range(palette);

export function RegionalHeatmap() {
  return (
    <div>
      <ComposableMap projection="geoAlbersUsa" width={800} height={460} style={{ width: "100%", height: "auto" }}>
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const name = geo.properties.name as string;
              const v = stateAdoption[name];
              const fill = v != null ? colorScale(v) : "hsl(0 0% 92%)";
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={fill}
                  stroke="hsl(0 0% 100%)"
                  strokeWidth={0.6}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: "hsl(345 80% 45%)", cursor: "default" },
                    pressed: { outline: "none" },
                  }}
                >
                  <title>{name}{v != null ? `: ${v}% adoption` : ""}</title>
                </Geography>
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <div className="flex items-center gap-3 mt-2 text-[11px] text-muted-foreground">
        <span>Low</span>
        <div className="flex-1 h-2 rounded" style={{
          background: `linear-gradient(to right, ${palette.join(",")})`,
        }} />
        <span>High</span>
      </div>
    </div>
  );
}
