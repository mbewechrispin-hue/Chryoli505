"use client";

import { Area, AreaChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function VisitorsChart({ data }: { data: { date: string; visitors: number }[] }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Area dataKey="visitors" stroke="#000" fill="#F4C400" fillOpacity={0.45} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TrafficSourceChart({ data }: { data: { name: string; value: number }[] }) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer>
        <PieChart>
          <Tooltip />
          <Pie data={data} dataKey="value" nameKey="name" outerRadius={90} fill="#F4C400" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
