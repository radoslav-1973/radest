import ValidationWarningsModal from "./ValidationWarningsModal";

import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  radarData,
  series,
  validationWarnings,
} from "$lib/data/students-grades-validator-safe";

type RadiusTickProps = {
  x?: number;
  y?: number;
  payload?: {
    value?: number | string;
  };
};

function VerticalRadiusTick({
  x = 0,
  y = 0,
  payload,
}: RadiusTickProps) {
  if (payload?.value === undefined) {
    return null;
  }

  const label = String(payload.value);

  // Approximate width; adjust for your font size and font family.
  const labelWidth = label.length * 7;
  const labelHeight = 18;

  return (
    <g transform={`rotate(0 ${x} ${y})`}>
      <rect
        x={x - labelWidth / 2 - 4}
        y={y - labelHeight / 2}
        width={labelWidth + 8}
        height={labelHeight}
        rx={4}
        className="fill-white dark:fill-slate-900"
        opacity={0.85}
      />

      <text
        x={x}
        y={y}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={11}
        className="fill-slate-600 dark:fill-slate-300"
      >
        {label}
      </text>
    </g>
  );
}

type TooltipEntry = {
  name?: string;
  value?: number | string;
  color?: string;
  dataKey?: string | number;
};

type SubjectTooltipProps = {
  active?: boolean;
  label?: string | number;
  payload?: TooltipEntry[];
};

function SubjectTooltip({ active, label, payload }: SubjectTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="not-prose pointer-events-none min-w-44 rounded-xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur dark:border-slate-700 dark:bg-slate-900/95">
  <p className="mb-2 border-b border-slate-200 pb-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
    {label}
  </p>

  <table className="w-full text-sm">
    <tbody>
      {payload.map((entry) => (
        <tr key={entry.dataKey} className="text-slate-700 dark:text-slate-300">
          <td className="py-1 pr-3">
            <span className="flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              {entry.name}
            </span>
          </td>

          <td className="py-1 text-right font-semibold text-slate-900 dark:text-slate-100">
            {entry.value}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
  );
}

export default function TestRadar() {
  return (
  <div>
	<ValidationWarningsModal warnings={validationWarnings} />
    <div className="h-96 w-full">
      <ResponsiveContainer initialDimension={{ width: 1, height: 1 }}>
        <RadarChart data={radarData} outerRadius="70%">
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis
  		angle={-90}
  		tick={<VerticalRadiusTick />}
		/>

          {series.map((item) => (
            <Radar
              key={item.dataKey}
              name={item.name}
              dataKey={item.dataKey}
              stroke={item.color}
              fill={item.color}
              fillOpacity={0.16}
            />
          ))}

          <Tooltip content={<SubjectTooltip />} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  </div>
  );
}
