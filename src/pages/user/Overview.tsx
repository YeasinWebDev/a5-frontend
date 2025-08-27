import { Loader } from "@/components/Loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserData } from "@/components/useUserData";
import { useTransactionsQuery } from "@/redux/feature/userApi";
import { driver } from "driver.js";
import { ArrowDownCircle, ArrowUpCircle, Send } from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";

export default function Overview() {
  const { userData } = useUserData();
  const navigate = useNavigate();
  const { data, isLoading } = useTransactionsQuery({
    limit: 5,
  });

  useEffect(() => {
    const tourStage = localStorage.getItem("tourStage") === "dashboard";
    const isNewUser = localStorage.getItem("isNewUser") === "true";
    const userRole = localStorage.getItem("userRole") === "user";

    if (!isLoading && userRole && isNewUser && tourStage) {
      const tour = driver({
        showProgress: true,
        steps: [
          {
            element: "#wallet",
            popover: {
              title: "Wallet Balance",
              description: "You can see your wallet balance here.",
            },
          },
          {
            element: "#quick-actions",
            popover: {
              title: "Quick Actions",
              description: "You can perform quick actions from here (Deposit, Withdraw, Send).",
            },
          },
          {
            element: "#transactions",
            popover: {
              title: "Recent Transactions",
              description: "You can see your recent transaction history here.",
            },
          },
          {
            element: "#profile",
            popover: {
              title: "Profile",
              description: "You can see your profile and update from here.",
            },
          },
        ],
        onDestroyStarted: () => {
          localStorage.setItem("tourStage", "navbar");
          navigate(`/`);
        },
      });

      tour.drive();
    }
  }, [data]);

  if (isLoading) return <Loader />;

  return (
    <div className="md:p-6 space-y-6">
      <Card className="bg-gradient-to-r from-primary to-primary/40 text-white shadow-xl rounded-md">
        <CardContent id="wallet" className="md:p-4 flex flex-col items-center">
          <p className="text-lg">Wallet Balance</p>
          <h2 className="text-2xl md:text-4xl font-bold mt-2">{userData.balance} BDT</h2>
        </CardContent>
      </Card>

      <div id="quick-actions" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/user/deposit" className="w-full">
          <Card className="hover:shadow-lg transition rounded-xl cursor-pointer">
            <CardContent className="flex flex-col items-center md:p-4">
              <ArrowDownCircle className="w-9 h-9 text-indigo-500 mb-2" />
              <p className="font-semibold">Deposit Money</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/user/withdraw" className="w-full">
          <Card className="hover:shadow-lg transition rounded-xl cursor-pointer">
            <CardContent className="flex flex-col items-center md:p-4">
              <ArrowUpCircle className="w-9 h-9 text-green-500 mb-2" />
              <p className="font-semibold">Withdraw Money</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/user/send-money" className="w-full">
          <Card className="hover:shadow-lg transition rounded-xl cursor-pointer">
            <CardContent className="flex flex-col items-center md:p-4">
              <Send className="w-9 h-9 text-red-500 mb-2" />
              <p className="font-semibold">Send Money</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Card id="transactions" className="rounded-md">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Recent Transactions</span>
            <Link to="/user/transactions" className="bg-primary p-3 rounded-md text-black">
              View All
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-scroll lg:overflow-hidden w-full">
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
              {data?.data?.transactions?.map((tx: any) => (
                <tr key={tx._id} className="border-b hover:bg-primary/60 cursor-pointer">
                  <td className="p-3 capitalize font-medium">{tx.type}</td>
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

      <Card id="profile" className="rounded-xl">
        <CardContent className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <h4 className="uppercase bg-primary p-2 rounded-full text-black">{userData?.user?.name.slice(0, 2)}</h4>
            <div>
              <p className="font-semibold capitalize">{userData?.user?.name}</p>
              <p className="text-gray-500 text-sm">{userData?.user?.email}</p>
            </div>
          </div>
          <Link to="/user/profile" className="bg-primary p-2.5 font-semibold rounded-md text-black">
            Edit Profile
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
