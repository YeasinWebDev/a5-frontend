import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function StatCard({ title, value, icon: Icon }: { title: string; value: string; icon?: any }) {
  return (
    <Card className="rounded-md shadow-sm h-24 md:h-28 lg:h-full p-0 py-2 md:py-3 lg:py-5">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-[16px] md:text-lg">{title}</CardTitle>
        {Icon ? <Icon className="w-6 h-6 text-muted-foreground" /> : <span className="text-lg md:text-xl font-semibold text-muted-foreground">৳</span>}
      </CardHeader>
      <CardContent>
        <p className="text-xl md:text-2xl font-bold">{value}</p>
      </CardContent>
    </Card>
  );
}

export default StatCard;
