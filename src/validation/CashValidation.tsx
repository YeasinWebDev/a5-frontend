import { useUserData } from "@/components/useUserData";
import { z } from "zod";

export function useCashSchema() {
  const { userData } = useUserData();

  return z.object({
    email: z.string().nonempty("User Email is required"),
    amount: z
      .number("Amount must be a number")
      .min(1, "Amount must be greater than 0")
      .max(userData?.balance || 0, "Amount exceeds your total balance"),
  });
}
