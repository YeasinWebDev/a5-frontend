import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { Loader } from "@/components/Loader";
import { UserBalance } from "@/components/UserBalance";
import { useSendMoneyMutation, useSearchUserMutation } from "@/redux/feature/userApi";
import { useUserData } from "@/components/useUserData";
import type { SearchResults, SendMoneyForm } from "@/types/user";



function SendMoney() {
  const { isLoading, userData, refetch } = useUserData();
  const [sendMoney] = useSendMoneyMutation();
  const [searchUser] = useSearchUserMutation();
  const [searchResults, setSearchResults] = useState<SearchResults | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const sendMoneySchema = z.object({
    email: z.string().nonempty("Recipient is required"),
    amount: z
      .number("Amount must be a number")
      .min(1, "Amount must be greater than 0")
      .max(userData?.balance || 0, "Amount exceeds your total balance"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<SendMoneyForm>({
    resolver: zodResolver(sendMoneySchema),
    defaultValues: { email: "", amount: 0 },
  });

  // Search users when typing
  useEffect(() => {
    if (searchQuery.length < 3) {
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

  const onSubmit = async (data: SendMoneyForm) => {
    try {
      await sendMoney(data).unwrap();
      toast.success("Money sent successfully");
      refetch();
      reset();
      setSearchResults(null);
      setSearchQuery("");
    } catch (error: any) {
      console.log(error)
      toast.error(error?.data?.message || "Something went wrong");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="flex flex-col items-center w-full p-6 justify-center">
      <h1 className="text-4xl md:text-5xl font-bold text-primary whitespace-nowrap mb-6">Send Money</h1>

      {userData && <UserBalance balance={userData.balance} />}

      <form onSubmit={handleSubmit(onSubmit)} className="w-full md:max-w-md shadow-lg rounded-xl p-4 md:p-6 border relative ">
        <label className="block font-medium mb-2">Recipient Email</label>
        <input
          type="text"
          {...register("email")}
          placeholder="Enter recipient email"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none mb-1"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {errors.email && <p className="text-red-500 text-sm mb-2">{errors.email.message}</p>}

        {/* Search results */}
        {searchResults && searchResults?.users?.length > 0 && (
          <div className="absolute top-22 w-[16rem] md:top-26 md:w-[25rem] bg-primary p-2 rounded-md h-40 overflow-y-scroll">
            <ul className="max-h-40 overflow-y-auto mb-2 flex flex-col gap-2">
              {searchResults?.users.map((user, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer text-black border border-gray-800 rounded-md"
                  onClick={() => {
                    setValue("email", user.email);
                    setSearchResults(null);
                    setSearchQuery("");
                  }}
                >
                  {user.email}
                </li>
              ))}
            </ul>
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

        <button type="submit" className="mt-4 w-full bg-primary py-2 rounded-md font-semibold hover:bg-primary/90 transition">
          Send Money
        </button>
      </form>
    </div>
  );
}

export default SendMoney;
