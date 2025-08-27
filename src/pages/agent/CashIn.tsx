import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { Loader } from "@/components/Loader";
import { UserBalance } from "@/components/UserBalance";
import { useSearchUserMutation, useCashInMutation } from "@/redux/feature/userApi";
import { useUserData } from "@/components/useUserData";
import type { CashForm, SearchResults } from "@/types/user";
import { useCashSchema } from "@/validation/CashValidation";

function cashIn() {
  const { isLoading, userData, refetch } = useUserData();
  const [cashIn, { isLoading: cashInLoading }] = useCashInMutation();
  const [searchUser] = useSearchUserMutation();
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const cashInSchema = useCashSchema();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<CashForm>({
    resolver: zodResolver(cashInSchema),
    defaultValues: { email: "", amount: 0 },
  });
  const searchQuery = watch("email");

  useEffect(() => {
    if (!searchQuery) {
      setSearchResults(null);
      return;
    }

    const fetchUsers = async () => {
      try {
        const res = await searchUser({ query: searchQuery }).unwrap();
        setSearchResults(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUsers();
  }, [searchQuery, searchUser]);

  const onSubmit = async (data: CashForm) => {
    try {
      await cashIn(data).unwrap();
      toast.success("Cash in successfully");
      refetch();
      reset();
      setSearchResults(null);
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col items-center w-full md:p-6 justify-center">
      <h1 className="text-4xl md:text-5xl font-bold text-primary whitespace-nowrap mb-6">Cash In</h1>

      {userData && <UserBalance balance={userData.balance} />}

      <form onSubmit={handleSubmit(onSubmit)} className="w-full md:max-w-md shadow-lg rounded-xl p-4 md:p-6 border relative ">
        <label className="block font-medium mb-2">User Email</label>
        <input
          type="text"
          {...register("email")}
          placeholder="Enter user email"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none mb-1"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
        />
        {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>}

        {isFocused && searchResults && searchResults?.users?.length > 0 && (
          <div className="absolute top-22 w-[16rem] md:top-26 md:w-[25rem] bg-primary p-2 rounded-md h-40 overflow-y-scroll">
            {searchResults?.users.map((user, index) => (
              <h2
                key={index}
                className="p-2 mb-2 cursor-pointer text-black border border-gray-800 rounded-md"
                onClick={() => {
                  setValue("email", user.email);
                  setSearchResults(null);
                }}
              >
                {user.email}
              </h2>
            ))}
          </div>
        )}

        <label className="block font-medium mb-2">Amount</label>
        <input
          type="number"
          {...register("amount", { valueAsNumber: true })}
          placeholder="Enter amount to send"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
        />
        {errors.amount && <p className="text-red-500 text-sm mt-2">{errors.amount.message}</p>}

        <button type="submit" disabled={cashInLoading} className="mt-4 w-full bg-primary py-2 rounded-md font-semibold hover:bg-primary/90 transition cursor-pointer text-black">
          Send
        </button>
      </form>
    </div>
  );
}

export default cashIn;
