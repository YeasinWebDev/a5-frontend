import StatCard from "@/components/admin/StatCard";
import TransactionTypeChart from "@/components/admin/TransactionTypeChart";
import TransactionVolumeChart from "@/components/admin/TransactionVolumeChart";
import UserBreakdownChart from "@/components/admin/UserBreakdownChart";
import { Loader } from "@/components/Loader";
import { useAdminStatsQuery } from "@/redux/feature/userApi";
import { Users, UserCheck, CreditCard } from "lucide-react";

function Overview() {
  const { data, isLoading } = useAdminStatsQuery({});

  if (isLoading) return <Loader />;
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Users" value={data?.data?.totalUsers} icon={Users} />
        <StatCard title="Total Agents" value={data?.data?.totalAgents} icon={UserCheck} />
        <StatCard title="Transactions" value={data?.data?.totalTransactions} icon={CreditCard} />
        <StatCard title="Volume" value={data?.data?.totalVolume} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-5">
        <TransactionVolumeChart data={data?.data?.transactionVolume7Days} />
        <UserBreakdownChart userData={data?.data?.userPieChartData} />
      </div>
      <div>
        <TransactionTypeChart txData={data?.data?.typeBarChartData} />
      </div>
    </div>
  );
}

export default Overview;
