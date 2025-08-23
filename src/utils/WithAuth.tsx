import { Loader } from "@/components/Loader";
import { useMeQuery } from "@/redux/feature/authApi";

import type { TUserRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const WithAuth = (Component: ComponentType, userRole?: TUserRole) => {
  return (props: any) => {
    const { isLoading, data } = useMeQuery({});
    if (isLoading) {
      return <Loader />;
    }

    if (!isLoading && !data?.data?.user?.role.includes(userRole)) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component />;
  };
};
