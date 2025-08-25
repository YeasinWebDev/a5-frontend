import { UserRole } from "@/constants/role";
import adminSidebar from "@/routes/adminSidebar";
import agentSidebar from "@/routes/agentSidebar";
import userSidebar from "@/routes/userSidebar";
import type { IItem, TUserRole } from "@/types";




export const getSidebarItems = (userRole:TUserRole): IItem[] => {
  switch (userRole) {
    case UserRole.admin:
      return [...adminSidebar];
    case UserRole.user:
      return [...userSidebar];
    case UserRole.agent:
      return [...agentSidebar ];
    default:
      return [];
  }
};