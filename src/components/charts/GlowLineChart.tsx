"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface GlowLineChartProps {
  data: { name: string; value: number }[];
  color?: string;
  height?: number;
  showGrid?: boolean;
  showAxis?: boolean;
  glowColor?: string;
}

export default function GlowLineChart({
  data,
  color = "#00f5ff",
  height = 200,
  showGrid = false,
  showAxis = true,
  glowColor,
}: GlowLineChartProps) {
  const glow = glowColor || color;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <defs>
          <filter id={`glow-${color.replace("#", "")}`}>
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id={`gradient-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        {showGrid && (
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        )}
        {showAxis && (
          <>
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10, fill: "#849495", fontFamily: "JetBrains Mono" }}
              axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: "#849495", fontFamily: "JetBrains Mono" }}
              axisLine={false}
              tickLine={false}
            />
          </>
        )}
        <Tooltip
          contentStyle={{
            background: "rgba(31,31,34,0.95)",
            border: `1px solid ${color}40`,
            borderRadius: "8px",
            boxShadow: `0 0 15px ${glow}30`,
            fontFamily: "JetBrains Mono",
            fontSize: "12px",
            color: "#e4e1e6",
          }}
        />
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={{ fill: color, r: 3, strokeWidth: 0 }}
          activeDot={{
            r: 6,
            fill: color,
            stroke: `${color}40`,
            strokeWidth: 4,
          }}
          filter={`url(#glow-${color.replace("#", "")})`}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
