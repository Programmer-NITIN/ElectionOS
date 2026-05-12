"use client";

import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
} from "recharts";

interface IssueRadarProps {
  data: { issue: string; intensity: number; fullMark: number }[];
  height?: number;
}

export default function IssueRadar({ data, height = 300 }: IssueRadarProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
        <defs>
          <filter id="radar-glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="radarGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00f5ff" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#7C4DFF" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <PolarGrid
          stroke="rgba(255,255,255,0.08)"
          gridType="polygon"
        />
        <PolarAngleAxis
          dataKey="issue"
          tick={{
            fontSize: 11,
            fill: "#b9caca",
            fontFamily: "JetBrains Mono",
            fontWeight: 500,
          }}
        />
        <Radar
          name="Issue Intensity"
          dataKey="intensity"
          stroke="#00f5ff"
          fill="url(#radarGradient)"
          strokeWidth={2}
          filter="url(#radar-glow)"
          dot={{
            r: 4,
            fill: "#00f5ff",
            stroke: "rgba(0,245,255,0.4)",
            strokeWidth: 3,
          }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
