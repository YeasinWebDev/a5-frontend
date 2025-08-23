import { useMeQuery } from "@/redux/feature/authApi";

export function useUserData() {
  const { data, isLoading, error, refetch } = useMeQuery({});

  if (isLoading) return { isLoading: true, userData: null, refetch, error };

  return { isLoading: false, userData: data?.data, refetch, error };
}
