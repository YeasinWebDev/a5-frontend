import React from "react";

interface UserBalanceProps {
  balance: number;
  className?: string;
}

export const UserBalance: React.FC<UserBalanceProps> = ({ balance, className }) => {
  return (
    <div className={`shadow-md px-6 py-4 rounded-lg flex items-center justify-between w-full max-w-md mb-6 border ${className}`}>
      <p className="text-md font-medium">Total Balance:</p>
      <p className="text-xl font-bold text-orange-300">{balance} BDT</p>
    </div>
  );
};
