import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface VoteChartProps {
  data: Array<{ label: string; votes: number }>;
}

export default function VoteChart({ data }: VoteChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="votes" stroke="#111827" strokeWidth={3} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
