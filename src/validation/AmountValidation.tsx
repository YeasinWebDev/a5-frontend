import { useUserData } from "@/components/useUserData";
import { z } from "zod";

export function useAmountSchema() {
  const { userData } = useUserData();

  return z.object({
    amount: z
      .number("Amount must be a number")
      .min(1, "Amount must be greater than 0")
      .refine((val) => val <= (userData?.balance ?? 0), { message: "Amount exceeds your total balance" }),
  });
}
