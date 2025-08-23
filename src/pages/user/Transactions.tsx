import { useState } from "react";
import { useTransactionsQuery } from "@/redux/feature/userApi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Transactions() {
  const [page, setPage] = useState(1);
  const [type, setType] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const { data, isLoading } = useTransactionsQuery({
    page,
    limit: 1,
    type: type || undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
  });

  if (isLoading) return <p className="text-center">Loading...</p>;

  const transactions = data?.data.transactions || [];
  const pagination = data?.data.pagination || {};

  const refreshFilter = () => {
    setType("");
    setStartDate(undefined);
    setEndDate(undefined);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl font-bold text-primary whitespace-nowrap mb-6">Transactions</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <select className="border p-2 rounded-md" value={type} onChange={(e) => setType(e.target.value)}>
          <option className="dark:bg-black" value="">
            All Types
          </option>
          <option className="dark:bg-black" value="send">
            Send
          </option>
          <option className="dark:bg-black" value="receive">
            Receive
          </option>
        </select>

        <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} placeholderText="Start Date" className="border p-2 rounded-md" dateFormat="yyyy-MM-dd" />

        <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} placeholderText="End Date" className="border p-2 rounded-md" dateFormat="yyyy-MM-dd" />

        <button className="bg-primary p-3 rounded-md" onClick={refreshFilter}>
          Clear Filters
        </button>
      </div>

      {/* ✅ Table */}
      <div className="overflow-x-auto p-4 w-full">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead>
            <tr>
              <th className="p-3 border">Sender</th>
              <th className="p-3 border">Receiver</th>
              <th className="p-3 border">Type</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Amount</th>
              <th className="p-3 border">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((tx: any) => (
                <tr key={tx._id} className="text-center">
                  <td className="p-3 border">{tx.senderName}</td>
                  <td className="p-3 border">{tx.receiverName}</td>
                  <td className={`p-3 border font-medium ${tx.type === "send" ? "text-red-600" : "text-green-600"}`}>{tx.type}</td>
                  <td className={`p-3 border ${tx.status === "completed" ? "text-green-600" : "text-yellow-600"}`}>{tx.status}</td>
                  <td className="p-3 border">${tx.amount}</td>
                  <td className="p-3 border">{new Date(tx.createdAt).toLocaleDateString()}</td>
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
