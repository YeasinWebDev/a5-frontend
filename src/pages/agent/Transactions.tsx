import { useState } from "react";
import { useAgentTransactionsQuery } from "@/redux/feature/userApi";
import "react-datepicker/dist/react-datepicker.css";
import { Loader } from "@/components/Loader";

function Transactions() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useAgentTransactionsQuery({
    page,
    limit: 5,
  });

  if (isLoading) return <Loader />;

  const transactions = data?.data.transactions || [];
  const pagination = data?.data.pagination || {};
  console.log(pagination,"pagination")

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-primary whitespace-nowrap mb-6">Transactions</h1>

      <div className="overflow-x-auto p-4 w-full">
        <table className="w-full border">
          <thead>
            <tr>
              <th className="p-3 border-b">Sender</th>
              <th className="p-3 border-b">Receiver</th>
              <th className="p-3 border-b">Type</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Amount</th>
              <th className="p-3 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((tx: any) => (
                <tr key={tx._id} className="text-center cursor-pointer hover:bg-primary/10 transition-all duration-300 ease-in-out">
                  <td className="p-3 border-b capitalize">{tx.senderName}</td>
                  <td className="p-3 border-b capitalize">{tx.receiverName}</td>
                  <td className={`p-3 border-b  font-medium capitalize ${tx.type === "cash-in" ? "text-red-600" : "text-yellow-600"}`}>{tx.type}</td>
                  <td className={`p-3 border-b capitalize ${tx.status === "completed" ? "text-green-600" : "text-yellow-600"}`}>{tx.status}</td>
                  <td className="p-3 border-b ">{tx.amount} BDT</td>
                  <td className="p-3 border-b ">{new Date(tx.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center p-4 border">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {pagination?.totalPages > 1 && (
        <div className="flex gap-4 mt-4 items-center">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-primary rounded cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-2">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => (prev < pagination.totalPages ? prev + 1 : prev))}
            disabled={page === pagination.totalPages}
            className="px-4 py-2 bg-primary rounded cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Transactions;
