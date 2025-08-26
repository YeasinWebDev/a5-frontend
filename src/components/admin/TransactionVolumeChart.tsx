import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface IUserData {
  data: {
    dayName: string;
    volume: number;
  }[];
}

function TransactionVolumeChart({ data }: IUserData) {
  const isMobile = useIsMobile();
  return (
    <Card className="rounded-2xl shadow-sm ">
      <CardHeader>
        <CardTitle>Transaction Volume (Last 7 Days)</CardTitle>
      </CardHeader>
      <CardContent className="w-full h-[300px] p-0 pr-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            {isMobile ? <XAxis dataKey="dayName" tick={{ fontSize: 14, fontWeight: 600 }} angle={-20} textAnchor="end" /> : <XAxis dataKey="dayName" tickSize={10} fontWeight={600} />}
            <YAxis dataKey="volume" />
            <Tooltip />
            <Line type="monotone" dataKey="volume" stroke="#efb100" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default TransactionVolumeChart;
