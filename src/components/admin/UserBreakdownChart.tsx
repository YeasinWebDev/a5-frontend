import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface IUserData {
  userData: {
    count: number;
    role: string;
  }[];
}
const COLORS = ["#efb100", "#f97316"];

function UserBreakdownChart({ userData }: IUserData) {
  const data = userData;
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>User Role Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={100} dataKey="count" nameKey="role">
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default UserBreakdownChart;
