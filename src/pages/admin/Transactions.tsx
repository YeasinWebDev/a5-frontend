import { Loader } from "@/components/Loader";
import { useAllDataQuery } from "@/redux/feature/userApi";
import { useState } from "react";

function Transactions() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");

  const { data, isLoading } = useAllDataQuery({
    page,
    limit: 10,
    search,
    type,
    status,
    minAmount,
    maxAmount,
  });

  const transactions = data?.data?.transactionData || [];
  const pagination = data?.data || {};

  const handelClear = () => {
    setSearch("");
    setType("");
    setStatus("");
    setMinAmount("");
    setMaxAmount("");
  };

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">Transactions</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6 w-full justify-center">
        <input
          type="text"
          placeholder="Search sender/receiver"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-60 focus:outline-primary dark:bg-black"
        />

        <select value={type} onChange={(e) => setType(e.target.value)} className="border px-3 py-2 rounded dark:bg-black focus:outline-primary">
          <option value="">All Types</option>
          <option value="cash-in">Cash In</option>
          <option value="cash-out">Cash Out</option>
          <option value="send">Send</option>
          <option value="topUp">Top Up</option>
          <option value="withdraw">Withdraw</option>
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)} className="border px-3 py-2 rounded dark:bg-black focus:bg-primary">
          <option value="">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>

        <input
          type="number"
          placeholder="Min Amount"
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
          className="border px-3 py-2 rounded w-32 focus:outline-primary dark:bg-black"
        />

        <input
          type="number"
          placeholder="Max Amount"
          value={maxAmount}
          onChange={(e) => setMaxAmount(e.target.value)}
          className="border px-3 py-2 rounded w-32 focus:outline-primary dark:bg-black"
        />

        <button onClick={handelClear} className="bg-primary text-white px-3 py-2 rounded hover:bg-primary/80 transition cursor-pointer">
          Clear All
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto p-4 w-full">
        <table className="w-full border">
          <thead>
            <tr>
              <th className="p-3 border-b">Sender</th>
              <th className="p-3 border-b">Receiver</th>
              <th className="p-3 border-b">Type</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Amount</th>
              <th className="p-3 border-b">Commission</th>
              <th className="p-3 border-b">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((tx: any) => (
                <tr key={tx._id} className="text-center hover:bg-primary/10 transition">
                  <td className="p-3 border-b capitalize">{tx.senderName}</td>
                  <td className="p-3 border-b capitalize">{tx.receiverName}</td>
                  <td
                    className={`p-3 border-b font-medium capitalize ${
                      tx.type === "cash-in"
                        ? "text-green-500"
                        : tx.type === "cash-out"
                        ? "text-orange-600"
                        : tx.type === "send"
                        ? "text-blue-600"
                        : tx.type === "topUp"
                        ? "text-emerald-600"
                        : tx.type === "withdraw"
                        ? "text-red-600"
                        : ""
                    }`}
                  >
                    {tx.type}
                  </td>
                  <td className={`p-3 border-b capitalize ${tx.status === "completed" ? "text-green-600" : "text-yellow-600"}`}>{tx.status}</td>
                  <td className="p-3 border-b">{tx.amount} BDT</td>
                  <td className="p-3 border-b">{tx.commission} BDT</td>
                  <td className="p-3 border-b">{new Date(tx.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center p-4 border">
                  No transactions found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/*Pagination */}
      {pagination?.totalPages > 1 && (
        <div className="flex gap-4 mt-4 items-center">
          <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1} className="px-4 py-2 bg-primary rounded disabled:opacity-50">
            Prev
          </button>
          <span className="px-2">
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => (prev < pagination.totalPages ? prev + 1 : prev))}
            disabled={page === pagination.totalPages}
            className="px-4 py-2 bg-primary rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default Transactions;
