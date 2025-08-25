import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "@/components/Loader";
import { useDepositMutation } from "@/redux/feature/userApi";
import toast from "react-hot-toast";
import { useUserData } from "@/components/useUserData";
import { UserBalance } from "@/components/UserBalance";
import { useAmountSchema } from "@/validation/AmountValidation";

function Deposit() {
  const { isLoading, userData, refetch } = useUserData();
  const [deposit] = useDepositMutation();
  const amountSchema = useAmountSchema();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(amountSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const onSubmit = async (data: { amount: number }) => {
    const userId = userData.user?._id;
    const payload = { ...data, userId };
    try {
      await deposit(payload).unwrap();
      toast.success("Money deposit successfully");
      refetch();
      reset();
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center w-full md:p-6 justify-center">
      <h1 className="text-4xl md:text-5xl font-bold text-primary whitespace-nowrap mb-6">Deposit Money</h1>

      {userData && <UserBalance balance={userData.balance} />}

      <form onSubmit={handleSubmit(onSubmit)} className="w-full md:max-w-md shadow-lg rounded-xl p-3 md:p-6 border ">
        <label className="block font-medium mb-2">Enter Amount</label>
        <input
          type="number"
          {...register("amount", { valueAsNumber: true })}
          placeholder="Enter amount to withdraw"
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
        />
        {errors.amount && <p className="text-red-500 text-sm mt-2">{errors.amount.message}</p>}

        <button type="submit" className="mt-4 w-full bg-primary py-2 rounded-md font-semibold hover:bg-primary/90 transition cursor-pointer text-black">
          Withdraw
        </button>
      </form>
    </div>
  );
}

export default Deposit;
