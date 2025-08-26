import { BarChart, Bar, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

interface IUserData {
    txData: {
        type: string;
        count: number;
    }[]
}


function TransactionTypeChart({txData}: IUserData) {
  const isMobile = useIsMobile();

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Transaction Type Distribution</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px] p-0 pr-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={txData}>
            <CartesianGrid strokeDasharray="3 3" />
            {isMobile ? <XAxis dataKey="type" tick={{ fontSize: 10, fontWeight: 600 }} angle={-20} textAnchor="end" /> : <XAxis dataKey="type" tickSize={10} fontWeight={600}/>}
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#efb100" style={{cursor: "pointer"}} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

export default TransactionTypeChart;
