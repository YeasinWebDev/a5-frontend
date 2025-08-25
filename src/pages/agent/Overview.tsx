import { Loader } from "@/components/Loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAgentStatsQuery } from "@/redux/feature/userApi";
import { Link } from "react-router";
import { FaMinus, FaPlus } from "react-icons/fa6";

function Overview() {
  const { data, isLoading } = useAgentStatsQuery({});

  if (isLoading) return <Loader />;


  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition rounded-xl cursor-pointer">
          <CardContent className="flex flex-col items-center">
            <p className="font-semibold">💰 Wallet Balance</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2">{data?.data?.balance} BDT</h2>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition rounded-xl cursor-pointer">
          <CardContent className="flex flex-col items-center">
            <p className="font-semibold">📥 Total Cash In</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2">{data?.data?.totalCashIn} BDT</h2>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition rounded-xl cursor-pointer">
          <CardContent className="flex flex-col items-center">
            <p className="font-semibold">📤 Total Cash Out</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2">{data?.data?.totalCashOut} BDT</h2>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition rounded-xl cursor-pointer">
          <CardContent className="flex flex-col items-center">
            <p className="font-semibold">🏆 Commission Earned</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mt-2">{data?.data?.totalCommission} BDT</h2>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10 flex gap-5 flex-col lg:flex-row">
        <Card className="rounded-md flex-1 w-full lg:w-30">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span className="text-2xl md:text-3xl">Recent Transactions</span>
              <Link to="/agent/transactions" className="bg-primary p-3 rounded-md whitespace-nowrap text-black">
                View All
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-scroll xl:overflow-hidden w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-2 px-3">Type</th>
                  <th className="py-2 px-3">Sender</th>
                  <th className="py-2 px-3">Receiver</th>
                  <th className="py-2 px-3">Amount</th>
                  <th className="py-2 px-3">Status</th>
                  <th className="py-2 px-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.recentTransactions?.map((tx: any) => (
                  <tr key={tx._id} className="border-b hover:bg-primary/60 cursor-pointer">
                    <td className={`p-3 capitalize font-medium whitespace-nowrap ${tx.type === "cash-out" ? "text-yellow-600" : "text-red-600"}`}>{tx.type}</td>
                    <td className="p-3 capitalize font-medium">{tx.senderName}</td>
                    <td className="p-3 capitalize font-medium">{tx.receiverName}</td>
                    <td className="p-3 font-semibold">{tx.amount} BDT</td>
                    <td className={`p-3 capitalize ${tx.status === "completed" ? "text-green-600" : "text-yellow-600"}`}>{tx.status}</td>
                    <td className="py-2 px-3">{new Date(tx.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
        <div className="bg-card p-5 rounded-lg min-w-[15rem]">
          <h2 className="text-2xl md:text-3xl font-bold mt-2 mb-5">Quick Actions</h2>
          <div className="flex flex-col gap-5">
            <Card className="hover:shadow-lg h-14 flex items-center justify-center bg-primary text-black font-semibold transition rounded-md cursor-pointer">
              <CardContent className="flex gap-1 items-center">
                <Link to="/agent/cash-in">Cash In </Link>
                (<FaPlus />)
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg h-14 flex items-center justify-center bg-primary text-black font-semibold transition rounded-md cursor-pointer">
              <CardContent className="flex gap-1 items-center">
                <Link to="/agent/cash-out">Cash Out</Link>
                (<FaMinus />)
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
